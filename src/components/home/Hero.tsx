
import React from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-france-navy to-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-haussmann"></div>
      <div className="container mx-auto px-4 py-20 md:py-28 lg:py-32 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fadeIn">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4 leading-tight">
              Simplifiez votre raccordement Enedis en toute sérénité
            </h1>
            <div className="french-divider my-6"></div>
            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
              Notre équipe d'experts s'occupe de toutes vos démarches administratives pour un raccordement électrique rapide, fiable et sans stress.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#demande"
                className="fr-button-primary px-8 py-3 rounded-md font-medium transition-colors flex items-center shadow-lg hover:shadow-xl"
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
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm animate-slideUp opacity-0" style={{ animationDelay: "0.3s" }}>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-semibold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Raccordement rapide</h3>
              <p className="opacity-80">Procédure accélérée pour votre raccordement électrique</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-semibold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Certifié CONSUEL</h3>
              <p className="opacity-80">Conformité garantie aux normes électriques en vigueur</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-semibold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Suivi personnalisé</h3>
              <p className="opacity-80">Accompagnement dédié tout au long de votre projet</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
