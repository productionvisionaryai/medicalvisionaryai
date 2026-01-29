/**
 * Privacy Notice Component
 * 
 * HIPAA-inspired transparency notice regarding how potential lead 
 * and medical data is handled.
 */

'use client';

import { Lock, EyeOff, Server, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyNotice() {
    return (
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 p-2.5 rounded-xl">
                    <Lock className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-slate-900 leading-none">Compromiso de Privacidad</h3>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Estándares de Seguridad Avanzada</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                            <EyeOff className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-800 mb-1">Confidencialidad Médica</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Su información personal es tratada con el mismo rigor que un expediente clínico físico. No compartimos datos con terceros.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                            <Server className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-800 mb-1">Procesamiento Seguro</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Los datos son procesados en servidores encriptados y las consultas de IA se realizan bajo protocolos de anonimización.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                            <UserCheck className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-800 mb-1">Control del Paciente</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Usted mantiene el control total sobre su información. Puede solicitar la eliminación de sus datos en cualquier momento.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-2xl p-4">
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight leading-normal">
                            Aviso: Aunque Helena AI sigue estrictos protocolos inspirados en HIPAA, esta plataforma es una demo técnica y no debe usarse para transmitir información quirúrgica crítica de emergencia.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
