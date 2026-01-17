'use client'
import { motion } from 'framer-motion';

export default function MedicalHero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center bg-white">
      {/* Capa de Video: El disparador de atracción visual */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30 grayscale-[30%]"
        >
          {/* Ruta optimizada para el archivo en public/ hero-background.mp4 */}
          <source src="/hero-background.mp4" type="video/mp4" />
          Tu navegador no soporta videos.
        </video>
        {/* Overlay para asegurar legibilidad y "Digital Pheromones" */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-900/60 text-xs uppercase tracking-[0.3em] font-bold mb-4 block"
        >
          Excelencia Estética Progresiva
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-light tracking-tighter text-slate-900 mb-8 leading-[0.9]"
        >
          La ciencia de tu <br />
          <span className="font-serif italic text-blue-900/40">mejor versión</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Acompañamiento humano liderado por Elena, tu coordinadora de bienestar. 
          Seguridad clínica y armonía corporal en cada paso.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <button className="bg-slate-900 text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-900 transition-all shadow-2xl active:scale-95">
            Iniciar Valoración
          </button>
          <button className="text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-900 transition-all">
            Ver Procedimientos
          </button>
        </motion.div>
      </div>
    </section>
  );
}