'use client';

import { Activity, Heart, Moon, Footprints } from 'lucide-react';

export default function WearableDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium text-gray-600">Frecuencia Cardíaca</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">72 BPM</div>
                <div className="text-xs text-green-600">Normal</div>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                    <Moon className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-medium text-gray-600">Calidad de Sueño</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">85%</div>
                <div className="text-xs text-blue-600">Optimizado</div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-600">Actividad</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">45 min</div>
                <div className="text-xs text-green-600">Objetivo alcanzado</div>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                <div className="flex items-center gap-2 mb-2">
                    <Footprints className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium text-gray-600">Pasos</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">8,432</div>
                <div className="text-xs text-orange-600">En progreso</div>
            </div>
        </div>
    );
}
