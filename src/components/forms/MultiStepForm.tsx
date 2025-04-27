
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import ProjectInfoStep from "./steps/ProjectInfoStep";
import TechnicalDetailsStep from "./steps/TechnicalDetailsStep";
import ApplicantInfoStep from "./steps/ApplicantInfoStep";
import ConfirmationStep from "./steps/ConfirmationStep";
import StepIndicator from "./StepIndicator";
import { useToast } from "@/hooks/use-toast";
import { submitForm } from "@/services/formSubmission";
import { Button } from "@/components/ui/button";

const MultiStepForm = () => {
  const { currentStep, isLoading, setIsLoading, methods, nextStep, prevStep } = useMultiStepForm();
  const { toast } = useToast();
  
  const steps = [
    { name: "Informations du projet", component: ProjectInfoStep },
    { name: "Détails techniques", component: TechnicalDetailsStep },
    { name: "Informations du demandeur", component: ApplicantInfoStep },
    { name: "Confirmation", component: ConfirmationStep }
  ];

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      console.log("Form submitted successfully", data);
      const checkoutUrl = await submitForm(data);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Payment error:", error);
      const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
      toast({
        title: "Erreur de paiement",
        description: `Une erreur s'est produite: ${errorMessage}. Veuillez vérifier la configuration ou réessayer.`,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border p-6">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
              disabled={currentStep === 0 || isLoading}
            >
              Précédent
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button 
                type="button"
                onClick={nextStep}
                className="bg-enedis-blue hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                Suivant
              </Button>
            ) : (
              <Button 
                type="submit"
                className="bg-enedis-green hover:bg-green-600 text-enedis-gray-800"
                disabled={isLoading}
              >
                {isLoading ? "Chargement..." : "Payer et soumettre ma demande"}
              </Button>
            )}
          </div>
          
          {Object.keys(methods.formState.errors).length > 0 && (
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
