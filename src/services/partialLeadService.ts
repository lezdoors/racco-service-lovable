
import { PartialLeadData } from "@/hooks/useMultiStepForm";
import { sendWebhookWithNotification } from "./webhooks";
import logger from "./loggingService";
import { trackPartialLeadSubmission } from "@/lib/google-tag-manager";
import { toast } from "@/hooks/use-toast";

export const submitPartialLead = async (data: PartialLeadData) => {
  logger.info("Submitting partial lead", data);
  
  try {
    // Track partial lead submission in analytics
    trackPartialLeadSubmission(data);
    
    // Show toast notification to user
    toast({
      title: "Informations enregistrées",
      description: "Nous avons bien reçu vos informations de contact. Continuez pour finaliser votre demande.",
    });
    
    // Track all notification attempts for partial lead
    const notifications = await Promise.allSettled([
      // Add to Google Sheets
      sendWebhookWithNotification(
        import.meta.env.VITE_ZAPIER_SHEETS_WEBHOOK,
        {
          ...data,
          status: "Partiel",
          timestamp: new Date().toISOString(),
          source: "Formulaire Web"
        },
        "Erreur lors de l'ajout dans Google Sheets"
      ),
      
      // Send email notification
      sendWebhookWithNotification(
        import.meta.env.VITE_ZAPIER_EMAIL_WEBHOOK,
        {
          to: "contact@racco-service.com",
          subject: "Nouveau prospect partiel - Racco-Service",
          ...data,
          leadType: "Partiel",
          timestamp: new Date().toISOString()
        },
        "Erreur lors de l'envoi de l'email"
      ),
      
      // Add to CRM
      sendWebhookWithNotification(
        import.meta.env.VITE_ZAPIER_CRM_WEBHOOK,
        {
          ...data,
          status: "Partiel",
          source: "Formulaire Web",
          timestamp: new Date().toISOString()
        },
        "Erreur lors de l'ajout dans le CRM"
      )
    ]);

    // Log notification results
    logger.info("Partial lead notification results", { 
      results: notifications.map((result, index) => ({
        service: ["GoogleSheets", "Email", "CRM"][index],
        status: result.status,
        value: result.status === 'fulfilled' ? result.value : null,
        reason: result.status === 'rejected' ? result.reason : null
      }))
    });
    
    // Consider the partial lead submission successful if at least one notification succeeded
    const anySuccess = notifications.some(
      result => result.status === 'fulfilled' && result.value === true
    );
    
    if (anySuccess) {
      logger.success("Partial lead submitted successfully (at least one notification service worked)");
      return true;
    } else {
      logger.warning("All partial lead notifications failed");
      return false;
    }
  } catch (error) {
    logger.error("Error submitting partial lead", error);
    throw error;
  }
};
