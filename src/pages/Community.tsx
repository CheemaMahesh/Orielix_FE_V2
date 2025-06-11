import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  X,
  HomeIcon as Home,
  CalendarIcon as Calendar,
  BookOpenIcon as BookOpen,
  UsersIcon as Users,
  Users as UserGroupIcon,
  UserIcon as User,
  LogOut
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import defaultProfle from "../Icons/defaultprofile.svg"
import { MainNav } from "./MainNav";

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

export default function Community() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const userInfo = useSelector((state: RootState) => state.userSlice.user);


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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
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
                setSidebarOpen(false);
              }} />
              <NavItem icon={<Calendar className="h-5 w-5" />} text="Events" onClick={() => {
                navigate('/events');
                setSidebarOpen(false);
              }} />
              <NavItem icon={<BookOpen className="h-5 w-5" />} text="Sessions" onClick={() => {
                navigate('/sessions');
                setSidebarOpen(false);
              }} />
              <NavItem icon={<Users className="h-5 w-5" />} text="Community" active onClick={() => {
                setSidebarOpen(false);
              }} />
              <NavItem icon={<User className="h-5 w-5" />} text="Profile" onClick={() => {
                navigate('/user-profile');
                setSidebarOpen(false);
              }} />
              <NavItem icon={<LogOut className="h-5 w-5" />} text="Logout" onClick={() => {
                // In a real app, you would handle logout logic here
                navigate('/login');
                setSidebarOpen(false);
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Header - Modern User-Friendly Design */}
      <MainNav type="community" />

      {/* Main content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-200 text-gray-800 backdrop-blur-sm rounded-2xl overflow-hidden relative">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 bg-clip-text text-transparent">
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <UserGroupIcon className="h-12 w-12 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-gray-600 max-w-md mb-6">
                  Our community page is under development. Soon you'll be able to connect with like-minded individuals, join groups, and participate in discussions.
                </p>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  onClick={() => navigate('/dashboard')}
                >
                  Back to Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
