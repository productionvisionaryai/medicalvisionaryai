/**
 * Error Fallback Component
 * 
 * User-friendly error display with recovery options.
 * Provides different messaging for medical vs general errors.
 */

'use client';

import { AlertTriangle, RefreshCw, Home, MessageSquare, Clock } from 'lucide-react';
import MedicalAlert from '../ui/medical-alert';
import RecoveryActions from '../ui/recovery-actions';
import { errorRecovery } from '@/lib/error-recovery';
import { useEffect, useState } from 'react';

interface ErrorFallbackProps {
    error: Error | null;
    errorInfo?: React.ErrorInfo | null;
    onReset?: () => void;
    componentName?: string;
    instructions?: string[];
}

export default function ErrorFallback({
    error,
    errorInfo,
    onReset,
    componentName = 'Application',
    instructions
}: ErrorFallbackProps) {
    const [hasRecoveryData, setHasRecoveryData] = useState(false);
    const [timeSinceError, setTimeSinceError] = useState<string | null>(null);

    useEffect(() => {
        const checkRecovery = async () => {
            const hasData = await errorRecovery.hasRecoveryData(componentName);
            setHasRecoveryData(hasData);

            if (hasData) {
                const time = await errorRecovery.getTimeSinceError(componentName);
                setTimeSinceError(time);
            }
        };

        checkRecovery();
    }, [componentName]);

    const errorMessage = error?.message || 'An unexpected error occurred';
    const isNetworkError = errorMessage.includes('Network') || errorMessage.includes('fetch') || errorMessage.includes('timeout');
    const isMedicalError = componentName.includes('Medical') || componentName.includes('Consultation') || componentName.includes('Chat');

    const getUserFriendlyMessage = (): string => {
        if (isMedicalError) {
            if (isNetworkError) {
                return 'Our medical AI assistant is temporarily unavailable. Please check your internet connection and try again in a moment. Your consultation data has been saved.';
            }
            return 'We encountered an issue with the medical consultation system. Your data has been preserved and you can retry or start a new consultation.';
        }

        if (isNetworkError) {
            return 'Unable to connect to our servers. Please check your internet connection and try again.';
        }

        return 'We encountered an unexpected issue. Our team has been notified and will fix this shortly.';
    };

    const getInstructions = (): string[] => {
        if (instructions) return instructions;

        if (isMedicalError) {
            return [
                'Your consultation session was interrupted',
                hasRecoveryData ? 'We\'ve saved your conversation data' : 'No data was lost',
                'Click \'Retry\' to continue or \'Start Over\' for a new consultation'
            ];
        }

        return [
            'The application encountered an error',
            'You can try refreshing the page',
            'Or return to the home page to start over'
        ];
    };

    const actions = [
        {
            label: onReset ? 'Retry' : 'Refresh Page',
            icon: <RefreshCw className="h-4 w-4" />,
            onClick: onReset || (() => window.location.reload()),
            primary: true
        },
        ...(isMedicalError ? [{
            label: 'Start New Consultation',
            icon: <MessageSquare className="h-4 w-4" />,
            onClick: async () => {
                await errorRecovery.clearState(componentName);
                window.location.href = '/';
            },
            variant: 'secondary' as const
        }] : []),
        {
            label: 'Return Home',
            icon: <Home className="h-4 w-4" />,
            onClick: () => window.location.href = '/',
            variant: 'ghost' as const
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Main Error Alert */}
                <MedicalAlert
                    type="error"
                    title={`${componentName} Error`}
                    description={getUserFriendlyMessage()}
                    icon={<AlertTriangle className="h-6 w-6" />}
                    className="mb-6"
                />

                {/* Instructions */}
                {getInstructions().length > 0 && (
                    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                        <h4 className="font-medium text-gray-900 mb-3 text-sm">What happened?</h4>
                        <ul className="space-y-2">
                            {getInstructions().map((instruction, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    <span>{instruction}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Recovery Data Info */}
                {hasRecoveryData && timeSinceError && (
                    <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-blue-700">
                            <Clock className="h-4 w-4" />
                            <span>Data saved {timeSinceError}</span>
                        </div>
                    </div>
                )}

                {/* Recovery Actions */}
                <RecoveryActions actions={actions} className="mb-6" />

                {/* Technical Details (Development Only) */}
                {process.env.NODE_ENV === 'development' && error && (
                    <details className="mt-4 text-sm">
                        <summary className="cursor-pointer mb-2 text-gray-600 hover:text-gray-900 font-medium">
                            Technical Details (Development Only)
                        </summary>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto max-h-96">
                            <div className="mb-2">
                                <span className="font-semibold text-red-400">Error:</span>
                                <span className="ml-2">{error.message}</span>
                            </div>
                            <pre className="whitespace-pre-wrap text-xs mt-2">
                                {error.stack || 'No stack trace available'}
                            </pre>
                            {errorInfo && (
                                <>
                                    <div className="mt-4 font-semibold text-yellow-400">Component Stack:</div>
                                    <pre className="whitespace-pre-wrap text-xs mt-1">
                                        {errorInfo.componentStack}
                                    </pre>
                                </>
                            )}
                        </div>
                    </details>
                )}

                {/* Support Contact */}
                <div className="mt-6 text-center text-xs text-gray-500">
                    <p>If this problem persists, please contact support:</p>
                    <p className="mt-1">
                        <a href="mailto:aisynths@visionaryai.lat" className="text-blue-600 hover:underline">
                            aisynths@visionaryai.lat
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
