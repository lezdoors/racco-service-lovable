
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LogoAnimation from "../brand/LogoAnimation";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between relative">
        <Link to="/" className="flex items-center space-x-2">
          <LogoAnimation className="h-10" animate={true} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="#services" 
            onClick={(e) => scrollToSection(e, "services")}
            className="text-enedis-gray-700 hover:text-enedis-blue font-medium cursor-pointer"
          >
            Nos Services
          </a>
          <a 
            href="#about" 
            onClick={(e) => scrollToSection(e, "about")}
            className="text-enedis-gray-700 hover:text-enedis-blue font-medium cursor-pointer"
          >
            À propos
          </a>
          <a 
            href="#contact" 
            onClick={(e) => scrollToSection(e, "contact")}
            className="text-enedis-gray-700 hover:text-enedis-blue font-medium cursor-pointer"
          >
            Contact
          </a>
          <Button 
            asChild
            size="lg"
            className="bg-enedis-green hover:bg-green-600 text-enedis-gray-800 font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <a
              href="#demande"
              onClick={(e) => scrollToSection(e, "demande")}
            >
              Faire ma demande
            </a>
          </Button>
          <Button 
            variant="outline"
            className="text-enedis-gray-700 hover:text-enedis-blue cursor-pointer"
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
              <Button 
                asChild
                size="lg"
                className="bg-enedis-green hover:bg-green-600 text-enedis-gray-800 font-bold shadow-lg hover:shadow-xl transition-all w-full mb-4"
              >
                <a
                  href="#demande"
                  onClick={(e) => scrollToSection(e, "demande")}
                >
                  Faire ma demande
                </a>
              </Button>
              <a 
                href="#services" 
                onClick={(e) => scrollToSection(e, "services")}
                className="text-enedis-gray-700 hover:text-enedis-blue font-medium py-2 cursor-pointer"
              >
                Nos Services
              </a>
              <a 
                href="#about" 
                onClick={(e) => scrollToSection(e, "about")}
                className="text-enedis-gray-700 hover:text-enedis-blue font-medium py-2 cursor-pointer"
              >
                À propos
              </a>
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, "contact")}
                className="text-enedis-gray-700 hover:text-enedis-blue font-medium py-2 cursor-pointer"
              >
                Contact
              </a>
              <Button 
                variant="outline"
                className="text-enedis-gray-700 hover:text-enedis-blue w-full cursor-pointer"
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
