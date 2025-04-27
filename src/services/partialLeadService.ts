
import { PartialLeadData } from "@/hooks/useMultiStepForm";
import { sendWebhookWithNotification } from "./webhooks";

export const submitPartialLead = async (data: PartialLeadData) => {
  try {
    // Track all notification attempts for partial lead
    const notifications = await Promise.all([
      // Add to Google Sheets
      sendWebhookWithNotification(
        import.meta.env.VITE_ZAPIER_SHEETS_WEBHOOK,
        {
          ...data,
          status: "Partiel",
          timestamp: new Date().toISOString()
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
          source: "Website Form",
          timestamp: new Date().toISOString()
        },
        "Erreur lors de l'ajout dans le CRM"
      )
    ]);

    // Log notification results
    console.log("Partial lead notification results:", notifications);
    
    return true;
  } catch (error) {
    console.error("Error submitting partial lead:", error);
    throw error;
  }
};
