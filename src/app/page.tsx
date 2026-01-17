'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowDown, Sparkles, Cpu, Database, Shield, Zap,
  Brain, ChevronRight, BarChart3, Target, Clock
} from 'lucide-react';
import MedicalHero from '@/components/MedicalHero';
import ModernChat from '@/components/ModernChat/ModernChat';
import TechComparison from '@/components/TechComparison/TechComparison';
import ConversionCTA from '@/components/ConversionCTA/ConversionCTA';

// Componente de transición elegante
function FloatingIndicator() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

  return (
    <motion.div 
      style={{ opacity, y }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20"
    >
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-500 mb-2 tracking-widest uppercase">
          Explorar Demo
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Sección de introducción al demo
function DemoIntro() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 px-4 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full mb-4 border border-blue-100">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 tracking-widest uppercase">
              Demo Helena AI
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            <span className="block">Asistente quirúrgico</span>
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Helena AI
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Esta demostración presenta <strong className="text-gray-900">Helena AI</strong>, desarrollado por{' '}
            <span className="text-gray-500">Visionary AI</span>. Procesa casos médicos reales con 
            razonamiento estructurado, ofreciendo análisis clínico especializado en cirugía plástica.
          </p>
        </div>

        {/* Características técnicas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Dataset Médico Real
            </h3>
            <p className="text-gray-600 mb-4">
              Integramos <code className="bg-gray-100 px-2 py-1 rounded text-sm">medical-o1-reasoning-SFT</code> con 
              casos médicos reales adaptados a cirugía plástica.
            </p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>7+ casos médicos procesados</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>Razonamiento Chain-of-Thought</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>Adaptación específica a cirugía plástica</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-6">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Razonamiento Transparente
            </h3>
            <p className="text-gray-600 mb-4">
              No solo respuestas: mostramos el <strong>proceso de pensamiento médico</strong> paso a paso, como lo haría un especialista.
            </p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                <span>Análisis paso a paso verificable</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                <span>Consideraciones diferenciales</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                <span>Evaluación riesgo-beneficio</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Rendimiento de Vanguardia
            </h3>
            <p className="text-gray-600 mb-4">
              Respuestas en <strong>menos de 1 segundo</strong> frente a los 2-5 segundos de soluciones WordPress tradicionales.
            </p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Respuestas en 800-1000ms</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Interfaz tipo app nativa</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Experiencia mobile-first</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* CTA para interactuar con el demo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4 text-blue-500" />
              <span>Pruebe el demo interactivo</span>
            </div>
            <ChevronRight className="w-4 h-4" />
            <div className="flex items-center gap-1">
              <BarChart3 className="w-4 h-4 text-purple-500" />
              <span>Analice el razonamiento médico</span>
            </div>
            <ChevronRight className="w-4 h-4" />
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-green-500" />
              <span>Compare tiempos de respuesta</span>
            </div>
          </div>
          
          <div className="text-2xl font-light text-gray-900 mb-8">
            Desplácese hacia abajo para <span className="font-semibold">interactuar con la demo</span>
          </div>
          
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 text-gray-500"
          >
            <ArrowDown className="w-5 h-5" />
            <span className="text-sm">Continuar</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function Home() {
  const [isDemoLoaded, setIsDemoLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDemoLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Floating indicator */}
      <FloatingIndicator />

      {/* 1. Hero Section con video - Impacto visual inmediato */}
      <MedicalHero />

      {/* 2. Introducción al demo técnico */}
      <DemoIntro />

      {/* 3. Demo principal: ModernChat con dataset médico */}
      <section id="demo-chat" className="scroll-mt-20">
        {isDemoLoaded ? (
          <ModernChat />
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-gray-600">Cargando Helena AI - Dataset especializado...</p>
            </div>
          </div>
        )}
      </section>

      {/* 4. Comparación técnica: WordPress vs Nuestra Solución */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <TechComparison />
      </section>

      {/* 5. Llamado a la acción para cirujanos */}
      <section className="py-20 bg-white">
        <ConversionCTA />
      </section>

      {/* Footer minimalista */}
      <footer className="py-12 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-900">Helena AI</span>
                  <span className="text-xs text-gray-400 font-normal">
                    un desarrollo de <span className="text-gray-500">Visionary AI</span>
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 max-w-md">
                Asistente de IA especializado para cirujanos plásticos. 
                Demostración técnica con dataset médico real y razonamiento estructurado.
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">7+</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Casos demo</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">100%</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Especializado</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{'<1s'}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Respuesta</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              🧠 <strong>Helena AI Demo:</strong> Asistente quirúrgico inteligente desarrollado por{' '}
              <span className="text-gray-500">Visionary AI</span>. Utiliza el dataset médico{' '}
              <code className="text-gray-500">medical-o1-reasoning-SFT</code> adaptado para cirugía plástica.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Demostración técnica avanzada. Contacto profesional: +52-56 16 73 74 67
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}