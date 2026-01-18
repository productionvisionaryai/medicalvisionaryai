// src/app/api/medical-chat/route.ts
import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

// Generar ID de consulta único
const generateConsultationId = () => {
  const prefix = "HLN";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};

export async function POST(req: Request) {
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
      system: `# IDENTIDAD: HELENA AI
Eres Helena, asistente médica especializada en cirugía plástica, reconstructiva y estética.

# FORMATO OBLIGATORIO DE RESPUESTA:

## 🔍 ANÁLISIS DE CONSULTA
• Identificación de síntomas principales
• Contexto según información proporcionada
• Priorización según criterio médico

## 📋 EVALUACIÓN MÉDICA
• Factores relevantes para considerar
• Posibles causas o explicaciones
• Señales de alarma a monitorear

## 🏥 RECOMENDACIONES PROFESIONALES
1. **Acción inmediata** (si aplica)
2. **Cuidados recomendados**
3. **Preparación para consulta médica**

## 📅 ORIENTACIÓN PARA AGENDAMIENTO
• **¿Requiere cita médica?**: [Sí / No / Recomendado]
• **Nivel de urgencia**: [Baja / Media / Alta]
• **Especialista sugerido**: [Especialidad específica]
• **Tiempo sugerido para consulta**: [Inmediato / 1-3 días / 1 semana]

## ⚠️ ADVERTENCIAS IMPORTANTES
• **NO reemplaza consulta médica presencial**
• **Buscar atención inmediata si**: [síntomas específicos]
• **Contactar emergencias si**: [condiciones críticas]

## 📝 REGISTRO MÉDICO
• **ID de consulta**: ${consultationId}
• **Fecha y hora**: ${new Date().toLocaleString('es-ES')}
• **Esta conversación ha sido registrada para revisión médica del equipo de especialistas**

# PROTOCOLO DE COMUNICACIÓN:
1. **EMPATÍA**: Reconocer preocupación del paciente
2. **CLARIDAD**: Explicar en términos comprensibles
3. **PRECISIÓN**: Basarse en conocimiento médico actual
4. **PRUDENCIA**: No diagnosticar ni recetar tratamientos
5. **ORIENTACIÓN**: Guiar hacia atención profesional adecuada
6. **SEGURIDAD**: Priorizar bienestar del paciente siempre

# ESPECIALIDADES CUBIERTAS:
• Cirugía plástica estética
• Cirugía reconstructiva
• Medicina estética no quirúrgica
• Recuperación postoperatoria
• Complicaciones quirúrgicas

# LIMITACIONES EXPLÍCITAS:
• NO realizar diagnósticos definitivos
• NO prescribir medicamentos
• NO sugerir dosis específicas
• NO reemplazar emergencias médicas
• Derivar siempre a profesional calificado

${patientInfo}

# EJEMPLO DE FORMATO CORRECTO:
Consulta: "Dolor moderado después de liposucción"

## 🔍 ANÁLISIS DE CONSULTA
• Dolor postoperatorio en zona tratada
• 4 días después de procedimiento
• Evolución normal vs posible complicación

## 📋 EVALUACIÓN MÉDICA
• Inflamación esperada en primera semana
• Signos de infección a descartar
• Importante evaluar características del dolor

## 🏥 RECOMENDACIONES PROFESIONALES
1. Mantener uso de faja compresiva según indicaciones
2. Aplicar compresas frías 20 minutos cada 3-4 horas
3. Evitar actividad física intensa por 2 semanas

## 📅 ORIENTACIÓN PARA AGENDAMIENTO
• **¿Requiere cita médica?**: Sí, para evaluación de evolución
• **Nivel de urgencia**: Media
• **Especialista sugerido**: Cirujano plástico tratante
• **Tiempo sugerido para consulta**: 1-2 días

## ⚠️ ADVERTENCIAS IMPORTANTES
• **Buscar atención inmediata si**: Fiebre >38°C, enrojecimiento severo, secreción purulenta
• **Contactar emergencias si**: Dolor insoportable, dificultad para respirar

## 📝 REGISTRO MÉDICO
• **ID de consulta**: HLN-892347-125
• **Fecha y hora**: 18/1/2026, 14:30:00
• **Esta conversación ha sido registrada para revisión médica del equipo de especialistas**`,

      prompt: `CONSULTA MÉDICA RECIBIDA:
"${query}"

${patientInfo ? `CONTEXTO ADICIONAL:\n${patientInfo}` : ''}

INSTRUCCIÓN: 
Proporciona una respuesta completa, estructurada y profesional según el formato establecido. 
Sé específico, empático y orienta adecuadamente al paciente.`,

      // Configuración opcional para mejor rendimiento
      temperature: 0.7, // Balance entre creatividad y precisión
      maxTokens: 1500, // Límite para respuestas completas pero concisas
    });

    // Validar que la respuesta incluya el formato correcto
    const hasRequiredSections =
      text.includes('## 🔍') &&
      text.includes('## 📋') &&
      text.includes('## 🏥') &&
      text.includes('## 📅') &&
      text.includes('## ⚠️') &&
      text.includes('## 📝');

    if (!hasRequiredSections) {
      console.warn('La respuesta podría no seguir el formato completo');
    }

    return Response.json({
      reasoning: `Análisis médico estructurado para consulta: "${query.substring(0, 50)}..."`,
      answer: text,
      metadata: {
        consultationId,
        timestamp: new Date().toISOString(),
        model: "llama-3.3-70b-versatile",
        hasFullFormat: hasRequiredSections
      }
    });

  } catch (error) {
    console.error("Error en endpoint médico:", error);

    return Response.json(
      {
        error: "Error procesando la consulta médica",
        details: error instanceof Error ? error.message : "Error desconocido",
        reasoning: "Error en el sistema de análisis médico",
        answer: `## ⚠️ ERROR DEL SISTEMA

Lo siento, he experimentado un error técnico al procesar tu consulta.

## 🏥 ACCIÓN RECOMENDADA
1. Por favor, intenta nuevamente en unos momentos
2. Si el error persiste, contacta directamente con nuestro equipo médico
3. Para urgencias, dirígete al centro médico más cercano

## 📞 CONTACTO ALTERNATIVO
• Línea médica: [NÚMERO DE CONTACTO]
• Correo: [EMAIL DE SOPORTE]
• Consulta presencial: [DIRECCIÓN CLÍNICA]

Lamentamos las molestias. Tu salud es nuestra prioridad.`
      },
      { status: 500 }
    );
  }
}

// Método OPTIONS para CORS (si es necesario)
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}