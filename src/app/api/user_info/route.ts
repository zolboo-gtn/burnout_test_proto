import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST() {
  const cookieStore = await cookies();
  const _userId = cookieStore.get("user-id");
  const userId = _userId ? _userId.value : uuidv4();
  if (!_userId) {
    cookieStore.set("user-id", userId);
  }
  const _threadId = cookieStore.get("thread-id");
  const threadId = _threadId ? _threadId.value : uuidv4();
  if (!_threadId) {
    cookieStore.set("thread-id", threadId);
  }

  return NextResponse.json({ userId, threadId }, { status: 200 });
}
