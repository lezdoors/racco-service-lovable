
import React from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-france-navy to-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-haussmann"></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4">
            Votre raccordement Enedis Simple, rapide et efficace
          </h1>
          <div className="french-divider my-6"></div>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Facilitez votre raccordement électrique avec notre service professionnel. Nous gérons toutes les démarches administratives pour vous.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#demande"
              className="fr-button-primary px-8 py-3 rounded-md font-medium transition-colors flex items-center"
            >
              Faire une demande <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#services"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              Nos services
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center">
              <span className="bg-white/20 p-1.5 rounded-full mr-2"></span>
              <span>Certifié CONSUEL</span>
            </div>
            <div className="flex items-center">
              <span className="bg-white/20 p-1.5 rounded-full mr-2"></span>
              <span>Réponse en 24h</span>
            </div>
            <div className="flex items-center">
              <span className="bg-white/20 p-1.5 rounded-full mr-2"></span>
              <span>Satisfaction garantie</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
