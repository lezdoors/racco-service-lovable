
import React from "react";
import ContactSection from "@/components/home/ContactSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-france-navy to-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">Contactez-nous</h1>
          <p className="mt-4 max-w-3xl">Nous sommes à votre disposition pour répondre à toutes vos questions.</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-playfair font-bold mb-6">Nos coordonnées</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="w-5 h-5 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold">Téléphone</h3>
                  <p className="mt-1">+33 9 70 83 19 70</p>
                  <p className="text-sm text-gray-600 mt-1">Du lundi au vendredi, 9h-18h</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-5 h-5 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="mt-1">contact@racco-service.com</p>
                  <p className="text-sm text-gray-600 mt-1">Réponse sous 24h</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold">Adresse</h3>
                  <p className="mt-1">Paris, France</p>
                </div>
              </div>
            </div>
          </div>
          
          <ContactSection />
        </div>
      </div>
      
      <div className="bg-france-cream py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6">Besoin d'un raccordement rapidement ?</h2>
          <p className="mb-8 max-w-2xl mx-auto">Faites votre demande en ligne et nous vous contacterons dans les plus brefs délais.</p>
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

export default ContactPage;
