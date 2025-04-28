
import { Controller, useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const projectTypes = [
  { value: "new_connection", label: "Nouveau raccordement" },
  { value: "power_increase", label: "Augmentation de puissance" },
  { value: "temporary", label: "Raccordement provisoire" },
  { value: "renovation", label: "Rénovation / Modification installation" }
];

export const ProjectTypeSelect = () => {
  const { control, formState: { errors } } = useFormContext<FormData>();

  return (
    <div>
      <Label htmlFor="projectType" className="required-field">Type de projet</Label>
      <Controller
        name="projectType"
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Sélectionner le type de projet" />
            </SelectTrigger>
            <SelectContent>
              {projectTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.projectType && (
        <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>
      )}
    </div>
  );
};
