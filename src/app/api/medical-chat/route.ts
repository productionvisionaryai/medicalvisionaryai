import { NextRequest, NextResponse } from 'next/server';
import { getGroqMedicalResponse } from '@/lib/groq/groq-service';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Consulta médica requerida' },
        { status: 400 }
      );
    }
    
    // Validar longitud de la consulta
    if (query.length > 1000) {
      return NextResponse.json(
        { error: 'La consulta es demasiado larga (máximo 1000 caracteres)' },
        { status: 400 }
      );
    }
    
    console.log('📝 Consulta médica recibida:', query.substring(0, 100) + '...');
    
    // Llamar a Groq
    const response = await getGroqMedicalResponse(query);
    
    console.log('✅ Respuesta generada, longitud razonamiento:', response.reasoning?.length || 0);
    
    // Aquí podrías guardar en la base de datos si quieres
    // await saveConversationToDB(query, response);
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('❌ API Error:', error.message);
    
    // Respuesta de fallback
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        reasoning: "Error en el servicio de análisis médico. Detalle: " + (error.message || 'Desconocido'),
        answer: "Por favor, intente nuevamente más tarde o use el modo de búsqueda en dataset."
      },
      { status: 500 }
    );
  }
}

// Opcional: Método GET para probar
export async function GET() {
  return NextResponse.json({
    message: 'API Médica PlastAI funcionando',
    status: 'operational',
    timestamp: new Date().toISOString()
  });
}