
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { FieldLabel } from "@/components/ui/field-label";
import { Slider } from "@/components/ui/slider";

export const PowerRequirements = () => {
  const { control, formState: { errors } } = useFormContext<FormData>();
  const [capacityValue, setCapacityValue] = useState<number[]>([6]);

  return (
    <div>
      <FieldLabel 
        label="Puissance requise (kVA)" 
        tooltip="La puissance en kVA (kilovolt-ampères) détermine la capacité électrique de votre installation. Pour un logement standard, 6 à 9 kVA suffit généralement. Des équipements spécifiques ou des usages professionnels peuvent nécessiter une puissance plus élevée."
        required
      />
      <div className="flex items-center mt-2">
        <Controller
          control={control}
          name="capacity"
          render={({ field: { onChange, value } }) => (
            <>
              <Slider
                defaultValue={[value]}
                min={3}
                max={36}
                step={3}
                onValueChange={(vals) => {
                  setCapacityValue(vals);
                  onChange(vals[0]);
                }}
                className="flex-1 mr-4"
              />
              <div className="w-16 text-center font-medium">
                {capacityValue[0]} kVA
              </div>
            </>
          )}
        />
      </div>
      {errors.capacity && (
        <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>
      )}
    </div>
  );
};
