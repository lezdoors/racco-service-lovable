
import { useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/field-label";

export const CompanyField = () => {
  const { register, watch, formState: { errors } } = useFormContext<FormData>();
  const accountType = watch("accountType");
  
  // Only show company field for professional and manager account types
  if (accountType === "individual") {
    return null;
  }
  
  return (
    <div>
      <FieldLabel 
        htmlFor="company" 
        label="Nom de l'entreprise" 
        tooltip="Indiquez le nom officiel de votre entreprise ou de la société que vous représentez. Ce nom apparaîtra sur tous les documents administratifs."
        required
      />
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
