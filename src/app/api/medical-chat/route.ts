import { groq } from "@ai-sdk/groq";
import { streamObject } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { query } = await req.json();

  const result = streamObject({
    model: groq("llama-3.3-70b-versatile"),
    schema: z.object({
      reasoning: z.string(),
      answer: z.string(),
    }),
    prompt: `Eres Helena, asistente médica. Responde en español. Pregunta: ${query}`,
  });

  return result.toTextStreamResponse();
}