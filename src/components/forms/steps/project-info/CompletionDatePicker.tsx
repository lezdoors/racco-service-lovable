
import { Controller, useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

export const CompletionDatePicker = () => {
  const { control, formState: { errors } } = useFormContext<FormData>();

  return (
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
  );
};
