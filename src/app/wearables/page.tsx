'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Activity, Scale, Moon, Heart, Zap, Brain,
    Database, Shield, Smartphone, Cpu, Cloud,
    ArrowRight, CheckCircle, SmartphoneIcon, Watch,
    BarChart3, Thermometer, Battery, Users
} from 'lucide-react';

// Componentes de la página
import WearableDashboard from '@/components/medical/WearableDashboard';
import ApiIntegrationDemo from '@/components/medical/ApiIntegrationDemo';
import PatientMonitor from '@/components/medical/PatientMonitor';

// Componente Apple Icon (si no existe en lucide)
function Apple(props: React.ComponentProps<'svg'>) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.31-2.33 1.05-3.11z" />
        </svg>
    );
}

export default function WearablesIntegrationPage() {
    const [activeWearable, setActiveWearable] = useState('google-fit');
    const [integrationStep, setIntegrationStep] = useState(1);

    const wearablesData = [
        {
            id: 'google-fit',
            name: 'Google Fit API',
            icon: <Cloud className="w-6 h-6" />,
            color: 'bg-blue-500',
            metrics: ['Peso', 'IMC', 'Pasos', 'Frecuencia Cardíaca', 'Sueño', 'SpO2'],
            compatibility: ['Fitbit', 'Withings', 'Samsung', 'Apps Android'],
            setupTime: '2-3 horas',
            patients: '85% compatibilidad'
        },
        {
            id: 'withings',
            name: 'Withings API',
            icon: <Scale className="w-6 h-6" />,
            color: 'bg-green-500',
            metrics: ['Composición Corporal', 'Presión Arterial', 'Hidratación', 'Masa Muscular'],
            compatibility: ['Escalas Body+', 'Brazaletes', 'Termómetros'],
            setupTime: '3-4 horas',
            patients: 'Excelente para bariátrica'
        },
        {
            id: 'oura',
            name: 'Oura Ring API',
            icon: <Moon className="w-6 h-6" />,
            color: 'bg-purple-500',
            metrics: ['Readiness Score', 'Temperatura Corporal', 'HRV', 'Sueño Profundo'],
            compatibility: ['Oura Ring 3'],
            setupTime: '4-5 horas',
            patients: 'Recuperación post-operatoria'
        },
        {
            id: 'apple-health',
            name: 'Apple HealthKit',
            icon: <Apple className="w-6 h-6" />,
            color: 'bg-gray-900',
            metrics: ['Nutrición', 'VO2 Máx', 'Ejercicio', 'Glucosa'],
            compatibility: ['iPhone', 'Apple Watch'],
            setupTime: '3-4 horas',
            patients: 'Ecosistema iOS'
        }
    ];

    const postOpPhases = [
        {
            phase: 'Fase 1',
            title: 'Primera Semana Post-Op',
            metrics: ['Frecuencia Cardíaca', 'SpO2', 'Temperatura', 'Hidratación'],
            wearables: ['Oura Ring', 'Withings Scale'],
            critical: 'Detección temprana de complicaciones'
        },
        {
            phase: 'Fase 2',
            title: 'Semanas 2-4',
            metrics: ['Actividad', 'Pasos', 'Sueño', 'Composición Corporal'],
            wearables: ['Fitbit', 'Apple Watch', 'Google Fit'],
            critical: 'Monitoreo de recuperación'
        },
        {
            phase: 'Fase 3',
            title: 'Meses 1-6',
            metrics: ['IMC', '% Grasa', 'Masa Muscular', 'VO2 Máx'],
            wearables: ['Withings Body+', 'Garmin', 'Polar'],
            critical: 'Seguimiento a largo plazo'
        }
    ];

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-green-100 px-4 py-2 rounded-full mb-6"
                        >
                            <Zap className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">
                                MONITOREO INTELIGENTE POST-OPERATORIO
                            </span>
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
                            <span className="block">Integre los datos de</span>
                            <span className="font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Wearables a su Práctica Bariátrica
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-10">
                            Conecte dispositivos como <strong>Fitbit</strong>, <strong>Withings</strong>, y <strong>Oura Ring</strong>
                            directamente a Helena AI. Monitoree la recuperación post-operatoria en tiempo real,
                            detecte complicaciones tempranas y personalice el seguimiento de cada paciente.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm border">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="font-medium">Datos en tiempo real</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm border">
                                <Shield className="w-5 h-5 text-blue-500" />
                                <span className="font-medium">HIPAA compliant</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm border">
                                <Brain className="w-5 h-5 text-purple-500" />
                                <span className="font-medium">Alertas predictivas</span>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-20">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    Vista Previa del Dashboard
                                </h2>
                                <p className="text-gray-600">
                                    Datos de pacientes bariátricos en tiempo real
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {wearablesData.slice(0, 3).map(wearable => (
                                    <div
                                        key={wearable.id}
                                        className={`p-3 rounded-lg ${wearable.color} bg-opacity-10 border ${wearable.color.replace('bg-', 'border-')} border-opacity-30`}
                                    >
                                        {wearable.icon}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <WearableDashboard />
                    </div>
                </div>
            </section>

            {/* Why Wearables Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-green-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-semibold text-gray-900 mb-4">
                            ¿Por qué integrar wearables en cirugía bariátrica?
                        </h2>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            El 63% de las complicaciones post-operatorias pueden detectarse tempranamente
                            mediante monitoreo continuo de signos vitales.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 rounded-2xl shadow-lg"
                        >
                            <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-6">
                                <Activity className="w-7 h-7 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Detección Temprana de Complicaciones
                            </h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                                    <span>Frecuencia cardíaca anormal</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                                    <span>Hipoxia nocturna (SpO2 bajo)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                                    <span>Fiebre post-operatoria</span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-lg"
                        >
                            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                                <BarChart3 className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Seguimiento Objetivo del Progreso
                            </h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                                    <span>Curva de pérdida de peso precisa</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                                    <span>Monitoreo de composición corporal</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                                    <span>Adherencia a actividad física</span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl shadow-lg"
                        >
                            <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mb-6">
                                <Users className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Mejora en Resultados del Paciente
                            </h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                                    <span>28% menos reingresos hospitalarios</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                                    <span>Mejor adherencia a protocolos</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                                    <span>Intervenciones proactivas</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Wearable Options */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-semibold text-gray-900 mb-4">
                            APIs Disponibles para Integración
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Seleccione los wearables que usan sus pacientes. Helena AI se integra automáticamente.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {wearablesData.map((wearable) => (
                            <motion.button
                                key={wearable.id}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setActiveWearable(wearable.id)}
                                className={`p-6 rounded-2xl text-left transition-all ${activeWearable === wearable.id ? 'bg-white shadow-xl border-2 border-blue-500' : 'bg-gray-50 hover:bg-white hover:shadow-lg border border-gray-200'}`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl ${wearable.color} bg-opacity-10`}>
                                        <div className={wearable.color.replace('bg-', 'text-')}>
                                            {wearable.icon}
                                        </div>
                                    </div>
                                    {activeWearable === wearable.id && (
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    )}
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {wearable.name}
                                </h3>

                                <div className="space-y-3">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-1">Métricas clave:</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {wearable.metrics.slice(0, 3).map(metric => (
                                                <span key={metric} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                    {metric}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-1">Compatibilidad:</h4>
                                        <p className="text-sm text-gray-600">{wearable.compatibility.join(', ')}</p>
                                    </div>

                                    <div className="pt-2 border-t border-gray-100">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Configuración:</span>
                                            <span className="font-medium">{wearable.setupTime}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Pacientes:</span>
                                            <span className="font-medium">{wearable.patients}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Integration Steps */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                                <Cpu className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900">
                                    Proceso de Integración
                                </h3>
                                <p className="text-gray-600">
                                    Implementación en 4 pasos simples
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                { step: 1, title: 'Autorización OAuth', desc: 'Permisos del paciente' },
                                { step: 2, title: 'Sincronización Inicial', desc: 'Histórico de datos' },
                                { step: 3, title: 'Flujo Continuo', desc: 'Webhooks en tiempo real' },
                                { step: 4, title: 'Análisis Helena AI', desc: 'Alertas y recomendaciones' }
                            ].map((item) => (
                                <motion.div
                                    key={item.step}
                                    onClick={() => setIntegrationStep(item.step)}
                                    whileHover={{ scale: 1.05 }}
                                    className={`p-6 rounded-xl cursor-pointer transition-all ${integrationStep === item.step ? 'bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-500' : 'bg-gray-50 hover:bg-white'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${integrationStep === item.step ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                            {item.step}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                            <p className="text-sm text-gray-600">{item.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                            <ApiIntegrationDemo step={integrationStep} wearable={activeWearable} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Post-Op Monitoring Phases */}
            <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-semibold text-gray-900 mb-4">
                            Monitoreo por Fases Post-Operatorias
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Helena AI adapta las métricas críticas según la fase de recuperación
                        </p>
                    </div>

                    <div className="space-y-6">
                        {postOpPhases.map((phase, index) => (
                            <motion.div
                                key={phase.phase}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-500"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                                                <span className="text-xl font-bold text-blue-600">{phase.phase}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-semibold text-gray-900">{phase.title}</h3>
                                                <p className="text-gray-600">{phase.critical}</p>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-medium text-gray-700 mb-2">Métricas Clave:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {phase.metrics.map(metric => (
                                                        <span key={metric} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                                            {metric}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-700 mb-2">Wearables Recomendados:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {phase.wearables.map(wearable => (
                                                        <span key={wearable} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                                                            {wearable}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:w-64">
                                        <PatientMonitor phase={phase.phase} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Implementation */}
            <section className="py-20 px-4 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-semibold mb-4">
                            Implementación Técnica
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Integración completa en su infraestructura existente
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-gray-800 rounded-2xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <Database className="w-8 h-8 text-blue-400" />
                                <h3 className="text-2xl font-semibold">Arquitectura de Datos</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-gray-700 rounded-lg">
                                    <h4 className="font-medium text-blue-300 mb-2">Flujo de Sincronización</h4>
                                    <code className="text-sm text-gray-300 block">
                                        {`wearable → API Gateway → Webhook → Helena AI → Dashboard`}
                                    </code>
                                </div>

                                <div className="p-4 bg-gray-700 rounded-lg">
                                    <h4 className="font-medium text-green-300 mb-2">Seguridad HIPAA</h4>
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        <li>• Datos encriptados end-to-end</li>
                                        <li>• Certificación HIPAA compliant</li>
                                        <li>• Auditoría de acceso completa</li>
                                        <li>• Contratos BAA disponibles</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-2xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <Zap className="w-8 h-8 text-green-400" />
                                <h3 className="text-2xl font-semibold">Código de Ejemplo</h3>
                            </div>

                            <div className="bg-black rounded-xl p-6 overflow-x-auto">
                                <pre className="text-sm text-gray-300">
                                    {`// Integración con Google Fit API
import { google } from 'googleapis';

const fitness = google.fitness('v1');

async function syncPatientData(patientId, accessToken) {
  const response = await fitness.users.dataSources.datasets.get({
    userId: 'me',
    dataSourceId: 'derived:com.google.weight:...',
    datasetId: \`\${startTime}-\${endTime}ns\`,
    access_token: accessToken
  });
  
  // Procesamiento con Helena AI
  const analysis = await helenaAI.analyzeMetrics({
    weight: response.data.point[0].value[0].fpVal,
    timestamp: response.data.point[0].startTimeNanos
  });
  
  return analysis;
}`}
                                </pre>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <motion.a
                            href="/contacto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-shadow"
                        >
                            Solicitar Implementación Personalizada
                            <ArrowRight className="w-5 h-5" />
                        </motion.a>
                        <p className="text-gray-400 mt-4 text-sm">
                            Nuestro equipo técnico configura la integración completa en 72 horas
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-12 border border-blue-100">
                        <h2 className="text-4xl font-semibold text-gray-900 mb-6">
                            Comience a Monitorear sus Pacientes en Tiempo Real
                        </h2>
                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                            Conecte los wearables de sus pacientes en minutos. Reciba alertas proactivas
                            y mejore los resultados post-operatorios.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl"
                            >
                                Demostración en Vivo
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-gray-900 border-2 border-blue-200 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50"
                            >
                                Documentación Técnica
                            </motion.button>
                        </div>

                        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Sin costo de configuración</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Soporte técnico 24/7</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Integración con su EHR existente</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}


