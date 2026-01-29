'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, User, Bot, Clock, Copy, ThumbsUp, ThumbsDown,
  ChevronDown, Sparkles, AlertCircle, Search,
  Zap, Brain, Database, RefreshCw, ShieldCheck
} from 'lucide-react';

// ... (Mantenemos las interfaces igual para no romper la lógica)

export default function ChatInterface({
  messages, input, setInput, isProcessing, onSend, suggestedQueries, recentQueries = [], onReset
}: ChatInterfaceProps) {
  
  // Estética de las Burbujas de Chat
  const UserBubble = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-gradient-to-br from-pheromone-flush to-pheromone-glow text-white rounded-[2rem] rounded-tr-none p-5 shadow-lg shadow-pheromone-glow/10 border border-white/20">
      {children}
    </div>
  );

  const BotBubble = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] rounded-tl-none p-6 text-reward-silver shadow-2xl">
      {children}
    </div>
  );

  return (
    <div className="flex flex-col h-[700px] bg-obsidian-soft/30 backdrop-blur-md rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
      
      {/* Área de mensajes con efecto de profundidad */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pheromone-glow/5 via-transparent to-transparent">
        {messages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="h-full flex flex-col items-center justify-center text-center p-12"
          >
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-pheromone-glow/20 blur-[40px] rounded-full animate-pulse" />
                <Brain className="w-20 h-20 text-pheromone-glow relative z-10" />
            </div>
            <h2 className="text-2xl font-light text-white tracking-tight mb-2">Helena Core Intelligence</h2>
            <p className="text-sm text-white/40 max-w-xs font-light leading-relaxed">
                Inicie una secuencia de consulta para activar el protocolo de análisis biométrico.
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode='popLayout'>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] group`}>
                  {/* Metadata Header */}
                  <div className={`flex items-center gap-3 mb-2 px-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className="p-1.5 rounded-full bg-white/5 border border-white/10">
                        {message.role === 'assistant' ? <Bot className="w-3.5 h-3.5 text-pheromone-glow" /> : <User className="w-3.5 h-3.5 text-reward-gold" />}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                        {message.role === 'assistant' ? 'Helena AI' : 'Consultant'}
                    </span>
                    <span className="text-[10px] font-mono text-white/20 italic">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {message.role === 'user' ? (
                    <UserBubble>{message.content}</UserBubble>
                  ) : (
                    <BotBubble>
                        <div className="prose prose-invert prose-sm max-w-none">
                            {/* Aquí iría tu función renderContent refinada */}
                            <p className="leading-relaxed text-reward-silver/90">{message.content}</p>
                        </div>

                        {/* Confianza Meta-UI */}
                        {message.metadata?.confidence && (
                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${message.metadata.confidence * 100}%` }}
                                            className="h-full bg-pheromone-glow" 
                                        />
                                    </div>
                                    <span className="text-[9px] font-mono text-pheromone-glow uppercase tracking-widest">
                                        Confidence: {Math.round(message.metadata.confidence * 100)}%
                                    </span>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 hover:bg-white/5 rounded-full text-white/20 hover:text-pheromone-glow transition-colors">
                                        <Copy className="w-3.5 h-3.5" />
                                    </button>
                                    <button className="p-2 hover:bg-white/5 rounded-full text-white/20 hover:text-emerald-400">
                                        <ThumbsUp className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </BotBubble>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {/* Processing Indicator Estilizado */}
        {isProcessing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <BotBubble>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <RefreshCw className="w-5 h-5 text-pheromone-glow animate-spin" />
                        <div className="absolute inset-0 blur-lg bg-pheromone-glow/50 animate-pulse" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white tracking-widest uppercase mb-1">Neural Processing</p>
                        <p className="text-[10px] text-white/40 font-mono italic">Accessing Medical Datasets...</p>
                    </div>
                </div>
            </BotBubble>
          </motion.div>
        )}
      </div>

      {/* Input de Control: Estética de Consola de Lujo */}
      <div className="p-8 bg-obsidian-soft/80 backdrop-blur-3xl border-t border-white/5">
        <div className="max-w-4xl mx-auto">
            {/* Sugerencias estilo "Pills" minimalistas */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
                {suggestedQueries.map((q, i) => (
                    <button key={i} onClick={() => setInput(q)} className="whitespace-nowrap px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] text-white/60 hover:border-pheromone-glow/50 hover:text-white transition-all">
                        {q}
                    </button>
                ))}
            </div>

            <div className="relative group">
                <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && onSend()}
                    placeholder="Escriba su consulta médica..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 text-reward-silver placeholder:text-white/20 focus:outline-none focus:border-pheromone-glow/40 focus:bg-white/[0.05] transition-all"
                />
                <button 
                    onClick={onSend}
                    disabled={isProcessing || !input.trim()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-pheromone-glow rounded-xl text-obsidian-deep hover:scale-105 active:scale-95 disabled:opacity-30 transition-all"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>

            {/* Disclaimer & Trust Indicators */}
            <div className="mt-4 flex items-center justify-between text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-emerald-500/50">
                        <ShieldCheck className="w-3 h-3" /> HIPAA SECURED
                    </span>
                    <span>Helena AI v4.2</span>
                </div>
                <span>{input.length}/500</span>
            </div>
        </div>
      </div>
    </div>
  );
}