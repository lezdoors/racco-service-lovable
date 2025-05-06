
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const CustomFooter = () => {
  return <footer className="bg-enedis-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-6">
              <svg viewBox="0 0 300 90" xmlns="http://www.w3.org/2000/svg" className="h-20 w-auto">
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
                <span>contact@raccordement-connect.com</span>
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
