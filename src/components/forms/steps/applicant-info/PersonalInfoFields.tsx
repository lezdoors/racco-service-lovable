
import { useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage 
} from "@/components/ui/form";

export const PersonalInfoFields = () => {
  const { control, register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="required-field">Prénom</Label>
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
          <Label htmlFor="lastName" className="required-field">Nom</Label>
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
          <Label htmlFor="email" className="required-field">Email</Label>
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
          <Label htmlFor="phone" className="required-field">Téléphone</Label>
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
