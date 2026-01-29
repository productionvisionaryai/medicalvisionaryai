/**
 * Centralized Configuration Management
 * 
 * This file provides a single source of truth for all application configuration.
 * All environment variables are accessed through this module to ensure consistency
 * and enable validation.
 */

// ============================================
// Type Definitions
// ============================================

interface ApiConfig {
  groq: {
    apiKey: string | undefined;
    model: string;
    temperature: number;
    maxTokens: number;
  };
  resend: {
    apiKey: string | undefined;
    fromEmail: string;
    fromName: string;
    toDefault: string;
  };
}

interface ContactConfig {
  phone: string;
  whatsapp: string;
  email: string;
  supportEmail: string;
  address: string;
}

interface BusinessConfig {
  name: string;
  address: string;
  websiteUrl: string;
}

interface FeatureFlags {
  enableWearables: boolean;
  enableLeadCapture: boolean;
  enableDatasetMode: boolean;
}

interface RateLimits {
  maxRequestsPerMinute: number;
  maxConsultationsPerDay: number;
}

interface AppConfig {
  api: ApiConfig;
  contact: ContactConfig;
  business: BusinessConfig;
  features: FeatureFlags;
  limits: RateLimits;
  env: {
    nodeEnv: string;
    isDevelopment: boolean;
    isProduction: boolean;
    appUrl: string;
  };
}

// ============================================
// Configuration Object
// ============================================

export const config: AppConfig = {
  api: {
    groq: {
      apiKey: process.env.GROQ_API_KEY,
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
      maxTokens: parseInt(process.env.AI_MAX_TOKENS || '2000', 10),
    },
    resend: {
      apiKey: process.env.RESEND_API_KEY,
      fromEmail: process.env.EMAIL_FROM_ADDRESS || 'pavel@medical.visionaryai.lat',
      fromName: process.env.EMAIL_FROM_NAME || 'Helena AI',
      toDefault: process.env.EMAIL_TO_DEFAULT || 'scubapab84@gmail.com',
    },
  },
  contact: {
    phone: process.env.CONTACT_PHONE || '+52-56-16-73-74-67',
    whatsapp: process.env.WHATSAPP_NUMBER || '525616737467',
    email: process.env.CONTACT_EMAIL || 'aisynths@visionaryai.lat',
    supportEmail: process.env.SUPPORT_EMAIL || 'support@visionaryai.lat',
    address: process.env.BUSINESS_ADDRESS || 'Av. Revolución 1500, CDMX',
  },
  business: {
    name: process.env.BUSINESS_NAME || 'Visionary AI Labs',
    address: process.env.BUSINESS_ADDRESS || 'Av. Revolución 1500, CDMX',
    websiteUrl: process.env.WEBSITE_URL || 'https://medical.visionaryai.lat',
  },
  features: {
    enableWearables: process.env.ENABLE_WEARABLES === 'true',
    enableLeadCapture: process.env.ENABLE_LEAD_CAPTURE !== 'false', // Default true
    enableDatasetMode: process.env.ENABLE_DATASET_MODE !== 'false', // Default true
  },
  limits: {
    maxRequestsPerMinute: parseInt(process.env.MAX_REQUESTS_PER_MINUTE || '10', 10),
    maxConsultationsPerDay: parseInt(process.env.MAX_CONSULTATIONS_PER_DAY || '100', 10),
  },
  env: {
    nodeEnv: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV !== 'production',
    isProduction: process.env.NODE_ENV === 'production',
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
};

// ============================================
// Validation
// ============================================

interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export function validateConfig(): ValidationError[] {
  const errors: ValidationError[] = [];

  // Critical API keys
  if (!config.api.groq.apiKey) {
    errors.push({
      field: 'GROQ_API_KEY',
      message: 'GROQ_API_KEY is required for AI functionality',
      severity: 'error',
    });
  }

  if (!config.api.resend.apiKey) {
    errors.push({
      field: 'RESEND_API_KEY',
      message: 'RESEND_API_KEY is required for email functionality',
      severity: 'warning', // Warning since email might be optional
    });
  }

  // Validate numeric ranges
  if (config.api.groq.temperature < 0 || config.api.groq.temperature > 2) {
    errors.push({
      field: 'AI_TEMPERATURE',
      message: 'AI_TEMPERATURE should be between 0 and 2',
      severity: 'warning',
    });
  }

  if (config.api.groq.maxTokens < 100 || config.api.groq.maxTokens > 10000) {
    errors.push({
      field: 'AI_MAX_TOKENS',
      message: 'AI_MAX_TOKENS should be between 100 and 10000',
      severity: 'warning',
    });
  }

  // Validate URLs
  if (config.env.isProduction && !config.env.appUrl.startsWith('https://')) {
    errors.push({
      field: 'NEXT_PUBLIC_APP_URL',
      message: 'Production app URL should use HTTPS',
      severity: 'error',
    });
  }

  return errors;
}

/**
 * Throws an error if critical configuration is missing
 */
export function requireValidConfig(): void {
  const errors = validateConfig();
  const criticalErrors = errors.filter(e => e.severity === 'error');

  if (criticalErrors.length > 0) {
    const errorMessages = criticalErrors.map(e => `  - ${e.field}: ${e.message}`).join('\n');
    throw new Error(`Configuration validation failed:\n${errorMessages}`);
  }

  // Log warnings in development
  const warnings = errors.filter(e => e.severity === 'warning');
  if (warnings.length > 0 && config.env.isDevelopment) {
    console.warn('⚠️  Configuration warnings:');
    warnings.forEach(w => console.warn(`  - ${w.field}: ${w.message}`));
  }
}

/**
 * Safe getter for API keys that throws helpful errors
 */
export function getRequiredApiKey(service: 'groq' | 'resend'): string {
  const key = service === 'groq' ? config.api.groq.apiKey : config.api.resend.apiKey;
  
  if (!key) {
    throw new Error(
      `${service.toUpperCase()}_API_KEY is not configured. ` +
      `Please set it in your .env file. See .env.example for reference.`
    );
  }
  
  return key;
}

// ============================================
// Exports
// ============================================

export default config;
