'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, MessageSquare, Zap, Clock, CheckCircle, AlertCircle, Loader2, Database } from 'lucide-react';
import { z } from 'zod';

// DATASET LOCAL - SOLO PARA MODO BÚSQUEDA
const LOCAL_DATASET = {
  sample_cases: [
    {
      id: "medical_case_000",
      original_data: {
        Question: "Given the symptoms of sudden weakness in the left arm and leg, recent long-distance travel, and the presence of swollen and tender right lower leg, what specific cardiac abnormality is most likely to be found upon further evaluation that could explain these findings?",
        Complex_CoT: "Okay, let's see what's going on here. We've got sudden weakness in the person's left arm and leg - and that screams something neuro-related, maybe a stroke?\n\nBut wait, there's more. The right lower leg is swollen and tender, which is like waving a big flag for deep vein thrombosis, especially after a long flight or sitting around a lot.\n\nSo, now I'm thinking, how could a clot in the leg end up causing issues like weakness or stroke symptoms?\n\nOh, right! There's this thing called a paradoxical embolism. It can happen if there's some kind of short circuit in the heart - like a hole that shouldn't be there.\n\nLet's put this together: if a blood clot from the leg somehow travels to the left side of the heart, it could shoot off to the brain and cause that sudden weakness by blocking blood flow there.\n\nHmm, but how would the clot get from the right side of the heart to the left without going through the lungs and getting filtered out?\n\nHere's where our cardiac anomaly comes in: a patent foramen ovale or PFO. That's like a sneaky little shortcut in the heart between the right and left atria.\n\nAnd it's actually pretty common, found in about a quarter of adults, which definitely makes it the top suspect here.\n\nSo with all these pieces - long travel, leg clot, sudden weakness - a PFO fits the bill perfectly, letting a clot cross over and cause all this.\n\nEverything fits together pretty neatly, so I'd bet PFO is the heart issue waiting to be discovered. Yeah, that really clicks into place!",
        Response: "The specific cardiac abnormality most likely to be found in this scenario is a patent foramen ovale (PFO). This condition could allow a blood clot from the venous system, such as one from a deep vein thrombosis in the leg, to bypass the lungs and pass directly into the arterial circulation. This can occur when the clot moves from the right atrium to the left atrium through the PFO. Once in the arterial system, the clot can travel to the brain, potentially causing an embolic stroke, which would explain the sudden weakness in the left arm and leg. The connection between the recent travel, which increases the risk of deep vein thrombosis, and the neurological symptoms suggests the presence of a PFO facilitating a paradoxical embolism."
      }
    },
    {
      id: "medical_case_001",
      original_data: {
        Question: "A 33-year-old woman is brought to the emergency department 15 minutes after being stabbed in the chest with a screwdriver. Given her vital signs of pulse 110/min, respirations 22/min, and blood pressure 90/65 mm Hg, along with the presence of a 5-cm deep stab wound at the upper border of the 8th rib in the left midaxillary line, which anatomical structure in her chest is most likely to be injured?",
        Complex_CoT: "Okay, let's figure out what's going on here. A woman comes in with a stab wound from a screwdriver. It's in her chest, upper border of the 8th rib, left side, kind of around the midaxillary line. First thought, that's like pretty close to where the lung sits, right?\n\nLet's talk about location first. This spot is along the left side of her body. Above the 8th rib, like that, is where a lot of important stuff lives, like the bottom part of the left lung, possibly the diaphragm too, especially considering how deep the screwdriver went.\n\nThe wound is 5 cm deep. That sounds pretty deep. I mean, it could definitely reach down to the lung tissue or maybe the diaphragm. Given that it's midaxillary, we're in the territory where the lower lobe of the left lung hangs out. It's also possible there's some intersection with where the diaphragm begins, but the lung feels more probable somehow.\n\nNow, her vitals are concerning: elevated heart rate and low blood pressure. This is serious. My gut says that this kind of vital sign picture could mean something like pneumothorax or maybe hemothorax. Both can happen if the lung gets punctured, and they can make the blood pressure drop and the heart rate skyrocket since she's obviously distressed.\n\nSo, putting it all together, the most obvious culprit is the lower lobe of the left lung. The wound's depth and her condition point that way. And, yeah, this adds up with pneumothorax or maybe blood collecting in the chest—the kind of stuff that can really mess with breathing and circulation.\n\nAlright, with this in mind, it sure seems like the lung is the most likely thing that got hurt here. Makes sense given the situation, where the wound is, considering her symptoms, and the whole setup.",
        Response: "In this scenario, the most likely anatomical structure to be injured is the lower lobe of the left lung. The location of the stab wound—at the upper border of the 8th rib in the left midaxillary line—indicates proximity to the lower lobe of the lung. The depth of the wound (5 cm) suggests it is sufficient to reach lung tissue. Her vital signs of elevated heart rate and low blood pressure could signal complications like a pneumothorax or hemothorax, common consequences of lung trauma that would result from a penetrating injury in this area. Given these considerations, the lower lobe of the left lung is the most probable structure injured."
      }
    },
    {
      id: "medical_case_002",
      original_data: {
        Question: "A 61-year-old woman with a long history of involuntary urine loss during activities like coughing or sneezing but no leakage at night undergoes a gynecological exam and Q-tip test. Based on these findings, what would cystometry most likely reveal about her residual volume and detrusor contractions?",
        Complex_CoT: "Okay, let's think about this step by step...",
        Response: "Cystometry in this case of stress urinary incontinence would most likely reveal a normal post-void residual volume, as stress incontinence typically does not involve issues with bladder emptying. Additionally, since stress urinary incontinence is primarily related to physical exertion and not an overactive bladder, you would not expect to see any involuntary detrusor contractions during the test."
      }
    }
  ]
};

