/**
 * Critical Medical Boundary
 * 
 * Extremely strict error boundary for critical medical information displays.
 * If this fails, it ensures no partial or incorrect medical data is shown.
 */

'use client';

import { ReactNode } from 'react';
import { ComponentErrorBoundary } from './ComponentErrorBoundary';
import { ShieldAlert } from 'lucide-react';

interface CriticalMedicalBoundaryProps {
    children: ReactNode;
}

export function CriticalMedicalBoundary({ children }: CriticalMedicalBoundaryProps) {
    return (
        <ComponentErrorBoundary
            componentName="Critical Medical Information"
            instructions={[
                "Critical data display failed validation",
                "For your safety, partial information has been hidden",
                "Please contact your surgeon if you cannot see your surgical plan"
            ]}
            fallback={
                <div className="p-8 bg-red-50 border-2 border-red-200 rounded-2xl flex flex-col items-center text-center">
                    <ShieldAlert className="w-12 h-12 text-red-600 mb-4" />
                    <h2 className="text-xl font-bold text-red-900 mb-2">Security Interruption</h2>
                    <p className="text-red-700 mb-6 max-w-md">
                        We encountered an error loading critical medical data. To ensure accuracy and patient safety,
                        this section has been disabled.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                        Attempt Secure Reload
                    </button>
                </div>
            }
        >
            {children}
        </ComponentErrorBoundary>
    );
}

export default CriticalMedicalBoundary;
