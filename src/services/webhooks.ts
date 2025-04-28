
import logger from "./loggingService";
import { toast } from "@/hooks/use-toast";

interface WebhookResult {
  success: boolean;
  status?: number;
  message?: string;
  data?: any;
  timestamp: string;
}

interface WebhookAnalytics {
  totalCalls: number;
  successfulCalls: number;
  failedCalls: number;
  averageResponseTime: number;
}

class WebhookService {
  private static instance: WebhookService;
  private analytics: WebhookAnalytics = {
    totalCalls: 0,
    successfulCalls: 0,
    failedCalls: 0,
    averageResponseTime: 0
  };
  private results: Record<string, WebhookResult[]> = {};
  private MAX_RESULTS_PER_ENDPOINT = 20;
  
  private constructor() {
    // Load analytics from localStorage if available
    try {
      const savedAnalytics = localStorage.getItem('webhook_analytics');
      if (savedAnalytics) {
        this.analytics = JSON.parse(savedAnalytics);
      }
    } catch (error) {
      logger.error("Failed to load webhook analytics from localStorage", error);
    }
  }
  
  public static getInstance(): WebhookService {
    if (!WebhookService.instance) {
      WebhookService.instance = new WebhookService();
    }
    return WebhookService.instance;
  }
  
  private updateAnalytics(success: boolean, responseTime: number): void {
    this.analytics.totalCalls++;
    if (success) {
      this.analytics.successfulCalls++;
    } else {
      this.analytics.failedCalls++;
    }
    
    // Update average response time
    const totalTime = this.analytics.averageResponseTime * (this.analytics.totalCalls - 1) + responseTime;
    this.analytics.averageResponseTime = totalTime / this.analytics.totalCalls;
    
    // Persist analytics
    try {
      localStorage.setItem('webhook_analytics', JSON.stringify(this.analytics));
    } catch (error) {
      logger.error("Failed to persist webhook analytics", error);
    }
  }
  
  private recordResult(endpoint: string, result: WebhookResult): void {
    if (!this.results[endpoint]) {
      this.results[endpoint] = [];
    }
    
    // Add result to the beginning of the array
    this.results[endpoint].unshift(result);
    
    // Limit the number of results we keep per endpoint
    if (this.results[endpoint].length > this.MAX_RESULTS_PER_ENDPOINT) {
      this.results[endpoint] = this.results[endpoint].slice(0, this.MAX_RESULTS_PER_ENDPOINT);
    }
  }
  
  public getAnalytics(): WebhookAnalytics {
    return {...this.analytics};
  }
  
  public getResults(endpoint?: string): Record<string, WebhookResult[]> | WebhookResult[] {
    if (endpoint) {
      return this.results[endpoint] || [];
    }
    return {...this.results};
  }
  
  public async sendWebhook(endpoint: string, data: any, retries = 2, retryDelay = 1000): Promise<WebhookResult> {
    // Log complete endpoint for debugging
    logger.info(`Sending webhook to ${endpoint}`, { data });
    
    // Check if webhook URL is properly formed
    if (!endpoint || !endpoint.startsWith('http')) {
      logger.error(`Invalid webhook URL: ${endpoint}`);
      toast({
        title: "Erreur de configuration",
        description: `L'URL du webhook n'est pas valide: ${endpoint}. Veuillez vérifier votre configuration.`,
        variant: "destructive",
      });
      
      return {
        success: false,
        message: `Invalid webhook URL: ${endpoint}`,
        timestamp: new Date().toISOString()
      };
    }
    
    const startTime = Date.now();
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors', // This is necessary for cross-origin requests to many webhook providers
        body: JSON.stringify(data),
      });
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      // With no-cors we can't actually check the response status,
      // so we assume success unless there's an exception
      const result: WebhookResult = {
        success: true,
        message: 'Webhook sent successfully',
        timestamp: new Date().toISOString()
      };
      
      this.updateAnalytics(true, responseTime);
      this.recordResult(endpoint, result);
      logger.success(`Webhook to ${endpoint} succeeded in ${responseTime}ms`);
      
      return result;
    } catch (error) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      logger.error(`Webhook to ${endpoint} failed`, error);
      
      // Implement retry logic
      if (retries > 0) {
        logger.info(`Retrying webhook to ${endpoint} in ${retryDelay}ms (${retries} retries left)`);
        
        return new Promise(resolve => {
          setTimeout(async () => {
            const retryResult = await this.sendWebhook(endpoint, data, retries - 1, retryDelay * 2);
            resolve(retryResult);
          }, retryDelay);
        });
      }
      
      // All retries failed
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      const result: WebhookResult = {
        success: false,
        message: `Failed after all retry attempts: ${errorMessage}`,
        timestamp: new Date().toISOString(),
        data: error
      };
      
      this.updateAnalytics(false, responseTime);
      this.recordResult(endpoint, result);
      
      return result;
    }
  }
  
  public resetAnalytics(): void {
    this.analytics = {
      totalCalls: 0,
      successfulCalls: 0,
      failedCalls: 0,
      averageResponseTime: 0
    };
    
    try {
      localStorage.setItem('webhook_analytics', JSON.stringify(this.analytics));
    } catch (error) {
      logger.error("Failed to reset webhook analytics", error);
    }
  }
}

const webhookService = WebhookService.getInstance();

// Function to send webhook with notification
export async function sendWebhookWithNotification(
  endpoint: string, 
  data: any, 
  errorMessage: string = "Échec de l'envoi des données"
): Promise<boolean> {
  try {
    if (!endpoint) {
      toast({
        title: "Configuration manquante",
        description: "L'URL du webhook n'est pas configurée. Veuillez configurer les variables d'environnement.",
        variant: "destructive",
      });
      logger.warning("Missing webhook URL", { data });
      return false;
    }
    
    const result = await webhookService.sendWebhook(endpoint, data);
    
    if (!result.success) {
      toast({
        title: "Avertissement",
        description: errorMessage,
        variant: "destructive",
      });
      logger.warning(errorMessage, { endpoint, data, result });
      return false;
    }
    
    return true;
  } catch (error) {
    const errorDetails = error instanceof Error ? error.message : "Erreur inconnue";
    toast({
      title: "Erreur",
      description: `${errorMessage}: ${errorDetails}`,
      variant: "destructive",
    });
    logger.error(`${errorMessage}: ${errorDetails}`, { endpoint, data, error });
    return false;
  }
}

// Export the webhook service for analytics access
export { webhookService };
