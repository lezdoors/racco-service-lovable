
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProjectInfoStep from "./steps/ProjectInfoStep";
import TechnicalDetailsStep from "./steps/TechnicalDetailsStep";
import ApplicantInfoStep from "./steps/ApplicantInfoStep";
import ConfirmationStep from "./steps/ConfirmationStep";
import StepIndicator from "./StepIndicator";
import { useToast } from "@/hooks/use-toast";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define our form schema using zod
const formSchema = z.object({
  // Project Information
  projectType: z.string().min(1, "Le type de projet est requis"),
  address: z.string().min(5, "L'adresse est requise"),
  city: z.string().min(2, "La ville est requise"),
  postalCode: z.string().min(5, "Le code postal est requis"),
  completionDate: z.date({
    required_error: "Une date de fin est requise",
  }),
  capacity: z.number().min(3, "La capacité doit être d'au moins 3 kVA"),
  connectionType: z.enum(["single", "three"], {
    required_error: "Veuillez sélectionner le type de raccordement",
  }),
  
  // Technical Details
  meterStatus: z.string().optional(),
  buildingSpecs: z.string().min(5, "Des spécifications détaillées sont requises"),
  connectionDistance: z.number().optional(),
  documents: z.array(z.any()).optional(),
  
  // Applicant Information
  name: z.string().min(2, "Votre nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  accountType: z.enum(["individual", "professional", "manager"], {
    required_error: "Veuillez sélectionner un type de compte",
  }),
  preferredContact: z.enum(["email", "phone"], {
    required_error: "Veuillez sélectionner une méthode de contact préférée",
  }),
  appointmentDate: z.date().optional(),
  
  // Confirmation
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions générales",
  }),
});

export type FormData = z.infer<typeof formSchema>;

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  
  const steps = [
    { name: "Informations du projet", component: ProjectInfoStep },
    { name: "Détails techniques", component: TechnicalDetailsStep },
    { name: "Informations du demandeur", component: ApplicantInfoStep },
    { name: "Confirmation", component: ConfirmationStep }
  ];
  
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectType: "",
      address: "",
      city: "",
      postalCode: "",
      capacity: 6,
      connectionType: "single",
      buildingSpecs: "",
      connectionDistance: 0,
      documents: [],
      name: "",
      email: "",
      phone: "",
      accountType: "individual",
      preferredContact: "email",
      termsAccepted: false,
    },
    mode: "onChange"
  });
  
  const { handleSubmit, trigger, formState: { isValid, errors } } = methods;
  
  const nextStep = async () => {
    const fieldsToValidate = getFieldsToValidate(currentStep);
    const result = await trigger(fieldsToValidate as any);
    
    if (result) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const getFieldsToValidate = (step: number) => {
    switch (step) {
      case 0:
        return [
          "projectType", 
          "address", 
          "city", 
          "postalCode", 
          "completionDate", 
          "capacity", 
          "connectionType"
        ];
      case 1:
        return ["buildingSpecs"];
      case 2:
        return [
          "name", 
          "email", 
          "phone", 
          "accountType", 
          "preferredContact"
        ];
      case 3:
        return ["termsAccepted"];
      default:
        return [];
    }
  };
  
  const onSubmit = (data: FormData) => {
    console.log("Form submitted successfully", data);
    toast({
      title: "Demande envoyée !",
      description: "Votre demande de raccordement a bien été envoyée. Un email de confirmation vous a été envoyé.",
    });
    // In a real application, you would send this data to your backend
  };
  
  const CurrentStepComponent = steps[currentStep].component;
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border p-6">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StepIndicator 
            steps={steps.map(s => s.name)} 
            currentStep={currentStep} 
          />
          
          <div className="mt-8 animate-fadeIn">
            <CurrentStepComponent />
          </div>
          
          <div className="mt-8 pt-6 border-t flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Précédent
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button 
                type="button"
                onClick={nextStep}
                className="bg-enedis-blue hover:bg-blue-700 text-white"
              >
                Suivant
              </Button>
            ) : (
              <Button 
                type="submit"
                className="bg-enedis-green hover:bg-green-600 text-enedis-gray-800"
              >
                Soumettre ma demande
              </Button>
            )}
          </div>
          
          {Object.keys(errors).length > 0 && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
              <p>Le formulaire contient des erreurs. Veuillez vérifier les champs marqués.</p>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default MultiStepForm;
