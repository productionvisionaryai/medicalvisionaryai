/**
 * Medical Chat Error Boundary
 * 
 * Specialized error handling for the AI medical consultation chat.
 * Provides context-aware messaging and recovery options for patients.
 */

'use client';

import { ReactNode } from 'react';
import { ComponentErrorBoundary } from './ComponentErrorBoundary';
import { errorRecovery } from '@/lib/error-recovery';

interface MedicalChatErrorBoundaryProps {
    children: ReactNode;
}

export function MedicalChatErrorBoundary({ children }: MedicalChatErrorBoundaryProps) {
    const handleRetry = () => {
        // Clear the specific chat error state but keep message history if possible
        // Note: In a real app, you might want to trigger a specific state reset here
        window.location.reload();
    };

    return (
        <ComponentErrorBoundary
            componentName="Medical Consultation"
            instructions={[
                "Your consultation session was interrupted due to a technical issue",
                "We've preserved your conversation data for safety",
                "Click 'Retry' to continue or 'Start Over' for a new assessment"
            ]}
            preserveDataKey="medical-chat-history"
            onRetry={handleRetry}
        >
            {children}
        </ComponentErrorBoundary>
    );
}

export default MedicalChatErrorBoundary;
