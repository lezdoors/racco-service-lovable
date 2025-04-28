// lib/google-tag-manager.ts

export const initGTM = () => {
  if (process.env.NODE_ENV === 'production') {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', import.meta.env.VITE_GOOGLE_TAG_MANAGER_ID);
  }
};

// Add new tracking functions for forms and leads
export const trackFormStep = (stepNumber: number, stepName: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'form_step',
      stepNumber,
      stepName,
      timestamp: new Date().toISOString()
    });
  }
};

export const trackFormSubmission = (success: boolean) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'form_submission',
      success,
      timestamp: new Date().toISOString()
    });
  }
};

export const trackPartialLeadSubmission = (data: any) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'partial_lead_submission',
      hasEmail: !!data.email,
      hasPhone: !!data.phone,
      timestamp: new Date().toISOString()
    });
  }
};

export const trackPaymentCompletion = (transactionId: string, amount: number) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'payment_complete',
      transactionId,
      amount,
      currency: 'EUR',
      timestamp: new Date().toISOString()
    });
  }
};
