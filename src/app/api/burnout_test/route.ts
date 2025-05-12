import { Message } from "@ai-sdk/react";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { mastra } from "@/mastra";

export async function POST(request: Request) {
  try {
    //
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

    //
    const cookieStore = await cookies();
    const userId = cookieStore.get("user-id")?.value;
    const threadId = cookieStore.get("thread-id")?.value;

    if (!userId || !threadId) {
      return new NextResponse("User ID or thread ID not found", {
        status: 400,
      });
    }

    //
    const agent = mastra.getAgent("burnoutTest");

    const { messages } = await request.json();
    const userMessages = (messages as Message[])?.filter(
      (message) => message.role === "user"
    );

    const lastUserMessage =
      userMessages.length > 0 ? [userMessages[userMessages.length - 1]] : [];

    const result = await agent.stream(lastUserMessage, {
      resourceId: userId,
      threadId: threadId,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error(error);

    return new NextResponse("TEST", { status: 400 });
  }
}
