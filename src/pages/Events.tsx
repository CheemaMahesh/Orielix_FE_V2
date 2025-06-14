import { EventDetails } from "@/components/Modals/EventDetails";
import { RegisterEvent } from "@/components/Modals/RegisterEvent";
import { ShowEventSuccess } from "@/components/Modals/ShowEventSuccessModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EventType } from "@/reducers/events";
import { RootState } from "@/store";
import dayjs from "dayjs";
import {
  BellIcon,
  BookOpenIcon,
  CalendarIcon,
  HomeIcon,
  LogOut,
  Sparkles as SparklesIcon,
  User,
  UsersIcon,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LeaveEvent } from "@/components/Modals/LeaveEvent";
import { Session } from "@/components/Skeliton/Session";
import defaultProfle from "../Icons/defaultprofile.svg";
import { eventTypes } from "@/lib/constants";
import { MainNav } from "./MainNav";
import { MainSlider } from "./MainSlider";
import { useProfile } from "@/Api/Profile";
import { useCallProfileInfo } from "@/hooks/Profile";

// Define the Event type based on the eventData structure
interface Presenter {
  name: string;
  role: string;
  avatar: string;
  fallback: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  presenter: Presenter;
  attending: number;
  color: string;
}

// NavItem component for sidebar
interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}

const NavItem = ({ icon, text, active, badge, onClick }: NavItemProps) => (
  <button
    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ease-in-out group relative overflow-hidden ${active
      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-[1.01]'
      : 'hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50/80 text-indigo-800 hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.005]'
      }`}
    onClick={onClick}
  >
    {/* Background glow effect */}
    {!active && (
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-indigo-400/0 to-purple-400/0 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 ease-in-out"></div>
    )}
    {active && (
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-indigo-400/20 opacity-30 blur-md"></div>
    )}

    <div className={`relative z-10 ${active ? 'text-white' : 'text-indigo-600'} transition-all duration-200 ease-in-out ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
      {icon}
    </div>
    <span className="relative z-10 text-base font-medium tracking-tight group-hover:translate-x-0.5 transition-all duration-200 ease-in-out">{text}</span>
    {badge && (
      <div className="relative z-10 ml-auto bg-white/90 backdrop-blur-sm text-indigo-600 min-w-6 h-6 px-1.5 rounded-full flex items-center justify-center text-xs font-bold shadow-sm border border-indigo-100/50 transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:shadow-md group-hover:border-indigo-200/70 group-hover:bg-white">
        {badge}
      </div>
    )}
  </button>
);

