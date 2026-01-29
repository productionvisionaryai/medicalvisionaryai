export interface ParsedContent {
  reasoningSteps: string[];
  cleanContent: string;
}

export function parseMedicalStream(content: string): ParsedContent {
  const reasoningRegex = /<reasoning>([\s\S]*?)<\/reasoning>/g;
  const steps: string[] = [];
  let match;

  // Extraer pasos del razonamiento
  while ((match = reasoningRegex.exec(content)) !== null) {
    const rawSteps = match[1]
      .split('\n')
      .map(s => s.trim().replace(/^[-*•]\s?/, ''))
      .filter(s => s.length > 0);
    steps.push(...rawSteps);
  }

  // Limpiar el contenido para el usuario (eliminar etiquetas del chat)
  const cleanContent = content.replace(/<reasoning>[\s\S]*?<\/reasoning>/g, '').trim();

  return {
    reasoningSteps: steps,
    cleanContent: cleanContent || "Analizando datos biométricos..."
  };
}
