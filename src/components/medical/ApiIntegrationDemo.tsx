'use client';

import { Check, Loader2, ArrowRight } from 'lucide-react';

interface ApiIntegrationDemoProps {
    step: number;
    wearable: string;
}

export default function ApiIntegrationDemo({ step, wearable }: ApiIntegrationDemoProps) {
    return (
        <div className="border border-gray-200 rounded-xl p-6 bg-white">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Consola de Integración: {wearable}
            </h4>

            <div className="space-y-4">
                <div className={`flex items-center gap-3 p-3 rounded-lg ${step >= 1 ? 'bg-green-50 text-green-900' : 'bg-gray-50 text-gray-400'}`}>
                    {step > 1 ? <Check className="w-5 h-5" /> : step === 1 ? <Loader2 className="w-5 h-5 animate-spin" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-300" />}
                    <span className="font-mono text-sm">OAuth 2.0 Handshake...</span>
                </div>

                <div className={`flex items-center gap-3 p-3 rounded-lg ${step >= 2 ? 'bg-green-50 text-green-900' : 'bg-gray-50 text-gray-400'}`}>
                    {step > 2 ? <Check className="w-5 h-5" /> : step === 2 ? <Loader2 className="w-5 h-5 animate-spin" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-300" />}
                    <span className="font-mono text-sm">Syncing Historical Data...</span>
                </div>

                <div className={`flex items-center gap-3 p-3 rounded-lg ${step >= 3 ? 'bg-green-50 text-green-900' : 'bg-gray-50 text-gray-400'}`}>
                    {step > 3 ? <Check className="w-5 h-5" /> : step === 3 ? <Loader2 className="w-5 h-5 animate-spin" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-300" />}
                    <span className="font-mono text-sm">Establishing Webhook Connection...</span>
                </div>

                <div className={`flex items-center gap-3 p-3 rounded-lg ${step >= 4 ? 'bg-green-50 text-green-900' : 'bg-gray-50 text-gray-400'}`}>
                    {step > 4 ? <Check className="w-5 h-5" /> : step === 4 ? <Loader2 className="w-5 h-5 animate-spin" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-300" />}
                    <span className="font-mono text-sm">Helena AI Analysis Active</span>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <div className="text-xs text-gray-400 font-mono">
                    Status: {step === 4 ? 'CONNECTED' : 'INITIALIZING...'}
                </div>
            </div>
        </div>
    );
}
