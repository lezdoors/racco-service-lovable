
import React from "react";
import Process from "@/components/home/Process";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProcessPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-france-navy to-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">Comment ça marche</h1>
          <p className="mt-4 max-w-3xl">Découvrez notre processus simple et efficace pour votre raccordement Enedis.</p>
        </div>
      </div>
      
      <Process />
      
      <div className="bg-france-cream py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6">Prêt à commencer ?</h2>
          <p className="mb-8 max-w-2xl mx-auto">Notre processus simplifié vous permet d'obtenir votre raccordement Enedis sans tracas administratifs.</p>
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

export default ProcessPage;
