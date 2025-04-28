
import { useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldLabel } from "@/components/ui/field-label";

export const PersonalInfoFields = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel 
            htmlFor="firstName" 
            label="Prénom" 
            tooltip="Indiquez votre prénom tel qu'il apparaît sur vos documents officiels."
            required
          />
          <Input
            id="firstName"
            placeholder="Jean"
            className="mt-1"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>
        
        <div>
          <FieldLabel 
            htmlFor="lastName" 
            label="Nom" 
            tooltip="Indiquez votre nom de famille tel qu'il apparaît sur vos documents officiels."
            required
          />
          <Input
            id="lastName"
            placeholder="Dupont"
            className="mt-1"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel 
            htmlFor="email" 
            label="Email" 
            tooltip="Votre adresse email sera utilisée pour vous envoyer des informations importantes concernant votre demande de raccordement."
            required
          />
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
          <FieldLabel 
            htmlFor="phone" 
            label="Téléphone" 
            tooltip="Votre numéro de téléphone nous permettra de vous contacter rapidement si nécessaire. Format préféré: 06 12 34 56 78."
            required
          />
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
    </div>
  );
};
