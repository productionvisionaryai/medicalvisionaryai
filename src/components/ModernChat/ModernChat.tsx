'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Send, Bot, User, Activity, Sparkles, 
    RefreshCw, Phone, Calendar, ShieldCheck, 
    AlertTriangle, HeartPulse 
} from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";

import MedicalAlert from './MedicalAlert';
import RecoveryActions from './RecoveryActions';
import ConsentForm from './ConsentForm';

interface ModernChatProps {
    patientId: string;
}

export default function ModernChat({ patientId }: ModernChatProps) {
    const [hasConsent, setHasConsent] = useState<boolean>(false);

    // 1. Inicialización de Cal.com (Superioridad en Agendamiento)
    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", {
                theme: "light",
                styles: { branding: { brandColor: "#2563eb" } },
                hideEventTypeDetails: false,
                layout: "month_view"
            });
        })();
    }, []);

    // 2. Verificación de Consentimiento
    useEffect(() => {
        const consent = localStorage.getItem('helena_medical_consent');
        if (consent === 'true') setHasConsent(true);
    }, []);

    // 3. Configuración del Hook de AI
    const { messages, input, handleInputChange, handleSubmit, reload, isLoading, error } = useChat({
        api: '/api/medical-chat',
        body: { patientId },
        onError: (err) => {
            console.error("Nexus Audit - Chat Error:", err);
        }
    });

    const handleConsentComplete = () => {
        localStorage.setItem('helena_medical_consent', 'true');
        setHasConsent(true);
    };

    // 4. Analizador de Contexto Nexus (Acciones Proactivas)
    const getContextualActions = useCallback((content: string) => {
        const text = content.toLowerCase();
        
        // A. DETECCIÓN DE AGENDAMIENTO (Cal.com Bridge)
        if (text.includes('agendar') || text.includes('cita') || text.includes('disponibilidad') || text.includes('consultorio')) {
            return (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-2xl shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-3 text-blue-800">
                        <Calendar size={16} className="text-blue-600" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Asistente de Agendamiento</span>
                    </div>
                    <button 
                        data-cal-link="visionary-ai/consulta-especializada"
                        className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.98]"
                    >
                        Ver Horarios Disponibles
                    </button>
                    <p className="text-[10px] text-blue-400 mt-2 text-center">
                        Sincronización directa con la agenda del especialista.
                    </p>
                </motion.div>
            );
        }
        
        // B. DETECCIÓN DE URGENCIA (Triaje)
        if (text.includes('urgente') || text.includes('emergencia') || text.includes('dolor fuerte') || text.includes('⚠️')) {
            return (
                <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <MedicalAlert
                        type="warning"
                        title="Protocolo de Prioridad Detectado"
                        description="Basado en el análisis de síntomas, Helena sugiere atención inmediata."
                        actions={
                            <RecoveryActions 
                                actions={[
                                    { 
                                        label: 'Llamar a Emergencias', 
                                        variant: 'primary', 
                                        icon: <Phone size={16} />,
                                        onClick: () => window.open('tel:911')
                                    },
                                    { 
                                        label: 'Contactar Clínica', 
                                        variant: 'secondary', 
                                        icon: <Activity size={16} />,
                                        onClick: () => window.open('tel:+525616737467')
                                    }
                                ]} 
                            />
                        }
                    />
                </div>
            );
        }
        return null;
    }, []);

    if (!hasConsent) {
        return <ConsentForm onAccept={handleConsentComplete} />;
    }

    return (
        <div className="flex flex-col h-[88vh] md:h-[85vh] w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden mb-4">
            
            {/* Header: Estado del Sistema */}
            <div className="p-5 border-b bg-slate-50/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                        <Activity className="text-white w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            Helena AI 
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[9px] rounded-full uppercase font-black">PRO</span>
                        </h2>
                        <span className="flex items-center gap-1.5 text-[10px] text-green-600 font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            Sincronización Biométrica Activa
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                    <ShieldCheck size={18} className="text-blue-500 hover:text-blue-600 cursor-help" title="Cifrado HIPAA Activo" />
                    <HeartPulse size={18} className="text-rose-400" title="Integración Vital" />
                </div>
            </div>

            {/* Zona de Mensajes */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white to-slate-50/20">
                <AnimatePresence mode='popLayout'>
                    {messages.length === 0 && !error && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-400">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <h3 className="text-slate-700 font-bold text-lg">Consulta de Alta Especialidad</h3>
                            <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2 leading-relaxed">
                                Helena procesa lenguaje natural y métricas clínicas para asistirle en tiempo real.
                            </p>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                            <MedicalAlert
                                type="error"
                                title="Falla de Conexión Segura"
                                description="Hubo un problema al contactar con el motor de inferencia. Tus datos están a salvo."
                                actions={
                                    <RecoveryActions 
                                        actions={[{ label: 'Reintentar consulta', variant: 'primary', icon: <RefreshCw size={16} />, onClick: () => reload() }]} 
                                    />
                                }
                            />
                        </motion.div>
                    )}

                    {messages.map((m) => (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex gap-3 max-w-[88%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ${
                                    m.role === 'user' ? 'bg-slate-100 text-slate-500' : 'bg-blue-600 text-white'
                                }`}>
                                    {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                </div>
                                <div className="space-y-2">
                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                                        m.role === 'user' 
                                            ? 'bg-slate-900 text-white rounded-tr-none shadow-lg' 
                                            : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                                    }`}>
                                        {m.content}
                                    </div>
                                    {m.role === 'assistant' && getContextualActions(m.content)}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {isLoading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 items-center ml-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                            </div>
                            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Helena está analizando...</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Form */}
            <div className="p-6 bg-white border-t">
                <form onSubmit={handleSubmit} className="relative mb-3">
                    <input
                        className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm placeholder:text-slate-400"
                        value={input}
                        placeholder="Describa síntomas o solicite una cita..."
                        onChange={handleInputChange}
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-30 transition-all shadow-md active:scale-95"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
                <div className="flex items-center justify-center gap-2">
                     <AlertTriangle size={12} className="text-amber-500" />
                     <p className="text-[10px] text-slate-400 font-medium">
                        Uso clínico restringido. En caso de emergencia, contacte servicios locales (911).
                     </p>
                </div>
            </div>
        </div>
    );
}