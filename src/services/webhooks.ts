
import { toast } from "@/hooks/use-toast";

// Maximum number of retries for failed webhooks
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

interface WebhookPayload {
  [key: string]: any;
}

interface WebhookResponse {
  success: boolean;
  error?: string;
  retryCount?: number;
}

// Helper to delay between retries
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const sendWebhook = async (
  webhookUrl: string | undefined,
  payload: WebhookPayload,
  options = { maxRetries: MAX_RETRIES }
): Promise<WebhookResponse> => {
  if (!webhookUrl) {
    console.warn(`Webhook URL not configured: ${JSON.stringify(payload)}`);
    return { success: false, error: "Webhook URL not configured" };
  }

  let retryCount = 0;

  while (retryCount <= options.maxRetries) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          ...payload,
          timestamp: new Date().toISOString(),
          retryCount,
        }),
      });

      // Since we're using no-cors, we'll assume success unless an error is thrown
      console.log(`Webhook sent successfully to ${webhookUrl}`, {
        payload,
        retryCount,
      });

      return { success: true, retryCount };
    } catch (error) {
      console.error(`Webhook attempt ${retryCount + 1} failed:`, error);
      
      if (retryCount < options.maxRetries) {
        await delay(RETRY_DELAY * Math.pow(2, retryCount)); // Exponential backoff
        retryCount++;
      } else {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
          retryCount,
        };
      }
    }
  }

  return {
    success: false,
    error: "Max retries exceeded",
    retryCount,
  };
};

export const sendWebhookWithNotification = async (
  webhookUrl: string | undefined,
  payload: WebhookPayload,
  description: string
): Promise<WebhookResponse> => {
  const result = await sendWebhook(webhookUrl, payload);

  if (!result.success) {
    toast({
      title: "Erreur de notification",
      description: `${description} - ${result.error}. Réessayez plus tard.`,
      variant: "destructive",
    });
  }

  return result;
};
