import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const allMessages = [
      {
        role: "system",
        content: "Eres Helena, asistente médica. Responde en español."
      },
      ...messages
    ];

    const result = streamText({
      model: groq("llama3-70b-8192"),
      messages: allMessages,
    });

    return result.toTextStreamResponse();

  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "¡Hola! Soy Helena, tu asistente médica."
      }),
      { status: 200 }
    );
  }
}