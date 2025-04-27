
import { FormData } from "@/hooks/useMultiStepForm";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const createCheckoutSession = async (formData: FormData): Promise<string> => {
  if (!supabase) {
    throw new Error("Supabase client not initialized. Please configure the environment variables.");
  }

  const { data: sessionData, error } = await supabase.functions.invoke('create-checkout', {
    body: { formData }
  });

  if (error || !sessionData?.url) {
    throw new Error(error?.message || "Impossible de créer la session de paiement");
  }

  return sessionData.url;
};
