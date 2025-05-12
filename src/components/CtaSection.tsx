import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CtaSection() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="md:w-1/2">
            <img 
              src="/lovable-uploads/dc09722b-7100-4976-9dbb-a6614c112545.png" 
              alt="Gamified Experience" 
              className="rounded-lg shadow-2xl w-full transform transition-all duration-500 hover:scale-105"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Experience the most Advanced Gamified Learning
            </h2>
            <p className="text-base sm:text-lg text-indigo-100 mb-6 md:mb-8">
              Are you ready to shift your learning experience to a whole new level? 
              With Orielix's advanced gamification features, learning becomes an exciting journey that keeps you motivated and engaged.
            </p>
            <div className="flex justify-center md:justify-start">
              <div>
                <Link to="/register">
                  <Button className="bg-white text-purple-700 hover:bg-purple-100 rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg flex items-center gap-2 shadow-lg group">
                    Start Your Journey
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
