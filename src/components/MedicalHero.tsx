'use client'
import { motion } from 'framer-motion';
import { Globe, Zap, ShieldCheck } from 'lucide-react';

export default function MedicalHero() {
  return (
    <section className="relative h-[95vh] w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Capa de Video: Ahora con un efecto más técnico y oscuro para resaltar el texto */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 grayscale"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
        {/* Overlay de partículas y profundidad: "Digital Pheromones" de alta tecnología */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl">
        {/* Badge de Tecnología de Vanguardia */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-[10px] text-blue-200 uppercase tracking-[0.4em] font-medium">
            Protocolo de Holopresencia Activo
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-9xl font-light tracking-tighter text-white mb-8 leading-[0.85]"
        >
          Presencia clínica <br />
          <span className="font-serif italic bg-gradient-to-r from-blue-200 to-blue-500 bg-clip-text text-transparent">
            sin fronteras
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-2xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed mb-12"
        >
          Helena AI: Inteligencia Aumentada que elimina la distancia física. 
          Telemetría en tiempo real y diagnóstico de alta especialidad <br className="hidden md:block" />
          <span className="text-white">teletransportados a cualquier lugar del mundo.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button className="group relative bg-white text-black px-12 py-6 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95 overflow-hidden">
            <span className="relative z-10">Desplegar Infraestructura</span>
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          
          <div className="flex items-center gap-8 ml-0 md:ml-4">
            <div className="flex flex-col items-start">
              <span className="text-blue-500 text-xl font-bold">{'< 1ms'}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Latencia</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-800"></div>
            <div className="flex flex-col items-start">
              <span className="text-white text-xl font-bold">∞</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Escalabilidad</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decoración técnica de los lados */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="text-[10px] text-slate-600 font-mono space-y-1">
          <p>SYSTEM_STATUS: OPTIMAL</p>
          <p>ENCRYPTION: AES-256-QUANTUM</p>
          <p>NEURAL_LINK: ESTABLISHED</p>
        </div>
      </div>
    </section>
  );
}