import { Card, CardContent } from "@/components/ui/card";
import { StarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function TestimonialsSection() {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [faqCurrent, setFaqCurrent] = useState(0);
  
  // Add custom animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes pulse-slow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      .animate-pulse-slow {
        animation: pulse-slow 4s ease-in-out infinite;
      }
      .carousel-perspective {
        perspective: 2000px;
        perspective-origin: center;
      }
      .carousel-item-enter {
        transform: translateZ(-200px) scale(0.85);
        opacity: 0.4;
        z-index: 0;
      }
      .carousel-item-active {
        transform: translateZ(0) scale(1);
        opacity: 1;
        z-index: 10;
        transition: all 700ms ease-out;
      }
      .carousel-item-exit {
        transform: translateZ(-200px) scale(0.85);
        opacity: 0.4;
        z-index: 0;
        transition: all 700ms ease-out;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Update current slide index when it changes
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  
  // Auto-rotate carousel
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000); // Move every 4 seconds
    
    return () => clearInterval(interval);
  }, [api]);

  const testimonials = [
    {
      name: "Janani V.",
      role: "Web Development",
      message: "Guys, honestly, Orielix workshops are next level. I learned more in 2 weeks here than college taught me in 2 years. It's skills + fun literally the perfect combo.",
      highlighted: false,
      avatar: "/avatars/janani.svg",
      rating: 5
    },
    {
      name: "Manthan Gahlot",
      role: "AI & ML",
      message: "Found my tribe at Orielix! Everyone's so chill but so damn motivated. You just keep growing without even realizing it, just by vibing with the right people.",
      highlighted: true,
      avatar: "/avatars/manthan.svg",
      rating: 5
    },
    {
      name: "Karan Golani",
      role: "Data Science",
      message: "The events here? Mad rewarding. Not those boring competitions you forget the next day. You actually solve real problems, build cool stuff, and walk out feeling like you did something real.",
      highlighted: false,
      avatar: "/avatars/karan.svg",
      rating: 5
    },
    {
      name: "Mitali Chandel",
      role: "Graphic Design",
      message: "I used to think networking was just fake LinkedIn flexing. But bro, Orielix changed that for me. Met people who are actually helping me level up for real.",
      highlighted: false,
      avatar: "/avatars/mitali.svg",
      rating: 5
    },
    {
      name: "Utkarsh Upadhyay",
      role: "Cyber Security",
      message: "If you wanna actually build skills not just collect certificates you gotta be at Orielix. It's a full vibe.",
      highlighted: false,
      avatar: "/avatars/utkarsh.svg",
      rating: 5
    },
    {
      name: "Kuldeep Sharma",
      role: "Soft Skills",
      message: "If you're serious about building skills (and yourself), Orielix is the move.",
      highlighted: false,
      avatar: "/avatars/kuldeep.svg",
      rating: 5
    },
    {
      name: "Nishant Raj",
      role: "Blockchain",
      message: "Orielix doesn't just teach you tech, they show you how to think different. Their project-based approach gets you ready for real challenges in blockchain, not just textbook stuff.",
      highlighted: false,
      avatar: "/avatars/nishant.svg",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How do I get started with Orielix?",
      answer: "Sign up for an account on our website, complete your profile, and you'll be guided through our personalized onboarding process."
    },
    {
      question: "How can I connect with other learners?",
      answer: "Join our community forums, participate in group projects, and attend our regular virtual meetups and networking events."
    },
    {
      question: "Are all Session & Events paid?",
      answer: "No, Orielix offers a mix of free and premium content. Many community events and basic sessions are completely free, while some specialized workshops and premium events may have a fee."
    },
    {
      question: "Is there a mobile app available?",
      answer: "No, Orielix is a web-based platform optimized for all devices. You can access all features directly through your browser on desktop, tablet, or mobile."
    },
    {
      question: "When will be the Community feature launching?",
      answer: "Our Community feature is scheduled to launch in the next quarter. We're currently in the final stages of development and testing to ensure the best possible experience for our users."
    }
  ];

  // Add card patterns based on current question
  const getCardPattern = (index) => {
    switch(index) {
      case 0:
        return "radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.3) 0%, transparent 40%)";
      case 1:
        return "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.3) 0%, transparent 40%)";
      case 2:
        return "radial-gradient(circle at 10% 30%, rgba(14, 165, 233, 0.3) 0%, transparent 35%)";
      case 3:
        return "radial-gradient(circle at 90% 70%, rgba(244, 114, 182, 0.3) 0%, transparent 40%)";
      case 4:
        return "radial-gradient(circle at 60% 10%, rgba(249, 115, 22, 0.3) 0%, transparent 35%)";
      default:
        return "radial-gradient(circle at 40% 90%, rgba(139, 92, 246, 0.3) 0%, transparent 40%)";
    }
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
          Hear what our <span className="text-purple-600">Community</span> says!
        </h2>
        
        <div className="mb-24 relative carousel-perspective overflow-hidden">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
              skipSnaps: false,
              dragFree: false
            }}
          >
            <CarouselContent className="py-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem 
                  key={index} 
                  className={`
                    md:basis-1/2 lg:basis-1/3 pl-4
                    ${current === index 
                      ? 'carousel-item-active' 
                      : current === (index + 1) % testimonials.length || current === (index - 1 + testimonials.length) % testimonials.length
                        ? 'carousel-item-exit'
                        : 'carousel-item-enter'
                    }
                  `}
                >
                  <div className="h-full p-1 relative overflow-hidden">
                    {/* Decorative background elements */}
                    <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-gradient-to-br from-purple-300/20 to-indigo-500/30 blur-xl"></div>
                    <div className="absolute -left-4 -bottom-4 w-20 h-20 rounded-full bg-gradient-to-tr from-violet-300/20 to-purple-500/20 blur-xl"></div>
                    
                    <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden backdrop-blur-sm">
                      <CardContent className="p-6 sm:p-8 relative z-10">
                        <div className="flex mb-4 animate-pulse-slow">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <div key={i}>
                              <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            </div>
                          ))}
                        </div>
                        
                        <p className="text-lg font-medium mb-8 text-gray-800 min-h-[120px] leading-relaxed">
                          {testimonial.message}
                        </p>
                        
                        <div className="flex items-center mt-6 group">
                          <Avatar className="h-14 w-14 border-2 border-purple-300 relative z-10">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback className={`
                              ${index % 6 === 0 ? 'bg-purple-100 text-purple-700' : ''}
                              ${index % 6 === 1 ? 'bg-indigo-100 text-indigo-700' : ''}
                              ${index % 6 === 2 ? 'bg-violet-100 text-violet-700' : ''}
                              ${index % 6 === 3 ? 'bg-pink-100 text-pink-700' : ''}
                              ${index % 6 === 4 ? 'bg-blue-100 text-blue-700' : ''}
                              ${index % 6 === 5 ? 'bg-teal-100 text-teal-700' : ''}
                            `}>
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <div className="font-bold text-lg">{testimonial.name}</div>
                            <div className="text-sm text-purple-600 font-medium">{testimonial.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Modern Carousel Controls */}
            <div className="flex justify-center items-center gap-6 mt-12">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-2 border-gray-200 h-12 w-12 shadow-sm hover:bg-purple-50 hover:border-purple-200 transition-all duration-300" 
                onClick={() => api?.scrollPrev()}
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </Button>
              
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`rounded-full transition-all duration-300 ${
                      current === index 
                        ? 'w-10 h-2 bg-purple-600' 
                        : 'w-2 h-2 bg-gray-200 hover:bg-purple-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-2 border-gray-200 h-12 w-12 shadow-sm hover:bg-purple-50 hover:border-purple-200 transition-all duration-300" 
                onClick={() => api?.scrollNext()}
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </Button>
            </div>
          </Carousel>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center">
          Frequently Asked Questions
        </h3>
        
        <div className="max-w-4xl mx-auto mb-12 md:mb-16 px-4 sm:px-6 md:px-0">
          <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm p-5 sm:p-8 md:p-12 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {/* FAQs Column */}
              <div>
                <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Questions</h4>
                <div className="space-y-2 md:space-y-3">
                  {faqs.map((faq, index) => (
                    <div 
                      key={index}
                      className={`p-3 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer ${
                        faqCurrent === index ? 'bg-black text-white' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => setFaqCurrent(index)}
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-sm sm:text-base pr-2">{faq.question}</p>
                        {faqCurrent === index && (
                          <div className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full flex-shrink-0 ${                            
                            index === 0 ? 'bg-amber-300' :
                            index === 1 ? 'bg-emerald-300' :
                            index === 2 ? 'bg-sky-300' :
                            index === 3 ? 'bg-rose-300' :
                            index === 4 ? 'bg-orange-300' : 'bg-violet-300'
                          }`}></div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                    <p className="font-medium text-sm sm:text-base">My question isn't listed here (Send us feedback)</p>
                  </div>
                </div>
              </div>
              
              {/* Answers Column */}
              <div>
                <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 mt-4 md:mt-0">Answers</h4>
                <div 
                  className={`p-5 sm:p-8 rounded-xl sm:rounded-2xl min-h-[180px] sm:min-h-[220px] transition-colors duration-500 relative overflow-hidden ${                    
                    faqCurrent === 0 ? 'bg-amber-200' :
                    faqCurrent === 1 ? 'bg-emerald-200' :
                    faqCurrent === 2 ? 'bg-sky-200' :
                    faqCurrent === 3 ? 'bg-rose-200' :
                    faqCurrent === 4 ? 'bg-orange-200' : 'bg-violet-200'
                  }`}
                  style={{ 
                    backgroundImage: getCardPattern(faqCurrent),
                    backgroundSize: '100% 100%'
                  }}
                >
                  <div className="flex gap-2 items-center mb-3 sm:mb-4">
                    <div className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full transition-colors duration-500 ${                      
                      faqCurrent === 0 ? 'bg-amber-50' :
                      faqCurrent === 1 ? 'bg-emerald-50' :
                      faqCurrent === 2 ? 'bg-sky-50' :
                      faqCurrent === 3 ? 'bg-rose-50' :
                      faqCurrent === 4 ? 'bg-orange-50' : 'bg-violet-50'
                    }`}></div>
                  </div>
                  <div className="transition-opacity duration-300 relative z-10">
                    <p className="text-sm sm:text-base mb-3 sm:mb-5 text-black/90">{faqs[faqCurrent].answer}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
