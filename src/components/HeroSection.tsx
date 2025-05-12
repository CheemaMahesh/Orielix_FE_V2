import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const playVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section className="pt-28 pb-16 md:pb-16 px-4 md:px-12 flex flex-col items-center bg-gradient-to-b from-purple-50 to-white">
      <div className="text-center max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 md:gap-3 mb-5 md:mb-6 py-2 px-3 md:px-5 flex-wrap justify-center">
          <div className="flex -space-x-2">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Student" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white object-cover shadow-sm" />
            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Student" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white object-cover shadow-sm" />
            <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Student" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white object-cover shadow-sm" />
            <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="Student" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white object-cover shadow-sm" />
            <img src="https://randomuser.me/api/portraits/women/54.jpg" alt="Student" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white object-cover shadow-sm" />
          </div>
          <div className="flex flex-col items-start">
            <div className="flex">
              <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
            </div>
            <span className="text-base md:text-lg font-medium text-gray-800">2000+ Happy Students</span>
          </div>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-2 leading-tight md:leading-tight pb-1">
          <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Orielix:</span><span className="purple-gradient-text"> Together We Innovate</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-center max-w-3xl mx-auto mb-8 md:mb-10 text-gray-700 font-normal tracking-wide leading-relaxed px-1">
          Your first and final destination to explore, learn, connect and innovate
          {isMobile ? " in the way you love!" : <><br/>in the way you love!</>}
        </p>
        
        <div className="flex justify-center">
          <Link to="/register" onClick={() => window.scrollTo(0, 0)}>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-medium flex items-center gap-2 md:gap-3 shadow-lg hover:shadow-xl transition-all duration-300 group border-0 relative overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mt-12 md:mt-16 w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.02] hover:shadow-3xl transition-all duration-500 relative group">
        {!isPlaying ? (
          <div className="relative cursor-pointer" onClick={playVideo}>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent flex items-center justify-center z-10">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/90 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300 relative">
                <div className="w-0 h-0 border-t-[12px] md:border-t-[18px] border-t-transparent border-l-[20px] md:border-l-[30px] border-l-purple-600 border-b-[12px] md:border-b-[18px] border-b-transparent ml-1 md:ml-2 group-hover:border-l-indigo-600 transition-colors duration-300"></div>
                <div className="absolute inset-0 rounded-full bg-white opacity-30 animate-ping"></div>
              </div>
            </div>
            <div className="absolute bottom-3 md:bottom-5 left-3 md:left-5 bg-black/70 backdrop-blur-sm text-white py-2 md:py-3 px-3 md:px-5 rounded-lg text-xs md:text-sm font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg z-10">
              Watch what's Orielix!
            </div>
            <img 
              src="/lovable-uploads/orielix-hero-image.png.jpg" 
              alt="Orielix - Together We Innovate" 
              className="w-full h-auto object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video">
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube.com/embed/9-RO5a0yRh4?si=0xVR38bYdP1gue5G&autoplay=1${isMobile ? '&playsinline=1' : ''}`}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </section>
  );
}
