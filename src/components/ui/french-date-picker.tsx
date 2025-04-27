
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface FrenchDatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  label?: string;
  className?: string;
  excludeDates?: Date[];
  disableWeekends?: boolean;
}

export function FrenchDatePicker({
  date,
  setDate,
  label,
  className,
  excludeDates = [],
  disableWeekends = false,
}: FrenchDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isDateDisabled = (date: Date) => {
    // Check if date is in excluded dates
    const isExcluded = excludeDates.some(
      (excludeDate) =>
        format(excludeDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );

    // Check if date is a weekend
    const isWeekend = disableWeekends && (date.getDay() === 0 || date.getDay() === 6);
    
    // Check if date is a French holiday (simplified)
    const frenchHolidays2025 = [
      "2025-01-01", // Jour de l'An
      "2025-04-21", // Lundi de Pâques
      "2025-05-01", // Fête du Travail
      "2025-05-08", // Victoire 1945
      "2025-05-29", // Ascension
      "2025-06-09", // Lundi de Pentecôte
      "2025-07-14", // Fête Nationale
      "2025-08-15", // Assomption
      "2025-11-01", // Toussaint
      "2025-11-11", // Armistice
      "2025-12-25", // Noël
    ];
    
    const isHoliday = frenchHolidays2025.includes(format(date, "yyyy-MM-dd"));

    return isExcluded || isWeekend || isHoliday;
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label className="fr-label">{label}</Label>}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              "fr-input"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "dd/MM/yyyy", { locale: fr })
            ) : (
              <span>Sélectionner une date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setIsOpen(false);
            }}
            disabled={isDateDisabled}
            locale={fr}
            weekStartsOn={1} // French calendars start on Monday
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
