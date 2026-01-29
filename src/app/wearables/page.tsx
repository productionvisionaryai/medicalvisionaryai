'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, Scale, Moon, Heart, Zap, Brain,
    Database, Shield, Smartphone, Cpu, Cloud,
    ArrowRight, CheckCircle, Watch,
    BarChart3, Globe, Lock, Radio
} from 'lucide-react';

// Componentes conceptuales (asumidos)
import WearableDashboard from '@/components/medical/WearableDashboard';
import ApiIntegrationDemo from '@/components/medical/ApiIntegrationDemo';
import PatientMonitor from '@/components/medical/PatientMonitor';

export default function WearablesIntegrationPage() {
    const [activeWearable, setActiveWearable] = useState('google-fit');
    const [integrationStep, setIntegrationStep] = useState(1);

    const wearablesData = [
        {
            id: 'google-fit',
            name: 'Cloud Health Bridge',
            provider: 'Google Fit API',
            icon: <Cloud className="w-6 h-6" />,
            color: 'text-blue-400',
            glow: 'shadow-blue-500/20',
            metrics: ['Peso', 'IMC', 'Frecuencia Cardíaca', 'SpO2'],
            status: 'Certificación Grado Médico'
        },
        {
            id: 'withings',
            name: 'Precision Scale Systems',
            provider: 'Withings API',
            icon: <Scale className="w-6 h-6" />,
            color: 'text-emerald-400',
            glow: 'shadow-emerald-500/20',
            metrics: ['Composición Corporal', 'Presión Arterial', 'VOP'],
            status: 'Ideal para Post-Bariátrica'
        },
        {
            id: 'oura',
            name: 'Circadian Telemetry',
            provider: 'Oura Ring API',
            icon: <Moon className="w-6 h-6" />,
            color: 'text-purple-400',
            glow: 'shadow-purple-500/20',
            metrics: ['Readiness Score', 'HRV', 'Temperatura Corporal'],
            status: 'Monitoreo de Recuperación'
        },
        {
            id: 'apple-health',
            name: 'Bio-Ecosystem Sync',
            provider: 'Apple HealthKit',
            icon: <Heart className="w-6 h-6" />,
            color: 'text-rose-400',
            glow: 'shadow-rose-500/20',
            metrics: ['ECG', 'VO2 Máx', 'Glucosa Dinámica'],
            status: 'Integración Nativa iOS'
        }
    ];

    return (
        <main className="min-h-screen bg-[#030303] text-slate-200 selection:bg-blue-500/30">
            {/* Background Elements - Efecto de Profundidad */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/10 rounded-full blur-[120px]" />
            </div>

            {/* Hero Section: Telemetría Humana */}
            <section className="relative pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-blue-500/5 border border-blue-500/20 px-4 py-2 rounded-full mb-8 backdrop-blur-md"
                    >
                        <Radio className="w-4 h-4 text-blue-400 animate-pulse" />
                        <span className="text-xs font-bold tracking-[0.2em] text-blue-400 uppercase">
                            Protocolo de Telemetría Humana v2.4
                        </span>
                    </motion.div>

                    <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8">
                        Sincronización <br />
                        <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent">
                            Biométrica en Tiempo Real
                        </span>
                    </h1>

                    <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
                        Helena AI no solo procesa datos; construye un <span className="text-white italic">Gemelo Digital</span> de sus pacientes. 
                        Integramos sensores de grado clínico para detectar variaciones fisiológicas antes de que se conviertan en complicaciones.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        {['Encriptación AES-256', 'Arquitectura HIPAA', 'Baja Latencia'].map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm font-medium text-slate-300 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                                <Lock className="w-4 h-4 text-emerald-400" />
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dashboard: La "Caja Negra" Médica */}
            <section className="px-4 py-10 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                        <div className="border-b border-white/10 bg-white/5 px-8 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                                </div>
                                <span className="text-xs font-mono text-slate-500 ml-4 italic">HELENA_AI_CORE_V2 / TELEMETRY_FEED</span>
                            </div>
                            <div className="text-xs font-mono text-blue-400">STATUS: LIVE_STREAMING</div>
                        </div>
                        <div className="p-8">
                            <WearableDashboard />
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid de Dispositivos: Estilo Cyber-Clinical */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wearablesData.map((wearable) => (
                            <motion.button
                                key={wearable.id}
                                onClick={() => setActiveWearable(wearable.id)}
                                whileHover={{ y: -5 }}
                                className={`group p-8 rounded-3xl text-left transition-all relative border ${
                                    activeWearable === wearable.id 
                                    ? 'bg-blue-600/10 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]' 
                                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                                }`}
                            >
                                <div className={`p-4 rounded-2xl bg-white/5 w-fit mb-6 transition-colors ${activeWearable === wearable.id ? 'text-blue-400' : 'text-slate-500'}`}>
                                    {wearable.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-1">{wearable.name}</h3>
                                <p className="text-sm text-slate-500 mb-6 font-mono">{wearable.provider}</p>
                                
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {wearable.metrics.map(m => (
                                            <span key={m} className="text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-1 rounded">
                                                {m}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="pt-4 border-t border-white/5">
                                        <span className={`text-xs font-bold uppercase tracking-tighter ${activeWearable === wearable.id ? 'text-blue-400' : 'text-slate-600'}`}>
                                            {wearable.status}
                                        </span>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Arquitectura de Datos - Visualización de Flujo */}
            <section className="py-24 px-4 bg-white/[0.01] border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-8">Arquitectura de <br />Intervención Predictiva</h2>
                            <div className="space-y-8">
                                {[
                                    { icon: <Database />, title: 'Ingesta de Datos', desc: 'Captura masiva vía OAuth 2.0 y Webhooks de baja latencia.' },
                                    { icon: <Brain />, title: 'Análisis Neural', desc: 'Helena AI procesa tendencias de HRV y SpO2 para detectar riesgos post-op.' },
                                    { icon: <Zap />, title: 'Respuesta Autónoma', desc: 'Alertas automáticas al equipo médico si los parámetros se desvían del 15%.' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                                            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl">
                             <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
                             <ApiIntegrationDemo step={integrationStep} wearable={activeWearable} />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final: Estilo Interstellar */}
            <section className="py-32 px-4 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-5xl font-bold mb-8 italic">¿Listo para desplegar el futuro?</h2>
                    <p className="text-xl text-slate-400 mb-12">
                        Active la telemetría avanzada en su clínica hoy mismo. 
                        Implementación técnica completa en menos de 72 horas.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(59,130,246,0.4)' }}
                            className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all"
                        >
                            Solicitar Acceso API
                        </motion.button>
                        <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all">
                            Ver Documentación
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}