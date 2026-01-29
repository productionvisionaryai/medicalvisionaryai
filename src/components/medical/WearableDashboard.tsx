'use client';

import { Activity, Heart, Moon, Footprints, Zap, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WearableDashboard() {
    const metrics = [
        {
            title: 'Cardiac Rhythm',
            value: '72',
            unit: 'BPM',
            status: 'Optimal Range',
            icon: <Heart className="w-4 h-4 text-pheromone-flush" />,
            color: 'from-pheromone-flush/20',
            trend: '+2% Stability'
        },
        {
            title: 'Circadian Sync',
            value: '85',
            unit: '%',
            status: 'Deep Restored',
            icon: <Moon className="w-4 h-4 text-indigo-400" />,
            color: 'from-indigo-500/20',
            trend: 'REM Peak'
        },
        {
            title: 'Metabolic Flow',
            value: '45',
            unit: 'MIN',
            status: 'Peak Active',
            icon: <Activity className="w-4 h-4 text-reward-gold" />,
            color: 'from-reward-gold/20',
            trend: 'Target Hit'
        },
        {
            title: 'Kinetic Energy',
            value: '8,432',
            unit: 'STEPS',
            status: 'Moving Fast',
            icon: <Footprints className="w-4 h-4 text-pheromone-glow" />,
            color: 'from-pheromone-glow/20',
            trend: 'Top 5%'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-2">
            {metrics.map((item, index) => (
                <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="medical-card group border-white/5 bg-obsidian-soft/40 backdrop-blur-3xl overflow-hidden p-6"
                >
                    {/* Background Gradient Glow */}
                    <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${item.color} to-transparent blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:border-pheromone-glow/30 transition-colors">
                                {item.icon}
                            </div>
                            <span className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase">
                                {item.trend}
                            </span>
                        </div>

                        <div className="mb-1">
                            <h3 className="text-[11px] font-bold text-reward-gold/60 uppercase tracking-widest">
                                {item.title}
                            </h3>
                            <div className="flex items-baseline gap-1.5 mt-1">
                                <span className="text-4xl font-light tracking-tighter text-white">
                                    {item.value}
                                </span>
                                <span className="text-[10px] font-mono text-white/40 tracking-tighter">
                                    {item.unit}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-pheromone-glow shadow-[0_0_8px_rgba(255,175,148,0.6)]" />
                                <span className="text-[10px] font-bold text-reward-silver/60 uppercase tracking-tight">
                                    {item.status}
                                </span>
                            </div>
                            <Zap className="w-3 h-3 text-white/10 group-hover:text-reward-gold transition-colors" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}