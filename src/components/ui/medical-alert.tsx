/**
 * Medical Alert Component
 * 
 * Medical-themed alert component for displaying important messages
 * with appropriate styling for healthcare context.
 */

'use client';

import { ReactNode } from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

interface MedicalAlertProps {
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    description: string;
    icon?: ReactNode;
    className?: string;
    actions?: ReactNode;
}

const alertStyles = {
    success: {
        container: 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200',
        icon: 'text-green-600',
        title: 'text-green-900',
        description: 'text-green-700',
        defaultIcon: <CheckCircle className="h-6 w-6" />
    },
    error: {
        container: 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200',
        icon: 'text-red-600',
        title: 'text-red-900',
        description: 'text-red-700',
        defaultIcon: <XCircle className="h-6 w-6" />
    },
    warning: {
        container: 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200',
        icon: 'text-yellow-600',
        title: 'text-yellow-900',
        description: 'text-yellow-700',
        defaultIcon: <AlertTriangle className="h-6 w-6" />
    },
    info: {
        container: 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200',
        icon: 'text-blue-600',
        title: 'text-blue-900',
        description: 'text-blue-700',
        defaultIcon: <Info className="h-6 w-6" />
    }
};

export default function MedicalAlert({
    type,
    title,
    description,
    icon,
    className = '',
    actions
}: MedicalAlertProps) {
    const styles = alertStyles[type];

    return (
        <div
            className={`rounded-xl border-2 p-6 ${styles.container} ${className}`}
            role="alert"
        >
            <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 ${styles.icon}`}>
                    {icon || styles.defaultIcon}
                </div>

                <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 ${styles.title}`}>
                        {title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${styles.description}`}>
                        {description}
                    </p>

                    {actions && (
                        <div className="mt-4">
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
