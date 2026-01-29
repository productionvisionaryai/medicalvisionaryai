/**
 * Terms Of Service Component
 * 
 * Detailed legal terms for using the Helena AI assistant.
 */

'use client';

import { FileText, ExternalLink } from 'lucide-react';

export default function TermsOfService() {
    const sections = [
        {
            title: "1. Naturaleza del Servicio",
            content: "Helena AI es un modelo de lenguaje de inteligencia artificial diseñado para la educación médica y asistencia informativa. No constituye una relación médico-paciente."
        },
        {
            title: "2. Limitación de Responsabilidad",
            content: "Ni Visionary AI Labs ni los cirujanos afiliados se hacen responsables por decisiones tomadas basadas únicamente en las respuestas generadas por el asistente."
        },
        {
            title: "3. Uso por Menores",
            content: "El uso de esta herramienta está restringido a mayores de 18 años o menores con supervisión parental explícita para fines educativos."
        }
    ];

    return (
        <div className="bg-white rounded-3xl p-8 border border-slate-100 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
            <div className="flex items-center gap-2 mb-6">
                <FileText className="h-5 w-5 text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-900">Términos y Condiciones</h3>
            </div>

            <div className="space-y-6">
                {sections.map((section, idx) => (
                    <div key={idx}>
                        <h4 className="text-sm font-bold text-slate-800 mb-2 uppercase tracking-wide">{section.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            {section.content}
                        </p>
                    </div>
                ))}

                <div className="pt-4 border-t border-slate-50">
                    <a href="#" className="inline-flex items-center gap-2 text-xs text-blue-600 font-semibold hover:underline">
                        Ver términos completos legalmente vinculantes
                        <ExternalLink className="h-3 w-3" />
                    </a>
                </div>
            </div>
        </div>
    );
}
