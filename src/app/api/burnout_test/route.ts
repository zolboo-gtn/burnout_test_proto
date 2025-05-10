import { NextResponse } from "next/server";

import { mastra } from "@/mastra";

export async function POST(request: Request) {
  try {
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
  } catch (error) {
    console.error(error);

    return new NextResponse("TEST", { status: 400 });
  }
}
export async function GET() {
  return new NextResponse("TEST", { status: 200 });
}
