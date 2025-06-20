import { EventDetails } from "@/components/Modals/EventDetails";
import { LeaveEvent } from "@/components/Modals/LeaveEvent";
import { RegisterEvent } from "@/components/Modals/RegisterEvent";
import { RegisterSession } from "@/components/Modals/RegisterSession";
import { SessionDetails } from "@/components/Modals/SessionDetails";
import { ShowEventSuccess } from "@/components/Modals/ShowEventSuccessModal";
import { ShowSessionSuccess } from "@/components/Modals/ShowSessionSuccess";
import { Session } from "@/components/Skeliton/Session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useFunctionDirectory } from "@/hooks/FucntionDirectory";
import { useNotifications } from "@/hooks/useNotifications";
import { EventType } from "@/reducers/events";
import { SessionType } from "@/reducers/sessions";
import { RootState } from "@/store";
import dayjs from "dayjs";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronRightIcon,
  Clock as ClockIcon,
  Users
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MainNav } from "./MainNav";
import { MainSlider } from "./MainSlider";
import { Popover } from "antd";
import React from "react";


type InstitutionTopRankersTypeExtended = {
  name: string,
  rank: number,
  email: string
}


export default function Dashboard() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [progress, setProgress] = useState(78);
  const [activeTab, setActiveTab] = useState('institution');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [today] = useState(new Date());
  // --------------------------------------
  const userInfo = useSelector((state: RootState) => state.userSlice.user);
  const { firstName, auraPoints, username } = userInfo || {};
  const [eventModalOpen, setEventModalOpen] = useState<boolean>(false);
  const [leaveEventModalOpen, setLeaveEventModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType>(null);
  const [selectedSession, setSelectedSession] = useState<SessionType>(null);

  // --------------------------------
  const [openEventDetails, setOpenEventDetails] = useState<boolean>(false);
  const [showEventSuccess, setShowEventSuccess] = useState<boolean>(false);
  const [openSessionDetails, setOpenSessionDetails] = useState<boolean>(false);
  const [showSessionSuccess, setShowSessionSuccess] = useState<boolean>(false);
  const [openSessionRegister, setOpenSessionRegister] = useState<boolean>(false);
  const { events, loading: isEventLoading } = useSelector((state: RootState) => state.eventSlice);
  const { sessions, loading: isSessionLoading } = useSelector((state: RootState) => state.sessionsSlice);

  const joinedEvents = events?.filter((event: EventType) => event.joined);
  const joinedSessions = sessions?.filter((session: SessionType) => session.joined);

  const upcomingEvents = [...joinedEvents, ...joinedSessions];
  const sortedUpcomingEvents = upcomingEvents?.slice().sort(
    (a, b) => {
      const dateA = 'eventDate' in a ? a.eventDate : a.date;
      const dateB = 'eventDate' in b ? b.eventDate : b.date;
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    }
  );

  // Prepare a map of events by date (YYYY-MM-DD), adjusting for local timezone
  const eventsByDate = {};
  sortedUpcomingEvents?.forEach(event => {
    const rawDate = 'eventDate' in event ? event.eventDate : event.date;
    if (!rawDate) return;
    const dateObj = new Date(rawDate);
    // Adjust for timezone offset to get local date
    const localDate = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000);
    const key = localDate.toISOString().split("T")[0];
    if (!eventsByDate[key]) eventsByDate[key] = [];
    eventsByDate[key].push(event);
  });

  // -------------------Ranks------------------------
  const ranks = useSelector((state: RootState) => state.ranks);
  const [activeRanks, setActiveRanks] = useState<InstitutionTopRankersTypeExtended[] | null>(null);
  const { showNotificationStatus } = useNotifications();
  const showNotifications = showNotificationStatus();

  // ---------------------------------------


  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) { // Scrolling down & past 100px
          setVisible(false);
        } else { // Scrolling up
          setVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // Cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes pulse-slow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.5; }
      }
      .animate-pulse-slow {
        animation: pulse-slow 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => setProgress(78), 500);
    return () => clearTimeout(timer);
  }, []);

  // --------------------------------------

  const handleOpenEventModal = useCallback(({ event, type }: { event: EventType, type: string }) => {
    setSelectedEvent(event);
    if (type === "leave") {
      setLeaveEventModalOpen(true);
    } else {
      setEventModalOpen(true);
    }
  }, []);

  const handleOpenSessionModal = useCallback(({ session, type }: { session: SessionType, type: string }) => {
    setSelectedSession(session);
    if (type !== "leave") {
      setOpenSessionRegister(true);
    }
  }, []);
  const { getHoursByMinutes } = useFunctionDirectory();
  const isAdmin = userInfo?.userType ? userInfo.userType === "admin" || userInfo.userType === "superadmin" : false;

  const setUpRankings = () => {
    let tempActiveRanks: InstitutionTopRankersTypeExtended[] = [];

    if (activeTab === "institution") {
      tempActiveRanks = ranks?.institutionTopRankers?.map((item) => ({
        rank: item.institutionRank,
        name: userInfo?.id === item.id ? "You" : item.firstName,
        email: item.email,
      })) || [];

      const isContainsYou = tempActiveRanks.some((item) => item.name === "You");
      if (!isContainsYou) {
        tempActiveRanks = tempActiveRanks.slice(0, 2);
        tempActiveRanks.push({
          rank: userInfo?.institutionRank,
          name: "You",
          email: userInfo?.email,
        });
      }
      setActiveRanks(tempActiveRanks);
    }

    if (activeTab === "state") {
      tempActiveRanks = ranks?.stateTopRankers?.map((item) => ({
        rank: item.stateRank,
        name: userInfo?.id === item.id ? "You" : item.firstName,
        email: item.email,
      })) || [];

      const isContainsYou = tempActiveRanks.some((item) => item.name === "You");
      if (!isContainsYou) {
        tempActiveRanks = tempActiveRanks.slice(0, 2);
        tempActiveRanks.push({
          rank: userInfo?.stateRank,
          name: "You",
          email: userInfo?.email,
        });
      }
      setActiveRanks(tempActiveRanks);
    }

    if (activeTab === "country") {
      tempActiveRanks = ranks?.countryTopRankers?.map((item) => ({
        rank: item.countryRank,
        name: userInfo?.id === item.id ? "You" : item.firstName,
        email: item.email,
      })) || [];

      const isContainsYou = tempActiveRanks.some((item) => item.name === "You");
      if (!isContainsYou) {
        tempActiveRanks = tempActiveRanks.slice(0, 2);
        tempActiveRanks.push({
          rank: userInfo?.countryRank,
          name: "You",
          email: userInfo?.email,
        });
      }
      setActiveRanks(tempActiveRanks);
    }
  }

  const getDaysRemaining = (date: string) => {
    const targetDate = new Date(date);
    const today = new Date();
    // Set both dates to midnight for accurate day comparison
    targetDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const timeDiff = targetDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysRemaining === 0) return "Today";
    if (daysRemaining === 1) return "Tomorrow";
    if (daysRemaining > 1) return `${daysRemaining} days`;
    return "Event has passed";
  };

  useEffect(() => {
    setUpRankings();
  }, [activeTab, ranks]);

  const utilRankings = [
    {
      color: "from-purple-500 to-indigo-400",
      height: "h-52 sm:h-56",
    },
    {
      color: "from-emerald-500 to-green-400",
      height: "h-24 sm:h-28",
    },
    {
      color: "from-rose-500 to-red-400",
      height: "h-24 sm:h-28",
    },
  ]


  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Sidebar */}
      <MainSlider />

      {/* Header - Modern User-Friendly Design */}
      <MainNav type="dashboard" />

      {/* Main content */}
      <main className="py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 items-stretch">
            {/* Left Column */}
            <div className="col-span-2 space-y-8 flex flex-col">
              {/* Aura Points Card - Top Section */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50/90 via-purple-50/80 to-indigo-100/90 text-gray-800 backdrop-blur-sm rounded-2xl overflow-hidden relative">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] bg-[length:20px_20px] opacity-5"></div>

                {/* Simple decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute w-[500px] h-[500px] -top-[250px] -right-[150px] bg-purple-300/20 rounded-full blur-3xl"></div>
                  <div className="absolute w-[400px] h-[400px] -bottom-[200px] -left-[100px] bg-indigo-300/20 rounded-full blur-3xl"></div>
                </div>

                <CardContent className="p-0 relative z-10 h-full">
                  {/* Welcome Section */}
                  <div className="pt-8 px-8 text-center">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                      Welcome {firstName || username || 'User'}
                    </h2>

                    {/* Points Box */}
                    <div className="mt-2 mb-6 inline-flex items-center gap-4 bg-white/80 rounded-2xl px-6 py-3 backdrop-blur-sm border border-purple-100 shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <img
                          src="/lovable-uploads/aura-icon.png"
                          alt="Aura Points"
                          className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                          {auraPoints || 0}
                        </span>
                        <span className="text-sm font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 border border-indigo-100/50">
                          Aura Points
                        </span>
                      </div>
                    </div>

                    {/* Toggle Tabs */}
                    <div className="grid grid-cols-3 sm:flex sm:flex-nowrap gap-2 sm:space-x-3 mt-4 mb-16 sm:mb-20 px-2 sm:justify-center">
                      <button
                        className={`px-2 sm:px-6 py-2 transition-all duration-300 ease-out rounded-full text-sm font-medium shadow-md ${activeTab === 'institution'
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                          : 'bg-white/80 border border-purple-200 text-gray-700'
                          }`}
                        onClick={() => setActiveTab('institution')}
                      >
                        Institution
                      </button>
                      <button
                        className={`px-2 sm:px-6 py-2 transition-all duration-300 ease-out rounded-full text-sm font-medium shadow-md ${activeTab === 'state'
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                          : 'bg-white/80 border border-purple-200 text-gray-700'
                          }`}
                        onClick={() => setActiveTab('state')}
                      >
                        State
                      </button>
                      <button
                        className={`px-2 sm:px-6 py-2 transition-all duration-300 ease-out rounded-full text-sm font-medium shadow-md ${activeTab === 'country'
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                          : 'bg-white/80 border border-purple-200 text-gray-700'
                          }`}
                        onClick={() => setActiveTab('country')}
                      >
                        Country
                      </button>
                    </div>
                  </div>

                  {/* Bar Graph Section */}
                  <div className="mt-0 px-2 sm:px-8 relative pb-6">
                    <div className="flex justify-center items-end h-60 relative gap-4 sm:gap-10 pt-14">
                      {/* Your Bar */}
                      {/* <div className="flex flex-col items-center group">
                        <div className="relative flex flex-col items-center">
                          <div
                            className={`
                              w-16 sm:w-20 bg-gradient-to-t from-purple-500 to-indigo-400
                              hover:shadow-lg 
                              rounded-t-xl h-12 shadow-md 
                              transition-all duration-300 ease-out
                              group-hover:scale-105 border-t border-indigo-200
                            `}
                          >
                            <div className="absolute -top-6 left-0 right-0 flex justify-center">
                              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 shadow-md px-2 sm:px-3 py-1 rounded-full border border-indigo-200 flex items-center gap-1">
                                <span className="text-xs font-semibold text-white">#</span>
                                <span className="text-sm font-bold text-white">{120}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center mt-3">
                          <div className="px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                            <span className="text-xs sm:text-sm font-semibold text-indigo-700">You</span>
                          </div>
                        </div>
                      </div> */}

                      {/* Top Person's Bar */}
                      {/* <div className="flex flex-col items-center group">
                        <div className="relative flex flex-col items-center">
                          <div
                            className={`
                              w-16 sm:w-20 bg-gradient-to-t from-rose-500 to-red-400
                              hover:shadow-lg 
                              rounded-t-xl h-52 shadow-md 
                              transition-all duration-300 ease-out
                              group-hover:scale-105 border-t border-red-200
                            `}
                          >
                            <div className="absolute -top-6 left-0 right-0 flex justify-center">
                              <div className="bg-gradient-to-r from-rose-500 to-red-500 shadow-md px-2 sm:px-3 py-1 rounded-full border border-rose-200 flex items-center gap-1">
                                <Crown className="h-3 w-3 text-yellow-300" />
                                <span className="text-sm font-bold text-white">{130}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center mt-3">
                          <div className="px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-100 to-red-50 border border-rose-200 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                            <span className="text-xs sm:text-sm font-semibold text-rose-700">Mahesh</span>
                          </div>
                        </div>
                      </div> */}

                      {/* Other Person's Bar */}
                      {/* <div className="flex flex-col items-center group">
                        <div className="relative flex flex-col items-center">
                          <div
                            className={`
                              w-16 sm:w-20 bg-gradient-to-t from-emerald-500 to-green-400
                              hover:shadow-lg 
                              rounded-t-xl h-48 shadow-md 
                              transition-all duration-300 ease-out
                              group-hover:scale-105 border-t border-green-200
                            `}
                          >
                            <div className="absolute -top-6 left-0 right-0 flex justify-center">
                              <div className="bg-gradient-to-r from-emerald-500 to-green-500 shadow-md px-2 sm:px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                                <span className="text-xs font-semibold text-white">#</span>
                                <span className="text-sm font-bold text-white">89</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center mt-3">
                          <div className="px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-green-50 border border-emerald-200 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                            <span className="text-xs sm:text-sm font-semibold text-emerald-700">Hima</span>
                          </div>
                        </div>
                      </div> */}
                    </div>

                    <div className="flex justify-center items-end h-60 relative gap-4 sm:gap-10 pt-14">
                      {activeRanks?.map((rank, index) => {
                        let barHeightClass = 'h-[25vh]';
                        if (index === 0) barHeightClass = 'h-[45vh]';
                        else if (index === 1) barHeightClass = 'h-[35vh]';
                        return (
                          <div key={`${rank.email}_${index}`} className="flex flex-col items-center group">
                            <div className="relative flex flex-col items-center">
                              <div
                                className={`w-16 sm:w-20 bg-gradient-to-t ${utilRankings?.at(index)?.color} ${barHeightClass} hover:shadow-lg rounded-t-xl shadow-md transition-all duration-300 ease-out group-hover:scale-105 border-t border-indigo-200`}
                              >
                                <div className="absolute -top-6 left-0 right-0 flex justify-center">
                                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 shadow-md px-2 sm:px-3 py-1 rounded-full border border-indigo-200 flex items-center gap-1">
                                    <span className="text-xs font-semibold text-white">#</span>
                                    <span className="text-sm font-bold text-white">{rank?.rank}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-center mt-3">
                              <div className="px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                                <span className="text-xs sm:text-sm font-semibold text-indigo-700">{rank?.name}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Simple ranking explanation */}
                    <div className="mt-6 text-center">
                      <p className="text-xs text-gray-500 max-w-md mx-auto">
                        Rankings are based on Aura Points earned through event participation, sessions attended, and platform engagement.
                        {/* <span className="text-indigo-600 font-medium cursor-pointer hover:underline ml-1">Learn more</span> */}
                      </p>
                    </div>
                  </div>

                  <div className="pb-8"></div>
                </CardContent>
              </Card>

              {/* <div className="space-y-5">
                <Card className="border-0 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-100 text-gray-800 shadow-xl relative">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute h-40 w-40 -top-10 -right-10 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute h-40 w-40 -bottom-10 -left-10 bg-indigo-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute inset-0 bg-[url('/lovable-uploads/grid-pattern.svg')] opacity-10 mix-blend-soft-light"></div>
                  </div>

                  <CardHeader className="relative z-10 border-b border-purple-200/50 pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="font-bold text-lg sm:text-xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                          Your Progress Journey
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-1 text-sm">
                          Track your creative milestones
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-4 sm:px-6 py-5 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="relative p-5 bg-gradient-to-br from-white/90 to-purple-50 rounded-2xl backdrop-blur-sm border border-purple-100 hover:border-[#58C7F3]/50 hover:shadow-[0_0_20px_rgba(88,199,243,0.2)] transition-all duration-300 overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#58C7F3]/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8 group-hover:bg-[#58C7F3]/20 transition-all duration-500"></div>

                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#58C7F3]/20 to-[#58C7F3]/5 border border-[#58C7F3]/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <CalendarIcon className="h-5 w-5 text-[#58C7F3]" />
                          </div>
                          <span className="text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Events</span>
                        </div>
                        <div className="flex flex-col items-center mt-2">
                          <span className="text-5xl font-bold text-gray-800 group-hover:text-[#58C7F3] transition-colors duration-300">{events?.length}</span>
                          <span className="text-sm font-medium text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-300 bg-white/50 px-2.5 py-1 rounded-full">Participated</span>
                        </div>
                      </div>

                      <div className="relative p-5 bg-gradient-to-br from-white/90 to-purple-50 rounded-2xl backdrop-blur-sm border border-purple-100 hover:border-[#62DDBD]/50 hover:shadow-[0_0_20px_rgba(98,221,189,0.2)] transition-all duration-300 overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#62DDBD]/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8 group-hover:bg-[#62DDBD]/20 transition-all duration-500"></div>

                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#62DDBD]/20 to-[#62DDBD]/5 border border-[#62DDBD]/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <Users className="h-5 w-5 text-[#62DDBD]" />
                          </div>
                          <span className="text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Sessions</span>
                        </div>
                        <div className="flex flex-col items-center mt-2">
                          <span className="text-5xl font-bold text-gray-800 group-hover:text-[#62DDBD] transition-colors duration-300">24</span>
                          <span className="text-sm font-medium text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-300 bg-white/50 px-2.5 py-1 rounded-full">Attended</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div> */}
            </div>

            <div className="space-y-8 flex flex-col h-full">
              <Card className="border-0 shadow-xl bg-gradient-to-b from-purple-50/90 to-indigo-50/90 backdrop-blur-md rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex-1 flex flex-col">
                <CardHeader className="pb-5 pt-6 border-b border-indigo-100/50 bg-gradient-to-r from-purple-100/80 via-indigo-50/90 to-purple-50/80">
                  <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-6 w-6 text-indigo-600" />
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
                          {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-xs text-indigo-500/70 mt-1.5 font-medium ml-8">

                      </CardDescription>
                    </div>
                    <div className="flex gap-2 items-center bg-white/70 p-1 rounded-full shadow-sm border border-indigo-100/50">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 rounded-full text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-200"
                        onClick={() => {
                          const prevMonth = new Date(currentMonth);
                          prevMonth.setMonth(prevMonth.getMonth() - 1);
                          setCurrentMonth(prevMonth);
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-4 text-xs font-medium rounded-full text-indigo-700 border-indigo-200 bg-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-200"
                        onClick={() => setCurrentMonth(new Date())}
                      >
                        Today
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 rounded-full text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-200"
                        onClick={() => {
                          const nextMonth = new Date(currentMonth);
                          nextMonth.setMonth(nextMonth.getMonth() + 1);
                          setCurrentMonth(nextMonth);
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-5 relative overflow-hidden flex-1 flex flex-col">
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-indigo-300/30 to-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-purple-300/30 to-indigo-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }}></div>
                    <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gradient-to-r from-pink-300/10 to-purple-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '7s' }}></div>
                    <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] bg-[length:20px_20px] opacity-[0.03]"></div>
                    <div className="absolute bottom-0 right-0 w-full h-40 bg-gradient-to-t from-white/40 to-transparent pointer-events-none"></div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                      <div key={`${index}_${day}`} className="text-xs font-semibold text-indigo-700 py-2">{day}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1.5 relative z-10 mt-2">
                    {(() => {
                      const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
                      const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

                      const prevMonthDays = [];
                      const prevMonthLastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate();
                      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
                        prevMonthDays.push(
                          <div key={`prev-${prevMonthLastDay - i}`} className="text-center p-1">
                            <div className="w-full aspect-square flex items-center justify-center rounded-full">
                              <span className="text-xs text-gray-300/70">{prevMonthLastDay - i}</span>
                            </div>
                          </div>
                        );
                      }

                      const currentMonthDays = [];
                      const isToday = (day) => {
                        return currentMonth.getMonth() === today.getMonth() &&
                          currentMonth.getFullYear() === today.getFullYear() &&
                          day === today.getDate();
                      };

                      for (let day = 1; day <= daysInMonth; day++) {
                        const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                        // Adjust for timezone offset
                        const localDate = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000);
                        const dateKey = localDate.toISOString().split("T")[0];
                        const dayEvents = eventsByDate[dateKey] || [];
                        const dayIsToday = isToday(day);

                        const dayCell = (
                          <div
                            className={`
                              relative flex flex-col items-center justify-center p-1
                              ${dayEvents.length ? `group` : ''}
                              ${dayIsToday ? 'z-10' : 'z-0'}
                              cursor-pointer transition-all duration-300 hover:scale-105
                            `}
                          >
                            <div className={`
                              w-full aspect-square flex items-center justify-center
                              ${dayIsToday
                                ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-200 rounded-full'
                                : dayEvents.length
                                  ? `bg-indigo-50 hover:bg-indigo-100 rounded-full`
                                  : 'hover:bg-indigo-50 rounded-full'}
                              transition-all duration-300 ease-out
                            `}>
                              <span className={`
                                text-xs font-semibold
                                ${dayIsToday
                                  ? 'text-white'
                                  : dayEvents.length
                                    ? `text-indigo-700`
                                    : 'text-gray-700'}
                                transition-all duration-200
                              `}>
                                {day}
                              </span>
                            </div>
                            {dayEvents.length > 0 && (
                              <div className={`
                                absolute -bottom-0.5 left-1/2 transform -translate-x-1/2
                                w-1.5 h-1.5 rounded-full bg-indigo-500
                                group-hover:scale-125 transition-all duration-300
                              `}></div>
                            )}
                          </div>
                        );

                        currentMonthDays.push(
                          dayEvents.length > 0 ? (
                            <Popover
                              style={{
                                background: '#000000',
                                borderRadius: '0.75rem',
                                padding: '0.75rem 1rem',
                                color: 'white',
                              }}
                              key={day}
                              content={
                                <div
                                >
                                  {dayEvents
                                    .filter(ev => ev.title || ev.name || ev.eventName)
                                    .map((ev, idx) => (
                                      <div key={ev.id || ev.title} className="mb-1 last:mb-0 flex items-center gap-0.5">
                                        <div>{idx + 1}.</div>
                                        <span className="text-sm font-medium break-words">{ev.title || ev.eventName || ev.name || "Untitled Event"}</span>
                                      </div>
                                    ))}
                                </div>
                              }
                              placement="top"
                              overlayClassName="max-w-xs"
                            >
                              {dayCell}
                            </Popover>
                          ) : (
                            <React.Fragment key={day}>{dayCell}</React.Fragment>
                          )
                        );
                      }

                      const nextMonthDays = [];
                      const totalDaysShown = prevMonthDays.length + currentMonthDays.length;
                      const nextMonthDaysToShow = 42 - totalDaysShown;

                      for (let day = 1; day <= nextMonthDaysToShow; day++) {
                        nextMonthDays.push(
                          <div key={`next-${day}`} className="text-center p-1">
                            <div className="w-full aspect-square flex items-center justify-center rounded-full">
                              <span className="text-xs text-gray-300/70">{day}</span>
                            </div>
                          </div>
                        );
                      }

                      return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
                    })()}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-indigo-100/50 bg-gradient-to-br from-white/90 to-indigo-50/30 p-5">
                  <div className="space-y-4 w-full">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-indigo-500" />
                        Your Upcoming Events & Sessions
                      </h4>
                      {sortedUpcomingEvents?.length > 0 && <Button
                        variant="ghost"
                        className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 text-sm"
                        onClick={() => {
                          navigate('/events');
                          window.scrollTo(0, 0);
                        }}
                      >
                        View All <ChevronRightIcon className="ml-1 h-4 w-4" />
                      </Button>}
                    </div>

                    {sortedUpcomingEvents?.length > 0 ? <div className="space-y-3 max-h-[80vh] overflow-scroll">
                      {/* --------------------------------------------------------- */}
                      {sortedUpcomingEvents?.map((event) => {
                        const { id } = event;
                        const name = 'eventName' in event ? event.eventName : event.name;
                        const date = 'eventDate' in event ? event.eventDate : event.date;
                        return (<div key={id} className="group flex items-center gap-3 cursor-pointer p-3 rounded-xl transition-all duration-200 border border-indigo-100/30 hover:border-purple-200 bg-white/40 hover:bg-white shadow-sm hover:shadow-md">
                          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-purple-400 to-indigo-600 group-hover:scale-y-110 transition-transform duration-300"></div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-indigo-700 group-hover:text-indigo-800 truncate">{name}</div>
                            <div className="text-xs text-gray-500 mt-1 flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-1.5 text-indigo-400" />
                              {dayjs(date).format('MMM DD, YYYY')}
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-2.5 py-0.5 text-[10px] font-medium">
                              {getDaysRemaining(date)}
                            </Badge>
                          </div>
                        </div>);
                      })}
                      {/* --------------------------------------------------------- */}
                    </div> : (
                      <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-8">
                        <div className="bg-indigo-50 rounded-full p-6 mb-4">
                          <svg
                            className="h-12 w-12 text-indigo-400"
                            fill="none"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect x="6" y="12" width="36" height="28" rx="4" fill="#c7d2fe" />
                            <rect x="6" y="12" width="36" height="8" rx="2" fill="#6366f1" />
                            <rect x="14" y="28" width="20" height="8" rx="2" fill="#a5b4fc" />
                            <circle cx="38" cy="20" r="4" fill="#6366f1" />
                            <rect x="34.5" y="18.5" width="7" height="7" rx="3.5" fill="#fff" />
                            <path d="M38 20v3M38 20h3M38 20h-3" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                            <rect x="12" y="4" width="4" height="8" rx="2" fill="#6366f1" />
                            <rect x="32" y="4" width="4" height="8" rx="2" fill="#6366f1" />
                          </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-indigo-900 mb-2 text-center">
                          No Upcoming Events
                        </h2>
                        <p className="text-indigo-600 text-center max-w-md mb-4">
                          There are currently no upcoming events. Please check back later or explore other sections!
                        </p>
                        <button
                          onClick={() => navigate('/events')}
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full font-medium shadow hover:from-indigo-600 hover:to-purple-600 transition"
                        >
                          Join Events
                        </button>
                        <button
                          onClick={() => navigate('/sessions')}
                          className="mt-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full font-medium shadow hover:from-indigo-600 hover:to-purple-600 transition"
                        >
                          Join Sessions
                        </button>
                      </div>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Featured Events - Full Width Section */}
          <div className="mt-8 sm:mt-12">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Upcoming Events</h2>
              <Button
                variant="ghost"
                className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 text-sm"
                onClick={() => {
                  navigate('/events');
                  window.scrollTo(0, 0);
                }}
              >
                View All <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <>
              {isEventLoading ? (<div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {Array(3).fill(null)?.map((_, index) => (
                  <Session key={index} />
                ))}
              </div>) :
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {events.slice(0, 3).map((event, index) => (
                    <Card
                      key={`${event.id}_${index}`}
                      className={`overflow-hidden border-0 bg-gradient-to-b from-white to-purple-50/30 shadow-xl hover:shadow-purple-200/50 transition-all duration-500 ease-in-out group rounded-xl hover:-translate-y-1 hover:scale-[1.02]`}
                    >
                      {/* Enhanced image container */}
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={event?.eventImage}
                          alt={event?.eventName}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                        />

                        {/* Date badge with enhanced design */}
                        <div className={`absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-purple-700 z-20 shadow-md border border-purple-100/50 flex items-center`}>
                          <CalendarIcon className={`h-3.5 w-3.5 mr-1.5 text-purple-500`} />
                          {dayjs(event.eventDate).format('MMM DD, YYYY')}
                        </div>
                      </div>

                      {/* Enhanced content area */}
                      <CardContent className="p-4 sm:p-6">
                        <h3 className={`text-lg sm:text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors duration-500 truncate`}>{event?.eventName}</h3>

                        <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">{event.eventDescription}</p>

                        {/* Presenter info with enhanced styling */}
                        <div className={`flex items-center mb-4 p-2 bg-purple-50/50 rounded-lg border border-purple-100/50`}>
                          <Avatar className="h-6 w-6 sm:h-8 sm:w-8 border-2 border-white shadow-sm mr-2">
                            <AvatarImage src={event.presenter?.profileImage} alt="" />
                            <AvatarFallback>{event.presenter?.profileImage}</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="text-xs font-medium text-gray-800 block">
                              {event.presenter?.firstName || "Presenter"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {event.presenter?.designation || ""}
                            </span>
                          </div>
                          <div className={`ml-auto bg-white px-2 py-1 rounded-md text-xs font-medium text-purple-600 shadow-sm border border-purple-100/50`}>
                            {event?._count?.joinedUsers || 0} Attending
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2 mt-4">
                          {!event.joined && <Button
                            onClick={() => { handleOpenEventModal({ event: event, type: event.joined ? "leave" : "join" }) }}
                            className={`flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-500 ease-in-out hover:scale-[1.03]`}
                          >
                            {event.joined ? "Leave" : "Register"}
                          </Button>}
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedEvent(event);
                              setOpenEventDetails(true);
                            }}
                            className={`flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-500 ease-in-out hover:scale-[1.03] ${event.joined ? "full" : "auto"} sm:w-auto`}
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {leaveEventModalOpen && <LeaveEvent open={leaveEventModalOpen} onOpenChange={setLeaveEventModalOpen} event={selectedEvent} />}
                  {openEventDetails && <EventDetails open={openEventDetails} onOpenChange={setOpenEventDetails} event={selectedEvent} onRegister={() => {
                    setEventModalOpen(true);
                    setOpenEventDetails(false);
                  }} />}
                  {showEventSuccess && <ShowEventSuccess open={showEventSuccess} onOpenChange={setShowEventSuccess} event={selectedEvent} />}
                  {eventModalOpen && <RegisterEvent open={eventModalOpen} onOpenChange={setEventModalOpen} event={selectedEvent} onSuccess={() => setShowEventSuccess(true)} />}
                </div>}
            </>
          </div>

          <div className="mt-8 sm:mt-16 mb-8 sm:mb-12">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Upcoming Sessions</h2>
              <Button
                variant="ghost"
                className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 text-sm"
                onClick={() => {
                  navigate('/sessions');
                  window.scrollTo(0, 0);
                }}
              >
                View All <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <>
              {isSessionLoading ? (<div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {Array(3).fill(null)?.map((_, index) => (
                  <Session key={index} />
                ))}
              </div>) :
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {sessions.slice(0, 3).map((session) => (
                    <Card
                      key={session.id}
                      className={`overflow-hidden border-0 bg-gradient-to-b from-white to-purple-50/30 shadow-xl hover:shadow-purple-200/50 transition-all duration-500 ease-in-out group rounded-xl hover:-translate-y-1 hover:scale-[1.02]`}
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={session.image}
                          alt={session.name}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                        />


                        <div className={`absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-purple-700 z-20 shadow-md border border-purple-100/50 flex items-center`}>
                          <ClockIcon className={`h-3.5 w-3.5 mr-1.5 text-purple-500`} />
                          {getHoursByMinutes(session?.duration)}
                        </div>
                      </div>

                      <CardContent className="p-4 sm:p-6">


                        <h3 className={`text-lg sm:text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors duration-500`}>{session.name}</h3>

                        <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">{session.description}</p>

                        <div className={`flex items-center mb-4 p-2 bg-purple-50/50 rounded-lg border border-purple-100/50`}>
                          <Avatar className="h-6 w-6 sm:h-8 sm:w-8 border-2 border-white shadow-sm mr-2">
                            <AvatarImage src={session.presenter?.profileImage} />
                            <AvatarFallback>{session.presenter?.profileImage}</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="text-xs font-medium text-gray-800 block">{session?.presenter?.firstName}</span>
                            <span className="text-xs text-gray-500">{session?.presenter?.designation}</span>
                          </div>
                          <div className={`ml-auto bg-white px-2 py-1 rounded-md text-xs font-medium text-purple-600 shadow-sm border border-purple-100/50`}>
                            {session?._count?.joinedUsers || 0} Enrolled
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm mb-4">
                          <div className="flex items-center gap-1 text-gray-500">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{dayjs(session?.date).format("MMM DD, YYYY")}, {session?.time}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          {!session.joined && <Button
                            onClick={() => { handleOpenSessionModal({ session, type: "join" }) }}
                            className={`flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-500 ease-in-out hover:scale-[1.03]`}
                          >
                            {'Register'}
                          </Button>}
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedSession(session);
                              setOpenSessionDetails(true);
                            }}
                            className={`flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-500 ease-in-out hover:scale-[1.03] w-${session.joined ? "full" : "auto"} sm:w-auto`}
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {openSessionRegister && <RegisterSession open={openSessionRegister} onOpenChange={setOpenSessionRegister} session={selectedSession} onSuccess={() => setShowSessionSuccess(true)} />}
                  {openSessionDetails && <SessionDetails open={openSessionDetails} onOpenChange={setOpenSessionDetails} session={selectedSession} onRegister={() => { setOpenSessionRegister(true); setOpenSessionDetails(false); }} />}
                  {showSessionSuccess && <ShowSessionSuccess open={showSessionSuccess} onOpenChange={setShowSessionSuccess} session={selectedSession} />}
                </div>}
            </>
          </div>
        </div>
      </main>
    </div>
  );
}