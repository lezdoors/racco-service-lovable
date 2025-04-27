
export const GTM_ID = import.meta.env.VITE_GTM_ID || '';

// Initialize Google Tag Manager
export const initGTM = () => {
  if (GTM_ID && typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });
    
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    
    document.head.appendChild(script);
    
    // Add the noscript iframe for environments where JavaScript is disabled
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
    
    console.log('Google Tag Manager initialized:', GTM_ID);
  } else {
    console.warn('Google Tag Manager ID not provided. GTM will not be initialized.');
  }
};

// Add dataLayer event for form step change
export const trackFormStep = (stepNumber: number, stepName: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'formStepChange',
      formStep: stepNumber,
      formStepName: stepName
    });
  }
};

// Add dataLayer event for form submission
export const trackFormSubmission = (success: boolean) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'formSubmission',
      formCompleted: true,
      formSuccess: success,
      conversionValue: 1,  // For Google Ads tracking
      transaction_id: `LEAD-${Date.now()}` // Generate a unique ID for each submission
    });
  }
};

// Add dataLayer event for payment completion
export const trackPaymentCompletion = (transactionId: string, amount: number) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'paymentComplete',
      ecommerce: {
        purchase: {
          transaction_id: transactionId,
          value: amount,
          currency: 'EUR'
        }
      }
    });
  }
};

// Create Type Definitions for window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}
