
import { useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/field-label";

export const AddressFields = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <>
      <div>
        <FieldLabel 
          htmlFor="address" 
          label="Adresse du site" 
          tooltip="Indiquez l'adresse précise où les travaux de raccordement doivent être réalisés. Cette adresse peut être différente de votre adresse de facturation."
          required
        />
        <Input
          id="address"
          placeholder="123 rue de la République"
          className="mt-1"
          {...register("address")}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel 
            htmlFor="city" 
            label="Ville" 
            tooltip="Indiquez la commune où se trouve le site à raccorder."
            required
          />
          <Input
            id="city"
            placeholder="Paris"
            className="mt-1"
            {...register("city")}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>
        <div>
          <FieldLabel 
            htmlFor="postalCode" 
            label="Code postal" 
            tooltip="Le code postal est nécessaire pour identifier votre secteur géographique et déterminer l'agence Enedis qui traitera votre demande."
            required
          />
          <Input
            id="postalCode"
            placeholder="75001"
            className="mt-1"
            {...register("postalCode")}
          />
          {errors.postalCode && (
            <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>
          )}
        </div>
      </div>
    </>
  );
};
