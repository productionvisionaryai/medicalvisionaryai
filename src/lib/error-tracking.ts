/**
 * Error Tracking Service
 * 
 * Abstraction layer for error tracking and monitoring.
 * Prepares for integration with services like Sentry, LogRocket, etc.
 */

export interface ErrorTrackingConfig {
    enabled: boolean;
    dsn?: string;
    environment: string;
    release?: string;
    sampleRate?: number;
}

export interface ErrorContext {
    component?: string;
    action?: string;
    userId?: string;
    sessionId?: string;
    [key: string]: unknown;
}

export class ErrorTracker {
    private config: ErrorTrackingConfig;
    private initialized = false;
    private sessionId: string;

    constructor(config: ErrorTrackingConfig) {
        this.config = config;
        this.sessionId = this.generateSessionId();
    }

    private generateSessionId(): string {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    async initialize(): Promise<void> {
        if (!this.config.enabled || this.initialized) {
            return;
        }

        // Initialize error tracking service here (e.g., Sentry)
        // For now, just log to console in development
        this.initialized = true;

        if (process.env.NODE_ENV === 'development') {
            console.log(`🔍 Error tracking initialized for ${this.config.environment}`);
            console.log(`📊 Session ID: ${this.sessionId}`);
        }
    }

    /**
     * Capture an error with context
     */
    captureError(error: Error, context?: ErrorContext): void {
        const errorData = {
            message: error.message,
            stack: error.stack,
            name: error.name,
            timestamp: new Date().toISOString(),
            environment: this.config.environment,
            release: this.config.release,
            sessionId: this.sessionId,
            ...context
        };

        if (!this.config.enabled) {
            // In development, log to console
            if (process.env.NODE_ENV === 'development') {
                console.group('🚨 Error Tracked');
                console.error('Error:', error);
                console.table(context);
                console.groupEnd();
            }
            return;
        }

        // TODO: Send to actual error tracking service
        this.sendToTrackingService('error', errorData);
    }

    /**
     * Capture a message with severity level
     */
    captureMessage(
        message: string,
        level: 'info' | 'warning' | 'error' = 'info',
        context?: ErrorContext
    ): void {
        if (!this.config.enabled) {
            if (process.env.NODE_ENV === 'development') {
                console.log(`[${level.toUpperCase()}] ${message}`, context);
            }
            return;
        }

        const messageData = {
            message,
            level,
            timestamp: new Date().toISOString(),
            environment: this.config.environment,
            sessionId: this.sessionId,
            ...context
        };

        this.sendToTrackingService('message', messageData);
    }

    /**
     * Capture a breadcrumb for debugging context
     */
    addBreadcrumb(
        category: string,
        message: string,
        data?: Record<string, unknown>
    ): void {
        if (!this.config.enabled) return;

        const breadcrumb = {
            category,
            message,
            timestamp: new Date().toISOString(),
            data
        };

        // TODO: Send breadcrumb to tracking service
        if (process.env.NODE_ENV === 'development') {
            console.log('🍞 Breadcrumb:', breadcrumb);
        }
    }

    /**
     * Set user context for error tracking
     */
    setUser(userId: string, userData?: Record<string, unknown>): void {
        if (!this.config.enabled) return;

        // TODO: Set user context in tracking service
        if (process.env.NODE_ENV === 'development') {
            console.log('👤 User context set:', { userId, ...userData });
        }
    }

    /**
     * Clear user context
     */
    clearUser(): void {
        if (!this.config.enabled) return;

        // TODO: Clear user context in tracking service
        if (process.env.NODE_ENV === 'development') {
            console.log('👤 User context cleared');
        }
    }

    /**
     * Send data to tracking service
     */
    private sendToTrackingService(type: 'error' | 'message', data: unknown): void {
        // TODO: Implement actual service integration
        // For now, just log in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`📤 Would send ${type} to tracking service:`, data);
        }

        // Example Sentry integration:
        // if (window.Sentry) {
        //   if (type === 'error') {
        //     window.Sentry.captureException(data);
        //   } else {
        //     window.Sentry.captureMessage(data.message, data.level);
        //   }
        // }
    }

    /**
     * Get current session ID
     */
    getSessionId(): string {
        return this.sessionId;
    }
}

// Create singleton instance
export const errorTracker = new ErrorTracker({
    enabled: process.env.NODE_ENV === 'production',
    environment: process.env.NODE_ENV || 'development',
    release: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    sampleRate: 1.0, // 100% in development, adjust for production
});

// Auto-initialize
if (typeof window !== 'undefined') {
    errorTracker.initialize();
}
