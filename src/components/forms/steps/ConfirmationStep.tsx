
import { Controller, useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { formatPrice } from "@/lib/stripe-config";

const ConfirmationStep = () => {
  const { control, watch, formState: { errors } } = useFormContext<FormData>();
  const formData = watch();
  
  const projectTypes = {
    new: "Nouvelle construction",
    renovation: "Rénovation",
    increase: "Augmentation de puissance",
  };
  
  const connectionTypes = {
    single: "Monophasé",
    three: "Triphasé",
  };
  
  const accountTypes = {
    individual: "Particulier",
    professional: "Professionnel",
    manager: "Gestionnaire d'immeuble",
  };
  
  const meterStatus = {
    new: "Nouvelle installation (pas de compteur existant)",
    existing: "Compteur existant à remplacer",
    upgrade: "Augmentation de puissance (compteur existant)",
  };

  const paymentAmount = 99; // 99€

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-enedis-gray-800">Récapitulatif de votre demande</h2>
      
      <div className="bg-gray-50 rounded-lg p-6 border">
        <h3 className="font-medium text-lg mb-4">Informations du projet</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          <div>
            <dt className="text-sm font-medium text-gray-500">Type de projet</dt>
            <dd className="mt-1 text-sm">{formData.projectType ? projectTypes[formData.projectType as keyof typeof projectTypes] : "-"}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Adresse</dt>
            <dd className="mt-1 text-sm">
              {formData.address}<br />
              {formData.postalCode} {formData.city}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Date de fin prévue</dt>
            <dd className="mt-1 text-sm">
              {formData.completionDate ? format(formData.completionDate, 'PPP', { locale: fr }) : "-"}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Puissance requise</dt>
            <dd className="mt-1 text-sm">{formData.capacity} kVA</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Type de raccordement</dt>
            <dd className="mt-1 text-sm">
              {formData.connectionType ? connectionTypes[formData.connectionType] : "-"}
            </dd>
          </div>
        </dl>

        <h3 className="font-medium text-lg mt-6 mb-4">Détails techniques</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">État actuel du compteur</dt>
            <dd className="mt-1 text-sm">
              {formData.meterStatus ? meterStatus[formData.meterStatus as keyof typeof meterStatus] : "Non spécifié"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Spécifications du bâtiment</dt>
            <dd className="mt-1 text-sm text-gray-900">{formData.buildingSpecs || "-"}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Distance au point de raccordement</dt>
            <dd className="mt-1 text-sm">{formData.connectionDistance ? `${formData.connectionDistance} mètres` : "Non spécifiée"}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Documents</dt>
            <dd className="mt-1 text-sm">{formData.documents?.length ? `${formData.documents.length} fichier(s)` : "Aucun"}</dd>
          </div>
        </dl>

        <h3 className="font-medium text-lg mt-6 mb-4">Informations du demandeur</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          <div>
            <dt className="text-sm font-medium text-gray-500">Nom</dt>
            <dd className="mt-1 text-sm">{formData.firstName} {formData.lastName}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Type de compte</dt>
            <dd className="mt-1 text-sm">
              {formData.accountType ? accountTypes[formData.accountType] : "-"}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm">{formData.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
            <dd className="mt-1 text-sm">{formData.phone}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Méthode de contact préférée</dt>
            <dd className="mt-1 text-sm">{formData.preferredContact === "email" ? "Email" : "Téléphone"}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Rendez-vous souhaité</dt>
            <dd className="mt-1 text-sm">
              {formData.appointmentDate 
                ? format(formData.appointmentDate, 'PPP', { locale: fr }) 
                : "Aucune préférence"}
            </dd>
          </div>
        </dl>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <h3 className="font-medium text-green-800 mb-2">Détails du paiement</h3>
        <p className="text-sm text-green-700 mb-2">
          Frais de dossier pour votre demande de raccordement : {formatPrice(paymentAmount)}
        </p>
        <p className="text-xs text-green-600">
          En cliquant sur "Payer et soumettre ma demande", vous serez redirigé vers notre plateforme de paiement sécurisée.
        </p>
      </div>

      <div className="border-t pt-6">
        <div className="flex items-start">
          <div className="mr-3 pt-1">
            <Controller
              name="termsAccepted"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="terms"
              className="text-sm font-medium leading-none cursor-pointer select-none"
            >
              J'accepte les conditions générales d'utilisation
            </Label>
            <p className="mt-1 text-xs text-gray-500">
              En soumettant cette demande, je certifie que les informations fournies sont exactes. J'autorise Enedis à utiliser ces informations pour traiter ma demande de raccordement électrique conformément à la politique de confidentialité.
            </p>
            {errors.termsAccepted && (
              <p className="text-red-500 text-sm mt-1">{errors.termsAccepted.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-enedis-blue bg-opacity-10 rounded-md p-4 mt-6">
        <h4 className="text-enedis-blue font-medium mb-2">Étapes suivantes</h4>
        <ol className="list-decimal list-inside text-sm space-y-2 text-gray-700">
          <li>Vous serez redirigé vers une page de paiement sécurisée.</li>
          <li>Après validation du paiement, vous recevrez un email de confirmation avec votre numéro de référence.</li>
          <li>Un conseiller Enedis examinera votre demande sous 5 jours ouvrés.</li>
          <li>Un technicien vous contactera pour planifier une visite si nécessaire.</li>
          <li>Vous recevrez une proposition technique et financière détaillée.</li>
        </ol>
      </div>
    </div>
  );
};

export default ConfirmationStep;
