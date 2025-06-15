import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const userInfo = useSelector((state: RootState) => state.userSlice);

  const { userType } = userInfo.user || {};

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('header')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  const isAdmin = userType ? userType === 'admin' || userType === 'superadmin' : false;

  return (
    <header className={`py-0 px-0 md:px-2 fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md h-16' : 'bg-white/80 backdrop-blur-sm shadow-sm h-20 md:h-24'}`}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center h-full w-full">
          <div className="flex-shrink-0 pl-2 flex items-center h-full overflow-visible">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="cursor-pointer transition-all duration-300 flex items-center justify-center overflow-visible"
            >
              <img
                src="/lovable-uploads/orielixlogo.png"
                alt="Orielix Logo"
                className={`transition-all duration-300 transform hover:scale-110 ${isScrolled ? 'h-[60px] -mt-1' : 'h-[80px] md:h-[110px] -mt-1'}`}
              />
            </Link>
          </div>

          <div className="hidden md:flex justify-center items-center">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full p-1 shadow-sm border border-indigo-100">
              <div className="flex space-x-1">
                <Link
                  to="/"
                  className={`px-5 py-2 rounded-full ${location.pathname === '/' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 transform hover:-translate-y-0.5' : 'text-indigo-700 font-medium text-sm transition-all duration-300 hover:bg-white/80 hover:shadow-sm transform hover:-translate-y-0.5'}`}
                >
                  Home
                </Link>
                {/* <Link
                  to="/about"
                  className={`px-5 py-2 rounded-full ${location.pathname === '/about' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 transform hover:-translate-y-0.5' : 'text-indigo-700 font-medium text-sm transition-all duration-300 hover:bg-white/80 hover:shadow-sm transform hover:-translate-y-0.5'}`}
                >
                  Community
                </Link>
                <Link
                  to="/team"
                  className={`px-5 py-2 rounded-full ${location.pathname === '/team' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 transform hover:-translate-y-0.5' : 'text-indigo-700 font-medium text-sm transition-all duration-300 hover:bg-white/80 hover:shadow-sm transform hover:-translate-y-0.5'}`}
                >
                  Session
                </Link> */}
                {/* {isAdmin && <Link to="/admin" className={`px-5 py-2 rounded-full 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 transform hover:-translate-y-0.5`}>
                  Admin Tool
                </Link>} */}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-end flex-shrink-0 gap-2 lg:gap-4 mr-3 lg:mr-5">
            <Link to="/login">
              <Button variant="outline" className="rounded-full px-4 lg:px-6 py-1 lg:py-2 border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 transition-all text-sm lg:text-base font-medium">
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full px-4 lg:px-6 py-1 lg:py-2 shadow-md hover:shadow-lg transition-all text-sm lg:text-base font-medium relative overflow-hidden group border-0">
                <span className="relative z-10">Register</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex justify-end col-span-1">
            <button
              className="p-2.5 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-600 transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:scale-105 border border-indigo-100 hover:border-indigo-200 relative mr-4"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMenu();
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMenu();
              }}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Toggle menu</span>
              {isMenuOpen ?
                <X className="h-5 w-5 pointer-events-none" /> :
                <Menu className="h-5 w-5 pointer-events-none" />
              }
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 ring-1 ring-white"></span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden absolute left-0 right-0 bg-white shadow-lg transition-all duration-300 ${isMenuOpen ? 'max-h-[calc(100vh-5rem)] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
            style={{ top: isScrolled ? '64px' : '80px' }}
          >
            <nav className="flex flex-col space-y-4 px-6 py-6">
              <Link
                to="/"
                className={`text-lg font-medium rounded-lg p-3 transition-all duration-300 w-full block ${location.pathname === '/' ? 'bg-purple-100 text-purple-600' : 'hover:bg-purple-50 hover:text-purple-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`text-lg font-medium rounded-lg p-3 transition-all duration-300 w-full block ${location.pathname === '/about' ? 'bg-purple-100 text-purple-600' : 'hover:bg-purple-50 hover:text-purple-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
              <Link
                to="/team"
                className={`text-lg font-medium rounded-lg p-3 transition-all duration-300 w-full block ${location.pathname === '/team' ? 'bg-purple-100 text-purple-600' : 'hover:bg-purple-50 hover:text-purple-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Session
              </Link>
              {isAdmin && <Link
                to="/team"
                className={`text-lg font-medium rounded-lg p-3 transition-all duration-300 w-full block 'bg-purple-100 text-purple-600' : 'hover:bg-purple-50 hover:text-purple-600`}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Tool
              </Link>}
              <div className="flex flex-col space-y-3 pt-4">
                <Link to="/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="border-2 w-full justify-center p-6 text-base">
                    Log in
                  </Button>
                </Link>
                <Link to="/register" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 w-full justify-center p-6 text-base relative overflow-hidden group border-0">
                    <span className="relative z-10">Register</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
