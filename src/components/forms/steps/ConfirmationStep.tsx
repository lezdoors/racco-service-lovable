
import { useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { InfoBox } from "@/components/ui/InfoBox";

const ConfirmationStep = () => {
  const { register, getValues, formState: { errors } } = useFormContext<FormData>();
  const formValues = getValues();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-enedis-gray-800">Confirmation de votre demande</h2>
      
      <div className="bg-enedis-lightBlue p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-medium text-enedis-gray-800">Récapitulatif</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium">Informations personnelles</h4>
            <p>{formValues.firstName} {formValues.lastName}</p>
            <p>{formValues.email}</p>
            <p>{formValues.phone}</p>
            {formValues.company && <p>Entreprise: {formValues.company}</p>}
          </div>
          
          <div>
            <h4 className="font-medium">Détails du projet</h4>
            <p>
              {formValues.projectType === "new_connection" && "Nouveau raccordement"}
              {formValues.projectType === "power_increase" && "Augmentation de puissance"}
              {formValues.projectType === "temporary" && "Raccordement provisoire"}
              {formValues.projectType === "renovation" && "Rénovation / Modification"}
            </p>
            <p>Adresse: {formValues.address}, {formValues.postalCode} {formValues.city}</p>
            <p>Puissance: {formValues.capacity} kVA</p>
            <p>Type: {formValues.connectionType === "single" ? "Monophasé" : "Triphasé"}</p>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium">Détails techniques</h4>
          <p className="whitespace-pre-line">{formValues.buildingSpecs}</p>
          {formValues.additionalNotes && (
            <>
              <h4 className="font-medium mt-2">Notes supplémentaires</h4>
              <p className="whitespace-pre-line">{formValues.additionalNotes}</p>
            </>
          )}
        </div>
      </div>
      
      <InfoBox
        title="Important"
        content="En soumettant ce formulaire, vous acceptez d'être contacté par notre service clientèle pour finaliser votre demande de raccordement. Un acompte de 99€ TTC sera demandé pour couvrir les frais initiaux de traitement de dossier."
        type="warning"
      />

      <div className="flex items-start space-x-2 mt-4">
        <Checkbox
          id="termsAccepted"
          {...register("termsAccepted")}
        />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="termsAccepted"
            className={errors.termsAccepted ? "text-red-500" : ""}
          >
            J'accepte les conditions générales de service et la politique de confidentialité
          </Label>
          {errors.termsAccepted && (
            <p className="text-sm font-medium text-red-500">
              {errors.termsAccepted.message}
            </p>
          )}
        </div>
      </div>
      
      <div className="border-t pt-4 mt-6">
        <p className="text-sm text-enedis-gray-600 mb-4">
          En cliquant sur "Payer et soumettre ma demande", vous serez redirigé vers notre page de paiement sécurisée.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationStep;
