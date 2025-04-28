
import { FormData } from "@/hooks/useMultiStepForm";
import { sendWebhookWithNotification } from "./webhooks";
import { createCheckoutSession } from "./checkoutService";
import logger from "./loggingService";
import { toast } from "@/hooks/use-toast";
import { trackFormSubmission } from "@/lib/google-tag-manager";

export const submitCompleteForm = async (formData: FormData): Promise<string> => {
  logger.info("Début du processus de soumission du formulaire complet", { formData });
  
  // Track the form submission in GTM
  trackFormSubmission(true);
  
  try {
    // Show initial processing toast
    toast({
      title: "Traitement en cours",
      description: "Nous traitons votre demande, veuillez patienter...",
      duration: 5000,
    });
    
    // Enrich form data with useful context
    const enrichedData = {
      ...formData,
      timestamp: new Date().toISOString(),
      source: "Formulaire Web",
      language: navigator.language || 'fr-FR',
      pageUrl: window.location.href,
      referrer: document.referrer || 'Direct',
      status: "Complet"
    };
    
    // Start parallel notifications to different services
    logger.info("Envoi des notifications aux différents services");
    
    const notificationPromises = [
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
          subject: "Nouvelle demande de raccordement - Racco-Service",
          ...enrichedData,
          leadType: "Complet"
        },
        "Erreur lors de l'envoi de l'email"
      ),
      
      // Add to CRM
      sendWebhookWithNotification(
        import.meta.env.VITE_ZAPIER_CRM_WEBHOOK,
        enrichedData,
        "Erreur lors de l'ajout dans le CRM"
      )
    ];
    
    // Wait for all notifications to complete
    const notificationResults = await Promise.allSettled(notificationPromises);
    
    // Log the results of notifications
    logger.info("Résultats des notifications", { 
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
      logger.warning("Certaines notifications ont échoué, mais poursuite du processus de paiement", { 
        notificationResults 
      });
      
      toast({
        title: "Information importante",
        description: "Certaines notifications n'ont pas pu être envoyées, mais vous pouvez poursuivre le paiement.",
        duration: 8000,
      });
    } else {
      logger.success("Toutes les notifications ont été envoyées avec succès");
    }
    
    // Create Stripe checkout session
    logger.info("Création de la session de paiement");
    
    const checkoutUrl = await createCheckoutSession(formData);
    
    toast({
      title: "Redirection vers la page de paiement",
      description: "Vous allez être redirigé vers notre page de paiement sécurisée.",
      duration: 5000,
    });
    
    logger.success("Session de paiement créée avec succès", { checkoutUrl });
    
    return checkoutUrl;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
    logger.error("Le processus de soumission du formulaire a échoué", { error, formData });
    
    toast({
      title: "Échec de la soumission",
      description: `Une erreur s'est produite: ${errorMessage}. Veuillez réessayer ultérieurement.`,
      variant: "destructive",
      duration: 10000,
    });
    
    // Track form submission failure in GTM
    trackFormSubmission(false);
    
    throw error;
  }
};
