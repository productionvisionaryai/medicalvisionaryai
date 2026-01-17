import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export async function POST(req: Request) {
  console.log("HELENA: Endpoint llamado");

  // FIX: Extrae el mensaje directo, no el array de messages
  const { message } = await req.json();

  console.log("HELENA: Mensaje recibido:", message);

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages: [
      { role: "system", content: "Eres Helena. Di 'HOLA'." },
      { role: "user", content: message || "Hola" }
    ],
  });

  console.log("HELENA: Llamando a Groq...");

  return result.toTextStreamResponse();
}