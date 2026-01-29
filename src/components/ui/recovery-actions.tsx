/**
 * Recovery Actions Component
 * 
 * Displays action buttons for error recovery with consistent styling.
 */

'use client';

import { ReactNode } from 'react';

interface RecoveryAction {
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
    primary?: boolean;
    variant?: 'primary' | 'secondary' | 'ghost';
    disabled?: boolean;
}

interface RecoveryActionsProps {
    actions: RecoveryAction[];
    className?: string;
}

export default function RecoveryActions({ actions, className = '' }: RecoveryActionsProps) {
    const getButtonStyles = (action: RecoveryAction): string => {
        const baseStyles = 'flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

        if (action.primary || action.variant === 'primary') {
            return `${baseStyles} bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-lg hover:shadow-xl`;
        }

        if (action.variant === 'secondary') {
            return `${baseStyles} bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50`;
        }

        if (action.variant === 'ghost') {
            return `${baseStyles} bg-transparent text-gray-600 hover:bg-gray-100`;
        }

        // Default
        return `${baseStyles} bg-gray-100 text-gray-700 hover:bg-gray-200`;
    };

    return (
        <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
            {actions.map((action, index) => (
                <button
                    key={index}
                    onClick={action.onClick}
                    disabled={action.disabled}
                    className={getButtonStyles(action)}
                    type="button"
                >
                    {action.icon && (
                        <span className="flex-shrink-0">
                            {action.icon}
                        </span>
                    )}
                    <span>{action.label}</span>
                </button>
            ))}
        </div>
    );
}
