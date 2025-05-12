import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, AlertTriangle, AlertCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";

export default function FeaturesSection() {
  const [activeFeeling, setActiveFeeling] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeColor, setActiveColor] = useState("text-indigo-600");
  const [lineWidth, setLineWidth] = useState("w-[220px]");
  const [autoFillIndex, setAutoFillIndex] = useState<number | null>(null);
  
  // AURA counter animation ref and state
  const [auraCount, setAuraCount] = useState(1000);
  const countTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Handle image error loading
  const [imageError, setImageError] = useState(false);
  
  // Start counter animation when component mounts - make it continuous
  useEffect(() => {
    let currentValue = 1000;
    const minIncrement = 1;
    const maxIncrement = 3;
    const updateInterval = 800; // ms between updates
    
    countTimer.current = setInterval(() => {
      // Random increment between min and max to make it look natural
      const increment = Math.floor(Math.random() * (maxIncrement - minIncrement + 1)) + minIncrement;
      currentValue += increment;
      setAuraCount(currentValue);
    }, updateInterval);
    
    return () => {
      if (countTimer.current) clearInterval(countTimer.current);
    };
  }, []);

  // Mobile only auto-fill animation
  useEffect(() => {
    // Only run on mobile devices
    if (window.innerWidth < 768) {
      let currentIndex = 0;
      const feelings = ["Lost", "Distracted", "Inconsistent"];
      const colors = ["text-red-500", "text-amber-500", "text-blue-500"];
      const widths = ["w-[100px]", "w-[180px]", "w-[220px]"];
      
      // Function to update the active feeling
      const updateFeeling = () => {
        setActiveFeeling(feelings[currentIndex].toLowerCase());
        setActiveColor(colors[currentIndex]);
        setLineWidth(widths[currentIndex]);
        setAutoFillIndex(currentIndex);
        
        currentIndex = (currentIndex + 1) % feelings.length;
      };
      
      // Start with the first feeling
      updateFeeling();
      
      // Set up the interval for continuous loop
      const interval = setInterval(() => {
        updateFeeling();
      }, 1600);
      
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  // Animation classes for the middle circle
  const animationClasses = {
    spinSlow: "animate-[spin_20s_linear_infinite]",
    spinSlower: "animate-[spin_40s_linear_infinite]",
    spinReverseSlower: "animate-[spin_50s_linear_infinite_reverse]",
    pulseSlow: "animate-[pulse_4s_ease-in-out_infinite]",
    pulseSlowReverse: "animate-[pulse_5s_ease-in-out_infinite]",
    float: "animate-[bounce_6s_ease-in-out_infinite]",
    fadeInSlideUp: "animate-[fadeInUp_0.5s_ease-out_forwards]",
    blobPulse: "animate-[blobPulse_7s_ease-in-out_infinite]",
    textShine: "animate-[textShine_3s_linear_infinite]",
    floatSlow: "animate-[floatSlow_5s_ease-in-out_infinite]",
    auraPulse: "animate-[auraPulse_2s_ease-in-out_infinite]"
  };

  const challengeCards = [
    {
      title: "Lost",
      description: "Struggling to find direction in your learning journey",
      icon: <HelpCircle className="h-12 w-12 text-red-500" />,
      color: "bg-red-50 border-red-200",
      hoverColor: "hover:bg-red-100",
      activeColor: "bg-red-100 border-red-300",
      iconColor: "text-purple-600",
      textColor: "text-red-500",
      lineWidth: "w-[100px]"
    },
    {
      title: "Distracted",
      description: "Having trouble focusing on what truly matters",
      icon: <AlertTriangle className="h-12 w-12 text-amber-500" />,
      color: "bg-amber-50 border-amber-200",
      hoverColor: "hover:bg-amber-100",
      activeColor: "bg-amber-100 border-amber-300", 
      iconColor: "text-indigo-600",
      textColor: "text-amber-500",
      lineWidth: "w-[180px]"
    },
    {
      title: "Inconsistent",
      description: "Finding it hard to maintain regular learning habits",
      icon: <AlertCircle className="h-12 w-12 text-blue-500" />,
      color: "bg-blue-50 border-blue-200",
      hoverColor: "hover:bg-blue-100",
      activeColor: "bg-blue-100 border-blue-300",
      iconColor: "text-violet-600",
      textColor: "text-blue-500",
      lineWidth: "w-[220px]"
    }
  ];

  const offerings = [
    {
      title: "Collaborative Community",
      description: "Join and explore communities from 10+ different domains.",
      image: "/images/offerings/community-icon.png",
      position: "top-left"
    },
    {
      title: "Innovative Workshops",
      description: "Real practical workshop from present industry curriculum.",
      image: "/images/offerings/workshop-icon.png",
      position: "top-right"
    },
    {
      title: "Rewarding Events",
      description: "Solve, build and win through top industry events.",
      image: "/images/offerings/innovative-icon.png",
      position: "bottom-left"
    },
    {
      title: "Real Networking",
      description: "Collaborate with people on projects, discussions and workshops to expand network.",
      image: "/images/offerings/networking-icon.png",
      position: "bottom-right"
    }
  ];

  return (
    <section className="py-12 pt-10 md:pt-16 px-4 md:px-12 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 md:px-4 md:py-2 rounded-full mb-12 md:mb-20 animate-fade-in shadow-sm text-sm md:text-base">
            <AlertCircle className="h-4 w-4 md:h-5 md:w-5" />
            <span className="font-medium">Common Challenges</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-16 md:mb-24 text-center flex flex-wrap justify-center items-center gap-2 md:gap-4 leading-relaxed">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-indigo-600 px-1">WAIT! Do you feel</span>
            <span className="relative inline-block min-w-[200px] md:min-w-[280px] pb-2 px-2 text-center">
              <span className={activeFeeling ? `${activeColor} block font-extrabold` : "opacity-0 block"} aria-hidden={!activeFeeling}>
                {activeFeeling || "placeholder"}
              </span>
              <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-2 md:h-3 bg-purple-600 rounded-full shadow-md transition-all duration-300 ${lineWidth}`}></span>
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-indigo-600 px-1 relative z-10 pb-4">in your journey?</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {challengeCards.map((card, index) => (
            <div 
              key={index} 
              className={`h-full group transition-all duration-500 ${(activeIndex === index || autoFillIndex === index) ? 'scale-102 md:scale-105' : 'scale-100'}`}
              onMouseEnter={() => {
                if (window.innerWidth >= 768) { // Only apply on desktop
                  setActiveFeeling(card.title.toLowerCase());
                  setActiveIndex(index);
                  setActiveColor(card.textColor);
                  setLineWidth(card.lineWidth);
                }
              }}
              onMouseLeave={() => {
                if (window.innerWidth >= 768) { // Only apply on desktop
                  setActiveFeeling("");
                  setActiveIndex(null);
                  setActiveColor("text-indigo-600");
                  setLineWidth("w-[220px]");
                }
              }}
              onClick={() => {
                // Add touch functionality for mobile
                if (window.innerWidth >= 768) { // Only apply on desktop
                  if (activeIndex !== index) {
                    setActiveFeeling(card.title.toLowerCase());
                    setActiveIndex(index);
                    setActiveColor(card.textColor);
                    setLineWidth(card.lineWidth);
                  } else {
                    setActiveFeeling("");
                    setActiveIndex(null);
                    setActiveColor("text-indigo-600");
                    setLineWidth("w-[220px]");
                  }
                }
              }}
            >
              <Card 
                className={`overflow-hidden border-2 h-full transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 cursor-pointer
                  ${(activeIndex === index || autoFillIndex === index) ? card.activeColor : card.color} ${card.hoverColor}`}
              >
                <CardContent className="p-5 md:p-10 flex flex-col items-center text-center">
                  <div className={`mb-4 md:mb-6 transform transition-all duration-300 group-hover:scale-110 bg-white/50 p-3 md:p-4 rounded-full shadow-md ${activeIndex === index ? 'scale-110' : ''}`}>
                    {React.cloneElement(card.icon, { className: `h-8 w-8 md:h-12 md:w-12 ${card.icon.props.className.split(' ').filter(c => c.startsWith('text-')).join(' ')}` })}
                  </div>
                  <h3 className={`text-xl md:text-2xl font-bold mb-3 md:mb-4 transition-all duration-300 ${activeIndex === index ? card.iconColor : 'text-gray-800'}`}>
                    {card.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-700">{card.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* What We Offer Section */}
        <div className="mt-40 mb-32">
          <h2 className="text-4xl md:text-5xl font-bold mb-24 text-center">
            What We <span className="text-purple-600">Offer</span> <span className="text-black">You!</span>
          </h2>
          
          {/* Desktop version - visible only on md screens and above */}
          <div className="relative h-[650px] hidden md:block">
            {/* Middle circle with people image */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-80 md:h-80 rounded-full z-30 flex items-center justify-center group">
              <div className={`w-full h-full rounded-full overflow-hidden border-[6px] border-purple-100 shadow-xl transition-all duration-300 group-hover:shadow-purple-200/50 group-hover:scale-105 backdrop-blur-sm`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-pink-500/10 to-purple-500/10 rounded-full animate-pulse delay-1000"></div>
                <div className={`absolute inset-0 border-[3px] border-purple-200/50 rounded-full ${animationClasses.spinSlow}`}></div>
                <img 
                  src="/images/offerings/people-center.png"
                  alt="Community of people" 
                  className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className={`absolute -inset-4 border-2 border-dashed border-purple-300/50 rounded-full ${animationClasses.spinSlower}`}></div>
              <div className={`absolute -inset-8 border-2 border-dotted border-indigo-300/30 rounded-full ${animationClasses.spinReverseSlower}`}></div>
            </div>
            
            {/* SVG connections */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              
              {/* Connection to top-left card */}
              <line 
                x1="38%" y1="38%" 
                x2="28%" y2="25%" 
                stroke="url(#lineGradient1)" 
                strokeWidth="2" 
                strokeDasharray="5,5"
                strokeLinecap="round"
              />
              
              {/* Connection to top-right card */}
              <line 
                x1="62%" y1="38%" 
                x2="72%" y2="25%" 
                stroke="url(#lineGradient1)" 
                strokeWidth="2" 
                strokeDasharray="5,5"
                strokeLinecap="round"
              />
              
              {/* Connection to bottom-left card */}
              <line 
                x1="38%" y1="62%" 
                x2="28%" y2="75%" 
                stroke="url(#lineGradient1)" 
                strokeWidth="2" 
                strokeDasharray="5,5"
                strokeLinecap="round"
              />
              
              {/* Connection to bottom-right card */}
              <line 
                x1="62%" y1="62%" 
                x2="72%" y2="75%" 
                stroke="url(#lineGradient1)" 
                strokeWidth="2" 
                strokeDasharray="5,5"
                strokeLinecap="round"
              />
              
              {/* Boundary dots */}
              <circle cx="38%" cy="38%" r="4" fill="#8B5CF6" />
              <circle cx="62%" cy="38%" r="4" fill="#8B5CF6" />
              <circle cx="38%" cy="62%" r="4" fill="#8B5CF6" />
              <circle cx="62%" cy="62%" r="4" fill="#8B5CF6" />
            </svg>
            
            {/* Offering cards in a grid layout - DESKTOP */}
            <div className="grid grid-cols-2 gap-y-36 gap-x-16 h-full">
              {/* Top Left - Collaborative Community */}
              <div className="self-start flex justify-start" style={{opacity: 0, animation: "fadeInUp 0.8s ease-out 0.1s forwards"}}>
                <div className="max-w-xs bg-gradient-to-br from-white to-yellow-100 rounded-2xl shadow-md p-6 border-2 border-yellow-300 hover:shadow-xl hover:shadow-yellow-200/50 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
                  <div className={`absolute -right-12 -top-12 w-24 h-24 bg-yellow-100/50 rounded-full blur-xl ${animationClasses.blobPulse}`}></div>
                  <div className={`absolute -left-12 -bottom-12 w-24 h-24 bg-yellow-200/50 rounded-full blur-xl ${animationClasses.blobPulse}`} style={{animationDelay: "1s"}}></div>
                  <div className="flex items-center gap-4 mb-3 relative z-10">
                    <div className="w-20 h-20 rounded-xl bg-yellow-200 flex items-center justify-center p-3 shadow-sm border border-yellow-300 group-hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-yellow-200 group-hover:to-yellow-100 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <img src="/images/offerings/community-icon.png" alt="Collaborative Community" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-yellow-600 transition-colors duration-300">Collaborative Community</h3>
                  </div>
                  <p className="text-gray-600 relative z-10">Join and explore communities from 10+ different domains.</p>
                </div>
              </div>
              
              {/* Top Right - Skill-Building Workshops */}
              <div className="self-start flex justify-end" style={{opacity: 0, animation: "fadeInUp 0.8s ease-out 0.3s forwards"}}>
                <div className="max-w-xs bg-gradient-to-br from-white to-green-100 rounded-2xl shadow-md p-6 border-2 border-green-300 hover:shadow-xl hover:shadow-green-200/50 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
                  <div className={`absolute -right-12 -top-12 w-24 h-24 bg-green-100/50 rounded-full blur-xl ${animationClasses.blobPulse}`}></div>
                  <div className={`absolute -left-12 -bottom-12 w-24 h-24 bg-green-200/50 rounded-full blur-xl ${animationClasses.blobPulse}`} style={{animationDelay: "1.5s"}}></div>
                  <div className="flex items-center gap-4 mb-3 relative z-10">
                    <div className="w-20 h-20 rounded-xl bg-green-200 flex items-center justify-center p-3 shadow-sm border border-green-300 group-hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-green-200 group-hover:to-green-100 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <img src="/images/offerings/workshop-icon.png" alt="Innovative Workshops" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-green-600 transition-colors duration-300">Innovative Workshops</h3>
                  </div>
                  <p className="text-gray-600 relative z-10">Real practical workshop from present industry curriculum.</p>
                </div>
              </div>
              
              {/* Bottom Left - Rewarding Events */}
              <div className="self-end flex justify-start" style={{opacity: 0, animation: "fadeInUp 0.8s ease-out 0.5s forwards"}}>
                <div className="max-w-xs bg-gradient-to-br from-white to-purple-100 rounded-2xl shadow-md p-6 border-2 border-purple-300 hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
                  <div className={`absolute -right-12 -top-12 w-24 h-24 bg-purple-100/50 rounded-full blur-xl ${animationClasses.blobPulse}`}></div>
                  <div className={`absolute -left-12 -bottom-12 w-24 h-24 bg-purple-200/50 rounded-full blur-xl ${animationClasses.blobPulse}`} style={{animationDelay: "2s"}}></div>
                  <div className="flex items-center gap-4 mb-3 relative z-10">
                    <div className="w-20 h-20 rounded-xl bg-purple-200 flex items-center justify-center p-3 shadow-sm border border-purple-300 group-hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-purple-200 group-hover:to-purple-100 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <img src="/images/offerings/innovative-icon.png" alt="Rewarding Events" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-purple-600 transition-colors duration-300">Rewarding Events</h3>
                  </div>
                  <p className="text-gray-600 relative z-10">Solve, build and win through top industry events.</p>
                </div>
              </div>
              
              {/* Bottom Right - Real Networking */}
              <div className="self-end flex justify-end" style={{opacity: 0, animation: "fadeInUp 0.8s ease-out 0.7s forwards"}}>
                <div className="max-w-xs bg-gradient-to-br from-white to-blue-100 rounded-2xl shadow-md p-6 border-2 border-blue-300 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
                  <div className={`absolute -right-12 -top-12 w-24 h-24 bg-blue-100/50 rounded-full blur-xl ${animationClasses.blobPulse}`}></div>
                  <div className={`absolute -left-12 -bottom-12 w-24 h-24 bg-blue-200/50 rounded-full blur-xl ${animationClasses.blobPulse}`} style={{animationDelay: "2.5s"}}></div>
                  <div className="flex items-center gap-4 mb-3 relative z-10">
                    <div className="w-20 h-20 rounded-xl bg-blue-200 flex items-center justify-center p-3 shadow-sm border border-blue-300 group-hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-blue-200 group-hover:to-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <img src="/images/offerings/networking-icon.png" alt="Real Networking" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors duration-300">Real Networking</h3>
                  </div>
                  <p className="text-gray-600 relative z-10">Collaborate with people on projects, discussions and workshops to expand network.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile version - visible only on small screens */}
          <div className="md:hidden">
            {/* Middle circle with people image - Mobile */}
            <div className="mx-auto w-64 h-64 rounded-full z-30 flex items-center justify-center group mb-12 relative">
              <div className={`w-full h-full rounded-full overflow-hidden border-[6px] border-purple-100 shadow-xl transition-all duration-300 group-hover:shadow-purple-200/50 group-hover:scale-105 backdrop-blur-sm`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-pink-500/10 to-purple-500/10 rounded-full animate-pulse delay-1000"></div>
                <div className={`absolute inset-0 border-[3px] border-purple-200/50 rounded-full ${animationClasses.spinSlow}`}></div>
                <img 
                  src="/images/offerings/people-center.png"
                  alt="Community of people" 
                  className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className={`absolute -inset-4 border-2 border-dashed border-purple-300/50 rounded-full ${animationClasses.spinSlower}`}></div>
              <div className={`absolute -inset-8 border-2 border-dotted border-indigo-300/30 rounded-full ${animationClasses.spinReverseSlower}`}></div>
            </div>
            
            {/* Offering cards in a grid layout - MOBILE */}
            <div className="flex flex-col gap-6">
              {/* Collaborative Community */}
              <div className="mx-auto w-full max-w-sm" style={{opacity: 0, animation: "fadeInUp 0.8s ease-out 0.1s forwards"}}>
                <div className="bg-gradient-to-br from-white to-yellow-100 rounded-2xl shadow-md p-5 border-2 border-yellow-300 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-200/50 hover:-translate-y-2 group relative overflow-hidden">
                  <div className={`absolute -right-12 -top-12 w-24 h-24 bg-yellow-100/50 rounded-full blur-xl ${animationClasses.blobPulse}`}></div>
                  <div className={`absolute -left-12 -bottom-12 w-24 h-24 bg-yellow-200/50 rounded-full blur-xl ${animationClasses.blobPulse}`} style={{animationDelay: "1s"}}></div>
                  <div className="flex items-center gap-3 mb-2 relative z-10">
                    <div className="w-16 h-16 rounded-xl bg-yellow-200 flex items-center justify-center p-3 shadow-sm border border-yellow-300 transition-all duration-300 group-hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-yellow-200 group-hover:to-yellow-100 group-hover:scale-110 group-hover:rotate-6">
                      <img src="/images/offerings/community-icon.png" alt="Collaborative Community" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-yellow-600 transition-colors duration-300">Collaborative Community</h3>
                  </div>
                  <p className="text-gray-600 relative z-10 text-sm">Join and explore communities from 10+ different domains.</p>
                </div>
              </div>
              
              {/* Innovative Workshops */}
              <div className="mx-auto w-full max-w-sm" style={{opacity: 0, animation: "fadeInUp 0.8s ease-out 0.3s forwards"}}>
                <div className="bg-gradient-to-br from-white to-green-100 rounded-2xl shadow-md p-5 border-2 border-green-300 transition-all duration-300 hover:shadow-xl hover:shadow-green-200/50 hover:-translate-y-2 group relative overflow-hidden">
                  <div className={`absolute -right-12 -top-12 w-24 h-24 bg-green-100/50 rounded-full blur-xl ${animationClasses.blobPulse}`}></div>
                  <div className={`absolute -left-12 -bottom-12 w-24 h-24 bg-green-200/50 rounded-full blur-xl ${animationClasses.blobPulse}`} style={{animationDelay: "1.5s"}}></div>
                  <div className="flex items-center gap-3 mb-2 relative z-10">
                    <div className="w-16 h-16 rounded-xl bg-green-200 flex items-center justify-center p-3 shadow-sm border border-green-300 transition-all duration-300 group-hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-green-200 group-hover:to-green-100 group-hover:scale-110 group-hover:rotate-6">
                      <img src="/images/offerings/workshop-icon.png" alt="Innovative Workshops" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-green-600 transition-colors duration-300">Innovative Workshops</h3>
                  </div>
                  <p className="text-gray-600 relative z-10 text-sm">Real practical workshop from present industry curriculum.</p>
                </div>
              </div>
              
              {/* Rewarding Events */}
              <div className="mx-auto w-full max-w-sm" style={{opacity: 0, animation: "fadeInUp 0.8s ease-out 0.5s forwards"}}>
                <div className="bg-gradient-to-br from-white to-purple-100 rounded-2xl shadow-md p-5 border-2 border-purple-300 transition-all duration-300 hover:shadow-xl hover:shadow-purple-200/50 hover:-translate-y-2 group relative overflow-hidden">
                  <div className={`absolute -right-12 -top-12 w-24 h-24 bg-purple-100/50 rounded-full blur-xl ${animationClasses.blobPulse}`}></div>
                  <div className={`absolute -left-12 -bottom-12 w-24 h-24 bg-purple-200/50 rounded-full blur-xl ${animationClasses.blobPulse}`} style={{animationDelay: "2s"}}></div>
                  <div className="flex items-center gap-3 mb-2 relative z-10">
                    <div className="w-16 h-16 rounded-xl bg-purple-200 flex items-center justify-center p-3 shadow-sm border border-purple-300 transition-all duration-300 group-hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-purple-200 group-hover:to-purple-100 group-hover:scale-110 group-hover:rotate-6">
                      <img src="/images/offerings/innovative-icon.png" alt="Rewarding Events" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-purple-600 transition-colors duration-300">Rewarding Events</h3>
                  </div>
                  <p className="text-gray-600 relative z-10 text-sm">Solve, build and win through top industry events.</p>
                </div>
              </div>
              
              {/* Real Networking */}
              <div className="mx-auto w-full max-w-sm" style={{opacity: 0, animation: "fadeInUp 0.8s ease-out 0.7s forwards"}}>
                <div className="bg-gradient-to-br from-white to-blue-100 rounded-2xl shadow-md p-5 border-2 border-blue-300 transition-all duration-300 hover:shadow-xl hover:shadow-blue-200/50 hover:-translate-y-2 group relative overflow-hidden">
                  <div className={`absolute -right-12 -top-12 w-24 h-24 bg-blue-100/50 rounded-full blur-xl ${animationClasses.blobPulse}`}></div>
                  <div className={`absolute -left-12 -bottom-12 w-24 h-24 bg-blue-200/50 rounded-full blur-xl ${animationClasses.blobPulse}`} style={{animationDelay: "2.5s"}}></div>
                  <div className="flex items-center gap-3 mb-2 relative z-10">
                    <div className="w-16 h-16 rounded-xl bg-blue-200 flex items-center justify-center p-3 shadow-sm border border-blue-300 transition-all duration-300 group-hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-blue-200 group-hover:to-blue-100 group-hover:scale-110 group-hover:rotate-6">
                      <img src="/images/offerings/networking-icon.png" alt="Real Networking" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors duration-300">Real Networking</h3>
                  </div>
                  <p className="text-gray-600 relative z-10 text-sm">Collaborate with people on projects, discussions and workshops to expand network.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Add text after all cards */}
          <div className="text-center mt-20 relative">
            {/* Gaming theme decorative elements */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-72 h-1.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-70"></div>
            
            <div className="relative inline-block">
              <p className="text-3xl font-medium text-gray-700 mb-3">With the most <span className="relative">
                <span className="relative z-10 text-purple-600 font-extrabold px-1">Advanced</span>
                <span className="absolute -inset-1 bg-purple-200/50 rounded-md -skew-y-1 blur-[3px]"></span>
              </span></p>
              
              <div className="relative">
                <p className="text-5xl sm:text-6xl font-black pb-3 relative z-10 tracking-wide">
                  <span className="inline-block transform hover:scale-105 transition-transform duration-300 cursor-default relative">
                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-transparent bg-clip-text" style={{backgroundSize: "200% auto", animation: "textShine 3s linear infinite"}}>Gamified Experience</span>
                  </span>
                </p>
                
                {/* Multiple decorative lines for emphasis */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-36 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-70"></div>
                <div className="absolute -bottom-11 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-40"></div>
              </div>
            </div>
            
            {/* Add ready text */}
            <div className="mt-16 relative">
              <p className="text-4xl font-bold text-center">
                So, are you <span className="relative inline-block">
                  <span className="relative z-10 text-indigo-600">ready!!?</span>
                </span>
              </p>
              <p className="text-3xl font-bold text-center mt-6 mb-16">
                To lift your real <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 font-extrabold tracking-wider">AURA</span>
              </p>
              
              {/* AURA Points Counter */}
              <div className="flex flex-col items-center justify-center mt-12 mb-16 relative">
                
                {/* Modern counter display with rotating boundary */}
                <div className="relative inline-block p-2 sm:p-4">
                  {/* Animated rotating boundary box - reduced size for mobile */}
                  <div className="absolute -inset-3 sm:-inset-5 rounded-3xl border-[2px] border-purple-400/50 bg-gradient-to-r from-indigo-500/5 via-purple-500/10 to-indigo-500/5 transform origin-center animate-[spin_15s_linear_infinite]"></div>
                  <div className="absolute -inset-1.5 sm:-inset-3 rounded-2xl border-[1.5px] border-indigo-400/60 bg-transparent transform origin-center animate-[spin_20s_linear_infinite_reverse]"></div>
                  
                  {/* Counter content */}
                  <div className="flex items-center gap-3 sm:gap-6 bg-gradient-to-r from-indigo-500/10 via-purple-500/15 to-indigo-500/10 py-4 sm:py-6 px-5 sm:px-8 rounded-2xl backdrop-blur-sm transform hover:scale-105 transition-all duration-500 z-10 relative group">
                    {/* AURA Icon - larger size */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 transition-transform duration-500 group-hover:-translate-y-3 group-hover:scale-110">
                      {/* Glow effect */}
                      <div className="absolute -inset-3 rounded-full blur-md bg-purple-500/30 animate-pulse"></div>
                      
                      {/* Icon image with fallback */}
                      {!imageError ? (
                        <img 
                          src={`/lovable-uploads/aura-icon.png?t=${Date.now()}`}
                          alt="AURA Points" 
                          className="w-full h-full object-contain relative z-10"
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        <img 
                          src={`/images/offerings/aura-icon.png?t=${Date.now()}`}
                          alt="AURA Points" 
                          className="w-full h-full object-contain relative z-10"
                        />
                      )}
                    </div>
                    
                    {/* Modern counter digits */}
                    <div className="relative group">
                      <div className="text-6xl sm:text-7xl font-bold relative" data-value="1000">
                        <span className="sr-only">Your current AURA points</span>
                        
                        {/* Larger counter with modern styling */}
                        <div className="flex items-center relative">
                          {/* Counter text */}
                          <div className="relative">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 font-black relative">
                              {auraCount}
                            </span>
                            
                            {/* Shimmering effect */}
                            <div className="absolute inset-0 bg-white/10 animate-pulse rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                          </div>
                          
                          {/* Improved indicator */}
                          <div className="ml-3 relative h-12 flex items-center">
                            <div className="relative w-8 h-8">
                              {/* Pulsing aura effect */}
                              <div className="absolute inset-0 rounded-full bg-purple-500/30 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                              <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
                              
                              {/* Sparkling star effect */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-purple-600 text-xl animate-pulse">✧</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Join US! button */}
            <div className="flex justify-center mt-24 mb-28">
              <Link to="/register" onClick={() => window.scrollTo(0, 0)}>
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full px-10 py-7 text-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    Join us!
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add animation styles with style tag */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes blobPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.3;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.5;
            }
          }
          
          @keyframes glowPulse {
            0%, 100% {
              filter: drop-shadow(0 0 2px rgba(139, 92, 246, 0.7));
            }
            50% {
              filter: drop-shadow(0 0 5px rgba(139, 92, 246, 0.9));
            }
          }
          
          @keyframes textShine {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          
          @keyframes floatSlow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-6px);
            }
          }
          
          @keyframes progressBar {
            0% { width: 0; }
            100% { width: 100%; }
          }
          
          @keyframes auraPulse {
            0%, 100% { 
              opacity: 0.8;
              box-shadow: 0 0 15px rgba(109, 40, 217, 0.7);
            }
            50% { 
              opacity: 1;
              box-shadow: 0 0 25px rgba(109, 40, 217, 0.9), 0 0 40px rgba(139, 92, 246, 0.5);
            }
          }
        `
      }} />
    </section>
  );
}
