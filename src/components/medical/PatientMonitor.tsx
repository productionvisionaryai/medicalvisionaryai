'use client';

import { Activity, AlertCircle, Waves, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface PatientMonitorProps {
    phase: string;
}

export default function PatientMonitor({ phase }: PatientMonitorProps) {
    return (
        <div className="medical-card bg-obsidian-soft/40 backdrop-blur-2xl border-white/5 relative group">
            {/* Aura de Vida (Bio-Luminiscencia) */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pheromone-glow/5 blur-[60px] rounded-full" />
            
            <div className="relative z-10">
                {/* Header: Status de Conexión Neural */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-2 h-2 bg-pheromone-flush rounded-full animate-ping absolute inset-0" />
                            <div className="w-2 h-2 bg-pheromone-flush rounded-full relative" />
                        </div>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase font-mono">
                            Neural Stream Active
                        </span>
                    </div>
                    <div className="px-3 py-1 rounded-full border border-reward-gold/20 bg-reward-gold/5">
                        <span className="text-[10px] font-bold text-reward-gold uppercase tracking-tighter">
                            {phase}
                        </span>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Heart Rate: Con Efecto de Pulso Orgánico */}
                    <div className="group/metric">
                        <div className="flex justify-between items-end mb-3">
                            <div className="flex items-center gap-2">
                                <Heart className="w-4 h-4 text-pheromone-flush group-hover/metric:scale-125 transition-transform duration-500" />
                                <span className="text-xs font-medium text-white/50 uppercase tracking-widest">Heart Rate</span>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-light tracking-tighter text-white">78</span>
                                <span className="text-xs font-mono text-pheromone-flush ml-1 uppercase">bpm</span>
                            </div>
                        </div>
                        <div className="h-12 bg-white/[0.02] rounded-2xl border border-white/5 overflow-hidden relative">
                            {/* Simulación de ECG estilizada */}
                            <motion.div 
                                animate={{ x: [-100, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="absolute inset-0 flex items-center"
                            >
                                <Activity className="w-full h-8 text-pheromone-flush/20" />
                                <Activity className="w-full h-8 text-pheromone-flush/20" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Oxygen Saturation: Barra de Progreso Líquida */}
                    <div className="group/metric">
                        <div className="flex justify-between items-end mb-3">
                            <div className="flex items-center gap-2">
                                <Waves className="w-4 h-4 text-reward-gold group-hover/metric:rotate-12 transition-transform duration-500" />
                                <span className="text-xs font-medium text-white/50 uppercase tracking-widest">SpO2 Sync</span>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-light tracking-tighter text-white">98</span>
                                <span className="text-xs font-mono text-reward-gold ml-1 uppercase">%</span>
                            </div>
                        </div>
                        <div className="w-full bg-white/[0.02] h-2 rounded-full border border-white/5 overflow-hidden p-[1px]">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '98%' }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className="h-full bg-gradient-to-r from-pheromone-glow to-reward-gold rounded-full shadow-[0_0_10px_rgba(226,184,125,0.4)]" 
                            />
                        </div>
                    </div>

                    {/* Alerta: IA Insight (Neuro-Response) */}
                    <motion.div 
                        whileHover={{ y: -2 }}
                        className="p-5 rounded-[1.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-md"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-2 rounded-xl bg-reward-gold/10 border border-reward-gold/20">
                                <Zap className="w-4 h-4 text-reward-gold" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-reward-gold uppercase tracking-[0.1em] mb-1">
                                    Helena Predictive Insight
                                </div>
                                <div className="text-sm text-reward-silver/70 leading-relaxed font-light">
                                    Hemodinámica estable. El patrón circadiano sugiere una <span className="text-pheromone-glow italic font-medium">ventana de recuperación óptima</span> en las próximas 2 horas.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer: Metadata Técnica */}
                <div className="mt-8 flex justify-center">
                    <div className="text-[8px] font-mono text-white/20 tracking-[0.4em] uppercase">
                        Telemetry Core v4.0 // Sec-Encrypted
                    </div>
                </div>
            </div>
        </div>
    );
}