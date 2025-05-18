
import { useNavigate } from "react-router-dom";
import { AdminHome } from "./AdminHome"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export const Admin = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [visible, setVisible] = useState(true);

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

    return (
        <>
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
                                    <button onClick={() => navigate('/admin')} className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 transform hover:-translate-y-0.5">
                                        Admin
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
                            <div className="relative">
                                <button
                                    className="flex items-center space-x-2 p-1.5 pl-1.5 pr-4 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:scale-105 border border-indigo-100 hover:border-indigo-200"
                                    onClick={() => navigate('/user-profile')}
                                >
                                    <Avatar className="h-8 w-8 ring-2 ring-white shadow-sm">
                                        <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">John Doe</span>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden items-center justify-end col-span-2">
                            <button
                                className="p-2.5 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-600 transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:scale-105 border border-indigo-100 hover:border-indigo-200 relative mr-2"
                                onClick={() => navigate('/notifications')}
                            >
                                <span className="sr-only">View notifications</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                                </svg>
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
            <AdminHome />
        </>

    )
}