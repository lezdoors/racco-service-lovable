
import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-france-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-haussmann"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
                À propos d'Enedis
              </h2>
              <p className="mb-4">
                Enedis est le gestionnaire du réseau public de distribution d'électricité en France,
                qui dessert 95% du territoire français continental.
              </p>
              <p className="mb-4">
                Notre mission principale est d'assurer un accès à l'électricité pour tous, en
                garantissant un service de qualité et en modernisant continuellement le réseau.
              </p>
              <p>
                Avec plus de 38 000 collaborateurs et 1,4 million de kilomètres de réseau, nous
                sommes engagés dans la transition énergétique et l'innovation au service de nos 37
                millions de clients.
              </p>
            </div>

            <div className="fr-card bg-white text-france-navy p-6 rounded-lg shadow-lg">
              <div className="text-center">
                <h3 className="font-bold text-xl font-playfair mb-2">Chiffres clés</h3>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="border-r border-gray-200">
                    <div className="text-4xl font-playfair font-bold fr-number" data-value="37M">
                      37M
                    </div>
                    <p className="text-gray-600 text-sm">Clients</p>
                  </div>
                  <div>
                    <div className="text-4xl font-playfair font-bold fr-number" data-value="1,4M">
                      1,4M
                    </div>
                    <p className="text-gray-600 text-sm">km de réseau</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="border-r border-gray-200">
                    <div className="text-4xl font-playfair font-bold fr-number" data-value="38k">
                      38k
                    </div>
                    <p className="text-gray-600 text-sm">Collaborateurs</p>
                  </div>
                  <div>
                    <div className="text-4xl font-playfair font-bold fr-number" data-value="95%">
                      95%
                    </div>
                    <p className="text-gray-600 text-sm">du territoire</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
