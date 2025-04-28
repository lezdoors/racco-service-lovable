
import { Controller, useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { FieldLabel } from "@/components/ui/field-label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export const AccountTypeSelect = () => {
  const { control, formState: { errors } } = useFormContext<FormData>();
  
  const accountTypes = [
    { value: "individual", label: "Particulier" },
    { value: "professional", label: "Professionnel" },
    { value: "manager", label: "Gestionnaire d'immeuble" }
  ];

  return (
    <div>
      <FieldLabel 
        htmlFor="accountType" 
        label="Type de compte"
        tooltip="Sélectionnez le type de compte qui correspond à votre situation. Les professionnels et gestionnaires d'immeubles doivent également indiquer le nom de leur entreprise."
      />
      <Controller
        name="accountType"
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Sélectionner le type de compte" />
            </SelectTrigger>
            <SelectContent>
              {accountTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.accountType && (
        <p className="text-red-500 text-sm mt-1">{errors.accountType.message}</p>
      )}
    </div>
  );
};
