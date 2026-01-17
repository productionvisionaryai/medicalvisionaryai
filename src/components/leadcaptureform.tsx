'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LeadCaptureForm() {
  const [step, setStep] = useState(1);

  return (
    <section className="py-20 bg-white px-4">
      <div className="max-w-xl mx-auto border border-slate-100 p-8 rounded-3xl shadow-sm">
        <div className="text-center mb-8">
          <span className="text-blue-900/60 text-xs uppercase tracking-widest font-semibold">Valoración Virtual</span>
          <h2 className="text-3xl font-light text-slate-900 mt-2">Cuéntanos tu objetivo</h2>
        </div>

        <form className="space-y-6">
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                ¿Qué área te gustaría armonizar o mejorar?
              </label>
              <select className="w-full p-4 bg-slate-50 border-none rounded-xl text-slate-600 outline-none ring-1 ring-slate-200 focus:ring-blue-900/20 transition-all">
                <option>Rinoplastia (Nariz)</option>
                <option>Lipoescultura (Cuerpo)</option>
                <option>Aumento de busto</option>
                <option>Rejuvenecimiento Facial</option>
              </select>
              <button 
                onClick={() => setStep(2)}
                type="button"
                className="w-full mt-6 bg-slate-900 text-white p-4 rounded-xl hover:bg-blue-900 transition-colors"
              >
                Siguiente
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Antecedentes de salud (Alergias, tabaquismo o cirugías previas)
              </label>
              <textarea 
                className="w-full p-4 bg-slate-50 border-none rounded-xl text-slate-600 outline-none ring-1 ring-slate-200 focus:ring-blue-900/20 h-32"
                placeholder="Esta información es confidencial y solo para uso del equipo médico."
              />
              <button 
                type="submit"
                className="w-full mt-6 bg-blue-900 text-white p-4 rounded-xl shadow-lg shadow-blue-900/20 transition-transform active:scale-95"
              >
                Enviar a Elena para revisión
              </button>
            </motion.div>
          )}
        </form>
      </div>
    </section>
  );
}