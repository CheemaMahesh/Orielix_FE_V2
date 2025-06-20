import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/store/tsSupport";
import {
    AlertCircle,
    Award,
    Bell as BellIcon,
    BellOff,
    BookOpenIcon as BookOpen,
    CalendarIcon as Calendar,
    Calendar as CalendarIcon,
    CheckCircle,
    ChevronRight,
    Heart,
    HomeIcon as Home,
    LogOut,
    MessageSquare,
    User as UserIcon,
    UsersIcon as Users,
    X
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultProfle from "../Icons/defaultprofile.svg"
import { NotificationsSkeleton } from "@/components/Skeliton/Notifications";

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
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeTab, setActiveTab] = useState("all");

    const { notifications: notificationsdata, loading: isLoading } = useAppSelector((state) => state.notifications);
    const userInfo = useAppSelector((state) => state.userSlice.user);

    // Notifications data related to sessions and events
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            type: "event",
            title: "Event Registration Confirmed",
            description: "You're now registered for 'Advanced Photography Techniques' on May 15, 2025. We've added it to your calendar.",
            time: "Just now",
            read: false,
            user: {
                name: "Sarah Johnson",
                avatar: "https://randomuser.me/api/portraits/women/32.jpg",
                fallback: "SJ"
            },
            action: "View Event",
            actionUrl: "/events/1"
        },
        {
            id: "2",
            type: "event",
            title: "Event Reminder",
            description: "'Creative Design Showcase' starts tomorrow at 6:00 PM. Don't forget to bring your portfolio!",
            time: "10 minutes ago",
            read: false,
            user: {
                name: "David Lee",
                avatar: "https://randomuser.me/api/portraits/men/45.jpg",
                fallback: "DL"
            },
            action: "View Details",
            actionUrl: "/events/2"
        },
        {
            id: "3",
            type: "event",
            title: "New Event Added",
            description: "'AI-Powered Art Creation' has been added to the upcoming events. It might interest you based on your preferences.",
            time: "30 minutes ago",
            read: false,
            user: {
                name: "Emily Martinez",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg",
                fallback: "EM"
            },
            action: "Register Now",
            actionUrl: "/events/3"
        },
        {
            id: "4",
            type: "event",
            title: "Event Location Changed",
            description: "The venue for 'Photography Exhibition Workshop' has changed to Central Art Gallery, 123 Main Street.",
            time: "1 hour ago",
            read: true,
            user: {
                name: "Michael Chen",
                avatar: "https://randomuser.me/api/portraits/men/22.jpg",
                fallback: "MC"
            },
            action: "View Updated Details",
            actionUrl: "/events/4"
        },
        {
            id: "5",
            type: "event",
            title: "Limited Spots Available",
            description: "Only 5 spots left for 'Motion Graphics Essentials' workshop. Secure your place now!",
            time: "3 hours ago",
            read: true,
            action: "Register Now",
            actionUrl: "/events/8"
        },
        {
            id: "6",
            type: "session",
            title: "Session Starting Soon",
            description: "Your enrolled session 'Mastering Portrait Lighting' with Sarah Johnson starts in 30 minutes.",
            time: "30 minutes ago",
            read: false,
            user: {
                name: "Sarah Johnson",
                avatar: "https://randomuser.me/api/portraits/women/32.jpg",
                fallback: "SJ"
            },
            action: "Join Now",
            actionUrl: "/sessions/1"
        },
        {
            id: "7",
            type: "session",
            title: "New Session Available",
            description: "'Composition Techniques' with David Lee has been added to the schedule. Perfect for beginners!",
            time: "2 hours ago",
            read: true,
            user: {
                name: "David Lee",
                avatar: "https://randomuser.me/api/portraits/men/45.jpg",
                fallback: "DL"
            },
            action: "Enroll Now",
            actionUrl: "/sessions/2"
        },
        {
            id: "8",
            type: "session",
            title: "Session Materials Available",
            description: "The resources for 'Advanced Photo Editing' have been uploaded. You can access them now.",
            time: "Yesterday",
            read: true,
            user: {
                name: "Alex Rodriguez",
                avatar: "https://randomuser.me/api/portraits/men/67.jpg",
                fallback: "AR"
            },
            action: "View Materials",
            actionUrl: "/sessions/3/materials"
        },
        {
            id: "9",
            type: "session",
            title: "Session Feedback Request",
            description: "Please share your feedback on 'Character Animation Workshop' to help us improve future sessions.",
            time: "2 days ago",
            read: true,
            action: "Give Feedback",
            actionUrl: "/sessions/7/feedback"
        },
        {
            id: "10",
            type: "session",
            title: "Session Rescheduled",
            description: "'Animation Principles for UI' has been rescheduled to June 15, 2025 at 5:00 PM due to presenter availability.",
            time: "3 days ago",
            read: true,
            user: {
                name: "Sophia Wang",
                avatar: "https://randomuser.me/api/portraits/women/75.jpg",
                fallback: "SW"
            },
            action: "View Updated Schedule",
            actionUrl: "/sessions/13"
        }
    ]);

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

    // Mark notification as read
    const markAsRead = (id: string) => {
        setNotifications(notifications.map(notification =>
            notification.id === id ? { ...notification, read: true } : notification
        ));
    };

    // Mark all notifications as read
    const markAllAsRead = () => {
        setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    };

    // Delete notification
    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    // Filter notifications based on active tab
    const getFilteredNotifications = () => {
        if (activeTab === "all") return notifications;
        if (activeTab === "unread") return notifications.filter(n => !n.read);
        if (activeTab === "messages") return notifications.filter(n => n.type === "message");
        if (activeTab === "mentions") return notifications.filter(n => n.type === "mention");
        if (activeTab === "system") return notifications.filter(n => n.type === "system");
        return notifications;
    };

    // Get notification icon based on type
    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "message":
                return <MessageSquare className="h-5 w-5 text-blue-500" />;
            case "like":
                return <Heart className="h-5 w-5 text-pink-500" />;
            case "mention":
                return <MessageSquare className="h-5 w-5 text-green-500" />;
            case "follow":
                return <UserIcon className="h-5 w-5 text-purple-500" />;
            case "event":
                return <CalendarIcon className="h-5 w-5 text-orange-500" />;
            case "achievement":
                return <Award className="h-5 w-5 text-yellow-500" />;
            case "system":
                return <AlertCircle className="h-5 w-5 text-gray-500" />;
            default:
                return <BellIcon className="h-5 w-5 text-indigo-500" />;
        }
    };

    // Count unread notifications
    const unreadCount = notifications.filter(n => !n.read).length;

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
                            <NavItem icon={<Users className="h-5 w-5" />} text="Community" onClick={() => {
                                navigate('/community');
                                setSidebarOpen(false);
                            }} />
                            <NavItem icon={<UserIcon className="h-5 w-5" />} text="Profile" onClick={() => {
                                navigate('/user-profile');
                                setSidebarOpen(false);
                            }} />
                            <div className="md:block hidden">
                                <NavItem icon={<BellIcon className="h-5 w-5" />} text="Notifications" active onClick={() => {
                                    setSidebarOpen(false);
                                }} />
                            </div>
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                                </svg>
                                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 ring-1 ring-white"></span>
                            </button>
                            <div className="relative" onClick={() => navigate('/user-profile')}>
                                <button
                                    className="flex items-center space-x-2 p-1.5 pl-1.5 pr-4 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:scale-105 border border-indigo-100 hover:border-indigo-200"
                                >
                                    <Avatar className="h-8 w-8 ring-2 ring-white shadow-sm">
                                        <AvatarImage src={userInfo?.profileImage || defaultProfle} alt="User" className="object-cover" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">{userInfo?.firstName || userInfo?.username || "User"}</span>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden items-center justify-end col-span-2">
                            <button
                                className="p-2.5 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-600 transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:scale-105 border border-indigo-100 hover:border-indigo-200 relative mr-2"
                            >
                                <span className="sr-only">View notifications</span>
                                <BellIcon className="h-5 w-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 ring-1 ring-white"></span>
                                )}
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
                                                    onClick={markAllAsRead}
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
                                <Card className="shadow-md border-indigo-100">
                                    <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                                        <CardTitle className="flex items-center gap-2 text-indigo-800">
                                            <BellIcon className="h-5 w-5" />
                                            {activeTab === "all" && "All Notifications"}
                                            {activeTab === "unread" && "Unread Notifications"}
                                            {activeTab === "messages" && "Message Notifications"}
                                            {activeTab === "mentions" && "Mentions"}
                                            {activeTab === "system" && "System Notifications"}
                                        </CardTitle>
                                        <CardDescription>
                                            {getFilteredNotifications().length} notifications
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-indigo-100">
                                            {getFilteredNotifications().length === 0 ? (
                                                <div className="py-12 flex flex-col items-center justify-center text-center">
                                                    <div className="bg-indigo-50 p-4 rounded-full mb-4">
                                                        <BellOff className="h-8 w-8 text-indigo-400" />
                                                    </div>
                                                    <h3 className="text-lg font-medium text-indigo-900 mb-1">No notifications</h3>
                                                    <p className="text-indigo-600 max-w-md">
                                                        {activeTab === "unread"
                                                            ? "You've read all your notifications. Check back later for updates."
                                                            : "You don't have any notifications in this category yet."}
                                                    </p>
                                                </div>
                                            ) : (
                                                getFilteredNotifications().map((notification) => (
                                                    <div
                                                        key={notification.id}
                                                        className={`p-4 sm:p-6 hover:bg-indigo-50/50 transition-colors duration-200 relative ${!notification.read ? 'bg-indigo-50/30' : ''}`}
                                                        onClick={() => markAsRead(notification.id)}
                                                    >
                                                        {!notification.read && (
                                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/4 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full"></span>
                                                        )}
                                                        <div className="flex items-start gap-4">
                                                            {notification.user ? (
                                                                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                                                    <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                                                                    <AvatarFallback>{notification.user.fallback}</AvatarFallback>
                                                                </Avatar>
                                                            ) : (
                                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                                                                    {getNotificationIcon(notification.type)}
                                                                </div>
                                                            )}

                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-start justify-between gap-2">
                                                                    <h4 className="text-sm font-medium text-indigo-900 line-clamp-1">{notification.title}</h4>
                                                                    <div className="flex items-center gap-2 flex-shrink-0">
                                                                        <span className="text-xs text-indigo-500">{notification.time}</span>
                                                                        <button
                                                                            className="text-gray-400 hover:text-indigo-600 transition-colors"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                deleteNotification(notification.id);
                                                                            }}
                                                                        >
                                                                            <X className="h-4 w-4" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <p className="mt-1 text-sm text-indigo-700 line-clamp-2">{notification.description}</p>

                                                                {notification.action && (
                                                                    <div className="mt-3">
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="h-8 text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                navigate(notification.actionUrl || '#');
                                                                            }}
                                                                        >
                                                                            {notification.action}
                                                                            <ChevronRight className="ml-1 h-3 w-3" />
                                                                        </Button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </main>}
            </>
        </div>
    );
}
