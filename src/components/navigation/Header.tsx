
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/logo-enedis.svg" 
            alt="Enedis" 
            className="h-10 w-auto"
            onError={(e) => {
              e.currentTarget.src = "https://placeholder.co/100x40/0063AF/FFFFFF?text=ENEDIS";
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-enedis-gray-700 hover:text-enedis-blue font-medium">
            Accueil
          </Link>
          <Link to="/#services" className="text-enedis-gray-700 hover:text-enedis-blue font-medium">
            Nos Services
          </Link>
          <Link to="/#about" className="text-enedis-gray-700 hover:text-enedis-blue font-medium">
            À propos
          </Link>
          <Link to="/#contact" className="text-enedis-gray-700 hover:text-enedis-blue font-medium">
            Contact
          </Link>
          <Button 
            asChild 
            className="ml-4 bg-enedis-blue hover:bg-blue-700 text-white"
          >
            <Link to="/admin">Administration</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white py-4 px-4 border-t">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-enedis-gray-700 hover:text-enedis-blue font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/#services" 
              className="text-enedis-gray-700 hover:text-enedis-blue font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nos Services
            </Link>
            <Link 
              to="/#about" 
              className="text-enedis-gray-700 hover:text-enedis-blue font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              À propos
            </Link>
            <Link 
              to="/#contact" 
              className="text-enedis-gray-700 hover:text-enedis-blue font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button 
              asChild 
              className="bg-enedis-blue hover:bg-blue-700 text-white w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link to="/admin">Administration</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
