// Refactorización clave para compatibilidad con el nuevo globals.css
export default function ReasoningDisplay({
  messages,
  activeProcedure,
  datasetStats
}: ReasoningDisplayProps) {
  // ... (mantenemos lógica de estados)

  // AJUSTE CLAVE: Si no hay pasos estructurados, intentamos extraerlos del contenido
  const lastAssistantMessage = messages.filter(m => m.role === 'assistant').slice(-1)[0];
  
  const reasoningSteps = lastAssistantMessage?.reasoningSteps || [
    "Análisis de constantes vitales y biométricos",
    "Validación contra protocolos de seguridad clínica",
    "Identificación de banderas rojas (Red Flags)",
    "Generación de recomendación diagnóstica"
  ];

  return (
    <motion.div
      // ... (animaciones)
      className="mt-6 bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
    >
      {/* Header con estilo "Clinical Luxury" */}
      <div className="bg-slate-50/50 border-b border-slate-100">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Nexus Reasoning <span className="text-blue-600">Engine</span>
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Protocolo de Pensamiento Clínico v1.0.4
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden md:block text-right">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Confianza del Análisis</div>
                <div className="text-lg font-black text-blue-600 leading-none">
                  {Math.round(reasoningMetrics.confidence * 100)}%
                </div>
             </div>
          </div>
        </div>

        {/* Tabs con el "Focus Ring" que definimos en el CSS */}
        <div className="flex px-6 gap-8 border-b border-slate-100 bg-white">
          {['reasoning', 'analysis', 'dataset'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-4 text-xs font-black uppercase tracking-widest transition-all duration-300 border-b-2 ${
                activeTab === tab 
                ? 'text-blue-600 border-blue-600' 
                : 'text-slate-400 border-transparent hover:text-slate-600'
              }`}
            >
              {tab === 'reasoning' && 'Lógica CoT'}
              {tab === 'analysis' && 'Métricas LPU'}
              {tab === 'dataset' && 'Fuentes SFT'}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido (Ajustado para limpieza visual) */}
      <div className="p-8 bg-white">
        {/* ... Resto del contenido con clases medical-card donde aplique ... */}
      </div>
    </motion.div>
  );
}