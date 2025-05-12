import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  HomeIcon as Home,
  CalendarIcon as Calendar,
  BookOpenIcon as BookOpen,
  UsersIcon as Users,
  UserIcon as User,
  BellIcon as Bell,
  LogOut,
  X,
  Settings,
  Camera,
  Edit as EditIcon,
  Award,
  Star,
  Heart,
  MessageSquare,
  Image,
  FileText,
  Mail,
  Phone,
  MapPin,
  Link,
  Save as SaveIcon,
  Plus,
  Globe,
  Linkedin,
  Github
} from 'lucide-react';
import { useDispatch } from "react-redux";
import { clearUser } from "@/reducers/me";
import { clearSessions } from "@/reducers/sessions";

// StatCard component for profile statistics
interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
}

const StatCard = ({ icon, value, label, color }: StatCardProps) => (
  <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg">
    <div className={`p-3 rounded-full ${color} mb-2 text-white`}>
      {icon}
    </div>
    <div className="text-2xl font-bold">{value.toLocaleString()}</div>
    <div className="text-sm opacity-80">{label}</div>
  </div>
);

// InterestTag component for user interests
interface InterestTagProps {
  text: string;
  onClick?: () => void;
}

const InterestTag = ({ text, onClick }: InterestTagProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 cursor-pointer transition-colors duration-300 hover:bg-white/30 text-xs md:text-sm"
    onClick={onClick}
  >
    <span className="font-medium">{text}</span>
  </motion.div>
);


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
    onClick={onClick}
    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ease-in-out group relative overflow-hidden ${active
      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-[1.01]'
      : 'hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50/80 text-indigo-800 hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.005]'
      }`}
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

export default function UserProfile() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();


  // User profile data
  const [userData, setUserData] = useState({
    name: "John Doe",
    username: "johndoe",
    role: "AI Researcher",
    bio: "AI researcher with a focus on computer vision and natural language processing. Passionate about developing ethical AI solutions that solve real-world problems.",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    portfolio: "johndoe.portfolio",
    linkedin: "johndoe",
    github: "johndoe",
    interests: ["Technology", "Startup", "Graphic Design", "UI/UX", "Editing", "Content Writing", "Game Development", "Marketing", "Animation"]
  });

  // Handle scroll for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);



  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setUserData({
      ...userData,
      [field]: e.target.value
    });
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Save profile changes
  const saveProfile = () => {
    // In a real app, you would send the updated data to an API
    setEditMode(false);
    // Show success message or notification
  };

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearSessions());
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-transparent text-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background gradient elements - Applied to entire page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-[500px] w-[500px] -top-40 -right-40 bg-purple-300/30 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute h-[600px] w-[600px] bottom-20 -left-60 bg-indigo-300/30 rounded-full blur-[100px] animate-pulse-slow opacity-70"></div>
        <div className="absolute h-[300px] w-[300px] top-1/2 right-20 bg-purple-400/20 rounded-full blur-[80px] animate-pulse-slow opacity-80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] bg-[length:20px_20px] opacity-[0.03]"></div>
      </div>

      {/* Modern Header with Glass Effect */}
      {/* Sidebar */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ease-in-out"
          style={{ opacity: sidebarOpen ? 1 : 0 }}
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar */}
        <div className={`absolute left-0 top-0 h-full w-[300px] bg-gradient-to-b from-indigo-100/95 via-purple-50/90 to-indigo-100/95 shadow-2xl backdrop-blur-sm transform transition-all duration-500 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} border-r border-indigo-200/30 rounded-r-3xl`}>
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden rounded-r-3xl">
            <div className="absolute h-40 w-40 -top-10 -right-10 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute h-60 w-60 bottom-20 -left-20 bg-indigo-300/30 rounded-full blur-3xl animate-pulse opacity-70"></div>
            <div className="absolute h-20 w-20 top-1/2 right-10 bg-purple-400/20 rounded-full blur-xl animate-pulse opacity-80"></div>
          </div>

          <div className="p-5 flex justify-between items-center border-b border-indigo-200/50 relative z-10">
            <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Navigation</h3>
            <button
              className="p-2 rounded-full bg-white/80 hover:bg-white text-indigo-500 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:scale-105 hover:rotate-90 group"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5 transition-all duration-300 ease-out group-hover:text-indigo-600" />
            </button>
          </div>

          <div className="py-6 px-4 space-y-4 relative z-10">
            <div className="space-y-2.5">
              <NavItem icon={<Home className="h-5 w-5" />} text="Dashboard" onClick={() => {
                navigate('/dashboard');
                window.scrollTo(0, 0);
                setSidebarOpen(false);
              }} />
              <NavItem icon={<Calendar className="h-5 w-5" />} text="Events" onClick={() => {
                navigate('/events');
                window.scrollTo(0, 0);
                setSidebarOpen(false);
              }} />
              <NavItem icon={<BookOpen className="h-5 w-5" />} text="Sessions" onClick={() => {
                navigate('/sessions');
                window.scrollTo(0, 0);
                setSidebarOpen(false);
              }} />
              <NavItem icon={<Users className="h-5 w-5" />} text="Community" onClick={() => {
                navigate('/community');
                window.scrollTo(0, 0);
                setSidebarOpen(false);
              }} />
              <NavItem icon={<User className="h-5 w-5" />} text="Profile" active onClick={() => {
                window.scrollTo(0, 0);
                setSidebarOpen(false);
              }} />
              <div className="md:block hidden">
                <NavItem icon={<Bell className="h-5 w-5" />} text="Notifications" onClick={() => {
                  navigate('/notifications');
                  window.scrollTo(0, 0);
                  setSidebarOpen(false);
                }} />
              </div>
              <NavItem icon={<LogOut className="h-5 w-5" />} text="Logout" onClick={() => {
                // In a real app, you would handle logout logic here
                navigate('/login');
                window.scrollTo(0, 0);
                setSidebarOpen(false);
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Header - Modern User-Friendly Design */}
      <header className={`bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-md border-b border-indigo-100 h-20 transition-all duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'} ${sidebarOpen ? 'hidden md:block' : 'block'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-3 items-center h-full w-full">
            <div className="flex-shrink-0 pl-2 flex items-center h-full overflow-visible">
              <div className="cursor-pointer transition-all duration-300 flex items-center justify-center overflow-visible">
                <img
                  src="/lovable-uploads/orielixlogo.png"
                  alt="Orielix Logo"
                  className="h-[85px] -mt-2 transition-all duration-300 transform hover:scale-105"
                />
              </div>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:flex justify-center items-center">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full p-1 shadow-sm border border-indigo-100">
                <div className="flex space-x-1">
                  <button onClick={() => navigate('/dashboard')} className="px-5 py-2 rounded-full text-indigo-700 font-medium text-sm transition-all duration-300 hover:bg-white/80 hover:shadow-sm transform hover:-translate-y-0.5">
                    Dashboard
                  </button>
                  <button onClick={() => navigate('/events')} className="px-5 py-2 rounded-full text-indigo-700 font-medium text-sm transition-all duration-300 hover:bg-white/80 hover:shadow-sm transform hover:-translate-y-0.5">
                    Events
                  </button>
                  <button onClick={() => navigate('/sessions')} className="px-5 py-2 rounded-full text-indigo-700 font-medium text-sm transition-all duration-300 hover:bg-white/80 hover:shadow-sm transform hover:-translate-y-0.5">
                    Sessions
                  </button>
                  <button onClick={() => navigate('/community')} className="px-5 py-2 rounded-full text-indigo-700 font-medium text-sm transition-all duration-300 hover:bg-white/80 hover:shadow-sm transform hover:-translate-y-0.5">
                    Community
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-end flex-shrink-0 gap-2 lg:gap-4 mr-3 lg:mr-5">
              <button
                className="p-2.5 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-600 transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:scale-105 border border-indigo-100 hover:border-indigo-200 relative"
                onClick={() => navigate('/notifications')}
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 ring-1 ring-white"></span>
              </button>
              <div className="relative">
                <button
                  className="flex items-center space-x-2 p-1.5 pl-1.5 pr-4 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:scale-105 border border-indigo-100 hover:border-indigo-200"
                >
                  <Avatar className="h-8 w-8 ring-2 ring-white shadow-sm">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">John Doe</span>
                </button>
              </div>
            </div>

            {/* Mobile View */}
            <div className="flex md:hidden items-center justify-end col-span-2">
              <button
                className="p-2.5 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-600 transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:scale-105 border border-indigo-100 hover:border-indigo-200 relative mr-2"
                onClick={() => navigate('/notifications')}
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 ring-1 ring-white"></span>
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white transition-all duration-300 ease-out shadow-md hover:shadow-lg hover:scale-105 border border-indigo-100 hover:border-indigo-200"
              >
                <span className="sr-only">Toggle menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-white border-gray-200 border-b shadow-lg md:hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {['Dashboard', 'Events', 'Sessions', 'Community'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    navigate(`/${item.toLowerCase()}`);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-purple-100 text-gray-700 hover:text-purple-700"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="pt-24 pb-12 relative z-10">
        {/* Hero Section */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-12">
              {/* Profile Image with Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="relative rounded-full p-1 bg-white shadow-xl">
                  <div className="relative group overflow-hidden rounded-full">
                    <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white">
                      <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="object-cover" />
                      <AvatarFallback className="text-3xl md:text-4xl">JD</AvatarFallback>
                    </Avatar>
                    {editMode && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                      >
                        <Camera className="h-6 w-6 md:h-8 md:w-8 text-white" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Online Status Indicator */}
                <div className="absolute bottom-3 right-3 h-4 w-4 md:h-5 md:w-5 rounded-full bg-green-500 border-4 border-white"></div>
              </motion.div>

              {/* Profile Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-1 text-center lg:text-left"
              >
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 md:gap-6">
                  <div>
                    <h1 className="text-2xl md:text-4xl font-bold text-indigo-900 mb-2">{userData.name}</h1>
                    <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 sm:gap-4">
                      <p className="text-base md:text-lg font-medium text-indigo-700">@{userData.username}</p>
                      <p className="px-3 py-1 rounded-full text-xs md:text-sm bg-indigo-100 text-indigo-600">{userData.role}</p>
                    </div>
                  </div>

                  {/* Action Buttons - Hidden on mobile, shown on desktop */}
                  <div className="hidden lg:flex gap-3 justify-center lg:justify-end">
                    {editMode ? (
                      <>
                        <Button
                          variant="outline"
                          className="rounded-full bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                          onClick={toggleEditMode}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button
                          className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                          onClick={saveProfile}
                        >
                          <SaveIcon className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                        onClick={toggleEditMode}
                      >
                        <EditIcon className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    )}
                    <Button onClick={handleLogout} className="rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
                    >Logout</Button>
                  </div>
                </div>

                {/* Contact Info Badges */}
                <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start">
                  <Badge variant="outline" className="bg-white/80 text-indigo-700 border-indigo-200 px-2 md:px-3 py-1 md:py-1.5 flex items-center gap-1 md:gap-2 rounded-full text-xs md:text-sm">
                    <Mail className="h-3 w-3 md:h-4 md:w-4" />
                    {userData.email}
                  </Badge>
                  <Badge variant="outline" className="bg-white/80 text-indigo-700 border-indigo-200 px-2 md:px-3 py-1 md:py-1.5 flex items-center gap-1 md:gap-2 rounded-full text-xs md:text-sm">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                    {userData.location}
                  </Badge>
                </div>

                {/* Action Buttons - Mobile only */}
                <div className="flex lg:hidden gap-3 justify-center mt-4">
                  {editMode ? (
                    <>
                      <Button
                        variant="outline"
                        className="rounded-full bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50 text-xs px-3 py-1"
                        onClick={toggleEditMode}
                      >
                        <X className="mr-1 h-3 w-3" />
                        Cancel
                      </Button>
                      <Button
                        className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs px-3 py-1"
                        onClick={saveProfile}
                      >
                        <SaveIcon className="mr-1 h-3 w-3" />
                        Save
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs px-3 py-1.5"
                      onClick={toggleEditMode}
                    >
                      <EditIcon className="mr-1 h-3 w-3" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 md:mb-12"
          >
            <div className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md shadow-xl border border-indigo-100/50">
              <div className="p-4 md:p-8">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="p-1.5 md:p-2 rounded-full bg-indigo-100">
                    <User className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-indigo-800">About</h2>
                </div>

                {editMode ? (
                  <Textarea
                    value={userData.bio}
                    onChange={(e) => handleInputChange(e, 'bio')}
                    className="w-full min-h-[120px] rounded-xl bg-white border-indigo-200 text-gray-700"
                  />
                ) : (
                  <p className="text-lg leading-relaxed text-gray-700">{userData.bio}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Interests Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 md:mb-12"
          >
            <div className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md shadow-xl border border-indigo-100/50">
              <div className="p-4 md:p-8">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="p-1.5 md:p-2 rounded-full bg-indigo-100">
                    <Heart className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-indigo-800">Interests</h2>
                </div>

                <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-purple-200 shadow-sm">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {userData.interests.map((interest, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-purple-50/70 hover:bg-purple-100 backdrop-blur-sm transition-all duration-300 cursor-pointer overflow-hidden group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-purple-700">{interest}</span>
                          {editMode && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2 }}
                              className="h-5 w-5 rounded-full flex items-center justify-center bg-white text-gray-500 hover:bg-red-100 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    {editMode && (
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-4 py-2 rounded-full bg-white/70 border-purple-200 hover:bg-white border-dashed border-2 cursor-pointer flex items-center justify-center"
                      >
                        <Plus className="h-5 w-5 text-purple-500 mr-2" />
                        <span className="text-sm font-medium text-gray-600">New Interest</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8 md:mb-12"
          >
            <div className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md shadow-xl border border-indigo-100/50">
              <div className="p-4 md:p-8">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="p-1.5 md:p-2 rounded-full bg-indigo-100">
                    <Link className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-indigo-800">Social Links</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${editMode ? 'bg-white border border-indigo-200' : 'bg-indigo-50/50'}`}>
                    <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                      <Globe className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    {editMode ? (
                      <Input
                        value={userData.portfolio}
                        onChange={(e) => handleInputChange(e, 'portfolio')}
                        className="flex-1 border-indigo-200 bg-white"
                        placeholder="Portfolio URL"
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Portfolio</p>
                        <p className="text-sm md:text-base font-medium text-indigo-700">{userData.portfolio}</p>
                      </div>
                    )}
                  </div>

                  <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${editMode ? 'bg-white border border-indigo-200' : 'bg-indigo-50/50'}`}>
                    <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                      <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    {editMode ? (
                      <Input
                        value={userData.linkedin}
                        onChange={(e) => handleInputChange(e, 'linkedin')}
                        className="flex-1 border-indigo-200 bg-white"
                        placeholder="LinkedIn Username"
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">LinkedIn</p>
                        <p className="text-sm md:text-base font-medium text-indigo-700">{userData.linkedin}</p>
                      </div>
                    )}
                  </div>

                  <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${editMode ? 'bg-white border border-indigo-200' : 'bg-indigo-50/50'}`}>
                    <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                      <Github className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    {editMode ? (
                      <Input
                        value={userData.github}
                        onChange={(e) => handleInputChange(e, 'github')}
                        className="flex-1 border-indigo-200 bg-white"
                        placeholder="GitHub Username"
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">GitHub</p>
                        <p className="text-sm md:text-base font-medium text-indigo-700">{userData.github}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
