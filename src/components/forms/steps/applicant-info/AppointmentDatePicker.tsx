
import { Controller, useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { FieldLabel } from "@/components/ui/field-label";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const AppointmentDatePicker = () => {
  const { control } = useFormContext<FormData>();

  return (
    <div>
      <FieldLabel 
        label="Date de visite technique souhaitée" 
        tooltip="Proposez une date pour la visite technique (minimum 3 jours ouvrables). Cette date est indicative, un technicien vous contactera pour confirmer un rendez-vous selon les disponibilités."
      />
      <p className="text-sm text-gray-500 mb-2">Facultatif - Un technicien vous contactera pour confirmer</p>
      <Controller
        control={control}
        name="appointmentDate"
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  format(field.value, "PPP", { locale: fr })
                ) : (
                  <span>Sélectionner une date (facultatif)</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                disabled={(date) => {
                  const today = new Date();
                  const day = date.getDay();
                  const isWeekend = day === 0 || day === 6;
                  
                  let workingDays = 0;
                  let currentDate = new Date();
                  while (workingDays < 3) {
                    currentDate.setDate(currentDate.getDate() + 1);
                    const dayOfWeek = currentDate.getDay();
                    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                      workingDays++;
                    }
                  }
                  
                  return isWeekend || date < currentDate;
                }}
                className={cn("p-3 pointer-events-auto")}
                locale={fr}
              />
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
};
