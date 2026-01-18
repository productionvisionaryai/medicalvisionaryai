// src/app/api/medical-chat/route.ts
import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

// Generar ID de consulta único
const generateConsultationId = (): string => {
  const prefix = "HLN";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};

export async function POST(req: Request): Promise<Response> {
  try {
    const { query, patientContext } = await req.json();

    if (!query || typeof query !== 'string') {
      return Response.json(
        { error: "Consulta médica requerida" },
        { status: 400 }
      );
    }

    // Generar ID de consulta
    const consultationId = generateConsultationId();

    // Contexto del paciente (opcional)
    const patientInfo = patientContext ? `
INFORMACIÓN DEL PACIENTE:
• ${patientContext}
` : '';

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      system: `Eres Helena, asistente médica especializada.

FORMATO OBLIGATORIO:

## 🔍 ANÁLISIS
• [Análisis de la consulta]

## 📋 CONSIDERACIONES  
• [Factores a considerar]

## 🏥 RECOMENDACIONES
1. [Primera acción]
2. [Segunda acción]

## 📅 AGENDAMIENTO
• Cita: [Sí/No/Recomendado]
• Urgencia: [Baja/Media/Alta]
• Especialista: [Tipo]

## ⚠️ ADVERTENCIAS
• [Señales de alerta]

## 📝 REGISTRO
• ID: ${consultationId}
• Fecha: ${new Date().toLocaleDateString('es-ES')}
• Registrado para revisión médica

Sé empática y profesional.`,

      prompt: `Consulta: "${query}"
      ${patientInfo}
      
      Proporciona respuesta médica estructurada:`,

      temperature: 0.7,
    });

    return Response.json({
      reasoning: `Análisis médico para: ${query.substring(0, 50)}...`,
      answer: text,
      metadata: {
        consultationId,
        timestamp: new Date().toISOString(),
        model: "llama-3.3-70b-versatile",
      }
    });

  } catch (error) {
    console.error("Error en endpoint médico:", error);

    const errorMessage = error instanceof Error ? error.message : "Error desconocido";

    return Response.json(
      {
        error: "Error procesando consulta",
        details: errorMessage,
        reasoning: "Error en sistema",
        answer: "## ⚠️ ERROR\n\nPor favor, intenta nuevamente o contacta al equipo médico."
      },
      { status: 500 }
    );
  }
}

// Método OPTIONS para CORS
export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// Exportar para TypeScript
export const runtime = 'edge';
export const dynamic = 'force-dynamic';