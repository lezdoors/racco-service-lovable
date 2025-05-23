
import React, { useState, useEffect } from "react";
import { Menu, X, PhoneCall } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LogoAnimation from "../brand/LogoAnimation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Phone number for the call button
  const phoneNumber = "+33145678900"; // Replace with your actual phone number

  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white shadow-sm py-2" : "bg-transparent py-3"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="h-12 w-auto">
              <LogoAnimation variant={isScrolled ? "full" : "white"} className="h-12" animate={true} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <a 
              href={`tel:${phoneNumber}`} 
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                isScrolled 
                  ? "bg-[#1EAEDB] text-white hover:bg-[#1a9cc7]" 
                  : "bg-white text-[#1EAEDB] hover:bg-white/90"
              }`}
            >
              <PhoneCall size={18} />
              <span>Appelez-nous</span>
            </a>
            
            <Link to="/contact" className={`px-4 py-2 rounded-md transition-colors ${
              isScrolled ? "text-enedis-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/10"
            }`}>
              Contact
            </Link>
            <Button asChild className={
              isScrolled ? "bg-france-red text-white hover:bg-red-700" : "bg-white text-france-navy hover:bg-white/90"
            }>
              <Link to="/#demande">Faire une demande</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? 
              <X className={isScrolled ? "text-enedis-gray-800" : "text-white"} /> : 
              <Menu className={isScrolled ? "text-enedis-gray-800" : "text-white"} />
            }
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t mt-2 py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-3">
            <a 
              href={`tel:${phoneNumber}`} 
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#1EAEDB] text-white hover:bg-[#1a9cc7] transition-colors"
            >
              <PhoneCall size={18} />
              <span>Appelez-nous</span>
            </a>
            <Link to="/services" className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
              Services
            </Link>
            <Link to="/process" className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
              Comment ça marche
            </Link>
            <Link to="/about" className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
              À propos
            </Link>
            <Link to="/contact" className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
              Contact
            </Link>
            <Button asChild className="bg-france-red text-white hover:bg-red-700 w-full">
              <Link to="/#demande">Faire une demande</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
