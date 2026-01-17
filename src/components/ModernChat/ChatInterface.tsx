// components/ModernChat/ChatInterface.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, User, Bot, Clock, Copy, ThumbsUp, ThumbsDown,
  ChevronDown, Sparkles, AlertCircle, Search,
  Zap, Brain, Database, RefreshCw, ExternalLink
} from 'lucide-react';

// Tipo para mensajes del chat (debe coincidir con ModernChat)
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  reasoningSteps?: string[];
  dataSource?: string;
  metadata?: {
    procedureId?: string;
    confidence?: number;
    processingTime?: number;
    relevantCases?: number;
    queryType?: string;
  };
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  input: string;
  setInput: (input: string) => void;
  isProcessing: boolean;
  onSend: () => void;
  suggestedQueries: string[];
  recentQueries?: string[];
  onReset?: () => void;
}

export default function ChatInterface({
  messages,
  input,
  setInput,
  isProcessing,
  onSend,
  suggestedQueries,
  recentQueries = [],
  onReset
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showRecentQueries, setShowRecentQueries] = useState(true);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());
  const [feedbackGiven, setFeedbackGiven] = useState<Set<string>>(new Set());

  // Scroll automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end' 
    });
  }, [messages, isProcessing]);

  // Auto-focus en input
  useEffect(() => {
    if (!isProcessing && messages.length > 0) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isProcessing, messages.length]);

  // Formatear timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  // Formatear fecha relativa
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffMins < 1440) return `Hace ${Math.floor(diffMins / 60)} h`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  // Copiar mensaje al clipboard
  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  // Manejar key press (Enter para enviar)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isProcessing && input.trim()) {
      e.preventDefault();
      onSend();
    }
  };

  // Toggle expandir mensaje
  const toggleExpandMessage = (messageId: string) => {
    const newExpanded = new Set(expandedMessages);
    if (newExpanded.has(messageId)) {
      newExpanded.delete(messageId);
    } else {
      newExpanded.add(messageId);
    }
    setExpandedMessages(newExpanded);
  };

  // Dar feedback a mensaje
  const giveFeedback = (messageId: string, isPositive: boolean) => {
    const newFeedback = new Set(feedbackGiven);
    newFeedback.add(`${messageId}-${isPositive ? 'positive' : 'negative'}`);
    setFeedbackGiven(newFeedback);
    
    // En una implementación real, enviarías esto a tu backend
    console.log(`Feedback ${isPositive ? 'positivo' : 'negativo'} para mensaje ${messageId}`);
  };

  // Renderizar contenido con formato avanzado
  const renderContent = (content: string, isExpanded: boolean = true) => {
    const lines = content.split('\n');
    const shouldTruncate = !isExpanded && content.length > 300;
    const displayContent = shouldTruncate ? content.substring(0, 300) + '...' : content;
    
    return displayContent.split('\n').map((line, index) => {
      // Títulos principales
      if (line.match(/^[#]{1,3}\s+.+/)) {
        const level = line.match(/^[#]+/)?.[0].length || 1;
        const text = line.replace(/^[#]+\s+/, '');
        const Tag = `h${Math.min(3, level)}` as keyof JSX.IntrinsicElements;
        return (
          <Tag 
            key={index} 
            className={`font-semibold text-gray-900 mb-2 ${level === 1 ? 'text-lg' : level === 2 ? 'text-base' : 'text-sm'}`}
          >
            {text}
          </Tag>
        );
      }
      
      // Listas con viñetas
      if (line.match(/^[•\-]\s+.+/)) {
        return (
          <div key={index} className="flex items-start gap-2 ml-2">
            <span className="text-blue-500 mt-1.5 flex-shrink-0">•</span>
            <span className="flex-1">{line.substring(2)}</span>
          </div>
        );
      }
      
      // Listas numeradas
      if (line.match(/^\d+\.\s+.+/)) {
        const match = line.match(/^(\d+)\.\s+(.+)/);
        return (
          <div key={index} className="flex items-start gap-2 ml-2">
            <span className="text-gray-500 font-medium mt-0.5 flex-shrink-0">{match?.[1]}.</span>
            <span className="flex-1">{match?.[2]}</span>
          </div>
        );
      }
      
      // Texto en negrita
      if (line.match(/\*\*.+\*\*/)) {
        const parts = line.split(/\*\*(.+?)\*\*/g);
        return (
          <span key={index}>
            {parts.map((part, i) => 
              i % 2 === 1 ? (
                <strong key={i} className="font-semibold text-gray-900">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </span>
        );
      }
      
      // Texto en cursiva
      if (line.match(/\*.+\*/)) {
        const parts = line.split(/\*(.+?)\*/g);
        return (
          <span key={index}>
            {parts.map((part, i) => 
              i % 2 === 1 ? (
                <em key={i} className="italic text-gray-600">
                  {part}
                </em>
              ) : (
                part
              )
            )}
          </span>
        );
      }
      
      // Código inline
      if (line.match(/`.+`/)) {
        const parts = line.split(/`(.+?)`/g);
        return (
          <span key={index}>
            {parts.map((part, i) => 
              i % 2 === 1 ? (
                <code key={i} className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono">
                  {part}
                </code>
              ) : (
                part
              )
            )}
          </span>
        );
      }
      
      // Líneas vacías
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      // Texto normal
      return <span key={index}>{line}</span>;
    });
  };

  // Determinar color de confianza
  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'text-gray-500';
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Obtener icono de tipo de consulta
  const getQueryTypeIcon = (queryType?: string) => {
    switch (queryType) {
      case 'risk': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'recovery': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'candidacy': return <User className="w-4 h-4 text-green-500" />;
      case 'cost': return <Database className="w-4 h-4 text-purple-500" />;
      default: return <Brain className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50/50 to-white">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <Brain className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">Inicie una consulta médica</p>
            <p className="text-sm text-center max-w-md">
              Escriba su pregunta sobre cirugía plástica o seleccione una de las sugerencias
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((message) => {
              const isExpanded = expandedMessages.has(message.id);
              const hasFeedback = Array.from(feedbackGiven).some(fb => fb.startsWith(message.id));
              
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mb-6 ${message.role === 'user' ? 'ml-auto' : ''}`}
                >
                  <div className={`max-w-[85%] ${message.role === 'user' ? 'ml-auto' : ''}`}>
                    {/* Encabezado del mensaje */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`flex items-center gap-2 ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`flex items-center gap-1.5 ${message.role === 'assistant' ? 'text-blue-600' : 'text-gray-700'}`}>
                          {message.role === 'assistant' ? (
                            <>
                              <Bot className="w-4 h-4" />
                              <span className="text-sm font-medium">Asistente Médico</span>
                            </>
                          ) : (
                            <>
                              <User className="w-4 h-4" />
                              <span className="text-sm font-medium">Usted</span>
                            </>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{formatRelativeTime(message.timestamp)}</span>
                          {message.metadata?.processingTime && (
                            <span className="text-gray-400 ml-1">
                              ({message.metadata.processingTime}ms)
                            </span>
                          )}
                        </div>

                        {/* Icono de tipo de consulta para respuestas del asistente */}
                        {message.role === 'assistant' && message.metadata?.queryType && (
                          <div className="flex items-center gap-1 text-xs" title={`Tipo: ${message.metadata.queryType}`}>
                            {getQueryTypeIcon(message.metadata.queryType)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contenido del mensaje */}
                    <div className={`rounded-2xl p-4 shadow-sm ${
                      message.role === 'assistant' 
                        ? 'bg-white border border-gray-100 text-gray-800' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                    }`}>
                      <div className="prose prose-sm max-w-none">
                        {renderContent(message.content, isExpanded)}
                      </div>

                      {/* Botón para expandir/colapsar mensajes largos */}
                      {message.content.length > 300 && (
                        <button
                          onClick={() => toggleExpandMessage(message.id)}
                          className="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronDown className="w-4 h-4 rotate-180" />
                              <span>Mostrar menos</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              <span>Mostrar más</span>
                            </>
                          )}
                        </button>
                      )}

                      {/* Metadata del mensaje (solo assistant) */}
                      {message.role === 'assistant' && (
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-2">
                              {/* Fuente de datos */}
                              {message.dataSource && (
                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full flex items-center gap-1">
                                  {message.dataSource.includes('dataset') ? (
                                    <>
                                      <Database className="w-3 h-3" />
                                      <span>Dataset médico</span>
                                    </>
                                  ) : (
                                    <>
                                      <Brain className="w-3 h-3" />
                                      <span>Principios médicos</span>
                                    </>
                                  )}
                                </span>
                              )}
                              
                              {/* Casos relevantes */}
                              {message.metadata?.relevantCases && message.metadata.relevantCases > 0 && (
                                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full flex items-center gap-1">
                                  <Search className="w-3 h-3" />
                                  <span>{message.metadata.relevantCases} caso(s) similar(es)</span>
                                </span>
                              )}
                              
                              {/* Confianza */}
                              {message.metadata?.confidence && (
                                <div className="flex items-center gap-1">
                                  <div className="text-xs text-gray-500">Confianza:</div>
                                  <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full ${
                                        message.metadata.confidence > 0.9 ? 'bg-green-500' :
                                        message.metadata.confidence > 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                                      }`}
                                      style={{ width: `${message.metadata.confidence * 100}%` }}
                                    />
                                  </div>
                                  <span className={`text-xs ${getConfidenceColor(message.metadata.confidence)}`}>
                                    {Math.round(message.metadata.confidence * 100)}%
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Acciones del mensaje */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => copyToClipboard(message.content, message.id)}
                                className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Copiar respuesta"
                              >
                                {copiedMessageId === message.id ? (
                                  <span className="text-xs text-green-600 px-1">¡Copiado!</span>
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                              
                              {!hasFeedback && (
                                <>
                                  <button
                                    onClick={() => giveFeedback(message.id, true)}
                                    className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                    title="Respuesta útil"
                                  >
                                    <ThumbsUp className="w-4 h-4" />
                                  </button>
                                  
                                  <button
                                    onClick={() => giveFeedback(message.id, false)}
                                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Marcar como incorrecto"
                                  >
                                    <ThumbsDown className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                              
                              {hasFeedback && (
                                <span className="text-xs text-green-600 px-2">
                                  ¡Gracias por su feedback!
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Indicador de dataset (solo para assistant) */}
                    {message.role === 'assistant' && message.dataSource && message.dataSource.includes('dataset') && (
                      <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Generado con dataset médico especializado</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}

        {/* Indicador de procesamiento */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="max-w-[85%]">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1.5 text-blue-600">
                  <Bot className="w-4 h-4" />
                  <span className="text-sm font-medium">Asistente Médico</span>
                </div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">
                      Procesando análisis médico...
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Consultando dataset y aplicando razonamiento estructurado
                    </div>
                  </div>
                </div>
                
                {/* Barra de progreso animada */}
                <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Área de entrada */}
      <div className="border-t border-gray-100 bg-white p-4">
        {/* Búsquedas recientes */}
        {showRecentQueries && recentQueries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium text-gray-700 flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-500" />
                Búsquedas recientes:
              </div>
              <button
                onClick={() => setShowRecentQueries(false)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Ocultar
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {recentQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(query);
                    inputRef.current?.focus();
                  }}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors hover:scale-105 active:scale-95 flex items-center gap-1"
                >
                  <Search className="w-3 h-3" />
                  <span className="max-w-[120px] truncate">{query}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {!showRecentQueries && recentQueries.length > 0 && (
          <button
            onClick={() => setShowRecentQueries(true)}
            className="mb-4 text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1"
          >
            <Clock className="w-3 h-3" />
            Mostrar búsquedas recientes
          </button>
        )}

        {/* Sugerencias */}
        {showSuggestions && suggestedQueries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-blue-500" />
                Consultas sugeridas:
              </div>
              <button
                onClick={() => setShowSuggestions(false)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Ocultar
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {suggestedQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(query);
                    inputRef.current?.focus();
                    setTimeout(() => onSend(), 100);
                  }}
                  className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-full transition-colors hover:scale-105 active:scale-95 shadow-sm"
                >
                  {query}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {!showSuggestions && suggestedQueries.length > 0 && (
          <button
            onClick={() => setShowSuggestions(true)}
            className="mb-4 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <ChevronDown className="w-4 h-4" />
            Mostrar sugerencias
          </button>
        )}

        {/* Input principal */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escriba su consulta médica (ej: 'riesgos en liposucción', 'candidatura para aumento mamario')..."
              disabled={isProcessing}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 placeholder-gray-500 pr-24"
            />
            
            {/* Contador de caracteres */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <div className="text-xs text-gray-400">
                {input.length}/500
              </div>
              {onReset && messages.length > 2 && (
                <button
                  onClick={onReset}
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  title="Reiniciar conversación"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
          
          <button
            onClick={onSend}
            disabled={isProcessing || !input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2 min-w-[120px] justify-center"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="hidden sm:inline">Analizando...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Enviar</span>
              </>
            )}
          </button>
        </div>

        {/* Nota al pie del input */}
        <div className="mt-3 text-xs text-gray-500 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Dataset médico integrado</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Razonamiento estructurado</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Respuesta en {isProcessing ? '...' : '<1s'}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span>{messages.filter(m => m.role === 'user').length} consultas</span>
          </div>
        </div>

        {/* Disclaimer médico */}
        <div className="mt-4 pt-3 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>Este es un demo técnico. No reemplaza consulta médica profesional.</span>
          </p>
        </div>
      </div>
    </div>
  );
}