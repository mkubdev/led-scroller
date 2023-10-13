// api/message/[key]/route.ts
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: Record<string, string> }) {
  try {

    console.log("Message 1 ==>", { "key": context.params.key, "context": context })

    const message = await kv.hget(context.params.key, "text");

    console.log("Message 2 ==>", { "message from redis:": message });

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: 'NOT_FOUND' });
  }
}
