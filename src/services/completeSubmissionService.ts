
import { FormData } from "@/hooks/useMultiStepForm";
import { sendWebhookWithNotification } from "./webhooks";
import { createCheckoutSession } from "./checkoutService";
import logger from "./loggingService";
import { toast } from "@/hooks/use-toast";
import { trackFormSubmission } from "@/lib/google-tag-manager";

export const submitCompleteForm = async (formData: FormData): Promise<string> => {
  logger.info("Starting complete form submission process", { formData });
  
  // Track the form submission in GTM
  trackFormSubmission(true);
  
  try {
    // Show initial processing toast
    toast({
      title: "Traitement en cours",
      description: "Nous traitons votre demande...",
    });
    
    // Start parallel notifications to different services
    logger.info("Sending notifications to various services");
    
    const notificationPromises = [
      // Add to Google Sheets
      sendWebhookWithNotification(
        import.meta.env.VITE_ZAPIER_SHEETS_WEBHOOK,
        {
          ...formData,
          status: "Complet",
          timestamp: new Date().toISOString()
        },
        "Erreur lors de l'ajout dans Google Sheets"
      ),
      
      // Send email notification
      sendWebhookWithNotification(
        import.meta.env.VITE_ZAPIER_EMAIL_WEBHOOK,
        {
          to: "contact@racco-service.com",
          subject: "Nouveau formulaire complet - Racco-Service",
          ...formData,
          leadType: "Complet",
          timestamp: new Date().toISOString()
        },
        "Erreur lors de l'envoi de l'email"
      ),
      
      // Add to CRM
      sendWebhookWithNotification(
        import.meta.env.VITE_ZAPIER_CRM_WEBHOOK,
        {
          ...formData,
          status: "Complet",
          source: "Website Form",
          timestamp: new Date().toISOString()
        },
        "Erreur lors de l'ajout dans le CRM"
      )
    ];
    
    // Wait for all notifications to complete
    const notificationResults = await Promise.allSettled(notificationPromises);
    
    // Log the results of notifications
    logger.info("Notification results", { 
      results: notificationResults.map((result, index) => ({
        service: ["GoogleSheets", "Email", "CRM"][index],
        status: result.status,
        value: result.status === 'fulfilled' ? result.value : null,
        reason: result.status === 'rejected' ? result.reason : null
      }))
    });
    
    // Check if there were any failures in critical services
    const anyFailures = notificationResults.some(
      result => result.status === 'rejected' || 
      (result.status === 'fulfilled' && result.value === false)
    );
    
    if (anyFailures) {
      logger.warning("Some notifications failed, but proceeding with payment", { 
        notificationResults 
      });
      
      toast({
        title: "Information importante",
        description: "Certaines notifications n'ont pas pu être envoyées, mais vous pouvez poursuivre le paiement.",
      });
    } else {
      logger.success("All notifications sent successfully");
    }
    
    // Create Stripe checkout session
    logger.info("Creating checkout session");
    const checkoutUrl = await createCheckoutSession(formData);
    logger.success("Checkout session created successfully", { checkoutUrl });
    
    return checkoutUrl;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
    logger.error("Form submission process failed", { error, formData });
    
    toast({
      title: "Échec de la soumission",
      description: `Une erreur s'est produite: ${errorMessage}`,
      variant: "destructive",
    });
    
    // Track form submission failure in GTM
    trackFormSubmission(false);
    
    throw error;
  }
};
