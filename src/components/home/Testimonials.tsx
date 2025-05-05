
import React from "react";
import { Star, ArrowRight } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Marie Dupont",
      role: "Propriétaire",
      content: "Le service a été impeccable. J'ai été accompagnée à chaque étape pour le raccordement de ma nouvelle maison. Tout a été plus simple et plus rapide que prévu.",
      rating: 5,
      project: "Nouvelle construction"
    },
    {
      id: 2,
      name: "Laurent Martin",
      role: "Gérant, Immobilier LM",
      content: "En tant que professionnel de l'immobilier, je cherchais un partenaire fiable pour gérer tous les raccordements de nos projets. Je recommande vivement cette équipe d'experts.",
      rating: 5,
      project: "Multiples raccordements"
    },
    {
      id: 3,
      name: "Sophie Renaud",
      role: "Architecte",
      content: "La réactivité et le professionnalisme de l'équipe sont remarquables. Ils m'ont permis de tenir mes délais pour un projet important. Un grand merci !",
      rating: 5,
      project: "Rénovation"
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-france-offWhite">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4 text-france-navy">
            Ce que nos clients disent
          </h2>
          <div className="french-divider my-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits qui ont fait confiance à notre expertise pour leur raccordement Enedis.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full transition-all hover:shadow-lg">
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-700 mb-4 flex-grow">"{testimonial.content}"</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="font-semibold">{testimonial.name}</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <span className="text-xs bg-france-blueLight text-france-blueMedium px-3 py-1 rounded-full">
                    {testimonial.project}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <a
            href="#demande"
            className="inline-flex items-center text-france-navy font-medium hover:text-blue-700 transition-colors"
          >
            Rejoignez nos clients satisfaits
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
