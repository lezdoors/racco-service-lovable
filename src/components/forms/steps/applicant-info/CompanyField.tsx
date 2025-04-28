
import { useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CompanyField = () => {
  const { register, watch, formState: { errors } } = useFormContext<FormData>();
  const accountType = watch("accountType");
  
  // Only show company field for professional and manager account types
  if (accountType === "individual") {
    return null;
  }
  
  return (
    <div>
      <Label htmlFor="company" className="required-field">Nom de l'entreprise</Label>
      <Input
        id="company"
        placeholder="Nom de votre entreprise"
        className="mt-1"
        {...register("company")}
      />
      {errors.company && (
        <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
      )}
    </div>
  );
};
