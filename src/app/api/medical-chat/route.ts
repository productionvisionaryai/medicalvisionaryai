// app/api/chat/route.ts - REEMPLAZA TODO CON ESTO
import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Extrae el último mensaje del usuario
    const lastUserMessage = messages
      .filter((m: any) => m.role === 'user')
      .pop()?.content || '';

    // Si no hay mensaje, devuelve saludo inicial
    if (!lastUserMessage.trim()) {
      return new Response(
        JSON.stringify({
          message: "¡Hola! Soy Helena, tu asistente médica. ¿En qué puedo ayudarte hoy?"
        })
      );
    }

    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),

      system: `Eres Helena, una asistente médica especializada.
      
OBJETIVOS PRINCIPALES:
1. Realizar triage médico inteligente
2. Resolver dudas sobre medicina general y estética
3. Agendar citas cuando sea necesario

ESPECIALIDADES:
• Cirugía plástica y reconstructiva
• Medicina estética no invasiva
• Evaluaciones preoperatorias
• Seguimiento postoperatorio
• Diagnóstico diferencial básico

TONO Y ESTILO:
• Profesional pero empático
• Clara y directa en explicaciones médicas
• Reconoce límites (derivar a médico cuando sea necesario)
• Amable en la interacción

IMPORTANTE:
• TODA conversación queda registrada para revisión médica posterior
• Menciona esto discretamente al final de tu respuesta
• No hagas diagnósticos definitivos, solo orientación
• Para emergencias, indica acudir a urgencias inmediatamente

FORMATO DE RESPUESTA:
[ANÁLISIS]
• Consideraciones principales
• Factores de riesgo relevantes
• Posibles causas

[RECOMENDACIÓN]
• Pasos a seguir
• Si requiere cita médica (Sí/No)
• Nivel de urgencia (Baja/Media/Alta)

[NOTA]
• Recordatorio de registro médico`,

      prompt: `Consulta del paciente: "${lastUserMessage}"

Proporciona una respuesta completa en el formato establecido.`,

      // Configuración óptima para Groq
      temperature: 0.4, // Balance entre creatividad y consistencia
      maxTokens: 800,   // Suficiente para respuestas completas
    });

    return result.toTextStreamResponse();

  } catch (error) {
    console.error('Error en endpoint /api/chat:', error);

    // Fallback elegante
    return new Response(
      JSON.stringify({
        error: false,
        message: "Disculpa, estoy teniendo dificultades técnicas. Por favor, intenta nuevamente o contacta directamente a la clínica."
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}