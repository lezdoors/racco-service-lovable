
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

// Form schema definition
export const formSchema = z.object({
  // Personal Information (Step 1 - Essential Information)
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  
  // Additional Personal Information
  accountType: z.enum(["individual", "professional", "manager"], {
    required_error: "Veuillez sélectionner un type de compte",
  }),
  preferredContact: z.enum(["email", "phone"], {
    required_error: "Veuillez sélectionner une méthode de contact préférée",
  }),
  appointmentDate: z.date().optional(),
  company: z.string().optional(),
  
  // Project Information (Step 2)
  projectType: z.enum(["new_connection", "power_increase", "temporary", "renovation"], {
    required_error: "Le type de projet est requis",
  }),
  address: z.string().min(5, "L'adresse est requise"),
  city: z.string().min(2, "La ville est requise"),
  postalCode: z.string().min(5, "Le code postal est requis").max(5, "Le code postal doit contenir 5 chiffres"),
  completionDate: z.date({
    required_error: "Une date de fin est requise",
  }),
  capacity: z.number().min(3, "La capacité doit être d'au moins 3 kVA"),
  connectionType: z.enum(["single", "three"], {
    required_error: "Veuillez sélectionner le type de raccordement",
  }),
  
  // Technical Details (Step 3)
  meterStatus: z.enum(["new", "existing", "unknown"], {
    required_error: "Veuillez indiquer l'état du compteur",
  }).optional(),
  buildingSpecs: z.string().min(5, "Des spécifications détaillées sont requises"),
  connectionDistance: z.number().optional(),
  hasExistingConnection: z.boolean().optional(),
  documents: z.array(z.any()).optional(),
  additionalNotes: z.string().optional(),
  
  // Confirmation (Step 4)
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions générales",
  }),
});

export type FormData = z.infer<typeof formSchema>;

// For partial lead submission (Step 1 only)
export type PartialLeadData = Pick<FormData, 'firstName' | 'lastName' | 'email' | 'phone'>;

const FORM_STORAGE_KEY = 'racco-service-form-data';

export const useMultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmittedPartialLead, setHasSubmittedPartialLead] = useState(false);
  const { toast } = useToast();

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      projectType: "new_connection",
      address: "",
      city: "",
      postalCode: "",
      capacity: 6,
      connectionType: "single",
      buildingSpecs: "",
      connectionDistance: 0,
      documents: [],
      accountType: "individual",
      preferredContact: "email",
      hasExistingConnection: false,
      meterStatus: "new",
      additionalNotes: "",
      termsAccepted: false,
    },
    mode: "onChange"
  });

  // Load saved form data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.completionDate) {
          parsed.completionDate = new Date(parsed.completionDate);
        }
        if (parsed.appointmentDate) {
          parsed.appointmentDate = new Date(parsed.appointmentDate);
        }
        methods.reset(parsed);
        
        const savedStep = localStorage.getItem(FORM_STORAGE_KEY + '-step');
        if (savedStep) {
          setCurrentStep(parseInt(savedStep, 10));
        }
        
        toast({
          title: "Formulaire restauré",
          description: "Vos données précédemment enregistrées ont été restaurées.",
        });
      } catch (error) {
        console.error("Error restoring form data:", error);
      }
    }
  }, []);

  const saveFormData = () => {
    const values = methods.getValues();
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(values));
    localStorage.setItem(FORM_STORAGE_KEY + '-step', currentStep.toString());
  };

  const getFieldsToValidate = (step: number) => {
    switch (step) {
      case 0:
        return ["firstName", "lastName", "email", "phone", "accountType", "preferredContact"];
      case 1:
        return ["projectType", "address", "city", "postalCode", "completionDate", "capacity", "connectionType"];
      case 2:
        return ["buildingSpecs", "meterStatus"];
      case 3:
        return ["termsAccepted"];
      default:
        return [];
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsToValidate(currentStep);
    const result = await methods.trigger(fieldsToValidate as any);
    
    if (result) {
      if (currentStep < 3) {
        saveFormData();
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
      saveFormData();
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return {
    currentStep,
    isLoading,
    setIsLoading,
    methods,
    nextStep,
    prevStep,
    saveFormData,
    hasSubmittedPartialLead,
    setHasSubmittedPartialLead
  };
};
