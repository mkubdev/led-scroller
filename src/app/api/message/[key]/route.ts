import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: Record<string, string> }) {
  try {
    // await kv.hset("mkubedev:message", {
    //   text: "@mkubdev - Hello dark!",
    //   expiration: 30,
    // }); // in minute or something datetime
    const message = await kv.hget(context.params.key, "text");
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: 'NOT_FOUND' });
  }
}
