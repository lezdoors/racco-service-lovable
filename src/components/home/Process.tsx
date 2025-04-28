
import React from "react";

const Process = () => {
  const processSteps = [
    {
      step: "01",
      title: "Soumission de la demande",
      description:
        "Remplissez le formulaire en ligne avec les détails de votre projet et vos coordonnées.",
    },
    {
      step: "02",
      title: "Étude technique",
      description:
        "Nos experts analysent votre demande et évaluent les besoins techniques spécifiques.",
    },
    {
      step: "03",
      title: "Proposition technique et financière",
      description:
        "Vous recevez un devis détaillé et personnalisé pour votre raccordement.",
    },
    {
      step: "04",
      title: "Travaux de raccordement",
      description: "Nos techniciens réalisent les travaux selon le planning convenu.",
    },
    {
      step: "05",
      title: "Mise en service",
      description:
        "Une fois les travaux terminés, nous procédons à la mise en service de votre raccordement.",
    },
  ];

  return (
    <section id="process" className="py-16 bg-france-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
            Comment ça marche
          </h2>
          <p className="text-france-navy max-w-2xl mx-auto">
            Le processus de raccordement électrique avec Enedis est simple et transparent. Découvrez
            les étapes clés pour réaliser votre projet.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 relative">
            <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-france-navy opacity-20 hidden md:block"></div>

            {processSteps.map((item, index) => (
              <div key={index} className="flex">
                <div className="mr-8">
                  <div className="w-16 h-16 bg-france-navy text-white rounded-full flex items-center justify-center font-bold text-xl relative z-10">
                    {item.step}
                  </div>
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-playfair font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
