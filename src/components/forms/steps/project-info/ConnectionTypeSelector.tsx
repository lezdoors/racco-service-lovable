
import { Controller, useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const ConnectionTypeSelector = () => {
  const { control, formState: { errors } } = useFormContext<FormData>();

  return (
    <div>
      <Label>Type de raccordement</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <Controller
          control={control}
          name="connectionType"
          render={({ field }) => (
            <>
              <div 
                className={cn(
                  "border rounded-md p-4 cursor-pointer",
                  field.value === "single" 
                    ? "border-enedis-blue bg-enedis-lightBlue" 
                    : "border-gray-200 hover:border-enedis-blue"
                )}
                onClick={() => field.onChange("single")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Monophasé</div>
                    <div className="text-sm text-gray-500">Pour les besoins résidentiels standards</div>
                  </div>
                  <div 
                    className={cn(
                      "h-5 w-5 rounded-full border-2",
                      field.value === "single" 
                        ? "border-enedis-blue bg-white" 
                        : "border-gray-300"
                    )}
                  >
                    {field.value === "single" && (
                      <div className="h-2.5 w-2.5 rounded-full bg-enedis-blue m-0.5" />
                    )}
                  </div>
                </div>
              </div>
            
              <div 
                className={cn(
                  "border rounded-md p-4 cursor-pointer",
                  field.value === "three" 
                    ? "border-enedis-blue bg-enedis-lightBlue" 
                    : "border-gray-200 hover:border-enedis-blue"
                )}
                onClick={() => field.onChange("three")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Triphasé</div>
                    <div className="text-sm text-gray-500">Pour les équipements industriels et commerciaux</div>
                  </div>
                  <div 
                    className={cn(
                      "h-5 w-5 rounded-full border-2",
                      field.value === "three" 
                        ? "border-enedis-blue bg-white" 
                        : "border-gray-300"
                    )}
                  >
                    {field.value === "three" && (
                      <div className="h-2.5 w-2.5 rounded-full bg-enedis-blue m-0.5" />
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        />
      </div>
      {errors.connectionType && (
        <p className="text-red-500 text-sm mt-1">{errors.connectionType.message}</p>
      )}
    </div>
  );
};
