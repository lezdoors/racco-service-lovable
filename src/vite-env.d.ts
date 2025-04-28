
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ZAPIER_CRM_WEBHOOK: string;
  readonly VITE_ZAPIER_EMAIL_WEBHOOK: string;
  readonly VITE_ZAPIER_SHEETS_WEBHOOK: string;
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
  readonly VITE_GOOGLE_TAG_MANAGER_ID: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
