
import React from "react";
import { Check } from "lucide-react";
import MultiStepForm from "@/components/forms/MultiStepForm";

const RequestForm = () => {
  return (
    <section id="demande" className="py-16 bg-white relative">
      <div className="absolute inset-0 opacity-5 bg-art-nouveau"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
            Faire une demande de raccordement
          </h2>
          <div className="french-divider my-6"></div>
          <p className="text-france-navy max-w-2xl mx-auto">
            Complétez le formulaire ci-dessous pour effectuer votre demande de raccordement
            électrique. Notre équipe reste disponible durant toute la durée du processus de demande.
          </p>
          <div className="flex justify-center my-6 space-x-4">
            <div className="flex items-center">
              <div className="p-1 bg-france-navy rounded-full mr-2">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm">Conforme à la norme NF C 15-100</span>
            </div>
            <div className="flex items-center">
              <div className="p-1 bg-france-navy rounded-full mr-2">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm">Certifié CONSUEL</span>
            </div>
          </div>
        </div>

        <MultiStepForm />
      </div>
    </section>
  );
};

export default RequestForm;
