
import { useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { InfoBox } from "@/components/ui/InfoBox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller } from "react-hook-form";

const TechnicalDetailsStep = () => {
  const { register, control, formState: { errors } } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-enedis-gray-800">Détails techniques</h2>

      <div>
        <Label htmlFor="meterStatus" className="required-field">État du compteur</Label>
        <Controller
          name="meterStatus"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="mt-2 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="meter-new" />
                <Label htmlFor="meter-new">Nouveau compteur</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="existing" id="meter-existing" />
                <Label htmlFor="meter-existing">Compteur existant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unknown" id="meter-unknown" />
                <Label htmlFor="meter-unknown">Je ne sais pas</Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.meterStatus && (
          <p className="text-red-500 text-sm mt-1">{errors.meterStatus.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="hasExistingConnection"
          control={control}
          render={({ field }) => (
            <Switch
              id="has-existing-connection"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="has-existing-connection">
          Un raccordement existe déjà sur le site
        </Label>
      </div>

      <div>
        <Label htmlFor="buildingSpecs" className="required-field">Description du bâtiment et des travaux</Label>
        <Textarea
          id="buildingSpecs"
          placeholder="Décrivez votre projet en détail (type de bâtiment, surface, nombre de logements, etc.)"
          className="mt-1 h-32"
          {...register("buildingSpecs")}
        />
        {errors.buildingSpecs && (
          <p className="text-red-500 text-sm mt-1">{errors.buildingSpecs.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="additionalNotes">Remarques complémentaires</Label>
        <Textarea
          id="additionalNotes"
          placeholder="Informations supplémentaires qui pourraient nous aider à traiter votre demande"
          className="mt-1 h-24"
          {...register("additionalNotes")}
        />
      </div>

      <div className="bg-enedis-lightGreen p-4 rounded-md">
        <p className="text-sm text-enedis-gray-700">
          <strong>Conseil :</strong> Plus votre description est précise, plus nous pourrons vous proposer un devis adapté à vos besoins. N'hésitez pas à mentionner tous les détails techniques disponibles.
        </p>
      </div>
    </div>
  );
};

export default TechnicalDetailsStep;
