
import { PartialLeadData } from "@/hooks/useMultiStepForm";
import { sendWebhookWithNotification } from "./webhooks";
import logger from "./loggingService";
import { trackPartialLeadSubmission } from "@/lib/google-tag-manager";
import { toast } from "@/hooks/use-toast";

export const submitPartialLead = async (data: PartialLeadData) => {
  logger.info("Soumission des informations partielles du lead", data);
  
  try {
    // Track the partial lead submission in analytics
    trackPartialLeadSubmission(data);
    
    // Show toast notification to user
    toast({
      title: "Informations enregistrées",
      description: "Nous avons bien reçu vos coordonnées. Continuez pour finaliser votre demande.",
      duration: 5000,
    });
    
    // Track all notification attempts for partial lead with more detailed data
    const enrichedData = {
      ...data,
      status: "Partiel",
      timestamp: new Date().toISOString(),
      source: "Formulaire Web",
      language: navigator.language,
      pageUrl: window.location.href,
      referrer: document.referrer || "Direct",
    };
    
    const notifications = await Promise.allSettled([
      // Add to Google Sheets
      sendWebhookWithNotification(
        import.meta.env.VITE_ZAPIER_SHEETS_WEBHOOK,
        enrichedData,
        "Erreur lors de l'ajout dans Google Sheets"
      ),
      
      // Send email notification
      sendWebhookWithNotification(
        import.meta.env.VITE_ZAPIER_EMAIL_WEBHOOK,
        {
          to: "contact@racco-service.com",
          subject: "Nouveau prospect partiel - Racco-Service",
          ...enrichedData,
          leadType: "Partiel"
        },
        "Erreur lors de l'envoi de l'email"
      ),
      
      // Add to CRM
      sendWebhookWithNotification(
        import.meta.env.VITE_ZAPIER_CRM_WEBHOOK,
        enrichedData,
        "Erreur lors de l'ajout dans le CRM"
      )
    ]);

    // Log notification results
    logger.info("Résultats des notifications de lead partiel", { 
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
      logger.success("Lead partiel soumis avec succès (au moins un service de notification a fonctionné)");
      return true;
    } else {
      logger.warning("Toutes les notifications de lead partiel ont échoué");
      return false;
    }
  } catch (error) {
    logger.error("Erreur lors de la soumission du lead partiel", error);
    throw error;
  }
};
