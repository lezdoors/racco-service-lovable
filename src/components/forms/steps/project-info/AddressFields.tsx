
import { useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const AddressFields = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <>
      <div>
        <Label htmlFor="address">Adresse du site</Label>
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
          <Label htmlFor="city">Ville</Label>
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
          <Label htmlFor="postalCode">Code postal</Label>
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
