
import React from "react";

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
            Simple, rapide et transparent. Demandez votre raccordement électrique en quelques clics.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#demande"
              className="fr-button-primary px-8 py-3 rounded-md font-medium transition-colors"
            >
              Faire une demande
            </a>
            <a
              href="#services"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              Nos services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
