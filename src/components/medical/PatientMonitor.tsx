'use client';

import { LineChart, Activity, AlertCircle } from 'lucide-react';

interface PatientMonitorProps {
    phase: string;
}

export default function PatientMonitor({ phase }: PatientMonitorProps) {
    return (
        <div className="bg-gray-900 text-white rounded-xl p-4 shadow-inner">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono text-gray-400">LIVE MONITORING</span>
                </div>
                <span className="text-xs font-bold text-blue-400">{phase}</span>
            </div>

            <div className="space-y-6">
                <div>
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-xs text-gray-400">Heart Rate</span>
                        <span className="text-lg font-mono text-green-400">78 <span className="text-xs text-gray-500">bpm</span></span>
                    </div>
                    <div className="h-10 bg-gray-800 rounded overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-600 opacity-20">
                            <Activity className="w-full h-8" />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-xs text-gray-400">Oxygen Saturation</span>
                        <span className="text-lg font-mono text-blue-400">98 <span className="text-xs text-gray-500">%</span></span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[98%]"></div>
                    </div>
                </div>

                <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                        <div>
                            <div className="text-xs font-semibold text-gray-200">Alert Recommendation</div>
                            <div className="text-[10px] text-gray-400 mt-1">
                                Patient stability is within normal range. Continue current monitoring protocol for {phase}.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
