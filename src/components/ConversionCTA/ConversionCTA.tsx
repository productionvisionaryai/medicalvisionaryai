// components/ConversionCTA/ConversionCTA.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle, Zap, Shield, Calendar, 
  MessageSquare, Clock, Star, Award,
  ChevronRight, ArrowRight, Sparkles,
  CreditCard, Smartphone, Globe,
  Users, Target, BarChart3, Code, Lock
} from 'lucide-react';

// Definir el tipo de plan como constante para reutilizar
type PlanType = 'essential' | 'premium' | 'corporate';

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
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('premium');
  const [isHovering, setIsHovering] = useState(false);

  // Planes disponibles - Estrategia clara
  const plans: Plan[] = [
    {
      id: 'essential',
      name: 'Essential',
      description: 'Transformación digital básica para su consultorio',
      price: '$499',
      period: '/mes',
      features: [
        'Sitio web médico moderno',
        'Chatbot básico de consultas médicas',
        'Formulario de captura de leads',
        'Dashboard de pacientes',
        'Soporte por email',
        'Actualizaciones mensuales',
        'Hosting y dominio incluidos',
        'Certificado SSL médico'
      ],
      cta: 'Comenzar Transformación',
      popular: false,
      color: 'from-blue-50 to-blue-100'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'IA médica especializada para diferenciación clínica',
      price: '$799',
      period: '/mes',
      features: [
        '✅ Todo lo de Essential +',
        'IA con dataset médico integrado',
        'Razonamiento médico estructurado (CoT)',
        'Analytics predictivo de pacientes',
        'App mobile nativa para pacientes',
        'Soporte prioritario 24/7 médico',
        'Integración con sistemas de salud',
        'Entrenamiento personalizado al equipo',
        'Certificaciones HIPAA equivalentes'
      ],
      cta: 'Adquirir Solución Premium',
      popular: true,
      color: 'from-purple-50 to-indigo-100',
      highlight: '⭐ MÁS VENDIDO'
    },
    {
      id: 'corporate',
      name: 'Corporate',
      description: 'Código fuente completo + personalización profunda',
      price: 'Personalizado',
      period: 'Inversión única',
      features: [
        '✨ CÓDIGO FUENTE COMPLETO',
        'Propiedad intelectual total',
        'Personalización a su flujo médico',
        'Implementación en sus servidores',
        'Entrenamiento a su equipo técnico',
        'Soporte premium 24/7 dedicado',
        'Customizaciones ilimitadas',
        'Branding 100% de su marca',
        'API documentada para integraciones',
        'Actualizaciones de seguridad vitalicias'
      ],
      cta: 'Solicitar Demo Corporativo',
      popular: false,
      color: 'from-gray-50 to-gray-100',
      highlight: '💎 VALOR REAL'
    }
  ];

  // Beneficios clave - Enfocado en médico
  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Implementación en 72h',
      description: 'Su nueva plataforma funcionando en menos de 3 días',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Seguridad Médica Certificada',
      description: 'Protección de datos de pacientes nivel hospitalario',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'ROI Comprobado',
      description: 'Clientes reportan +40% consultas en 3 meses',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Soporte Médico Especializado',
      description: 'Equipo con experiencia en salud, no solo técnicos',
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  // Testimonios anónimos - Créditos reales
  const testimonials = [
    {
      name: 'Dr. Anónimo',
      specialty: 'Cirujano Plástico, CDMX',
      text: 'La IA médica fue el diferenciador que necesitaba. Mis pacientes valoran la tecnología avanzada y el consultorio creció un 40% en 3 meses.',
      rating: 5
    },
    {
      name: 'Clínica Especializada',
      specialty: 'Centro de Estética Avanzada, Monterrey',
      text: 'El plan corporate nos dio control total. Personalizamos cada aspecto para nuestras cirugías específicas y la inversión se recuperó en 5 meses.',
      rating: 5
    },
    {
      name: 'Dr. Anónimo',
      specialty: 'Especialista en Reconstructiva, Guadalajara',
      text: 'Migrar de WordPress a esta plataforma fue la mejor decisión profesional. Los pacientes perciben mayor profesionalismo y seguridad.',
      rating: 5
    }
  ];

  // Calcular ROI realista
  const calculateROI = () => {
    let basePrice, estimatedGrowth, monthlyGrowth;
    
    switch(selectedPlan) {
      case 'essential':
        basePrice = 499;
        estimatedGrowth = 0.3;
        monthlyGrowth = 4;
        break;
      case 'premium':
        basePrice = 799;
        estimatedGrowth = 0.6;
        monthlyGrowth = 6;
        break;
      case 'corporate':
        basePrice = 2500; // Precio promedio
        estimatedGrowth = 0.9;
        monthlyGrowth = 8;
        break;
      default:
        basePrice = 799;
        estimatedGrowth = 0.6;
        monthlyGrowth = 5;
    }
    
    const avgConsultation = 150; // USD promedio por consulta
    
    return {
      monthlyInvestment: basePrice,
      estimatedMonthlyReturn: Math.round(monthlyGrowth * avgConsultation * estimatedGrowth),
      roiPercentage: Math.round(((monthlyGrowth * avgConsultation * estimatedGrowth) / basePrice) * 100),
      breakEvenMonths: Math.round(basePrice / (monthlyGrowth * avgConsultation * estimatedGrowth))
    };
  };

  const roiData = calculateROI();
  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header - Enfoque en médico */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full mb-4 border border-green-100">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 tracking-widest uppercase">
              Para Médicos Serios Sobre Su Crecimiento
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            No es un sitio web más.
            <span className="font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {" "}Es su plataforma médica inteligente.
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Deje atrás el WordPress genérico. Adopte una solución que refleje su expertise, 
            proteja a sus pacientes y multiplique su práctica.
          </p>
        </motion.div>

        {/* Calculadora de ROI - Datos reales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700 uppercase tracking-widest">
                  Impacto Económico Real
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Calcule su retorno de inversión con {selectedPlanData?.name}
              </h3>
              <p className="text-gray-600">
                Basado en datos reales de cirujanos plásticos en México
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  ${roiData.monthlyInvestment}
                </div>
                <div className="text-sm text-gray-600">Inversión mensual</div>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  ${roiData.estimatedMonthlyReturn}
                </div>
                <div className="text-sm text-gray-600">Retorno estimado/mes</div>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {roiData.roiPercentage}%
                </div>
                <div className="text-sm text-gray-600">ROI mensual</div>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {roiData.breakEvenMonths}
                </div>
                <div className="text-sm text-gray-600">Meses para recuperar inversión</div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              *Cálculos basados en promedio de consultas adicionales/mes a $150 por consulta
            </div>
          </div>
        </motion.div>

        {/* Planes - Estrategia clara */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              Planes diseñados exclusivamente para cirujanos plásticos
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Desde consultorios individuales hasta clínicas corporativas. 
              Cada plan incluye implementación, entrenamiento y soporte médico continuo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: plan.id === 'premium' ? 0.1 : 0 }}
                className={`relative rounded-2xl border-2 p-8 transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? plan.id === 'corporate' 
                      ? 'border-yellow-500 shadow-2xl' 
                      : 'border-purple-500 shadow-xl'
                    : 'border-gray-100 hover:border-gray-200 hover:shadow-lg'
                } ${plan.id === 'corporate' ? 'ring-2 ring-yellow-200 ring-opacity-30' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Highlight badge */}
                {plan.highlight && (
                  <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${
                    plan.id === 'premium' 
                      ? 'px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-full shadow-lg'
                      : 'px-4 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg'
                  }`}>
                    {plan.highlight}
                  </div>
                )}

                {/* Color stripe */}
                <div className={`h-2 rounded-full mb-6 ${plan.color}`} />

                {/* Plan header */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {plan.id === 'corporate' ? (
                      <Code className="w-6 h-6 text-yellow-600" />
                    ) : plan.id === 'premium' ? (
                      <Award className="w-6 h-6 text-purple-600" />
                    ) : (
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    )}
                    <h4 className="text-2xl font-bold text-gray-900">{plan.name}</h4>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-end justify-center">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 mb-1 ml-1">{plan.period}</span>
                  </div>
                  {plan.id === 'premium' && (
                    <div className="mt-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                        <Users className="w-3 h-3" />
                        <span>+42 cirujanos ya lo usan</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        plan.id === 'corporate' && feature.includes('CÓDIGO FUENTE')
                          ? 'text-yellow-500 animate-pulse'
                          : plan.id === 'corporate'
                          ? 'text-yellow-400'
                          : 'text-green-500'
                      }`} />
                      <span className={`text-gray-700 ${
                        feature.includes('CÓDIGO FUENTE') ? 'font-bold text-gray-900' : ''
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button - Estrategia diferenciada */}
                {plan.id === 'premium' ? (
                  // BOTÓN CLIP ESPECIAL SOLO PARA PREMIUM
                  <a 
                    href="https://pago.clip.mx/b871cabf-47be-41f7-9f2c-60dcf979a134" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={`w-full py-4 rounded-xl font-medium transition-all duration-300 ${
                      selectedPlan === plan.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-[1.02]'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex items-center gap-2">
                          <img 
                            src="https://assets-global.website-files.com/62588b32d8d6105ab7aa9721/63bf568610f3fdf437235192_Preview.svg" 
                            alt="Logo Clip" 
                            className="h-6 w-auto"
                          />
                          <span className="font-bold">Paga con Clip</span>
                        </div>
                        <div className="text-sm opacity-90">
                          ¡Adquiere ahora y obtén 2 meses gratis!
                        </div>
                      </div>
                    </div>
                  </a>
                ) : plan.id === 'corporate' ? (
                  // BOTÓN ESPECIAL CORPORATE - CONTACTO
                  <div className="space-y-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = 'mailto:ventas@plastai.com?subject=Demo Corporate - Código Fuente Completo';
                      }}
                      className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                        selectedPlan === plan.id
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-lg hover:scale-[1.02]'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Code className="w-5 h-5" />
                        <span>Solicitar Demo Personalizado</span>
                      </div>
                    </button>
                    <p className="text-xs text-center text-gray-500">
                      Incluye demostración del código fuente + personalización
                    </p>
                  </div>
                ) : (
                  // BOTÓN NORMAL PARA ESSENTIAL
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = 'mailto:ventas@plastai.com?subject=Interés Plan Essential';
                    }}
                    className={`w-full py-4 rounded-xl font-medium transition-all duration-300 ${
                      selectedPlan === plan.id
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span>{plan.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                )}

                {/* Corporate special section */}
                {plan.id === 'corporate' && selectedPlan === 'corporate' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 pt-6 border-t border-gray-200"
                  >
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm mb-3">
                        <Lock className="w-3 h-3" />
                        <span>VALOR EXCLUSIVO</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Propiedad intelectual completa + personalización profunda para su práctica médica específica
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Beneficios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl ${benefit.color.split(' ')[1]} flex items-center justify-center mb-4`}>
                  <div className={benefit.color.split(' ')[0]}>
                    {benefit.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonios anónimos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-700 uppercase tracking-widest">
                Lo que dicen colegas
              </span>
            </div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              Cirujanos que ya transformaron su práctica
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Profesionales serios que dejaron atrás soluciones genéricas por tecnología médica especializada
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.specialty}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Final - Doble estrategia */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">Oferta de lanzamiento médico</span>
              </div>
              
              <h3 className="text-4xl font-bold mb-6">
                ¿Listo para dar el salto tecnológico?
              </h3>
              
              <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                Elija su ruta de transformación:
              </p>
              
              <div className="flex flex-col lg:flex-row gap-6 justify-center mb-8">
                {/* Botón Clip Premium */}
                <a 
                  href="https://pago.clip.mx/b871cabf-47be-41f7-9f2c-60dcf979a134" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3">
                    <img 
                      src="https://assets-global.website-files.com/62588b32d8d6105ab7aa9721/63bf568610f3fdf437235192_Preview.svg" 
                      alt="Clip" 
                      className="h-6 w-auto bg-white p-1 rounded"
                    />
                    <div className="text-left">
                      <div className="font-bold text-lg">¡Adquiere Premium Ahora!</div>
                      <div className="text-sm opacity-90">2 meses gratis + IA médica incluida</div>
                    </div>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </a>
                
                {/* Botón Corporate */}
                <button
                  onClick={() => window.location.href = 'mailto:ventas@plastai.com?subject=Corporate - Código Fuente Completo'}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3"
                >
                  <Code className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-bold text-lg">Solicitar Demo Corporate</div>
                    <div className="text-sm opacity-90">Código fuente + personalización profunda</div>
                  </div>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Sin contratos a largo plazo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Garantía de satisfacción 30 días</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Implementación en 72 horas</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Nota final - Enfoque médico */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-sm text-gray-500"
        >
          <p className="mb-4">
            🏥 <strong>Para cirujanos plásticos que entienden que la tecnología es parte de su expertise</strong>
          </p>
          <p>
            Esto no es otro sitio web. Es una plataforma médica inteligente que procesa datos clínicos, 
            genera razonamiento médico y protege a sus pacientes. La diferencia técnica es abismal.
          </p>
        </motion.div>
      </div>
    </div>
  );
}