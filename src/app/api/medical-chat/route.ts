import { groq } from '@ai-sdk/groq';
import { streamObject } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { query } = await req.json();

  const result = streamObject({
    model: groq('llama-3.3-70b-versatile'),
    schema: z.object({
      reasoning: z.string().describe('Detailed step-by-step medical reasoning (Chain of Thought), analyzing symptoms, risk factors, and differentials.'),
      answer: z.string().describe('Final clinical conclusion and recommendation.'),
    }),
    system: `You are a specialized medical assistant for plastic surgery and general medicine.
Your task is to provide step-by-step medical reasoning (Chain of Thought) followed by a clinical answer.
Key areas: plastic surgery, preoperative evaluations, postoperative complications, differential diagnosis.
Use appropriate medical terminology but explain complex concepts clearly.`,
    prompt: query,
    mode: 'tool',
  });

  return result.toTextStreamResponse();
}