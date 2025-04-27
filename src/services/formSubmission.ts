
import { createClient } from "@supabase/supabase-js";
import { FormData, PartialLeadData } from "@/hooks/useMultiStepForm";

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
    // First, update the Google Sheets with complete form data
    await updateGoogleSheet(data);
    
    // Then, send email notification for complete submission
    await sendEmailNotification(data, "complete");
    
    // Track completion in CRM
    await updateCrmRecord(data);
    
    // Finally, process payment/checkout
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

// Send a partial lead submission (first step only)
export const submitPartialLead = async (data: PartialLeadData) => {
  try {
    // Add to Google Sheet as a partial lead
    await addPartialLeadToSheet(data);
    
    // Send email notification for partial lead
    await sendEmailNotification(data, "partial");
    
    // Add to CRM as partial lead
    await addPartialLeadToCrm(data);
    
    return true;
  } catch (error) {
    console.error("Error submitting partial lead:", error);
    throw error;
  }
};

// Helper function to add a new partial lead to CRM
const addPartialLeadToCrm = async (data: PartialLeadData) => {
  try {
    const zapierCrmWebhookUrl = import.meta.env.VITE_ZAPIER_CRM_WEBHOOK;
    
    if (!zapierCrmWebhookUrl) {
      console.warn("Zapier webhook URL not configured for CRM integration");
      return;
    }
    
    const response = await fetch(zapierCrmWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...data,
        status: "Partiel",
        source: "Website Form",
        timestamp: new Date().toISOString()
      }),
      mode: "no-cors"
    });
    
    return response;
  } catch (error) {
    console.error("Error adding partial lead to CRM:", error);
    // Don't block the form submission if CRM integration fails
  }
};

// Update existing CRM record with complete information
const updateCrmRecord = async (data: FormData) => {
  try {
    const zapierCrmUpdateWebhookUrl = import.meta.env.VITE_ZAPIER_CRM_UPDATE_WEBHOOK;
    
    if (!zapierCrmUpdateWebhookUrl) {
      console.warn("Zapier webhook URL not configured for CRM update");
      return;
    }
    
    const response = await fetch(zapierCrmUpdateWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: data.email, // Used as key to match existing record
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        projectType: data.projectType,
        connectionType: data.connectionType,
        capacity: data.capacity,
        status: "Complet",
        source: "Website Form",
        timestamp: new Date().toISOString()
      }),
      mode: "no-cors"
    });
    
    return response;
  } catch (error) {
    console.error("Error updating CRM record:", error);
    // Don't block the form submission if CRM integration fails
  }
};

// Helper function to add a new partial lead to Google Sheets
const addPartialLeadToSheet = async (data: PartialLeadData) => {
  try {
    // Make an API call to the Zapier webhook for Google Sheets integration
    const zapierWebhookUrl = import.meta.env.VITE_ZAPIER_SHEETS_WEBHOOK;
    
    if (!zapierWebhookUrl) {
      console.warn("Zapier webhook URL not configured for Google Sheets integration");
      return;
    }
    
    const response = await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...data,
        status: "Partiel",
        timestamp: new Date().toISOString()
      }),
      mode: "no-cors"
    });
    
    return response;
  } catch (error) {
    console.error("Error adding partial lead to Google Sheets:", error);
    // Don't block the form submission if sheets integration fails
  }
};

// Helper function to update an existing entry in Google Sheets
const updateGoogleSheet = async (data: FormData) => {
  try {
    // Make an API call to the Zapier webhook for Google Sheets update
    const zapierUpdateWebhookUrl = import.meta.env.VITE_ZAPIER_SHEETS_UPDATE_WEBHOOK;
    
    if (!zapierUpdateWebhookUrl) {
      console.warn("Zapier webhook URL not configured for Google Sheets update");
      return;
    }
    
    const response = await fetch(zapierUpdateWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: data.email, // Used to match existing record
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        projectType: data.projectType,
        connectionType: data.connectionType,
        capacity: data.capacity,
        completionDate: data.completionDate ? data.completionDate.toISOString() : null,
        status: "Complet",
        timestamp: new Date().toISOString()
      }),
      mode: "no-cors"
    });
    
    return response;
  } catch (error) {
    console.error("Error updating Google Sheets:", error);
    // Don't block the form submission if sheets integration fails
  }
};

// Helper function to send email notifications
const sendEmailNotification = async (data: PartialLeadData | FormData, type: "partial" | "complete") => {
  try {
    // Make an API call to the Zapier webhook for email notification
    const zapierEmailWebhookUrl = import.meta.env.VITE_ZAPIER_EMAIL_WEBHOOK;
    
    if (!zapierEmailWebhookUrl) {
      console.warn("Zapier webhook URL not configured for email notifications");
      return;
    }
    
    const subject = type === "partial"
      ? "Nouveau prospect partiel - Racco-Service"
      : "Demande complète reçue - Racco-Service";
    
    const emailData = {
      to: "contact@racco-service.com",
      subject,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      leadType: type === "partial" ? "Partiel" : "Complet",
      timestamp: new Date().toISOString()
    };
    
    // Add additional data for complete submissions
    if (type === "complete" && "address" in data) {
      Object.assign(emailData, {
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        projectType: data.projectType,
        connectionType: data.connectionType,
        capacity: data.capacity
      });
    }
    
    const response = await fetch(zapierEmailWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailData),
      mode: "no-cors"
    });
    
    return response;
  } catch (error) {
    console.error("Error sending email notification:", error);
    // Don't block the form submission if email notification fails
  }
};
