
import { FormData, PartialLeadData } from "@/hooks/useMultiStepForm";
import { submitCompleteForm } from "./completeSubmissionService";
import { submitPartialLead } from "./partialLeadService";
import { toast } from "@/hooks/use-toast";
import logger from "@/services/loggingService";

const checkWebhookConfiguration = () => {
  const webhooks = [
    { name: "CRM", value: import.meta.env.VITE_ZAPIER_CRM_WEBHOOK },
    { name: "Email", value: import.meta.env.VITE_ZAPIER_EMAIL_WEBHOOK },
    { name: "Sheets", value: import.meta.env.VITE_ZAPIER_SHEETS_WEBHOOK }
  ];
  
  const missingWebhooks = webhooks.filter(wh => !wh.value);
  
  if (missingWebhooks.length > 0) {
    const missing = missingWebhooks.map(wh => wh.name).join(', ');
    logger.warning(`Webhooks manquants ou non configurés: ${missing}`);
    
    toast({
      title: "Configuration incomplète",
      description: `Certains webhooks ne sont pas configurés: ${missing}. Veuillez ajouter les variables d'environnement correspondantes dans votre fichier .env.`,
      variant: "destructive",
    });
    
    return false;
  }
  
  return true;
}

// Enhanced form submission with configuration check
const submitForm = async (formData: FormData) => {
  if (!checkWebhookConfiguration()) {
    logger.error("Configuration de webhook incomplète. Impossible de soumettre le formulaire.");
    throw new Error("Configuration incomplète. Veuillez configurer les webhooks dans le fichier .env.");
  }
  
  return submitCompleteForm(formData);
};

// Enhanced partial lead submission with configuration check
const submitPartialLead = async (data: PartialLeadData) => {
  if (!checkWebhookConfiguration()) {
    logger.warning("Configuration de webhook incomplète. Les données partielles peuvent ne pas être envoyées.");
    // Continue anyway for partial leads, but log warning
  }
  
  return submitPartialLead(data);
};

export { submitForm, submitPartialLead };
