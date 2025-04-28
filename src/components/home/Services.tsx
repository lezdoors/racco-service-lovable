
import React from "react";

const Services = () => {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Partenaire N°1 en France pour toutes demandes de raccordement Enedis
          </h2>
          <p className="text-france-navy max-w-2xl mx-auto">
            Confiez votre demande de Raccordement Électrique en France à des experts de confiance 
            Demande de Viabilisation | Raccordement Définitif | Raccordement Provisoire | 
            Modification de Branchement | Déplacement ou Suppression de Compteur
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Construction Neuve */}
          <div className="fr-card">
            <div className="bg-france-navy w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <h3 className="text-xl font-playfair font-semibold mb-2 text-center">
              Nouvelle construction
            </h3>
            <p className="text-gray-600 mb-4 text-center">
              Installation complète pour les constructions neuves, de la demande à la mise en service.
            </p>
            <a
              href="#demande"
              className="block text-center text-france-navy font-medium hover:underline"
            >
              En savoir plus
            </a>
          </div>

          {/* Rénovation */}
          <div className="fr-card">
            <div className="bg-france-red w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-playfair font-semibold mb-2 text-center">
              Rénovation
            </h3>
            <p className="text-gray-600 mb-4 text-center">
              Mise à niveau de votre installation électrique pour vos projets de rénovation.
            </p>
            <a
              href="#demande"
              className="block text-center text-france-red font-medium hover:underline"
            >
              En savoir plus
            </a>
          </div>

          {/* Augmentation de puissance */}
          <div className="fr-card">
            <div className="bg-france-gold w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-playfair font-semibold mb-2 text-center">
              Augmentation de puissance
            </h3>
            <p className="text-gray-600 mb-4 text-center">
              Adaptez votre puissance électrique à vos nouveaux besoins et équipements.
            </p>
            <a
              href="#demande"
              className="block text-center text-france-gold font-medium hover:underline"
            >
              En savoir plus
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
