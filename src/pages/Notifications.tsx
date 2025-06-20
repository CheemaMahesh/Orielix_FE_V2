import { NotificationsSkeleton } from "@/components/Skeliton/Notifications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { useAppSelector } from "@/store/tsSupport";
import {
  Bell as BellIcon,
  BookOpenIcon as BookOpen,
  CalendarIcon as Calendar,
  CheckCircle,
  ChevronRight,
  HomeIcon as Home,
  LogOut,
  User as UserIcon,
  UsersIcon as Users,
  X
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultProfle from "../Icons/defaultprofile.svg";
import { COMPLETE_PROFILE } from "@/lib/notifications";
import { useProfile } from "@/Api/Profile";
import { useCallProfileInfo } from "@/hooks/Profile";
import { MainNav } from "./MainNav";
import { MainSlider } from "./MainSlider";

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

// Notification type definition
interface Notification {
  id: string;
  type: 'message' | 'like' | 'mention' | 'follow' | 'event' | 'achievement' | 'system' | 'session';
  title: string;
  description: string;
  time: string;
  read: boolean;
  user?: {
    name: string;
    avatar: string;
    fallback: string;
  };
  action?: string;
  actionUrl?: string;
}

export default function Notifications() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { notifications: notificationsdata, loading: isLoading } = useAppSelector((state) => state.notifications);
  const userInfo = useAppSelector((state) => state.userSlice.user);
  const { markNotificationAsRead } = useProfile();
  const { getAllNotificationsByToken } = useCallProfileInfo();

  const markAsRead = async (id: string) => {
    const res = await markNotificationAsRead(id);
    if (res?.success) {
      await getAllNotificationsByToken(userInfo?.id || "");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Sidebar */}
      <MainSlider />

      {/* Header - Modern User-Friendly Design */}
      <MainNav type="notifications" />

      {/* Main content */}
      <>
        {isLoading ? (<NotificationsSkeleton />
        ) :
          <main className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Page Header */}
              <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-100 shadow-xl border border-indigo-100/50">
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute h-40 w-40 -top-10 -right-10 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute h-60 w-60 bottom-20 -left-20 bg-indigo-300/30 rounded-full blur-3xl animate-pulse opacity-70"></div>
                  <div className="absolute h-20 w-20 top-1/2 right-10 bg-purple-400/20 rounded-full blur-xl animate-pulse opacity-80"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] bg-[length:20px_20px] opacity-10"></div>
                </div>

                <div className="relative p-8 flex flex-col md:flex-row items-center gap-8 z-10">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-75 group-hover:opacity-100 blur-sm group-hover:blur transition duration-300"></div>
                    <div className="bg-white p-4 rounded-full relative shadow-xl">
                      <BellIcon className="h-12 w-12 text-indigo-600" />
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h1 className="text-3xl font-bold text-indigo-900">Notifications</h1>
                        <p className="text-indigo-700 font-medium">Stay updated with all your activities</p>
                      </div>

                      <div className="flex gap-3 justify-center md:justify-end">
                        <Button
                          variant="outline"
                          className="bg-white/80 hover:bg-white border-indigo-200 hover:border-indigo-300 text-indigo-700"
                        // onClick={markAllAsRead}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark All as Read
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications Content */}
              <div className="mt-6">
                <div className="flex flex-col gap-2">
                  {notificationsdata?.length ? notificationsdata.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 sm:p-6 hover:bg-indigo-50/50 transition-colors rounded-xl shadow duration-200 border border-solid border-indigo-100 relative ${!notification.isRead ? 'bg-indigo-50/30' : ''}`}
                    // onClick={() => markAsRead(notification.id)}
                    >
                      {!notification.isRead && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/4 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full"></span>
                      )}
                      <div className="flex items-start gap-4">

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-medium text-indigo-900 line-clamp-1">{notification.title}</h4>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-xs text-indigo-500">{formatDate(notification?.createdAt)}</span>
                              {!notification.isRead && <button
                                className="text-gray-400 hover:text-indigo-600 transition-colors"
                                onClick={(e) => markAsRead(notification.id)}
                              >
                                <X className="h-4 w-4" />
                              </button>}
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-indigo-700 line-clamp-2">{notification.description}</p>
                          {notification.type === COMPLETE_PROFILE && (
                            <div className="mt-3">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!notification.isRead) {
                                    markAsRead(notification.id);
                                  }
                                  navigate("/user-profile");
                                }}
                              >
                                Complete Profile
                                <ChevronRight className="ml-1 h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )) : null}
                </div>

              </div>
            </div>
          </main>}
      </>
    </div>
  );
}
