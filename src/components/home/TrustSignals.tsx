
import React from "react";
import { Shield, CheckCircle, Clock, BadgeCheck } from "lucide-react";

const TrustSignals = () => {
  return (
    <section className="py-12 bg-france-offWhite">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-playfair font-semibold text-france-navy">
            Pourquoi nous faire confiance
          </h2>
          <div className="w-20 h-1 bg-france-gold mx-auto mt-4 mb-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md">
            <div className="w-14 h-14 rounded-full bg-france-blueLight flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-france-navy" />
            </div>
            <h3 className="font-medium text-lg mb-2">Service sécurisé</h3>
            <p className="text-gray-600">Démarches conformes aux exigences réglementaires d'Enedis</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md">
            <div className="w-14 h-14 rounded-full bg-france-peach flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-france-red" />
            </div>
            <h3 className="font-medium text-lg mb-2">100% des démarches prises en charge</h3>
            <p className="text-gray-600">Nous gérons l'intégralité de votre dossier administratif</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md">
            <div className="w-14 h-14 rounded-full bg-france-mint flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">Réponse sous 24h</h3>
            <p className="text-gray-600">Notre équipe d'experts vous répond rapidement</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md">
            <div className="w-14 h-14 rounded-full bg-france-sage flex items-center justify-center mb-4">
              <BadgeCheck className="h-6 w-6 text-enedis-green" />
            </div>
            <h3 className="font-medium text-lg mb-2">Satisfaction garantie</h3>
            <p className="text-gray-600">Des milliers de clients satisfaits de nos services</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
