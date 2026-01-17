import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

export async function POST(req: Request) {
  const { query } = await req.json();

  const { text } = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    system: "Eres Helena, asistente médica. Responde en español.",
    prompt: `Analiza: "${query}"`,
  });

  return Response.json({ reasoning: text, answer: text });
}