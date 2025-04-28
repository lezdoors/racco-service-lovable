
import { FormData } from "@/hooks/useMultiStepForm";
import { createClient } from "@supabase/supabase-js";
import logger from "./loggingService";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const createCheckoutSession = async (formData: FormData): Promise<string> => {
  if (!supabase) {
    const errorMessage = "Supabase client not initialized. Please configure the environment variables.";
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  logger.info("Creating checkout session with Stripe", { 
    formData: {
      ...formData,
      // Don't log sensitive fields
      documents: formData.documents ? `${formData.documents.length} documents` : undefined
    }
  });

  try {
    const { data: sessionData, error } = await supabase.functions.invoke('create-checkout', {
      body: { formData }
    });

    if (error) {
      logger.error("Supabase function error", error);
      throw new Error(error.message || "Impossible de créer la session de paiement");
    }

    if (!sessionData?.url) {
      const errorMessage = "No checkout URL returned from Stripe";
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    logger.success("Checkout session created successfully", { 
      sessionId: sessionData.url.split('session_id=')[1]?.split('&')[0] 
    });
    
    return sessionData.url;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Checkout session creation failed";
    logger.error("Failed to create checkout session", { error, errorMessage });
    throw new Error(`Impossible de créer la session de paiement: ${errorMessage}`);
  }
};

// Function to verify a completed checkout session
export const verifyCheckoutSession = async (sessionId: string): Promise<boolean> => {
  if (!supabase) {
    logger.error("Supabase client not initialized for checkout verification");
    return false;
  }
  
  try {
    logger.info("Verifying checkout session", { sessionId });
    
    const { data, error } = await supabase.functions.invoke('verify-checkout', {
      body: { sessionId }
    });
    
    if (error) {
      logger.error("Error verifying checkout session", { sessionId, error });
      return false;
    }
    
    if (data?.status === 'complete' || data?.status === 'paid') {
      logger.success("Checkout session verified successfully", { sessionId, status: data.status });
      return true;
    } else {
      logger.warning("Checkout session verification failed", { sessionId, status: data?.status });
      return false;
    }
  } catch (error) {
    logger.error("Exception when verifying checkout", { sessionId, error });
    return false;
  }
};
