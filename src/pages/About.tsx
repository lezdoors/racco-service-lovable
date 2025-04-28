
import React from "react";
import AboutSection from "@/components/home/AboutSection";
import ComplianceSection from "@/components/home/ComplianceSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-france-navy to-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">À propos de nous</h1>
          <p className="mt-4 max-w-3xl">Découvrez qui nous sommes et comment nous pouvons vous aider dans vos projets de raccordement électrique.</p>
        </div>
      </div>
      
      <AboutSection />
      <ComplianceSection />
      
      <div className="bg-france-cream py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6">Besoin d'un raccordement ?</h2>
          <p className="mb-8 max-w-2xl mx-auto">Notre équipe d'experts est prête à vous accompagner dans toutes vos démarches de raccordement Enedis.</p>
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

export default AboutPage;
