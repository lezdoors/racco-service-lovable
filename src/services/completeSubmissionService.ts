
import { FormData } from "@/hooks/useMultiStepForm";
import { sendWebhookWithNotification } from "./webhooks";
import { createCheckoutSession } from "./checkoutService";

export const submitCompleteForm = async (data: FormData) => {
  try {
    // Track all notification attempts
    const notifications = await Promise.all([
      // Update Google Sheets
      sendWebhookWithNotification(
        import.meta.env.VITE_ZAPIER_SHEETS_UPDATE_WEBHOOK,
        {
          ...data,
          status: "Complet",
          completionDate: data.completionDate?.toISOString(),
          timestamp: new Date().toISOString()
        },
        "Erreur lors de la mise à jour Google Sheets"
      ),
      
      // Send email notification
      sendWebhookWithNotification(
        import.meta.env.VITE_ZAPIER_EMAIL_WEBHOOK,
        {
          to: "contact@racco-service.com",
          subject: "Demande complète reçue - Racco-Service",
          ...data,
          completionDate: data.completionDate?.toISOString(),
          leadType: "Complet",
          timestamp: new Date().toISOString()
        },
        "Erreur lors de l'envoi de l'email"
      ),
      
      // Update CRM
      sendWebhookWithNotification(
        import.meta.env.VITE_ZAPIER_CRM_UPDATE_WEBHOOK,
        {
          ...data,
          status: "Complet",
          source: "Website Form",
          timestamp: new Date().toISOString()
        },
        "Erreur lors de la mise à jour du CRM"
      )
    ]);

    // Log notification results
    console.log("Form submission notification results:", notifications);

    return await createCheckoutSession(data);
  } catch (error) {
    console.error("Error submitting complete form:", error);
    throw error;
  }
};
