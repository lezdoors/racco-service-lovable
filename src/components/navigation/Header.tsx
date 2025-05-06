
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="h-14 w-auto">
              {isScrolled ? (
                <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
                  {/* House shape */}
                  <path d="M50 10 L90 40 V90 H10 V40 L50 10 Z" fill="#3f51b5"/>
                  {/* Roof in white */}
                  <path d="M50 10 L90 40 L50 40 L10 40 L50 10 Z" fill="#ffffff"/>
                  {/* Door */}
                  <rect x="45" y="70" width="10" height="20" fill="#1a237e"/>
                  {/* Connection line */}
                  <path d="M0 50 H40" stroke="#66bb6a" strokeWidth="5" strokeLinecap="round"/>
                  {/* Connection point */}
                  <circle cx="40" cy="50" r="6" fill="#66bb6a"/>
                  
                  {/* Logo text */}
                  <g transform="translate(105, 25)">
                    {/* First text block */}
                    <text fontFamily="'Montserrat', sans-serif" fontSize="14" fontWeight="600" fill="#1a237e" y="0">Service</text>
                    <text fontFamily="'Montserrat', sans-serif" fontSize="14" fontWeight="600" fill="#1a237e" y="18">Raccordement</text>
                    <text fontFamily="'Montserrat', sans-serif" fontSize="14" fontWeight="600" fill="#1a237e" y="36">Electricité</text>
                    
                    {/* Separator line */}
                    <line x1="110" y1="0" x2="110" y2="45" stroke="#cccccc" strokeWidth="2"/>
                    
                    {/* Second text block */}
                    <text fontFamily="'Montserrat', sans-serif" fontSize="12" fontWeight="400" fill="#3949ab" x="120" y="0">Votre partenaire</text>
                    <text fontFamily="'Montserrat', sans-serif" fontSize="12" fontWeight="400" fill="#3949ab" x="120" y="18">raccordement au réseau</text>
                    <text fontFamily="'Montserrat', sans-serif" fontSize="12" fontWeight="400" fill="#3949ab" x="120" y="36">d'électricité d'Enedis</text>
                  </g>
                </svg>
              ) : (
                <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
                  {/* House shape */}
                  <path d="M50 10 L90 40 V90 H10 V40 L50 10 Z" fill="white" opacity="0.9"/>
                  {/* Roof in contrasting color */}
                  <path d="M50 10 L90 40 L50 40 L10 40 L50 10 Z" fill="#ffffff" opacity="0.7"/>
                  {/* Door */}
                  <rect x="45" y="70" width="10" height="20" fill="white"/>
                  {/* Connection line */}
                  <path d="M0 50 H40" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                  {/* Connection point */}
                  <circle cx="40" cy="50" r="6" fill="white"/>
                  
                  {/* Logo text */}
                  <g transform="translate(105, 25)">
                    {/* First text block */}
                    <text fontFamily="'Montserrat', sans-serif" fontSize="14" fontWeight="600" fill="white" y="0">Service</text>
                    <text fontFamily="'Montserrat', sans-serif" fontSize="14" fontWeight="600" fill="white" y="18">Raccordement</text>
                    <text fontFamily="'Montserrat', sans-serif" fontSize="14" fontWeight="600" fill="white" y="36">Electricité</text>
                    
                    {/* Separator line */}
                    <line x1="110" y1="0" x2="110" y2="45" stroke="white" strokeWidth="2" opacity="0.7"/>
                    
                    {/* Second text block */}
                    <text fontFamily="'Montserrat', sans-serif" fontSize="12" fontWeight="400" fill="white" x="120" y="0">Votre partenaire</text>
                    <text fontFamily="'Montserrat', sans-serif" fontSize="12" fontWeight="400" fill="white" x="120" y="18">raccordement au réseau</text>
                    <text fontFamily="'Montserrat', sans-serif" fontSize="12" fontWeight="400" fill="white" x="120" y="36">d'électricité d'Enedis</text>
                  </g>
                </svg>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/services"
              className={`px-4 py-2 rounded-md transition-colors ${
                isScrolled
                  ? "text-enedis-gray-800 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Services
            </Link>
            <Link
              to="/process"
              className={`px-4 py-2 rounded-md transition-colors ${
                isScrolled
                  ? "text-enedis-gray-800 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Comment ça marche
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-md transition-colors ${
                isScrolled
                  ? "text-enedis-gray-800 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              À propos
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-md transition-colors ${
                isScrolled
                  ? "text-enedis-gray-800 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Contact
            </Link>
            <Button 
              asChild 
              className={isScrolled ? "bg-france-red text-white hover:bg-red-700" : "bg-white text-france-navy hover:bg-white/90"}
            >
              <Link to="/#demande">Faire une demande</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={isScrolled ? "text-enedis-gray-800" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-enedis-gray-800" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t mt-2 py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-3">
            <Link
              to="/services"
              className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Services
            </Link>
            <Link
              to="/process"
              className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Comment ça marche
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              À propos
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
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
