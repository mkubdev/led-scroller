// /api/create/:key/route.ts
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Record<string, string> }
) {
  const data = await request.json()
  try {
    // COMMENT: I loosed approx 2hours to understand that the key is not the key of the message but the key of the KV store :) lol.
    console.log("POST 1 ==>", { "key": context.params.key, "data": data })

    // kv.hset("mkubdev:message", {})
    const key = context.params.key;
    const kvresponse = await kv.hset(key, {
      text: data,
      expiration: 30 // in seconds
    });

    console.log("POST 2 ==>", { "resp": kvresponse });

    return NextResponse.json({ message: `Led Message Created! Redirecting to /ledboard/${key}` });
  } catch (error) {
    return NextResponse.json({ error: "NOT_FOUND" });
  }
}
