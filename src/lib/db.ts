export interface PatientLead {
  id?: string;
  nombre: string;
  telefono: string;
  procedimientoInteres: string; //
  antecedentes: string; //
  fechaCaptura: string;
  status: 'nuevo' | 'contactado' | 'valorado';
}

// Simulamos una base de datos local o integración con Google Sheets/Supabase
export const saveLead = async (lead: PatientLead) => {
  try {
    // Aquí es donde Elena guarda el "Procedimiento de Interés" para que el cirujano 
    // sepa qué tan valioso es el lead antes de llamar
    console.log("Guardando lead de alta intención en la base de datos...", lead);
    
    // Simulación de lógica de envío (ej. a Google Sheets)
    const response = { success: true, message: "Lead guardado exitosamente" };
    
    return response;
  } catch (error) {
    console.error("Error al guardar el lead:", error);
    return { success: false, error: "Error de conexión" };
  }
};