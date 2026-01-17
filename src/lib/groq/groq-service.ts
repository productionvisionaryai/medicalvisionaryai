import Groq from 'groq-sdk';

// Configurar cliente de Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
  dangerouslyAllowBrowser: false // Seguro para server components
});

// Prompt especializado en medicina
const MEDICAL_SYSTEM_PROMPT = `Eres un asistente médico especializado en cirugía plástica y medicina general.
Tu tarea es proporcionar razonamiento médico paso a paso (Chain of Thought) y luego una respuesta clínica.

FORMATO DE RESPUESTA:
1. Primero proporciona tu RAZONAMIENTO en formato paso a paso, como lo haría un médico
2. Luego proporciona tu RESPUESTA clínica final

EJEMPLO DE FORMATO:
"RAZONAMIENTO: [tu análisis paso a paso aquí]
RESPUESTA: [tu conclusión médica aquí]"

Especialidades: cirugía plástica, evaluaciones preoperatorias, complicaciones postoperatorias, diagnóstico diferencial.
Usa terminología médica apropiada pero explica conceptos complejos.
`;

export async function getGroqMedicalResponse(userQuery: string) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: MEDICAL_SYSTEM_PROMPT },
        { role: "user", content: userQuery }
      ],
      model: process.env.NEXT_PUBLIC_GROQ_MODEL || "llama3-70b-8192",
      temperature: 0.3, // Baja temperatura para respuestas médicas consistentes
      max_tokens: 1500,
      stream: false
    });

    const response = completion.choices[0]?.message?.content || '';
    
    // Parsear respuesta para separar razonamiento de respuesta
    const reasoningMatch = response.match(/RAZONAMIENTO:\s*(.*?)(?=RESPUESTA:|$)/s);
    const answerMatch = response.match(/RESPUESTA:\s*(.*)/s);
    
    return {
      reasoning: reasoningMatch ? reasoningMatch[1].trim() : "Razonamiento no disponible.",
      answer: answerMatch ? answerMatch[1].trim() : response,
      raw: response
    };
  } catch (error) {
    console.error('Error con Groq API:', error);
    return {
      reasoning: "Error al procesar la consulta médica.",
      answer: "Disculpe, hubo un problema al generar la respuesta médica. Por favor, intente nuevamente.",
      error: true
    };
  }
}