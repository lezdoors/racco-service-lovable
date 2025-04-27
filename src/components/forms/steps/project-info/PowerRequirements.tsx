
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export const PowerRequirements = () => {
  const { control, formState: { errors } } = useFormContext<FormData>();
  const [capacityValue, setCapacityValue] = useState<number[]>([6]);

  return (
    <div>
      <Label>Puissance requise (kVA)</Label>
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
