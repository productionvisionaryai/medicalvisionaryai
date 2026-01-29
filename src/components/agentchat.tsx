'use client'
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ShieldCheck } from 'lucide-react';
import { ELENA_PROMPT } from '@/lib/agent-config';

export default function AgentChat() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hola, soy Elena. Es un gusto saludarte. Mi misión es acompañarte en este proceso para que te sientas segura e informada antes de conocer al Dr. [Nombre].' 
    },
    { 
      role: 'assistant', 
      content: 'Sé que decidirse por un cambio estético es un paso importante. Para orientarte mejor, cuéntame: ¿Qué procedimiento tienes en mente o qué área de tu cuerpo te gustaría armonizar?' 
    }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Agregar mensaje del usuario
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    // Simulación de respuesta lógica de Elena siguiendo sus Prohibiciones
    setTimeout(() => {
      let response = "";
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes('precio') || lowerInput.includes('cuánto cuesta')) {
        response = "Entiendo perfectamente que esto sea importante para ti. Sin embargo, el costo depende de la complejidad técnica, el tiempo de quirófano y los insumos específicos, lo cual se define en la cita de valoración.";
      } else if (lowerInput.includes('necesito') || lowerInput.includes('operame')) {
        response = "Por lo que me comentas, podrías ser candidata a este procedimiento, pero el Dr. debe evaluarte en persona para asegurar resultados naturales y armonía.";
      } else {
        response = "Gracias por compartir eso conmigo. Mi función es ser el puente de confianza entre tu deseo estético y la seguridad clínica. ¿Tienes alguna duda sobre los tiempos de recuperación o el post-operatorio?";
      }

      setMessages([...newMessages, { role: 'assistant', content: response }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 w-87.5 z-50 flex flex-col shadow-2xl rounded-3xl overflow-hidden border border-slate-100 bg-white/95 backdrop-blur-md">
      {/* Header: Profesionalismo y Ética */}
      <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100/10 flex items-center justify-center border border-white/20">
            <ShieldCheck size={20} className="text-blue-300" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">Elena</p>
            <p className="text-[10px] text-blue-200 uppercase tracking-widest">Asesora Experta</p>
          </div>
        </div>
      </div>

      {/* Chat Body: Fase de Escucha */}
      <div ref={scrollRef} className="h-100 p-5 overflow-y-auto space-y-4 bg-linear-to-b from-slate-50/50 to-white">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i}
              className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'assistant' 
                ? 'bg-white border border-slate-100 text-slate-700 shadow-sm' 
                : 'bg-slate-900 text-white shadow-lg'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input: Captura de Leads de Alta Intención */}
      <div className="p-4 bg-white border-t border-slate-50 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribe tu mensaje..."
          className="flex-1 text-sm bg-slate-50 p-3 rounded-xl outline-none focus:ring-1 focus:ring-blue-900/10 transition-all text-slate-600"
        />
        <button 
          onClick={handleSend}
          className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-900 transition-colors shadow-md active:scale-90"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}