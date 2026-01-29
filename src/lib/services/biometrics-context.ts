// src/lib/services/biometrics-context.ts
import { MetricsService } from "./metrics-service";

/**
 * Tipo para métricas normalizadas
 */
interface NormalizedMetric {
  type: string;
  value: number;
  unit: string;
  timestamp: Date;
}

/**
 * Prepara el contexto biométrico para Helena basándose en los datos del paciente
 */
export async function prepareContextForHelena(patientId: string): Promise<string> {
  try {
    const metrics = await MetricsService.getLatestMetrics(patientId, 7) as NormalizedMetric[];
    
    if (!metrics || metrics.length === 0) {
      return "No hay datos biométricos recientes vinculados.";
    }

    // Organizar métricas por tipo
    const metricsByType = metrics.reduce((acc: Record<string, NormalizedMetric[]>, metric: NormalizedMetric) => {
      const type = metric.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(metric);
      return acc;
    }, {} as Record<string, NormalizedMetric[]>);

    // Construir contexto legible para Helena
    const contextParts: string[] = ["📊 Métricas biométricas de los últimos 7 días:"];

    // Frecuencia cardíaca
    if (metricsByType["HEART_RATE"]) {
      const heartRates = metricsByType["HEART_RATE"];
      const avgHeartRate = heartRates.reduce((sum: number, m: NormalizedMetric) => sum + m.value, 0) / heartRates.length;
      contextParts.push(`❤️ Frecuencia cardíaca promedio: ${avgHeartRate.toFixed(0)} bpm`);
    }

    // Saturación de oxígeno
    if (metricsByType["OXYGEN_SATURATION"]) {
      const oxygenMetrics = metricsByType["OXYGEN_SATURATION"];
      const latestOxygen = oxygenMetrics[0];
      contextParts.push(`🫁 Saturación de oxígeno: ${latestOxygen.value}%`);
    }

    // Temperatura corporal
    if (metricsByType["BODY_TEMPERATURE"]) {
      const tempMetrics = metricsByType["BODY_TEMPERATURE"];
      const latestTemp = tempMetrics[0];
      contextParts.push(`🌡️ Temperatura corporal: ${latestTemp.value}${latestTemp.unit}`);
    }

    // Profundidad (para pacientes que bucean)
    if (metricsByType["DEPTH"]) {
      const depthMetrics = metricsByType["DEPTH"];
      const maxDepth = Math.max(...depthMetrics.map((m: NormalizedMetric) => m.value));
      contextParts.push(`🌊 Profundidad máxima de inmersión: ${maxDepth}m`);
    }

    // Pasos / Actividad
    if (metricsByType["STEPS"]) {
      const stepsMetrics = metricsByType["STEPS"];
      const totalSteps = stepsMetrics.reduce((sum: number, m: NormalizedMetric) => sum + m.value, 0);
      contextParts.push(`👟 Total de pasos: ${totalSteps.toLocaleString()}`);
    }

    return contextParts.join("\n");
  } catch (error) {
    console.error("Error preparing biometric context:", error);
    return "Error al obtener datos biométricos.";
  }
}
