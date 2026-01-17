// components/ModernChat/ReasoningDisplay.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, GitBranch, Target, Shield,
  AlertTriangle, CheckCircle, Clock,
  ChevronRight, ChevronDown, BarChart3,
  Cpu, Database, Layers
} from 'lucide-react';


export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  reasoningSteps?: string[];
  metadata?: {
    confidence?: number;
    processingTime?: number;
    model?: string;
  };
  dataSource?: string;
}

interface ReasoningDisplayProps {
  messages: ChatMessage[];
  activeProcedure: any;
  datasetStats: {
    cases: number;
    procedures: number;
    templates: number;
  };
}

export default function ReasoningDisplay({
  messages,
  activeProcedure,
  datasetStats
}: ReasoningDisplayProps) {
  const [activeTab, setActiveTab] = useState<'reasoning' | 'analysis' | 'dataset'>('reasoning');
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set([0, 1, 2]));

  // Obtener último mensaje del asistente con razonamiento
  const lastAssistantMessage = messages
    .filter(m => m.role === 'assistant')
    .slice(-1)[0];

  // Extraer pasos de razonamiento
  const reasoningSteps = lastAssistantMessage?.reasoningSteps || [
    'Evaluación inicial del caso clínico',
    'Aplicación de principios médicos generales',
    'Consideración de factores específicos del paciente',
    'Síntesis de recomendaciones basadas en evidencia'
  ];

  // Toggle para expandir/colapsar pasos
  const toggleStep = (index: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSteps(newExpanded);
  };

  // Calcular métricas de razonamiento
  const reasoningMetrics = {
    complexity: Math.min(10, reasoningSteps.length * 1.5), // 1-10
    evidenceLevel: activeProcedure ? 'Alta' : 'Media',
    confidence: lastAssistantMessage?.metadata?.confidence || 0.88,
    processingSteps: reasoningSteps.length,
    datasetReferences: messages.filter(m => m.dataSource).length
  };

  // Determinar nivel de complejidad
  const getComplexityLevel = (score: number) => {
    if (score >= 8) return { label: 'Avanzado', color: 'bg-purple-100 text-purple-800' };
    if (score >= 5) return { label: 'Intermedio', color: 'bg-blue-100 text-blue-800' };
    return { label: 'Básico', color: 'bg-green-100 text-green-800' };
  };

  const complexityLevel = getComplexityLevel(reasoningMetrics.complexity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Header del panel */}
      <div className="border-b border-gray-100">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Proceso de Razonamiento Médico
              </h3>
              <p className="text-sm text-gray-600">
                Visualización del análisis estructurado generado por la IA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${complexityLevel.color}`}>
              {complexityLevel.label}
            </div>
            <div className="text-sm text-gray-500">
              {reasoningMetrics.processingSteps} pasos
            </div>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('reasoning')}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'reasoning'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <GitBranch className="w-4 h-4" />
            Pasos de Razonamiento
          </button>

          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'analysis'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <BarChart3 className="w-4 h-4" />
            Análisis Técnico
          </button>

          <button
            onClick={() => setActiveTab('dataset')}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'dataset'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <Database className="w-4 h-4" />
            Dataset Usado
          </button>
        </div>
      </div>

      {/* Contenido de los tabs */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'reasoning' && (
            <motion.div
              key="reasoning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Proceso Chain-of-Thought Aplicado
                </h4>
                <p className="text-sm text-gray-600">
                  La IA descompone el problema médico en pasos lógicos, similar al razonamiento clínico humano.
                </p>
              </div>

              {/* Lista de pasos de razonamiento */}
              <div className="space-y-3">
                {reasoningSteps.map((step, index) => {
                  const isExpanded = expandedSteps.has(index);
                  const stepNumber = index + 1;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleStep(index)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-100/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                            {stepNumber}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {step.split(':')[0] || `Paso ${stepNumber}`}
                            </div>
                            {!isExpanded && (
                              <div className="text-sm text-gray-600 mt-1">
                                {step.substring(0, 80)}...
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-xs text-gray-500">
                            {step.length > 100 ? 'Detallado' : 'Conciso'}
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-gray-200"
                          >
                            <div className="p-4 bg-white">
                              <div className="text-gray-700 whitespace-pre-line">
                                {step}
                              </div>

                              {/* Metadata del paso */}
                              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4">
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Clock className="w-3 h-3" />
                                  <span>Procesamiento: ~150ms</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Cpu className="w-3 h-3" />
                                  <span>Capacidad: {step.length > 150 ? 'Alta' : 'Media'}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Layers className="w-3 h-3" />
                                  <span>Dataset: medical-o1-reasoning-SFT</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              {/* Resumen del proceso */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <h5 className="font-medium text-blue-900">Resumen del Proceso</h5>
                </div>
                <p className="text-sm text-blue-800">
                  Este análisis médico estructurado demuestra cómo la IA aplica principios de razonamiento clínico,
                  descomponiendo problemas complejos en pasos lógicos verificables.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'analysis' && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Métricas del Análisis
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Complejidad */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Complejidad</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${complexityLevel.color}`}>
                        {complexityLevel.label}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{ width: `${reasoningMetrics.complexity * 10}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Basado en número de pasos y profundidad del análisis
                    </div>
                  </div>

                  {/* Nivel de Evidencia */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Nivel de Evidencia</span>
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">
                          {reasoningMetrics.evidenceLevel}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {activeProcedure
                        ? 'Basado en procedimiento específico documentado'
                        : 'Basado en principios médicos generales'}
                    </div>
                  </div>

                  {/* Confianza */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Confianza del Modelo</span>
                      <span className="text-sm font-medium text-gray-900">
                        {Math.round(reasoningMetrics.confidence * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${reasoningMetrics.confidence > 0.9 ? 'bg-green-500' :
                            reasoningMetrics.confidence > 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        style={{ width: `${reasoningMetrics.confidence * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Referencias a Dataset */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Referencias Dataset</span>
                      <span className="text-sm font-medium text-gray-900">
                        {reasoningMetrics.datasetReferences}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Consultas basadas en casos médicos reales
                    </div>
                  </div>
                </div>
              </div>

              {/* Información del procedimiento activo */}
              {activeProcedure && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-5 h-5 text-green-600" />
                    <h5 className="font-medium text-green-900">
                      Procedimiento Analizado: {activeProcedure.name}
                    </h5>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-green-800">{activeProcedure.description}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div>
                        <div className="text-xs text-green-700 font-medium mb-1">Categoría</div>
                        <div className="text-sm text-green-900">{activeProcedure.category}</div>
                      </div>
                      <div>
                        <div className="text-xs text-green-700 font-medium mb-1">Recuperación</div>
                        <div className="text-sm text-green-900">{activeProcedure.recovery_time}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Consideraciones de seguridad */}
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <h5 className="font-medium text-yellow-900">Consideraciones de Seguridad</h5>
                </div>
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    Este análisis es de apoyo y no reemplaza evaluación médica presencial
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    Siempre verificar contraindicaciones específicas del paciente
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    Considerar factores individuales no capturados en análisis general
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'dataset' && (
            <motion.div
              key="dataset"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Dataset Médico Utilizado
                </h4>

                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-semibold text-gray-900">medical-o1-reasoning-SFT</div>
                      <div className="text-sm text-gray-600">FreedomIntelligence / Hugging Face</div>
                    </div>
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      Especializado
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                      <div className="text-2xl font-bold text-blue-600">{datasetStats.cases}</div>
                      <div className="text-sm text-gray-600">Casos médicos</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                      <div className="text-2xl font-bold text-purple-600">{datasetStats.procedures}</div>
                      <div className="text-sm text-gray-600">Procedimientos</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                      <div className="text-2xl font-bold text-green-600">{datasetStats.templates}</div>
                      <div className="text-sm text-gray-600">Templates</div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 space-y-3">
                    <p>
                      Este dataset contiene <strong>casos médicos reales con razonamiento Chain-of-Thought</strong>,
                      mostrando el proceso de pensamiento paso a paso que siguen los profesionales médicos.
                    </p>
                    <p>
                      Para este demo, hemos <strong>adaptado y filtrado los casos</strong> específicamente para
                      cirugía plástica y estética, manteniendo la estructura de razonamiento médico original.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ejemplo de caso del dataset */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <GitBranch className="w-4 h-4" />
                  Ejemplo de Razonamiento del Dataset
                </h5>

                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-xs font-medium text-blue-700 mb-1">Pregunta Médica Original</div>
                    <div className="text-sm text-blue-900">
                      "Evaluar riesgo de complicaciones en paciente con múltiples comorbilidades para procedimiento electivo"
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-xs font-medium text-green-700 mb-1">Proceso de Razonamiento (CoT)</div>
                    <div className="text-sm text-green-900 space-y-2">
                      <div>1. Identificar comorbilidades específicas y su severidad</div>
                      <div>2. Evaluar impacto en riesgo quirúrgico</div>
                      <div>3. Considerar optimización preoperatoria</div>
                      <div>4. Planificar manejo intra y postoperatorio</div>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-xs font-medium text-purple-700 mb-1">Aplicación en Cirugía Plástica</div>
                    <div className="text-sm text-purple-900">
                      Adaptado para evaluar candidatos a procedimientos estéticos considerando factores de riesgo específicos.
                    </div>
                  </div>
                </div>
              </div>

              {/* Valor técnico */}
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <div className="flex items-center gap-3 mb-2">
                  <Cpu className="w-5 h-5 text-indigo-600" />
                  <h5 className="font-medium text-indigo-900">Valor Técnico Demostrado</h5>
                </div>
                <ul className="space-y-2 text-sm text-indigo-800">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                    <strong>Procesamiento de lenguaje médico especializado</strong>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                    <strong>Razonamiento estructurado verificable</strong> (no solo respuestas)
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                    <strong>Adaptación contextual</strong> a especialidad médica específica
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                    <strong>Transparencia total</strong> en proceso de pensamiento
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}