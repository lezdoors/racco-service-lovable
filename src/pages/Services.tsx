
import React from "react";
import Services from "@/components/home/Services";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-france-navy to-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">Nos services</h1>
          <p className="mt-4 max-w-3xl">Découvrez notre gamme complète de services de raccordement électrique et solutions sur mesure.</p>
        </div>
      </div>
      
      <Services />
      
      <div className="bg-france-cream py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6">Prêt à démarrer votre projet ?</h2>
          <p className="mb-8 max-w-2xl mx-auto">Contactez-nous dès aujourd'hui pour discuter de vos besoins spécifiques et obtenir un devis personnalisé.</p>
          <Button className="bg-france-red hover:bg-red-700 text-white" asChild size="lg">
            <Link to="/#demande" className="flex items-center">
              Faire une demande <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
