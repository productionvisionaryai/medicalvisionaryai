'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle, Zap, Shield, Calendar, 
  MessageSquare, Star, Award,
  ArrowRight, Sparkles, Code, Lock, Database, Activity
} from 'lucide-react';

type PlanType = 'essential' | 'professional' | 'research';

interface Plan {
  id: PlanType;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  popular: boolean;
  color: string;
  highlight?: string;
}

export default function ConversionCTA() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('professional');

  const plans: Plan[] = [
    {
      id: 'essential',
      name: 'Essential',
      description: 'Presencia digital autónoma y profesional',
      price: '$34.90',
      period: '/mes',
      features: [
        'Subdominio drX.visionaryai.lat',
        'Asistente IA Base (Llama 3)',
        'Agenda Cal.com conectada a su Gmail',
        'Base de Datos independiente (Prisma)',
        'Landing Page Mobile-First',
        'Botón directo a su WhatsApp',
        'Soporte vía Mary Alviarez (VE)',
        'Implementación en 48 horas'
      ],
      cta: 'Activar Plan Essential',
      popular: false,
      color: 'from-blue-50 to-blue-100'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'IA con razonamiento médico avanzado',
      price: '$99.85',
      period: '/mes',
      features: [
        '✅ Todo lo de Essential +',
        'Doble Inferencia (Gemma Med + Dr7 AI)',
        'System Prompt 100% Personalizado',
        'IA entrenada en su especialidad',
        'Gestión de pacientes priorizada',
        'Analytics de consultas mensuales',
        'SEO optimizado para su nombre',
        'Sincronización multi-calendario'
      ],
      cta: 'Adquirir Professional',
      popular: true,
      color: 'from-purple-50 to-indigo-100',
      highlight: '⭐ RECOMENDADO'
    },
    {
      id: 'research',
      name: 'Research',
      description: 'Infraestructura masiva y biometría',
      price: 'Custom',
      period: 'Precio bajo consulta',
      features: [
        '🚀 DESPLIEGUE VERCEL INDEPENDIENTE',
        'Base de Datos Masiva Dedicada',
        'Captura de Datos de Wearables',
        'Módulo de Biometría Avanzada',
        'Propiedad intelectual de datos',
        'Inferencia de Grado Clínico',
        'Personalización profunda de código',
        'Soporte Técnico de Ingeniería'
      ],
      cta: 'Contactar Ventas Enterprise',
      popular: false,
      color: 'from-gray-50 to-gray-100',
      highlight: '💎 HIGH-TECH'
    }
  ];

  return (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Estratégico */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-4 border border-blue-100">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 uppercase tracking-widest">
              Tecnología de Grado Médico
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Su consulta, automatizada con <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Inteligencia Artificial Médica
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Desde la gestión autónoma de citas vía Cal.com hasta el análisis de datos biométricos. 
            Elija el nivel de evolución de su práctica.
          </p>
        </div>

        {/* Grid de Planes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -5 }}
              className={`relative rounded-3xl border p-8 transition-all ${
                selectedPlan === plan.id 
                ? 'border-blue-500 shadow-2xl ring-1 ring-blue-500' 
                : 'border-gray-200 shadow-sm'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-tighter">
                  {plan.highlight}
                </div>
              )}

              <div className="mb-8">
                <h4 className="text-2xl font-bold text-gray-900">{plan.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle className={`w-5 h-5 flex-shrink-0 ${plan.id === 'research' ? 'text-indigo-500' : 'text-green-500'}`} />
                    <span className={feature.includes('VERCEL') || feature.includes('Doble Inferencia') ? 'font-bold text-gray-900' : ''}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  const subject = encodeURIComponent(`Interés en Plan ${plan.name} - Visionary AI`);
                  window.location.href = `mailto:mary@medical.visionaryai.lat?subject=${subject}`;
                }}
                className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                  plan.id === 'professional'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Sección Técnica - Cal.com + Gmail */}
        <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100 overflow-hidden relative">
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-bold mb-4 uppercase text-xs tracking-widest">
                <Calendar className="w-4 h-4" />
                Sincronización Perfecta
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Su agenda en piloto automático con Cal.com
              </h3>
              <p className="text-gray-600 mb-6">
                Conectamos directamente su calendario de Google (Gmail) o Outlook. 
                Los pacientes ven su disponibilidad real y agendan solos. Sin llamadas, 
                sin errores de horario, 24/7.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-semibold text-gray-700">
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">✓ Recordatorios WhatsApp</div>
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">✓ Sincronización Gmail</div>
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">✓ Pago de reservas USDT</div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 blur-3xl opacity-30 rounded-full animate-pulse"></div>
                <img 
                  src="https://cal.com/logo.svg" 
                  alt="Cal.com logo" 
                  className="w-48 h-auto relative z-10 opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}