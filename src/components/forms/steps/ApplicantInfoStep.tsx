
import { Controller, useFormContext } from "react-hook-form";
import { FormData } from "../MultiStepForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

const ApplicantInfoStep = () => {
  const { control, formState: { errors }, register } = useFormContext<FormData>();
  
  const accountTypes = [
    { value: "individual", label: "Particulier" },
    { value: "professional", label: "Professionnel" },
    { value: "manager", label: "Gestionnaire d'immeuble" }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-enedis-gray-800">Informations du demandeur</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nom complet</Label>
          <Input
            id="name"
            placeholder="Jean Dupont"
            className="mt-1"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="jean.dupont@exemple.fr"
              className="mt-1"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="06 12 34 56 78"
              className="mt-1"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="accountType">Type de compte</Label>
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

        <div>
          <Label>Méthode de contact préférée</Label>
          <Controller
            name="preferredContact"
            control={control}
            render={({ field }) => (
              <RadioGroup 
                className="mt-2 space-y-2"
                value={field.value}
                onValueChange={field.onChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="contact-email" />
                  <Label htmlFor="contact-email" className="cursor-pointer">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="contact-phone" />
                  <Label htmlFor="contact-phone" className="cursor-pointer">Téléphone</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.preferredContact && (
            <p className="text-red-500 text-sm mt-1">{errors.preferredContact.message}</p>
          )}
        </div>

        <div>
          <Label>Date de visite technique souhaitée</Label>
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
                      // Disable weekends and dates less than 3 working days from now
                      const day = date.getDay();
                      const isWeekend = day === 0 || day === 6;
                      
                      // Calculate 3 working days ahead (excluding weekends)
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
      </div>
      
      <div className="bg-enedis-lightGreen rounded-md p-4 mt-6">
        <h4 className="text-enedis-gray-800 font-medium mb-1">Information sur la visite technique</h4>
        <p className="text-sm text-enedis-gray-700">
          Une visite technique peut être nécessaire pour évaluer précisément les besoins de raccordement. 
          Nos techniciens sont disponibles du lundi au vendredi, de 8h à 17h. Un délai minimum de 3 jours ouvrés est nécessaire pour planifier la visite.
        </p>
      </div>
    </div>
  );
};

export default ApplicantInfoStep;
