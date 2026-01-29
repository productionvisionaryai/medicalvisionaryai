/**
 * Consent Form Component
 * 
 * A modal-style or embedded form that requires users to read 
 * and accept the medical disclaimer and terms before using Helena AI.
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import MedicalDisclaimer from './MedicalDisclaimer';
import TermsOfService from './TermsOfService';

interface ConsentFormProps {
    onAccept: () => void;
}

export default function ConsentForm({ onAccept }: ConsentFormProps) {
    const [hasScrolledTerms, setHasScrolledTerms] = useState(false);
    const [agreedDisclaimer, setAgreedDisclaimer] = useState(false);
    const [agreedTerms, setAgreedTerms] = useState(false);

    const canAccept = agreedDisclaimer && agreedTerms;

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 overflow-hidden">
            <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-900 text-white p-3 rounded-2xl shadow-lg shadow-blue-900/30">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-light text-slate-900">Protocolo de <span className="font-semibold">Consentimiento</span></h2>
                            <p className="text-slate-400 text-sm mt-1">Para su seguridad, lea y acepte antes de iniciar</p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-2 text-blue-900/40 text-[10px] font-bold uppercase tracking-widest">
                        <span>Seguridad</span>
                        <div className="w-1 h-1 bg-blue-900 rounded-full"></div>
                        <span>Ética</span>
                        <div className="w-1 h-1 bg-blue-900 rounded-full"></div>
                        <span>Privacidad</span>
                    </div>
                </div>

                <div className="space-y-8">
                    <MedicalDisclaimer />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <TermsOfService />

                        <div className="flex flex-col justify-center space-y-6">
                            <div className="space-y-4">
                                <label className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-100 transition-all cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={agreedDisclaimer}
                                        onChange={(e) => setAgreedDisclaimer(e.target.checked)}
                                        className="w-5 h-5 rounded-lg text-blue-900 border-slate-200 focus:ring-blue-900 cursor-pointer"
                                    />
                                    <span className="text-sm font-medium text-slate-700 leading-tight">
                                        Comprendo que Helena es un asistente informativo y no sustituye a mi médico.
                                    </span>
                                </label>

                                <label className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-100 transition-all cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={agreedTerms}
                                        onChange={(e) => setAgreedTerms(e.target.checked)}
                                        className="w-5 h-5 rounded-lg text-blue-900 border-slate-200 focus:ring-blue-900 cursor-pointer"
                                    />
                                    <span className="text-sm font-medium text-slate-700 leading-tight">
                                        Acepto los términos de servicio y el procesamiento seguro de mis datos.
                                    </span>
                                </label>
                            </div>

                            <motion.button
                                whileHover={canAccept ? { scale: 1.02, x: 5 } : {}}
                                whileTap={canAccept ? { scale: 0.98 } : {}}
                                disabled={!canAccept}
                                onClick={onAccept}
                                className={`w-full p-5 rounded-2xl flex items-center justify-center gap-3 font-semibold transition-all duration-300 ${canAccept
                                        ? 'bg-blue-900 text-white shadow-xl shadow-blue-900/30 hover:bg-slate-900'
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                                    }`}
                            >
                                {canAccept ? <UserCheck className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5 opacity-50" />}
                                <span>{canAccept ? 'Iniciar Consulta Segura' : 'Complete el protocolo para iniciar'}</span>
                                {canAccept && <ArrowRight className="h-5 w-5 ml-2" />}
                            </motion.button>

                            <p className="text-center text-[10px] text-slate-400 font-medium px-6">
                                Al hacer clic en "Iniciar Consulta Segura", usted confirma que es mayor de edad y que ha leído nuestra política de privacidad HIPAA-inspired.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
