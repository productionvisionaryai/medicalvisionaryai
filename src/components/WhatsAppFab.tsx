'use client'
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { config } from '@/lib/config';

export default function WhatsAppFab() {
  // Número de la clínica o enfermera de guardia
  const phoneNumber = config.contact.whatsapp;
  const message = "Hola, necesito asistencia médica inmediata respecto a mi procedimiento.";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-2">
      {/* Etiqueta de Soporte Médico */}
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/90 backdrop-blur-sm text-[10px] font-bold text-red-600 px-3 py-1 rounded-full shadow-sm border border-red-100 uppercase tracking-tighter"
      >
        Soporte Urgente
      </motion.span>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="relative bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20ba5a] transition-colors"
      >
        {/* Efecto de pulso para el "Botón de Pánico" */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"></span>
        <MessageCircle size={28} />
      </motion.button>
    </div>
  );
}