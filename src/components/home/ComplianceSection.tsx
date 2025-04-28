
import React from "react";
import { FileText, Info } from "lucide-react";

const ComplianceSection = () => {
  return (
    <section className="py-8 bg-france-cream">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h4 className="text-xl font-playfair font-semibold mb-3">Réglementation et Normes</h4>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-6">
            Toutes nos installations respectent la norme NF C 15-100 et les réglementations
            françaises en vigueur.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-france-navy mr-2" />
              <span className="text-sm">Conformité RGPD</span>
            </div>
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-france-navy mr-2" />
              <span className="text-sm">Certifié CONSUEL</span>
            </div>
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-france-navy mr-2" />
              <span className="text-sm">Norme NF C 15-100</span>
            </div>
            <div className="flex items-center">
              <Info className="w-5 h-5 text-france-navy mr-2" />
              <span className="text-sm fr-tooltip">
                Disjoncteur différentiel
                <span className="fr-tooltip-text">
                  Dispositif de protection qui coupe automatiquement l'alimentation électrique en cas
                  de défaut d'isolement.
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;
