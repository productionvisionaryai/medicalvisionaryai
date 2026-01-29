'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, CheckCircle, XCircle, 
  Zap, Shield, Database, Cpu, Clock,
  Smartphone, BarChart3, ChevronRight, 
  ChevronDown, Sparkles, GitBranch, 
  Target, ShieldCheck, Activity, Search
} from 'lucide-react';

export default function TechComparison() {
  const [activeView, setActiveView] = useState<'overview' | 'details' | 'metrics'>('overview');
  const [expandedSection, setExpandedSection] = useState<string | null>('performance');

  const comparisonData = [
    {
      id: 'performance',
      title: 'Infraestructura y Velocidad',
      icon: <Zap className="w-5 h-5" />,
      wordpress: {
        value: 'Latencia Variable',
        status: 'poor',
        details: [
          'Dependencia de PHP y Servidores Tradicionales',
          'Bloqueo de renderizado por Plugins masivos',
          'Cache inconsistente basada en archivos',
          'Carga penalizada en dispositivos móviles'
        ]
      },
      ourSolution: {
        value: 'Real-Time Edge',
        status: 'excellent',
        details: [
          'Despliegue Global en el Edge (Vercel/Next.js)',
          'Static Regeneration para velocidad instantánea',
          'Optimización de imágenes IA-driven',
          'TTFB (Time to First Byte) < 50ms'
        ],
        improvement: 'Velocidad de Grado Quirúrgico'
      }
    },
    {
      id: 'security',
      title: 'Seguridad y Cumplimiento',
      icon: <ShieldCheck className="w-5 h-5" />,
      wordpress: {
        value: 'Riesgo Elevado',
        status: 'poor',
        details: [
          'Parches manuales constantes',
          'Vulnerabilidades vía Plugins de terceros',
          'Base de datos monolítica expuesta',
          'Backups con riesgo de corrupción'
        ]
      },
      ourSolution: {
        value: 'Zero-Trust Architecture',
        status: 'excellent',
        details: [
          'Encriptación AES-256 en reposo y tránsito',
          'Autenticación biométrica/2FA integrada',
          'Infraestructura inmutable (Headless)',
          'Cumplimiento automatizado HIPAA/GDPR'
        ],
        improvement: 'Blindaje Médico'
      }
    },
    {
      id: 'intelligence',
      title: 'Inteligencia Clínica (IA)',
      icon: <Activity className="w-5 h-5" />,
      wordpress: {
        value: 'Estático',
        status: 'poor',
        details: [
          'Formularios de contacto planos',
          'Búsqueda básica por palabras clave',
          'Sin procesamiento de lenguaje natural',
          'Datos aislados en silos'
        ]
      },
      ourSolution: {
        value: 'Deep Medical Learning',
        status: 'excellent',
        details: [
          'Agente de IA entrenado en literatura médica',
          'Triage predictivo de pacientes',
          'Análisis semántico de consultas',
          'Integración nativa con Modelos de Lenguaje'
        ],
        improvement: 'IA Médica Proactiva'
      }
    }
  ];

  const technicalMetrics = [
    { label: 'LCP (Largest Contentful Paint)', wordpress: '4.8s', ourSolution: '0.9s', improvement: '81% más rápido' },
    { label: 'Seguridad (Score OWASP)', wordpress: 'B-', ourSolution: 'AAA', improvement: 'Nivel Bancario' },
    { label: 'Interacción de IA', wordpress: 'N/A', ourSolution: 'Instantánea', improvement: 'Capacidad Nueva' },
    { label: 'Eficiencia de Datos', wordpress: 'Alta Carga', ourSolution: 'Ligera/Edge', improvement: '90% menos recursos' }
  ];

  return (
    <div className="py-24 px-6 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto">
        {/* Header con Estética Minimalista */}
        <header className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em]">Next-Gen Medical Tech</span>
          </motion.div>
          
          <h2 className="text-5xl font-light text-slate-900 tracking-tight mb-6">
            Ingeniería de <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-900">Precisión Médica</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light">
            WordPress es para blogs. Nuestra plataforma está diseñada para la <span className="font-medium text-slate-800">excelencia clínica</span> y el rendimiento sin concesiones.
          </p>
        </header>

        {/* View Switcher - Glassmorphism style */}
        <div className="flex justify-center mb-16">
          <div className="flex bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            {[
              { id: 'overview', label: 'Comparativa', icon: Target },
              { id: 'details', label: 'Arquitectura', icon: Database },
              { id: 'metrics', label: 'Benchmarks', icon: BarChart3 }
            ].map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id as any)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeView === view.id 
                    ? 'bg-white text-blue-600 shadow-md border border-slate-100' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <view.icon className="w-4 h-4" />
                {view.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeView === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="grid lg:grid-cols-2 gap-10 items-stretch"
            >
              {/* Card WordPress - Estética "Old/Legacy" */}
              <div className="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-sm">
                <div className="mb-10">
                  <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Legacy System</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">WordPress</h3>
                </div>
                <div className="space-y-8">
                  {comparisonData.map((item) => (
                    <div key={item.id} className="group">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-slate-100 transition-colors">
                          {item.icon}
                        </div>
                        <span className="font-semibold text-slate-700">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2 pl-14">
                        <XCircle className="w-4 h-4 text-red-300" />
                        <span className="text-sm text-slate-500">{item.wordpress.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Nuestra Solución - Estética "Future/Elite" */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                <div className="relative bg-white rounded-[2rem] p-10 border border-blue-100 shadow-xl overflow-hidden h-full">
                  <div className="absolute top-0 right-0 p-8">
                    <div className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-blue-200">
                      Active AI
                    </div>
                  </div>
                  
                  <div className="mb-10">
                    <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">Premium Solution</span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1 italic">Nuestra IA</h3>
                  </div>

                  <div className="space-y-8">
                    {comparisonData.map((item) => (
                      <div key={item.id}>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shadow-sm shadow-blue-100">
                            {item.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900">{item.title}</span>
                            <span className="text-[10px] font-bold text-green-600 uppercase tracking-tight">{item.ourSolution.improvement}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pl-14">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-slate-700 font-medium">{item.ourSolution.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'metrics' && (
            <motion.div 
              key="metrics"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white rounded-[2rem] p-12 border border-slate-200 shadow-sm"
            >
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                {technicalMetrics.map((m, i) => (
                  <div key={i} className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-sm font-semibold text-slate-800">{m.label}</label>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-tighter">
                        {m.improvement}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-red-400 opacity-30" style={{ width: '30%' }}></div>
                      <div className="h-full bg-blue-600" style={{ width: '70%' }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-slate-400">WP: {m.wordpress}</span>
                      <span className="text-blue-600">IA: {m.ourSolution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Conclusión */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 p-1 pr-6 rounded-full bg-white border border-slate-200 shadow-sm">
            <div className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
              Conclusión
            </div>
            <p className="text-sm text-slate-600">
              Usted no compite contra otros doctores, compite contra la <span className="font-bold text-slate-900">experiencia digital</span> de sus pacientes.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}