export default function Events() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const events = useSelector((state: RootState) => state.eventSlice.events);
  const [registerEventModal, setRegisteredEventModal] = useState<boolean>(false);
  const [leaveEventModalOpen, setLeaveEventModalOpen] = useState<boolean>(false);
  const isEventLoading = useSelector((state: RootState) => state.eventSlice.loading);
  const userInfo = useSelector((state: RootState) => state.userSlice.user);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { getAllEventsByToken, } = useCallProfileInfo();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const handleOpenEventModal = ({ event, type }: { event: EventType, type: string }) => {
    setSelectedEvent(event);
    if (type === "leave") {
      setLeaveEventModalOpen(true);
    } else {
      setRegisteredEventModal(true);
    }
  }
  const isAdmin = userInfo?.userType ? userInfo.userType === "admin" || userInfo.userType === "superadmin" : false;

  const getEventsByTypes = async () => {
    if (selectedType && selectedType !== "All Categories") {
      getAllEventsByToken({ type: selectedType });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Sidebar */}
      <MainSlider />

      {/* Header - Modern User-Friendly Design */}
      <MainNav type="events" />

      {/* Main content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="relative mb-12 overflow-hidden rounded-3xl bg-white border border-indigo-100/50 shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(#6366f1_0.5px,transparent_0.5px)] bg-[length:24px_24px] opacity-[0.03]"></div>
            <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-200/20 via-purple-200/20 to-indigo-200/20 blur-3xl opacity-70"></div>
            <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-purple-200/20 via-indigo-200/20 to-purple-200/20 blur-3xl opacity-70"></div>

            {/* Content wrapper */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 p-6 md:p-10">
              <div className="max-w-2xl">
                {/* Subtle badge */}
                <div className="inline-flex mb-4 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                  <span className="text-xs font-medium text-indigo-700 flex items-center">
                    <SparklesIcon className="h-3.5 w-3.5 mr-1.5" /> Curated for you
                  </span>
                </div>

                {/* Modern heading with enhanced typography */}
                <h1 className="mb-5 text-3xl md:text-5xl font-extrabold tracking-tight relative z-20 pl-1">
                  <span className="inline-block pb-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Discover Amazing Events</span>
                </h1>

                {/* Enhanced description with better typography */}
                <p className="mb-7 text-base md:text-lg leading-relaxed text-gray-600">
                  Compete with skilled people, implement learnings practically, and expand your real network through multiple industry events.
                </p>

                {/* Modern button with subtle animation */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 px-6 py-5 rounded-xl text-base font-medium"
                    onClick={() => {
                      document.getElementById('perfectEvent')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Browse All Events
                  </Button>
                </div>
              </div>

              {/* Creative skills illustration with enhanced animations */}
              <div className="relative group mt-4 md:mt-0">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-xl animate-pulse-slow"></div>
                <div className="w-60 h-60 md:w-72 md:h-72 bg-gradient-to-br from-white to-indigo-50 rounded-full flex items-center justify-center p-4 border border-indigo-100 shadow-xl relative z-10 transition-all duration-500 group-hover:shadow-purple-200/50">
                  {/* Animated rotating boundary */}
                  <div className="absolute -inset-4 border-2 border-dashed border-purple-300/50 rounded-full animate-[spin_40s_linear_infinite]"></div>

                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-inner relative overflow-hidden">
                    {/* Gradient overlays with animations */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-bl from-pink-500/10 to-purple-500/10 rounded-full animate-pulse delay-1000"></div>
                    <div className="absolute inset-0 border-[3px] border-purple-200/50 rounded-full animate-[spin_20s_linear_infinite]"></div>

                    <div className="relative z-10 w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                      <img
                        src="/lovable-uploads/creative-skills-icon.png"
                        alt="Creative Skills Icon"
                        className="w-[170%] h-[170%] object-contain transform scale-[1.7]"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/200?text=Creative+Skills';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ultra-Modern Event Filter with Enhanced User Appeal */}
          <div id="perfectEvent" className="mb-12 md:mb-20 relative px-4 md:px-0">
            {/* Subtle animated background elements */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl animate-pulse-slow opacity-70"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-pulse-slow opacity-70"></div>

            <div className="relative z-10">
              {/* Enhanced heading with animation */}
              <div className="text-center mb-8 relative">
                {/* Decorative background elements */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-60 h-60 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl opacity-70 animate-pulse-slow"></div>
                <div className="absolute -top-8 left-1/3 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-purple-200/30 to-indigo-200/30 rounded-full blur-2xl opacity-60 animate-pulse-slow animation-delay-1000"></div>
                <div className="absolute top-0 right-1/3 transform translate-x-1/2 w-40 h-40 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl opacity-70 animate-pulse-slow animation-delay-2000"></div>

                {/* Badge with animation */}
                <div className="inline-flex items-center justify-center mb-3 relative z-10">
                  <Badge variant="outline" className="px-4 py-1.5 border-indigo-200 bg-white/90 backdrop-blur-sm text-indigo-700 text-xs font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group">
                    <span className="mr-1.5 group-hover:animate-spin transition-all duration-300">✨</span>
                    <span>
                      Events
                    </span>
                  </Badge>
                </div>

                {/* Heading with enhanced gradient and animation */}
                <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-3 relative z-10">
                  <span className="inline-block">Find</span>{" "}
                  <span className="inline-block">Your</span>{" "}
                  <span className="inline-block">Perfect</span>{" "}
                  <span className="inline-block">Event</span>
                </h2>
              </div>

              {/* Redesigned compact filter section */}
              <div className="max-w-[700px] mx-auto">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-lg overflow-hidden border border-indigo-100/50 transition-all duration-300 hover:shadow-indigo-200/50 hover:border-indigo-200/50">
                  <div className="p-0.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20">
                    <div className="bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-xl relative overflow-hidden">
                      {/* Subtle decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/10 to-purple-100/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-100/10 to-indigo-100/10 rounded-full -ml-16 -mb-16 blur-xl"></div>

                      {/* Horizontal filter layout */}
                      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 relative z-10">
                        {/* Category Dropdown */}
                        <div className="flex-1">
                          <Select onValueChange={setSelectedType} defaultValue="All Categories">
                            <SelectTrigger className="h-12 bg-white/90 border-indigo-100 hover:border-indigo-300 focus:border-indigo-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-gray-700 pl-12">
                              <div className="absolute left-3 top-3 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shadow-md">
                                <SparklesIcon className="w-4 h-4 text-white" />
                              </div>
                              <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent className="bg-white/95 backdrop-blur-sm  rounded-xl shadow-xl p-1.5 border-t border-indigo-50">
                              <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-lg p-2 mb-2">
                                <SelectItem value="All Categories" className="rounded-lg hover:bg-white flex items-center gap-2 pl-2 h-9 transition-all duration-200">
                                  <span className="text-indigo-600 font-medium">All Categories</span>
                                </SelectItem>
                              </div>
                              <div className="space-y-1 px-1">
                                {eventTypes?.map((item) => (<SelectItem value={item} className="rounded-lg hover:bg-indigo-50/70 flex items-center h-9 transition-all duration-200 text-gray-700">
                                  <span className="ml-2">{item}</span>
                                </SelectItem>))}
                              </div>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Search Button */}
                        <Button onClick={getEventsByTypes} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-6 h-12 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1 hover:scale-[1.03] font-medium whitespace-nowrap w-full md:w-auto">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                          </svg>
                          Find Events
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------All Events--------------------------------------------------------- */}
          <div className="mb-12 px-4 md:px-0">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Featured Events</h2>
            </div>

            <>
              {isEventLoading ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Array(6)?.fill(null)?.map((_, index) => (
                  <Session />
                ))}
              </div> :
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <Card
                      key={event.id}
                      className={`overflow-hidden border-0 bg-gradient-to-b from-white to-purple-50/30 shadow-xl hover:shadow-purple-200/50 transition-all duration-500 ease-in-out group rounded-xl hover:-translate-y-1 hover:scale-[1.02]`}
                    >
                      {/* Enhanced image container */}
                      <div className="relative h-40 sm:h-52 overflow-hidden">
                        <img
                          src={event.eventImage}
                          alt={event.eventName}
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
                        <h3 className={`text-lg sm:text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors duration-500 line-clamp-1`}>{event.eventName}</h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.eventDescription}</p>

                        {/* Presenter info with enhanced styling */}
                        <div className={`flex flex-wrap items-center mb-4 p-2 bg-purple-50/50 rounded-lg border border-purple-100/50`}>
                          <Avatar className="h-8 w-8 border-2 border-white shadow-sm mr-2">
                            <AvatarImage src={event.presenter?.profileImage} />
                            <AvatarFallback>{event.presenter?.profileImage}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <span className="text-xs font-medium text-gray-800 block truncate">{event?.presenter?.firstName}</span>
                            <span className="text-xs text-gray-500 block truncate">{event?.presenter?.designation}</span>
                          </div>
                          <div className={`mt-2 sm:mt-0 ml-0 sm:ml-auto w-full sm:w-auto bg-white px-2 py-1 rounded-md text-xs font-medium text-purple-600 shadow-sm border border-purple-100/50 text-center`}>
                            {event._count?.joinedUsers || 0} Attending
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-5 relative z-10">

                          {!event.joined && <Button
                            onClick={() => { handleOpenEventModal({ event: event, type: event.joined ? "leave" : "join" }) }}
                            className={`flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-500 ease-in-out hover:scale-[1.03]`}
                          >
                            {event.joined ? "Leave" : "Register"}
                          </Button>}

                          <Button
                            onClick={() => {
                              setSelectedEvent(event);
                              setRegistrationSuccess(false);
                              setIsDetailsOpen(true);
                            }}
                            variant="outline"
                            className={`flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-500 ease-in-out hover:scale-[1.03] w-${event.joined ? "full" : "auto"} sm:w-auto`}
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>}
            </>
          </div>
          {/* ---------------------------------------------------------------------------------------------------------- */}
        </div>
      </main>

      {/* Custom Event Details Modal */}
      {isDetailsOpen && selectedEvent && (
        <EventDetails
          event={selectedEvent}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          onRegister={() => {
            setRegisteredEventModal(true);
            setIsDetailsOpen(false);
          }}
        />
      )}

      {registerEventModal && selectedEvent && (
        <RegisterEvent open={registerEventModal} onOpenChange={setRegisteredEventModal} event={selectedEvent} onSuccess={() => setRegistrationSuccess(true)} />
      )}

      {registrationSuccess && selectedEvent && (
        <ShowEventSuccess
          event={selectedEvent}
          open={registrationSuccess}
          onOpenChange={setRegistrationSuccess}
        />
      )}
      {leaveEventModalOpen && selectedEvent && (
        <LeaveEvent open={leaveEventModalOpen} onOpenChange={setLeaveEventModalOpen} event={selectedEvent} />
      )}
    </div>
  );
}