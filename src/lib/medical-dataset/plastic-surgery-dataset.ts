// Agrega estas funciones ANTES del cierre del archivo (después de cualquier otra función relacionada con el dataset)

// Búsqueda semántica simple pero efectiva de casos relevantes
export function findRelevantCases(query: string): any[] {
  if (!query?.trim()) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const searchTerms = normalizedQuery.split(/\s+/).filter(Boolean);

  return PLASTIC_SURGERY_DATASET.sample_cases.filter((caseItem: any) => {
    const { original_data, id } = caseItem;

    // Búsqueda flexible en múltiples campos
    const fieldsToSearch = [
      original_data?.Question || '',
      original_data?.Response || '',
      original_data?.Complex_CoT || '',
      id || ''
    ];

    return fieldsToSearch.some(field =>
      field.toLowerCase().includes(normalizedQuery) ||
      // Bonus: match parcial por palabras individuales (mejora recall)
      searchTerms.some(term => field.toLowerCase().includes(term))
    );
  });
}

// Obtener template/procedimiento completo por ID
export function getProcedureTemplate(procedureId: string): any {
  if (!procedureId?.trim()) return null;

  return PLASTIC_SURGERY_DATASET.plastic_surgery_procedures?.find(
    (p: any) => p.id === procedureId
  ) || null;
}