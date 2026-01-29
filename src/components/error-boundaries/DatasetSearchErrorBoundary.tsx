/**
 * Dataset Search Error Boundary
 * 
 * Specialized error boundary for the medical case search functionality.
 */

'use client';

import { ReactNode } from 'react';
import { ComponentErrorBoundary } from './ComponentErrorBoundary';

interface DatasetSearchErrorBoundaryProps {
    children: ReactNode;
}

export function DatasetSearchErrorBoundary({ children }: DatasetSearchErrorBoundaryProps) {
    return (
        <ComponentErrorBoundary
            componentName="Medical Case Search"
            instructions={[
                "The search service is temporarily unavailable",
                "This may be due to a connection issue or high traffic",
                "Please try a different search term or refresh the dataset"
            ]}
            onRetry={() => {
                // Custom logic to reset search state could go here
                window.location.hash = '#demo-chat';
                window.location.reload();
            }}
        >
            {children}
        </ComponentErrorBoundary>
    );
}

export default DatasetSearchErrorBoundary;
