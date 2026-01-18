export interface MedicalChatRequest {
    query: string;
    patientContext?: string;
    language?: 'es' | 'en';
}

export interface MedicalChatResponse {
    reasoning: string;
    answer: string;
    metadata?: {
        consultationId: string;
        timestamp: string;
        model: string;
        hasFullFormat: boolean;
    };
    error?: string;
    details?: string;
}

export interface ConsultationMetadata {
    id: string;
    timestamp: Date;
    querySummary: string;
    urgencyLevel: 'low' | 'medium' | 'high';
    requiresFollowUp: boolean;
}
