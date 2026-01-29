import { MetricType } from "@prisma/client";

export const DiveMapper = {
  /**
   * Mapea los datos crudos de Garmin Dive a nuestro esquema
   */
  mapDiveToMetrics(garminDiveData: any) {
    const metrics = [];
    const timestamp = new Date(garminDiveData.startTimeInSeconds * 1000);

    // 1. Métrica de Profundidad Máxima
    metrics.push({
      type: MetricType.DEPTH,
      value: garminDiveData.maxDepth, // metros
      unit: "m",
      metadata: {
        avgDepth: garminDiveData.avgDepth,
        surfaceInterval: garminDiveData.surfaceIntervalDurationInSeconds,
        diveNumber: garminDiveData.diveNumber
      }
    });

    // 2. Métrica de Temperatura (Seguridad Térmica)
    if (garminDiveData.minTemperature) {
      metrics.push({
        type: MetricType.WATER_TEMPERATURE,
        value: garminDiveData.minTemperature,
        unit: "C",
        metadata: { location: "Underwater" }
      });
    }

    // 3. Alertas de Descompresión (Metadata Crítica)
    if (garminDiveData.decompressionViolated) {
      metrics.push({
        type: MetricType.DECO_STOP,
        value: 1, // Flag de violación
        unit: "violation_count",
        metadata: {
          severity: "HIGH",
          message: "El buceador omitió una parada de descompresión obligatoria"
        }
      });
    }

    return metrics;
  }
};
