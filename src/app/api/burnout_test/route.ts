import { z } from "zod";
import { mastra } from "@/mastra";

const output = z.preprocess(
  (val) => {
    console.log(val);
    return val;
  },
  z.object({
    messages: z.array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
        isActiveQuestion: z.boolean().optional(),
        stage: z
          .enum([
            "emotional_exhaustion",
            "work_related_cynicism",
            "reduced_professional_accomplishment",
          ])
          .optional(),
        orderInStage: z.number().optional(),
      })
    ),
  })
);

export async function POST(request: Request) {
  const { messages } = await request.json();

  const agent = mastra.getAgent("burnoutTest");

  const result = await agent.stream(messages);

  return result.toDataStreamResponse();
}
