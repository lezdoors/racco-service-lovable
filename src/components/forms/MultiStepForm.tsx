
import { useMultiStepForm, FormData } from "@/hooks/useMultiStepForm";
import ProjectInfoStep from "./steps/ProjectInfoStep";
import TechnicalDetailsStep from "./steps/TechnicalDetailsStep";
import ApplicantInfoStep from "./steps/ApplicantInfoStep";
import ConfirmationStep from "./steps/ConfirmationStep";
import StepIndicator from "./StepIndicator";
import { useToast } from "@/hooks/use-toast";
import { submitForm, submitPartialLead } from "@/services/formSubmission";
import { Button } from "@/components/ui/button";
import { FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import { trackFormStep, trackFormSubmission } from "@/lib/google-tag-manager";
import logger from "@/services/loggingService";

const MultiStepForm = () => {
  const { currentStep, isLoading, setIsLoading, methods, nextStep, prevStep, hasSubmittedPartialLead, setHasSubmittedPartialLead } = useMultiStepForm();
  const { toast } = useToast();
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  
  const steps = [
    { name: "Informations du demandeur", component: ApplicantInfoStep },
    { name: "Informations du projet", component: ProjectInfoStep },
    { name: "Détails techniques", component: TechnicalDetailsStep },
    { name: "Confirmation", component: ConfirmationStep }
  ];

  // Check if user has filled essential information in step 1 that should trigger a partial lead submission
  const checkAndSubmitPartialLead = async () => {
    if (currentStep === 0 && !hasSubmittedPartialLead) {
      const { firstName, lastName, email, phone } = methods.getValues();
      
      // Only submit if all essential fields are filled
      if (firstName && lastName && email && phone) {
        try {
          logger.info("Attempting to submit partial lead", { firstName, lastName, email, phone });
          setIsLoading(true);
          await submitPartialLead({ firstName, lastName, email, phone });
          setHasSubmittedPartialLead(true);
          logger.success("Partial lead submitted successfully");
          
          // Track partial lead submission with Google Tag Manager
          if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
              event: 'partialLeadSubmission',
              formPartiallyCompleted: true
            });
          }
        } catch (error) {
          logger.error("Error submitting partial lead", error);
          // Silently fail - don't block the user from proceeding
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  // Track form step changes
  useEffect(() => {
    // Track form step changes
    trackFormStep(currentStep + 1, steps[currentStep].name);
    logger.info(`Form step changed to ${currentStep + 1}: ${steps[currentStep].name}`);
  }, [currentStep]);

  const onSubmit = async (data: FormData) => {
    logger.info("Form submission initiated", { formData: data });
    setIsLoading(true);
    setAttemptedSubmit(true);
    try {
      logger.info("Processing form submission");
      const checkoutUrl = await submitForm(data);
      
      // Track form completion
      trackFormSubmission(true);
      logger.success("Form submitted successfully, redirecting to checkout", { checkoutUrl });
      
      // Redirect to payment page or thank you page
      window.location.href = checkoutUrl;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
      logger.error("Payment error", { error: errorMessage, formData: data });
      toast({
        title: "Erreur de paiement",
        description: `Une erreur s'est produite: ${errorMessage}. Veuillez vérifier la configuration ou réessayer.`,
        variant: "destructive",
      });
      
      // Track form submission error
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'formSubmissionError',
          formError: errorMessage
        });
      }
      
      setIsLoading(false);
    }
  };

  const handleNextStep = async () => {
    // If we're on step 1, check if we should submit a partial lead before proceeding
    if (currentStep === 0) {
      await checkAndSubmitPartialLead();
    }
    
    // Then proceed with normal next step logic
    nextStep();
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
                onClick={handleNextStep}
                className="bg-enedis-blue hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Chargement..." : "Suivant"}
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
          
          {Object.keys(methods.formState.errors).length > 0 && attemptedSubmit && (
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