// Función para búsqueda en dataset
function findRelevantCases(query: string): any[] {
  if (!query.trim()) return [];
  return LOCAL_DATASET.sample_cases.filter(caseItem =>
    JSON.stringify(caseItem).toLowerCase().includes(query.toLowerCase())
  );
}

// Función que muestra las respuestas formateadas
const renderFormattedAnswer = (answer: string) => {
  // Convertir encabezados Markdown a componentes React
  const parts = answer.split(/(## .+)/g);

  return (
    <div className="space-y-4">
      {parts.map((part, index) => {
        if (part.startsWith('## ')) {
          return (
            <h3 key={index} className="text-lg font-semibold mt-4 mb-2">
              {part.replace('## ', '')}
            </h3>
          );
        }

        // Convertir viñetas y listas numeradas
        const lines = part.split('\n').filter(line => line.trim());
        return (
          <div key={index} className="space-y-1">
            {lines.map((line, lineIndex) => {
              if (line.startsWith('• ') || line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
                return (
                  <div key={lineIndex} className="flex items-start">
                    <span className="mr-2 text-blue-500">•</span>
                    <span>{line.replace(/^[•1-9].\s*/, '')}</span>
                  </div>
                );
              }
              return <div key={lineIndex}>{line}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
};

// Componente principal
export default function ModernChat() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [chatMode, setChatMode] = useState<'ai' | 'dataset'>('ai');

  // Custom AI hook state since we are not using useObject anymore for this endpoint
  const [aiResponse, setAiResponse] = useState<{ reasoning?: string; answer?: string } | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<Error | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setResults([]);
    setAiResponse(null);
    setAiError(null);

    if (chatMode === 'ai') {
      // Modo Groq AI via endpoint simple
      setIsAiLoading(true);
      try {
        const res = await fetch('/api/medical-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        setAiResponse(data);
      } catch (err: any) {
        setAiError(err);
        console.error("Error fetching AI response:", err);
      } finally {
        setIsAiLoading(false);
      }
    } else {
      // Modo dataset
      const found = findRelevantCases(query);
      setResults(found);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full mb-4 border border-blue-100">
            <Brain className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 tracking-widest uppercase">
              Demo Interactivo Avanzado
            </span>
          </div>

          <h2 className="text-4xl font-light text-gray-900 mb-4">
            <span className="font-semibold">IA Médica Especializada</span> en Tiempo Real
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compare el rendimiento de IA especializada con Groq vs búsqueda tradicional en dataset médico.
          </p>
        </motion.div>

        {/* Selector de Modo */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Seleccione Modo</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setChatMode('ai')}
                className={`flex-1 min-w-[150px] px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${chatMode === 'ai'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <Zap className="w-4 h-4" />
                <span className="font-medium">IA en Tiempo Real (Groq)</span>
              </button>

              <button
                onClick={() => setChatMode('dataset')}
                className={`flex-1 min-w-[150px] px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${chatMode === 'dataset'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <Database className="w-4 h-4" />
                <span className="font-medium">Buscar en Dataset</span>
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              {chatMode === 'ai' ? (
                <p>🔄 <strong>Modo IA:</strong> Consultas procesadas por Groq con razonamiento médico paso a paso.</p>
              ) : (
                <p>📊 <strong>Modo Dataset:</strong> Búsqueda en casos médicos predefinidos (7 casos demo).</p>
              )}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {chatMode === 'ai' ? 'Consulta Médica con IA (Groq)' : 'Búsqueda en Dataset Médico'}
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={
                  chatMode === 'ai'
                    ? "Ej: 'Paciente con fiebre post-liposucción, ¿qué evaluar?'"
                    : "Ej: 'stroke', 'lung', 'incontinence'"
                }
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button
                onClick={handleSearch}
                disabled={isAiLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isAiLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    {chatMode === 'ai' ? 'Consultar IA' : 'Buscar'}
                  </>
                )}
              </button>
            </div>

            {/* Ejemplos rápidos */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Pruebe con:</p>
              <div className="flex flex-wrap gap-2">
                {chatMode === 'ai' ? (
                  <>
                    <button
                      onClick={() => {
                        setQuery("Paciente con fiebre post-liposucción, ¿qué debo evaluar?");
                        // setTimeout(() => handleSearch(), 100); 
                      }}
                      className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full transition-colors"
                    >
                      Complicación post-liposucción
                    </button>
                    <button
                      onClick={() => {
                        setQuery("Evaluación preoperatoria para rinoplastia en paciente con desviación septal");
                      }}
                      className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full transition-colors"
                    >
                      Evaluación preoperatoria
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setQuery("stroke")}
                      className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                    >
                      Stroke post-travel
                    </button>
                    <button
                      onClick={() => setQuery("lung")}
                      className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                    >
                      Lung injury
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Estado de carga */}
            {isAiLoading && (
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <div>
                    <p className="font-medium text-gray-900">Iniciando análisis Groq...</p>
                    <p className="text-sm text-gray-600">Conectando con modelo Llama 3 70B...</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {aiError && (
              <div className="mt-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-100">
                <div className="flex items-center gap-2 text-red-700 mb-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Error en el servicio</span>
                </div>
                <p className="text-sm text-gray-700">{aiError.message}</p>
              </div>
            )}

            {/* Respuesta de IA */}
            {aiResponse && (
              <div className="mt-6 border-t pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-4 h-4 text-green-600" />
                  <h4 className="font-medium text-gray-900">
                    Respuesta Médica Generada
                  </h4>
                </div>

                <div className="space-y-4">
                  {aiResponse.reasoning && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Proceso de Razonamiento:</h5>
                      <div className="bg-white p-4 rounded border border-gray-200">
                        <p className="text-sm text-gray-600 whitespace-pre-line">
                          {aiResponse.reasoning}
                        </p>
                      </div>
                    </div>
                  )}

                  {aiResponse.answer && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100"
                    >
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Conclusión Clínica:</h5>
                      <div className="bg-white p-4 rounded border border-gray-200">
                        {renderFormattedAnswer(aiResponse.answer)}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Resultados Dataset */}
            {results.length > 0 && !isAiLoading && (
              <div className="mt-6 border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-600" />
                    <h4 className="font-medium text-gray-900">
                      {results.length} caso(s) encontrado(s) en dataset
                    </h4>
                  </div>
                  <button
                    onClick={() => setResults([])}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Limpiar
                  </button>
                </div>

                <div className="space-y-4">
                  {results.map((caseItem, index) => (
                    <div key={caseItem.id || index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-900">
                          {caseItem.original_data.Question}
                        </h5>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {caseItem.id.replace('medical_case_', 'Caso ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {caseItem.original_data.Response}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Tiempo de Respuesta</h4>
            </div>
            <div className="text-3xl font-bold text-gray-900">{chatMode === 'ai' ? '1-3s' : '< 1s'}</div>
            <p className="text-sm text-gray-500 mt-2">
              {chatMode === 'ai' ? 'Groq AI en tiempo real' : 'Búsqueda local instantánea'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Exactitud</h4>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {chatMode === 'ai' ? '90%+' : '100%'}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {chatMode === 'ai' ? 'Basado en modelo médico' : 'Dataset verificado'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold text-gray-900">Capacidad</h4>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {chatMode === 'ai' ? 'Ilimitada' : '7 Casos'}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {chatMode === 'ai' ? 'Cualquier consulta médica' : 'Casos demo especializados'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}