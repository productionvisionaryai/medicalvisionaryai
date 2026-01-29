// src/app/api/medical-chat/route.ts
import { groq } from "@ai-sdk/groq";
import { streamText, createTextStreamResponse } from "ai"; 
import { config, getRequiredApiKey } from "@/lib/config";
import { prepareContextForHelena } from "@/lib/services/biometrics-context";

export async function POST(req: Request): Promise<Response> {
    try {
        const { messages, patientId } = await req.json();
        
        // 1. Obtención de Contexto Biométrico (RAG)
        let biometricContext = "No hay datos biométricos recientes vinculados.";
        if (patientId) {
            try {
                biometricContext = await prepareContextForHelena(patientId);
            } catch (e) {
                console.error("Nexus Audit - Biometric Error:", e);
            }
        }

        // 2. Ejecución con Streaming (Core Web Vitals al máximo)
        const result = streamText({
            model: groq(config.api.groq.model),
            system: `Eres Helena, asistente médico de confianza especializado en cirugía plástica y seguimiento de pacientes con wearables...

                    CONTEXTO BIOMÉTRICO (WEARABLES):
                    ${biometricContext}

                    INSTRUCCIONES DE FLUJO:
                    1. Toda tu lógica de pensamiento clínico DEBE ir dentro de etiquetas <reasoning>.
                    2. Tu respuesta final para el usuario DEBE ir fuera de esas etiquetas.
                    3. Ejemplo:
                    <reasoning>
                    - Analizando ritmo cardíaco: 110 bpm (Taquicardia leve).
                    - Paciente reporta mareo.
                    - Posible deshidratación o respuesta alérgica.
                    </reasoning>
                    Basado en tus métricas, noto una elevación en tu ritmo cardíaco...

                    INSTRUCCIONES CLAVE:
                    1. Analiza síntomas vs métricas.
                    2. Si el usuario necesita una cita, menciona: "Sugiero agendar una consulta para revisión profunda".
                    3. Mantén un tono profesional, empático y clínico.
                    
                    REGLAS DE SEGURIDAD:
                    - Si detectas urgencia crítica, prioriza el protocolo de emergencia.
                    - No reemplaces el juicio médico.`,
            messages,
        });
        
        return createTextStreamResponse(result);
    } catch (error) {
        console.error("Nexus Critical Error:", error);
        return new Response(JSON.stringify({ error: "Service Unavailable" }), { status: 500 });
    }
}
