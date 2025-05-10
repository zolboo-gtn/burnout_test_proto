import { NextResponse } from "next/server";

export async function POST() {
  return new NextResponse("POST RESPONSE", { status: 200 });
}
export async function GET() {
  return new NextResponse("GET RESPONSE", { status: 200 });
}
