import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Record<string, string> }
) {
  const data = await request.json()
  try {
    await kv.hset(context.params.key, data); // in minute or something datetime
    return NextResponse.json({ message: "Led Message Created!" });
  } catch (error) {
    return NextResponse.json({ error: "NOT_FOUND" });
  }
}
