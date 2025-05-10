// import { z } from "zod";
import { mastra } from "@/mastra";
import { NextResponse } from "next/server";

// const output = z.preprocess(
//   (val) => {
//     console.log(val);
//     return val;
//   },
//   z.object({
//     messages: z.array(
//       z.object({
//         role: z.enum(["user", "assistant"]),
//         content: z.string(),
//         isActiveQuestion: z.boolean().optional(),
//         stage: z
//           .enum([
//             "emotional_exhaustion",
//             "work_related_cynicism",
//             "reduced_professional_accomplishment",
//           ])
//           .optional(),
//         orderInStage: z.number().optional(),
//       })
//     ),
//   })
// );

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  const [username, password] = credentials.split(":");

  const validUsername = process.env.BASIC_AUTH_USERNAME;
  const validPassword = process.env.BASIC_AUTH_PASSWORD;

  if (username !== validUsername || password !== validPassword) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { messages } = await request.json();

  const agent = mastra.getAgent("burnoutTest");

  const result = await agent.stream(messages);

  return result.toDataStreamResponse();
}
