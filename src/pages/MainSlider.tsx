import { setSliderValue } from "@/reducers/slider";
import { RootState } from "@/store";
import { X, Home, Calendar, BookOpen, Users, User, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ConfirmLogoutModal } from "@/components/Modals/Auth/LogoutConfirm";
import { useState } from "react";


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

export const MainSlider = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { open: sidebarOpen } = useSelector((state: RootState) => state.slider);
    const [open, setOpen] = useState<boolean>(false);

    const handleNavigate = (type: string) => {
        dispatch(setSliderValue(false))
        switch (type) {
            case 'dashboard':
                navigate('/dashboard');
                break;
            case 'events':
                navigate('/events');
                break;
            case 'sessions':
                navigate('/sessions');
                break;
            case 'profile':
                navigate('/user-profile');
                break;
            case 'community':
                navigate('/community');
                break;
            default:
                break;
        }
    }

    const isDashboardActive = window.location.pathname === '/dashboard';
    const isEventsActive = window.location.pathname === '/events';
    const isSessionsActive = window.location.pathname === '/sessions';
    const isProfileActive = window.location.pathname === '/user-profile';
    const isCommunityActive = window.location.pathname === '/community';


    return (
        <div className={`fixed inset-0 z-50 transition-all duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto ' : 'opacity-0 pointer-events-none '}`}>
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ease-in-out"
                style={{ opacity: sidebarOpen ? 1 : 0 }}
                onClick={() => handleNavigate("")}
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
                    <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Orielix</h3>
                    <button
                        className="p-2 rounded-full bg-white/80 hover:bg-white text-indigo-500 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:scale-105 hover:rotate-90 group"
                        onClick={() => handleNavigate("")}
                    >
                        <X className="h-5 w-5 transition-all duration-300 ease-out group-hover:text-indigo-600" />
                    </button>
                </div>

                <div className="py-6 px-4 space-y-4 relative z-10">
                    <div className="space-y-2.5">
                        <NavItem icon={<Home className="h-5 w-5" />} text="Dashboard" active={isDashboardActive} onClick={() => handleNavigate("dashboard")} />
                        <NavItem icon={<Calendar className="h-5 w-5" />} text="Events" active={isEventsActive} onClick={() => handleNavigate("events")} />
                        <NavItem icon={<BookOpen className="h-5 w-5" />} text="Sessions" active={isSessionsActive} onClick={() => handleNavigate("sessions")} />
                        <NavItem icon={<Users className="h-5 w-5" />} text="Community" active={isCommunityActive} onClick={() => handleNavigate("community")} />
                        <NavItem icon={<User className="h-5 w-5" />} text="Profile" active={isProfileActive} onClick={() => handleNavigate("profile")} />
                        <NavItem icon={<LogOut className="h-5 w-5" />} text="Logout" onClick={() => setOpen(true)} />
                    </div>
                </div>
            </div>
            <ConfirmLogoutModal open={open} onOpenChange={setOpen} />
        </div>
    )
}