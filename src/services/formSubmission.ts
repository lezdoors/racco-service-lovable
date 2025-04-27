
import { createClient } from "@supabase/supabase-js";
import { FormData } from "@/hooks/useMultiStepForm";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const submitForm = async (data: FormData) => {
  if (!supabase) {
    throw new Error("Supabase client not initialized. Please configure the environment variables.");
  }

  const { data: sessionData, error } = await supabase.functions.invoke('create-checkout', {
    body: { formData: data }
  });

  if (error || !sessionData?.url) {
    throw new Error(error?.message || "Impossible de créer la session de paiement");
  }

  return sessionData.url;
};
