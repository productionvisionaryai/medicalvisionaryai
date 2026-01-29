/**
 * Global Error Boundary Component
 * 
 * Top-level error boundary that catches all unhandled errors in the application.
 * Provides user-friendly error display and error logging capabilities.
 */

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorFallback from './ErrorFallback';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error: Error): Partial<State> {
        // Update state so the next render will show the fallback UI
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log error to console in development
        console.error('🚨 Global Error Boundary caught an error:', error, errorInfo);

        // Log to error tracking service
        this.logError(error, errorInfo);

        // Update state with error info
        this.setState({
            error,
            errorInfo
        });
    }

    private logError(error: Error, errorInfo: ErrorInfo): void {
        // Import error tracker dynamically to avoid circular dependencies
        if (typeof window !== 'undefined') {
            import('@/lib/error-tracking').then(({ errorTracker }) => {
                errorTracker.captureError(error, {
                    component: 'GlobalErrorBoundary',
                    componentStack: errorInfo.componentStack,
                    timestamp: new Date().toISOString(),
                });
            });
        }

        // Log to console for development
        if (process.env.NODE_ENV === 'development') {
            console.group('🔍 Error Details');
            console.error('Error:', error.message);
            console.error('Stack:', error.stack);
            console.error('Component Stack:', errorInfo.componentStack);
            console.groupEnd();
        }
    }

    handleReset = (): void => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    render(): ReactNode {
        if (this.state.hasError) {
            // Use custom fallback if provided, otherwise use default
            return this.props.fallback || (
                <ErrorFallback
                    error={this.state.error}
                    errorInfo={this.state.errorInfo}
                    onReset={this.handleReset}
                    componentName="Application"
                />
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;
