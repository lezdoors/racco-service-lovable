
import { createClient } from "@supabase/supabase-js";
import { FormData, PartialLeadData } from "@/hooks/useMultiStepForm";
import { sendWebhookWithNotification } from "./webhooks";
import { toast } from "@/hooks/use-toast";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Send a complete form submission
export const submitForm = async (data: FormData) => {
  if (!supabase) {
    throw new Error("Supabase client not initialized. Please configure the environment variables.");
  }

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

    // Create checkout session
    const { data: sessionData, error } = await supabase.functions.invoke('create-checkout', {
      body: { formData: data }
    });

    if (error || !sessionData?.url) {
      throw new Error(error?.message || "Impossible de créer la session de paiement");
    }

    return sessionData.url;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};

// Send a partial lead submission
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
    
    // Consider submission successful even if some notifications failed
    return true;
  } catch (error) {
    console.error("Error submitting partial lead:", error);
    throw error;
  }
};
