import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
const CustomFooter = () => {
  return <footer className="bg-enedis-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-6">
              <img src="/brand/sre-logo-white.svg" alt="Service Raccordement Electricité" className="h-16 w-auto" />
            </div>
            <p className="mb-4 text-sm">
              Facilitateur de raccordement Enedis. Service professionnel pour tous vos besoins de raccordement électrique.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Liens utiles</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-enedis-green transition-colors">Nos services</Link></li>
              <li><Link to="/about" className="hover:text-enedis-green transition-colors">À propos</Link></li>
              <li><Link to="/process" className="hover:text-enedis-green transition-colors">Comment ça marche</Link></li>
              <li><Link to="/#demande" className="hover:text-enedis-green transition-colors">Demande de raccordement</Link></li>
              <li><Link to="/contact" className="hover:text-enedis-green transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+33 9 70 83 19 70</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>contact@raccordemnt-connect.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1" />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-enedis-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Service Raccordement Electricité. Tous droits réservés.</p>
        </div>
      </div>
    </footer>;
};
export default CustomFooter;