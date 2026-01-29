/**
 * Component Error Boundary
 * 
 * Reusable error boundary for wrapping individual components.
 * Provides component-specific error handling and recovery options.
 */

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorFallback from './ErrorFallback';
import { errorRecovery } from '@/lib/error-recovery';

interface Props {
    children: ReactNode;
    componentName: string;
    fallback?: ReactNode;
    instructions?: string[];
    preserveDataKey?: string;
    onRetry?: () => void;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ComponentErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error: Error): Partial<State> {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error(`🚨 Error in ${this.props.componentName}:`, error, errorInfo);

        // Call custom error handler if provided
        this.props.onError?.(error, errorInfo);

        // Save component state for recovery if key is provided
        if (this.props.preserveDataKey) {
            this.saveComponentState(error);
        }

        // Log to error tracking
        this.logError(error, errorInfo);

        this.setState({
            error,
            errorInfo
        });
    }

    private saveComponentState(error: Error): void {
        if (!this.props.preserveDataKey) return;

        try {
            // Save current component state for potential recovery
            errorRecovery.saveState(
                this.props.componentName,
                {
                    preserveKey: this.props.preserveDataKey,
                    timestamp: Date.now(),
                },
                error.message
            );
        } catch (err) {
            console.warn('Failed to save component state:', err);
        }
    }

    private logError(error: Error, errorInfo: ErrorInfo): void {
        if (typeof window !== 'undefined') {
            import('@/lib/error-tracking').then(({ errorTracker }) => {
                errorTracker.captureError(error, {
                    component: this.props.componentName,
                    componentStack: errorInfo.componentStack,
                    preserveDataKey: this.props.preserveDataKey,
                });
            });
        }
    }

    handleReset = async (): Promise<void> => {
        // Clear saved state if exists
        if (this.props.preserveDataKey) {
            await errorRecovery.clearState(this.props.componentName);
        }

        // Call custom retry handler if provided
        if (this.props.onRetry) {
            this.props.onRetry();
        }

        // Reset error state
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    render(): ReactNode {
        if (this.state.hasError) {
            return this.props.fallback || (
                <ErrorFallback
                    error={this.state.error}
                    errorInfo={this.state.errorInfo}
                    onReset={this.handleReset}
                    componentName={this.props.componentName}
                    instructions={this.props.instructions}
                />
            );
        }

        return this.props.children;
    }
}

export default ComponentErrorBoundary;
