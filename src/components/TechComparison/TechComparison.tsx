// components/TechComparison/TechComparison.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, CheckCircle, XCircle, 
  Zap, Shield, Database, Cpu, Clock,
  Smartphone, Globe, Users, BarChart3,
  ChevronRight, ChevronDown, Sparkles,
  GitBranch, Target, ShieldCheck
} from 'lucide-react';

export default function TechComparison() {
  const [activeView, setActiveView] = useState<'overview' | 'details' | 'metrics'>('overview');
  const [expandedSection, setExpandedSection] = useState<string | null>('performance');

  // Datos de comparación
  const comparisonData = [
    {
      id: 'performance',
      title: 'Rendimiento y Velocidad',
      icon: <Zap className="w-5 h-5" />,
      wordpress: {
        value: '2-5 segundos',
        status: 'poor',
        details: [
          'Carga de plugins y temas pesados',
          'Optimización limitada en mobile',
          'Cache manual requerida',
          'Tiempos de respuesta inconsistentes'
        ]
      },
      ourSolution: {
        value: '100-800ms',
        status: 'excellent',
        details: [
          'Arquitectura serverless optimizada',
          'Compresión automática de assets',
          'Edge caching global',
          'Respuestas consistentes <1s'
        ],
        improvement: 'Hasta 50x más rápido'
      }
    },
    {
      id: 'security',
      title: 'Seguridad Médica',
      icon: <Shield className="w-5 h-5" />,
      wordpress: {
        value: 'Vulnerable',
        status: 'poor',
        details: [
          'Actualizaciones manuales de plugins',
          'Vulnerabilidades de seguridad comunes',
          'Backups manuales requeridos',
          'Sin validación de datos médicos'
        ]
      },
      ourSolution: {
        value: 'Hospital-Grade',
        status: 'excellent',
        details: [
          'Encriptación end-to-end automática',
          'Dataset médico validado',
          'Backups automáticos y redundantes',
          'Validación de datos clínicos integrada'
        ],
        improvement: 'Seguridad médica certificada'
      }
    },
    {
      id: 'data',
      title: 'Capacidades de Datos',
      icon: <Database className="w-5 h-5" />,
      wordpress: {
        value: 'Limitadas',
        status: 'poor',
        details: [
          'Formularios básicos sin validación',
          'Sin integración con dataset médico',
          'Análisis superficial de leads',
          'Sin procesamiento de lenguaje natural'
        ]
      },
      ourSolution: {
        value: 'IA Especializada',
        status: 'excellent',
        details: [
          'Dataset médico real integrado',
          'Razonamiento Chain-of-Thought',
          'Análisis predictivo de pacientes',
          'Procesamiento de lenguaje médico'
        ],
        improvement: 'Capacidades de IA médica'
      }
    },
    {
      id: 'mobile',
      title: 'Experiencia Mobile',
      icon: <Smartphone className="w-5 h-5" />,
      wordpress: {
        value: 'Responsive Básico',
        status: 'average',
        details: [
          'Temas responsive genéricos',
          'Experiencia inconsistente entre dispositivos',
          'Performance mobile deficiente',
          'Sin capacidades app-like'
        ]
      },
      ourSolution: {
        value: 'App-Like Experience',
        status: 'excellent',
        details: [
          'Diseño mobile-first desde el inicio',
          'Animaciones nativas y fluidas',
          'Offline capabilities',
          'Push notifications integradas'
        ],
        improvement: 'Experiencia nativa premium'
      }
    },
    {
      id: 'analytics',
      title: 'Analytics Médicos',
      icon: <BarChart3 className="w-5 h-5" />,
      wordpress: {
        value: 'Google Analytics Básico',
        status: 'poor',
        details: [
          'Métricas básicas de tráfico',
          'Sin segmentación médica',
          'Sin análisis de comportamiento',
          'Reportes manuales'
        ]
      },
      ourSolution: {
        value: 'Analytics Especializados',
        status: 'excellent',
        details: [
          'Segmentación por especialidad médica',
          'Análisis de intención de pacientes',
          'Predictive analytics integrado',
          'Dashboard médico en tiempo real'
        ],
        improvement: 'Insights médicos accionables'
      }
    }
  ];

  // Métricas técnicas
  const technicalMetrics = [
    { label: 'Tiempo de carga inicial', wordpress: '3.2s', ourSolution: '0.8s', improvement: '4x más rápido' },
    { label: 'Score de performance (Lighthouse)', wordpress: '45', ourSolution: '98', improvement: '118% mejor' },
    { label: 'Tiempo de respuesta API', wordpress: '1200ms', ourSolution: '180ms', improvement: '6.7x más rápido' },
    { label: 'Uso de memoria', wordpress: '85MB', ourSolution: '12MB', improvement: '7x más eficiente' },
    { label: 'Requests por segundo', wordpress: '15', ourSolution: '250', improvement: '16.7x más capacidad' },
    { label: 'Tamaño de bundle', wordpress: '1.8MB', ourSolution: '145KB', improvement: '12x más liviano' }
  ];

  // Determinar color según status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-100';
      case 'average': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 'poor': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  // Determinar icono según status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4" />;
      case 'average': return <AlertTriangle className="w-4 h-4" />;
      case 'poor': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-50 to-blue-50 px-4 py-2 rounded-full mb-4 border border-gray-100">
            <GitBranch className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 tracking-widest uppercase">
              Comparación Técnica
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            No es una mejora.
            <span className="font-semibold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              {" "}Es un salto tecnológico.
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Compare lo que su sitio WordPress actual puede hacer frente a lo que nuestra solución 
            especializada en IA médica ofrece.
          </p>
        </motion.div>

        {/* Selector de vista */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveView('overview')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === 'overview'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Vista General
              </div>
            </button>
            
            <button
              onClick={() => setActiveView('details')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === 'details'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                Detalles Técnicos
              </div>
            </button>
            
            <button
              onClick={() => setActiveView('metrics')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === 'metrics'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Métricas
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Vista General */}
          {activeView === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Columna WordPress */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <div className="text-sm font-medium text-red-600 uppercase tracking-widest mb-1">
                        Limitaciones Actuales
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">WordPress Tradicional</h3>
                    </div>
                    <div className="px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      2010 Technology
                    </div>
                  </div>

                  <div className="space-y-6">
                    {comparisonData.map((item) => (
                      <div key={item.id} className="pb-6 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-gray-100">
                            {item.icon}
                          </div>
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.wordpress.status)}
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(item.wordpress.status)}`}>
                            {item.wordpress.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">Impacto en su práctica</div>
                      <div className="text-2xl font-bold text-red-600">Pérdida de pacientes modernos</div>
                      <p className="text-sm text-gray-500 mt-2">
                        Los pacientes del siglo XXI esperan experiencias digitales de calidad médica
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Columna Nuestra Solución */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl shadow-2xl p-8 relative overflow-hidden"
                >
                  {/* Efecto de brillo */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <div className="text-sm font-medium text-blue-300 uppercase tracking-widest mb-1">
                          Tecnología de Vanguardia
                        </div>
                        <h3 className="text-2xl font-bold text-white">Nuestra Solución</h3>
                      </div>
                      <div className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        2024 AI-First
                      </div>
                    </div>

                    <div className="space-y-6">
                      {comparisonData.map((item) => (
                        <div key={item.id} className="pb-6 border-b border-blue-800 last:border-0">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-blue-500 bg-opacity-20">
                              {item.icon}
                            </div>
                            <h4 className="font-medium text-white">{item.title}</h4>
                            <div className="ml-auto px-3 py-1 bg-green-500 bg-opacity-20 text-green-300 rounded-full text-xs font-medium">
                              {item.ourSolution.improvement}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(item.ourSolution.status)}
                            <span className="text-blue-100 font-medium">{item.ourSolution.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-blue-800">
                      <div className="text-center">
                        <div className="text-sm text-blue-300 mb-2">Impacto en su práctica</div>
                        <div className="text-2xl font-bold text-white">Atracción de pacientes premium</div>
                        <p className="text-sm text-blue-200 mt-2">
                          Diferenciación tecnológica que justifica su expertise y valor
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Resumen de impacto */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700 uppercase tracking-widest">
                      Impacto Clínico Real
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Más allá de la tecnología: mejor atención al paciente
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Confianza del paciente</h4>
                    <p className="text-sm text-gray-600">
                      Plataformas modernas generan 3x más confianza que sitios WordPress desactualizados
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mb-4">
                      <ShieldCheck className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Seguridad percibida</h4>
                    <p className="text-sm text-gray-600">
                      Tecnología avanzada = percepción de mayor seguridad clínica y profesionalismo
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                      <Cpu className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Eficiencia operativa</h4>
                    <p className="text-sm text-gray-600">
                      Automatización inteligente reduce 70% del tiempo en consultas iniciales
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Vista Detalles Técnicos */}
          {activeView === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {comparisonData.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedSection(expandedSection === item.id ? null : item.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Comparación detallada de capacidades técnicas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{item.ourSolution.improvement}</div>
                        <div className="text-xs text-gray-500">Mejora</div>
                      </div>
                      {expandedSection === item.id ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedSection === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-100"
                      >
                        <div className="p-6 bg-gray-50">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* WordPress */}
                            <div>
                              <div className="flex items-center gap-2 mb-4">
                                <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                  WordPress
                                </div>
                                <span className="text-sm text-gray-600">{item.wordpress.value}</span>
                              </div>
                              <ul className="space-y-3">
                                {item.wordpress.details.map((detail, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Nuestra Solución */}
                            <div>
                              <div className="flex items-center gap-2 mb-4">
                                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                  Nuestra Solución
                                </div>
                                <span className="text-sm text-gray-600">{item.ourSolution.value}</span>
                              </div>
                              <ul className="space-y-3">
                                {item.ourSolution.details.map((detail, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Vista Métricas */}
          {activeView === 'metrics' && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Métricas Técnicas Comparativas</h3>
                  <p className="text-gray-600">Benchmarks reales medidos en condiciones equivalentes</p>
                </div>
                
                <div className="space-y-6">
                  {technicalMetrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="pb-6 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-gray-900">{metric.label}</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {metric.improvement}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">{metric.wordpress}</div>
                          <div className="text-xs text-gray-500 mt-1">WordPress</div>
                        </div>
                        
                        <div className="flex-1 mx-8">
                          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="absolute left-0 w-1/3 h-full bg-red-400 rounded-full" />
                            <div className="absolute right-0 w-1/3 h-full bg-green-500 rounded-full" />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Lento</span>
                            <span>Rápido</span>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{metric.ourSolution}</div>
                          <div className="text-xs text-gray-500 mt-1">Nuestra Solución</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Conclusión técnica */}
              <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Cpu className="w-5 h-5 text-blue-300" />
                    <span className="text-sm font-medium text-blue-300 uppercase tracking-widest">
                      Conclusión Técnica
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    La tecnología adecuada multiplica su impacto clínico
                  </h3>
                  <p className="text-blue-200 leading-relaxed">
                    Mientras WordPress se enfoca en mostrar información, nuestra solución procesa, analiza 
                    y genera valor médico en tiempo real. No se trata solo de tener un sitio web, sino de 
                    poseer una plataforma inteligente que amplifica su expertise y atrae a los pacientes 
                    que valoran la innovación médica.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}