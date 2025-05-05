
import React from "react";
import { Check, ArrowRight } from "lucide-react";
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
            électrique. Notre équipe d'experts prendra en charge votre dossier dans les 24h.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            <div className="flex-1 min-w-[240px] bg-france-offWhite rounded-lg p-4 flex items-start">
              <div className="p-1 bg-france-navy rounded-full mr-3 mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-sm mb-1">Conforme à la norme NF C 15-100</h3>
                <p className="text-xs text-gray-600">Votre installation respectera toutes les normes en vigueur</p>
              </div>
            </div>
            
            <div className="flex-1 min-w-[240px] bg-france-offWhite rounded-lg p-4 flex items-start">
              <div className="p-1 bg-france-navy rounded-full mr-3 mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-sm mb-1">Certifié CONSUEL</h3>
                <p className="text-xs text-gray-600">Attestation de conformité garantie pour votre installation</p>
              </div>
            </div>
            
            <div className="flex-1 min-w-[240px] bg-france-offWhite rounded-lg p-4 flex items-start">
              <div className="p-1 bg-france-navy rounded-full mr-3 mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-sm mb-1">Accompagnement personnalisé</h3>
                <p className="text-xs text-gray-600">Un expert dédié pour suivre votre dossier de A à Z</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
          <MultiStepForm />
        </div>
      </div>
    </section>
  );
};

export default RequestForm;
