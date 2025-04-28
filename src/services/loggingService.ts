
type LogLevel = 'info' | 'warning' | 'error' | 'success';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
}

class LoggingService {
  private static instance: LoggingService;
  private logs: LogEntry[] = [];
  private maxLogs: number = 100;
  
  private constructor() {}
  
  public static getInstance(): LoggingService {
    if (!LoggingService.instance) {
      LoggingService.instance = new LoggingService();
    }
    return LoggingService.instance;
  }
  
  public log(level: LogLevel, message: string, data?: any): void {
    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data
    };
    
    // Add to memory logs (with limit)
    this.logs.unshift(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }
    
    // Also log to console with appropriate styling
    switch (level) {
      case 'info':
        console.info(`[INFO] ${message}`, data);
        break;
      case 'warning':
        console.warn(`[WARNING] ${message}`, data);
        break;
      case 'error':
        console.error(`[ERROR] ${message}`, data);
        break;
      case 'success':
        console.log(`%c[SUCCESS] ${message}`, 'color: green', data);
        break;
    }
    
    // Here we could also send logs to an external service
    this.persistLogs();
  }
  
  public info(message: string, data?: any): void {
    this.log('info', message, data);
  }
  
  public warning(message: string, data?: any): void {
    this.log('warning', message, data);
  }
  
  public error(message: string, data?: any): void {
    this.log('error', message, data);
  }
  
  public success(message: string, data?: any): void {
    this.log('success', message, data);
  }
  
  public getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return [...this.logs];
  }
  
  private persistLogs(): void {
    // Save the most recent logs to localStorage for persistence
    try {
      localStorage.setItem('application_logs', JSON.stringify(this.logs.slice(0, 20)));
    } catch (error) {
      console.error("Failed to persist logs to localStorage", error);
    }
  }
  
  public loadPersistedLogs(): void {
    try {
      const savedLogs = localStorage.getItem('application_logs');
      if (savedLogs) {
        const parsedLogs = JSON.parse(savedLogs) as LogEntry[];
        this.logs = [...parsedLogs, ...this.logs].slice(0, this.maxLogs);
      }
    } catch (error) {
      console.error("Failed to load persisted logs", error);
    }
  }
  
  public clearLogs(): void {
    this.logs = [];
    try {
      localStorage.removeItem('application_logs');
    } catch (error) {
      console.error("Failed to clear persisted logs", error);
    }
  }
}

// Export a singleton instance
const logger = LoggingService.getInstance();
// Load any persisted logs when the service is first initialized
logger.loadPersistedLogs();

export default logger;
