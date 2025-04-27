
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LogoAnimation from "../brand/LogoAnimation";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between relative">
        <Link to="/" className="flex items-center space-x-2">
          <LogoAnimation className="h-10" animate={true} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-enedis-gray-700 hover:text-enedis-blue font-medium cursor-pointer"
          >
            Accueil
          </Link>
          <Link 
            to="/#services" 
            className="text-enedis-gray-700 hover:text-enedis-blue font-medium cursor-pointer"
          >
            Nos Services
          </Link>
          <Link 
            to="/#about" 
            className="text-enedis-gray-700 hover:text-enedis-blue font-medium cursor-pointer"
          >
            À propos
          </Link>
          <Link 
            to="/#contact" 
            className="text-enedis-gray-700 hover:text-enedis-blue font-medium cursor-pointer"
          >
            Contact
          </Link>
          <Button 
            variant="default"
            className="bg-enedis-blue hover:bg-blue-700 text-white cursor-pointer"
            asChild
          >
            <Link to="/admin">Administration</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none cursor-pointer z-50" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 bg-white py-4 px-4 border-t shadow-lg z-40">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-enedis-gray-700 hover:text-enedis-blue font-medium py-2 cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/#services" 
                className="text-enedis-gray-700 hover:text-enedis-blue font-medium py-2 cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Nos Services
              </Link>
              <Link 
                to="/#about" 
                className="text-enedis-gray-700 hover:text-enedis-blue font-medium py-2 cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                À propos
              </Link>
              <Link 
                to="/#contact" 
                className="text-enedis-gray-700 hover:text-enedis-blue font-medium py-2 cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Button 
                variant="default"
                className="bg-enedis-blue hover:bg-blue-700 text-white w-full cursor-pointer"
                asChild
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to="/admin">Administration</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
