
import { Controller, useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const ContactPreference = () => {
  const { control, formState: { errors } } = useFormContext<FormData>();

  return (
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
  );
};
