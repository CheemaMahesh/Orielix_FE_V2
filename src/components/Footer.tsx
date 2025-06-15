import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 md:pt-20 pb-6 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-8">
          <div className="text-center sm:text-left -mt-2 md:-mt-4">
            <div className="mb-2 flex justify-center sm:justify-start">
              <img
                src="/lovable-uploads/orielixlogo.png"
                alt="Orielix Logo"
                className="h-20 sm:h-24 md:h-28 w-auto invert"
              />
            </div>
            <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
              Transforming lives through connections, community and innovations.
            </p>
          </div>

          <div className="mt-2 sm:mt-0">
            <h3 className="text-lg font-bold mb-3 md:mb-4 text-center sm:text-left">Social Handles</h3>
            <ul className="space-y-2 md:space-y-3 flex flex-col items-center sm:items-start">
              <li>
                <a href="https://www.instagram.com/orielix_hub/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-flex items-center gap-2 text-sm md:text-base">
                  <Instagram className="h-4 w-4 md:h-5 md:w-5 text-purple-400" />
                  <span>@orielix_hub</span>
                </a>
              </li>
              <li>
                <a href="https://chat.whatsapp.com/EcckTCcRV7q3djOPV3cqm6" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-flex items-center gap-2 text-sm md:text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 md:h-5 md:w-5 text-purple-400">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Join Community</span>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@orielix" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-flex items-center gap-2 text-sm md:text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 md:h-5 md:w-5 text-purple-400">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/orielix/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-flex items-center gap-2 text-sm md:text-base">
                  <Linkedin className="h-4 w-4 md:h-5 md:w-5 text-purple-400" />
                  <span>Orielix</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-2 sm:mt-0">
            <h3 className="text-lg font-bold mb-3 md:mb-4 text-center sm:text-left">Contact</h3>
            <ul className="space-y-2 md:space-y-3 flex flex-col items-center sm:items-start">
              <li className="flex items-start gap-2 md:gap-3 text-sm md:text-base">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-purple-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">Jaipur, Rajasthan.</span>
              </li>
              <li className="flex items-center gap-2 md:gap-3 text-sm md:text-base">
                <Phone className="h-4 w-4 md:h-5 md:w-5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300">+91 8000676640</span>
              </li>
              <li className="flex items-center gap-2 md:gap-3 text-sm md:text-base">
                <Mail className="h-4 w-4 md:h-5 md:w-5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300">support@orielix.com</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 sm:mt-0">
            <h3 className="text-lg font-bold mb-3 md:mb-4 text-center sm:text-left">Newsletter</h3>
            <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base text-center sm:text-left">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <div className="flex gap-2 flex-col sm:flex-row">
              <Input
                placeholder="Your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 text-sm md:text-base h-10 md:h-auto"
              />
              <Button className="bg-purple-600 hover:bg-purple-700 mt-2 sm:mt-0 text-sm md:text-base h-10 md:h-auto">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-0 border-t pt-3 border-solid border-gray-800 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8">
          <p className="text-center sm:text-left text-sm text-gray-500">
            &copy; {currentYear} Orielix. All rights reserved.
          </p>
          <a
            href="https://favcy.com"
            className="no-underline text-center sm:text-right mt-4 sm:mt-0 text-gray-500 font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Supported by Favcy X BuilderX
          </a>
        </div>
      </div>
    </footer>
  );
}
