// src/lib/services/metrics-service.ts
import { db as prisma } from "@/lib/db";

// Local enum definition based on the Prisma schema
export enum MetricType {
  HEART_RATE = "HEART_RATE",
  BLOOD_PRESSURE_SYSTOLIC = "BLOOD_PRESSURE_SYSTOLIC",
  BLOOD_PRESSURE_DIASTOLIC = "BLOOD_PRESSURE_DIASTOLIC",
  BLOOD_OXYGEN = "BLOOD_OXYGEN",
  GLUCOSE = "GLUCOSE",
  STEPS = "STEPS",
  STRESS_LEVEL = "STRESS_LEVEL",
  RESPIRATION_RATE = "RESPIRATION_RATE",
  VO2_MAX = "VO2_MAX",
  DEPTH = "DEPTH",
  WATER_TEMPERATURE = "WATER_TEMPERATURE",
  DECO_STOP = "DECO_STOP",
  ALTITUDE = "ALTITUDE",
  GPS_COORDINATES = "GPS_COORDINATES"
}

export const MetricsService = {
  /**
   * Normaliza y guarda métricas de cualquier fuente
   */
  async registerMetric(data: {
    patientId: string;
    type: MetricType;
    value: number;
    unit: string;
    source: "GARMIN" | "APPLE_HEALTH" | "GOOGLE_FIT" | "MANUAL";
  }) {
    return await prisma.normalizedMetric.create({
      data: {
        ...data,
        timestamp: new Date(),
        confidence: 1.0,
      },
    });
  },

  /**
   * Recupera el resumen para Helena
   */
  async getLatestMetrics(patientId: string, days = 7) {
    return await prisma.normalizedMetric.findMany({
      where: {
        patientId,
        timestamp: { gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) },
      },
      orderBy: { timestamp: "desc" },
    });
  }
};