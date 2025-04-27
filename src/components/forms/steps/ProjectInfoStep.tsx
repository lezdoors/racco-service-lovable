
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Slider } from "@/components/ui/slider";

const ProjectInfoStep = () => {
  const { control, formState: { errors }, register, watch } = useFormContext<FormData>();
  const [capacityValue, setCapacityValue] = useState<number[]>([6]);
  
  const projectTypes = [
    { value: "new", label: "Nouvelle construction" },
    { value: "renovation", label: "Rénovation" },
    { value: "increase", label: "Augmentation de puissance" }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-enedis-gray-800">Informations du projet</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="projectType">Type de projet</Label>
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

        <div>
          <Label>Date de fin de projet prévue</Label>
          <Controller
            control={control}
            name="completionDate"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, "PPP", { locale: fr })
                    ) : (
                      <span>Sélectionner une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className={cn("p-3 pointer-events-auto")}
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.completionDate && (
            <p className="text-red-500 text-sm mt-1">{errors.completionDate.message}</p>
          )}
        </div>

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
      </div>
      
      <div className="bg-enedis-lightBlue p-4 rounded-md mt-6">
        <p className="text-sm text-enedis-gray-700">
          <strong>Conseil :</strong> Pour un logement individuel standard, une puissance de 6 à 9 kVA en monophasé est généralement suffisante. Pour les projets industriels ou avec des équipements spécifiques, le triphasé est recommandé.
        </p>
      </div>
    </div>
  );
};

export default ProjectInfoStep;
