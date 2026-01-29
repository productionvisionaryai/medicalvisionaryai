import ModernChat from '@/components/ModernChat/ModernChat';
import { ShieldCheck, Activity, Zap } from 'lucide-react';

export default function Page() {
  // En producción, este ID vendría de la sesión del médico o del expediente del paciente
  const DEMO_PATIENT_ID = "PAT-7742-XP";

  return (
    <main className="min-h-screen bg-clinical-bg selection:bg-blue-50">
      {/* Header de Superioridad Tecnológica */}
      <nav className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="text-white w-5 h-5 fill-current" />
            </div>
            <span className="font-black text-slate-900 tracking-tighter text-xl">
              HELENA<span className="text-blue-600">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-100 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">LPU Engine Online</span>
            </div>
            <ShieldCheck className="text-slate-400 w-5 h-5" />
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 pt-12 pb-20">
        <div className="text-center mb-10 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mx-auto max-w-2xl">
            Inteligencia Clínica de <span className="text-blue-600 italic">Alta Especialidad</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
            Análisis de biométricos en tiempo real y asistencia diagnóstica de nivel avanzado.
          </p>
        </div>

        {/* Contenedor del Chat - Elevación Visual */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-4xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative">
             <ModernChat patientId={DEMO_PATIENT_ID} />
          </div>
        </div>

        {/* Footer Institucional */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Aquí irían logos de partners o certificaciones como HIPAA, Cloudflare, etc. */}
            <span className="text-xs font-bold tracking-widest text-slate-900">SECURE DATA BASE</span>
            <span className="text-xs font-bold tracking-widest text-slate-900">GROQ LPU™ READY</span>
            <span className="text-xs font-bold tracking-widest text-slate-900">CAL.COM INTEGRATED</span>
          </div>
          
          <footer className="text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Visionary AI Labs © 2026 • Advanced Healthcare Division
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}