/**
 * Medical Disclaimer Component
 * 
 * Legally required disclosure stating that Helena AI is not a substitute 
 * for professional medical advice.
 */

'use client';

import { AlertTriangle, Shield, Stethoscope, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MedicalDisclaimer() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl mb-8 shadow-sm"
        >
            <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-lg mr-4 flex-shrink-0">
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
                        Aviso de Responsabilidad Médica
                    </h3>
                    <div className="space-y-3 text-amber-800 text-sm leading-relaxed">
                        <p>
                            <strong>Helena AI es una herramienta informativa únicamente.</strong> No sustituye el consejo médico profesional, diagnóstico o tratamiento de su cirujano.
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 pl-1">
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>Busque siempre el consejo de su médico cirujano.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>Nunca ignore el consejo médico por información leída aquí.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>En caso de emergencia, contacte a servicios locales de urgencias.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>Información basada en conocimiento general, no en su historial personal.</span>
                            </li>
                        </ul>

                        <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-amber-200/60">
                            <div className="flex items-center gap-2 px-3 py-1 bg-amber-100/50 rounded-full border border-amber-200">
                                <Shield className="h-3.5 w-3.5 text-amber-600" />
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">Sin aprobación FDA/COFEPRIS</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-amber-100/50 rounded-full border border-amber-200">
                                <Stethoscope className="h-3.5 w-3.5 text-amber-600" />
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">Consulte a su Especialista</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-amber-100/50 rounded-full border border-amber-200">
                                <Info className="h-3.5 w-3.5 text-amber-600" />
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">Herramienta Experimental</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
