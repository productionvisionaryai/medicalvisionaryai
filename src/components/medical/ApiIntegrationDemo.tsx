'use client';

import { Check, Loader2, Zap, Terminal, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApiIntegrationDemoProps {
    step: number;
    wearable: string;
}

export default function ApiIntegrationDemo({ step, wearable }: ApiIntegrationDemoProps) {
    return (
        <div className="medical-card border-none bg-obsidian-soft/50 backdrop-blur-xl relative overflow-hidden group">
            {/* Efecto de luz ambiental (Digital Pheromone) */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-pheromone-glow/10 blur-[80px] rounded-full group-hover:bg-pheromone-glow/20 transition-all duration-700" />
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-pheromone-glow/10 border border-pheromone-glow/20">
                            <Terminal className="w-4 h-4 text-pheromone-glow" />
                        </div>
                        <div>
                            <h4 className="text-[10px] font-bold text-reward-gold/50 uppercase tracking-[0.2em]">
                                Biometric Linkage Protocol
                            </h4>
                            <p className="text-reward-silver font-medium tracking-tight">
                                {wearable.replace('-', ' ').toUpperCase()}
                            </p>
                        </div>
                    </div>
                    {step === 4 && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-emerald-500 tracking-wider">LIVE FEED</span>
                        </motion.div>
                    )}
                </div>

                <div className="space-y-3">
                    {[
                        { id: 1, label: 'Securing OAuth 2.0 Handshake', sub: 'Encrypted Tunneling' },
                        { id: 2, label: 'Syncing Historical Biomarkers', sub: 'Retrieving Baseline Data' },
                        { id: 3, label: 'Calibrating Neural Webhooks', sub: 'Low Latency Stream' },
                        { id: 4, label: 'Helena AI Analysis Active', sub: 'Algorithmic Intimacy Engaged' },
                    ].map((item) => (
                        <div
                            key={item.id}
                            className={`relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 border ${
                                step >= item.id 
                                ? 'bg-white/[0.03] border-white/10' 
                                : 'bg-transparent border-transparent opacity-30'
                            }`}
                        >
                            <div className="flex shrink-0">
                                {step > item.id ? (
                                    <div className="bg-pheromone-glow/20 p-1 rounded-full">
                                        <Check className="w-4 h-4 text-pheromone-glow" />
                                    </div>
                                ) : step === item.id ? (
                                    <Loader2 className="w-4 h-4 text-reward-gold animate-spin" />
                                ) : (
                                    <div className="w-4 h-4 rounded-full border border-white/20" />
                                )}
                            </div>

                            <div className="flex-1">
                                <p className={`text-sm font-medium ${step >= item.id ? 'text-reward-silver' : 'text-white/20'}`}>
                                    {item.label}
                                </p>
                                <p className="text-[10px] font-mono text-white/30 tracking-wide uppercase">
                                    {item.sub}
                                </p>
                            </div>

                            {step === item.id && (
                                <motion.div 
                                    layoutId="active-pointer"
                                    className="absolute left-0 w-1 h-8 bg-pheromone-glow rounded-r-full shadow-[0_0_15px_rgba(255,175,148,0.5)]" 
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-reward-gold/40" />
                        <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">
                            HIPAA Compliant AES-256
                        </span>
                    </div>
                    <div className="text-[10px] font-mono text-pheromone-glow/60">
                        {step === 4 ? 'ESTABLISHED' : 'POLLING_DATA...'}
                    </div>
                </div>
            </div>
        </div>
    );
}