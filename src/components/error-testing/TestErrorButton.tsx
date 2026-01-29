/**
 * Test Error Button
 * 
 * Development-only component to simulate various error conditions
 * for testing error boundaries and fallbacks.
 */

'use client';

import { useState } from 'react';
import { Bug, AlertTriangle, Server, ShieldAlert } from 'lucide-react';

const errorTypes = {
    render: () => {
        throw new Error('Simulated React render error');
    },
    network: () => {
        throw new Error('NetworkError: Failed to fetch medical data from Groq API');
    },
    medical: () => {
        throw new Error('Medical data validation failed: Invalid surgeon ID format');
    },
    critical: () => {
        throw new Error('CRITICAL: Data integrity check failed for patient records');
    }
};

export default function TestErrorButton() {
    const [errorType, setErrorType] = useState<keyof typeof errorTypes>('render');

    // Only show in development or if explicitly enabled via env
    if (process.env.NODE_ENV !== 'development' && process.env.NEXT_PUBLIC_ENABLE_ERROR_TESTING !== 'true') {
        return null;
    }

    const triggerError = () => {
        errorTypes[errorType]();
    };

    return (
        <div className="fixed bottom-24 right-6 z-[60] bg-white p-4 rounded-2xl shadow-2xl border border-red-100 max-w-[200px]">
            <div className="flex items-center gap-2 mb-3 text-red-600">
                <Bug className="h-5 w-5" />
                <span className="font-bold text-xs uppercase tracking-wider">Error Lab</span>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="text-[10px] uppercase text-gray-400 font-bold mb-1 block">Scenario</label>
                    <select
                        value={errorType}
                        onChange={(e) => setErrorType(e.target.value as keyof typeof errorTypes)}
                        className="w-full text-xs border border-gray-100 rounded-lg px-2 py-2 bg-gray-50 outline-none focus:ring-2 focus:ring-red-100 transition-all font-medium"
                    >
                        <option value="render">General Render</option>
                        <option value="network">Network / API</option>
                        <option value="medical">Medical Meta</option>
                        <option value="critical">Critical Safety</option>
                    </select>
                </div>

                <button
                    onClick={triggerError}
                    className="w-full bg-red-600 text-white text-[11px] font-bold py-2 px-3 rounded-lg hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-200 flex items-center justify-center gap-2"
                >
                    <AlertTriangle size={14} />
                    Detonate Error
                </button>
            </div>
        </div>
    );
}
