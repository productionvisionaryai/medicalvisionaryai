import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export async function POST(req: Request) {
  console.log("HELENA: Endpoint llamado");

  const { messages } = await req.json();

  console.log("HELENA: Mensajes recibidos:", messages);

  const result = streamText({
    model: groq("llama3-70b-8192"),
    messages: [
      { role: "system", content: "Eres Helena. Di 'HOLA'." },
      ...(messages || [])
    ],
  });

  console.log("HELENA: Llamando a Groq...");

  return result.toTextStreamResponse();
}