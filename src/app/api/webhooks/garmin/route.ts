// src/app/api/webhooks/garmin/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Garmin envía ráfagas de datos (Dailies, Epochs, Sleep, etc.)
    // Aquí procesamos los 'dailies' que contienen frecuencia cardíaca y pasos
    if (data.dailies) {
      for (const entry of data.dailies) {
        const userId = entry.userId; // El ID de Garmin que debemos vincular al PatientId
        
        // Buscamos al paciente en nuestra DB que tenga este ID de Garmin
        const patient = await prisma.patient.findFirst({
          where: { medicalHistory: { contains: userId } } // O donde guardes su Garmin ID
        });

        if (patient) {
          // Guardamos la Frecuencia Cardíaca Promedio como métrica normalizada
          await prisma.normalizedMetric.create({
            data: {
              patientId: patient.id,
              type: 'HEART_RATE',
              value: entry.averageHeartRateInBeatsPerMinute,
              unit: 'bpm',
              source: 'GARMIN',
              timestamp: new Date(entry.startTimeInSeconds * 1000),
            }
          });
        }
      }
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('Garmin Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Garmin requiere un método GET para validar el endpoint (Handshake)
export async function GET() {
  return new Response('OK', { status: 200 });
}