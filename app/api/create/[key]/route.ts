// /api/create/:key/route.ts
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Record<string, string> }
) {
  const data = await request.json()
  try {
    // Custom key is an identifier for the message
    // const key = context.params.key;
    // const message = await kv.get(key);
    console.log("Create 1 ==>", { "key": context.params.key, "data": data })

    // await kv.hset("mkubedev:message", {
    //   text: "@mkubdev - Hello dark!",
    //   expiration: 30,
    // }); // in minute or something datetime
    const kvresponse = await kv.hset(context.params.key, { "text": data, expiration: 30 }); // in minute or something datetime

    console.log("Create 2 ==>", { "resp": kvresponse });

    return NextResponse.json({ message: "Led Message Created!" });
  } catch (error) {
    return NextResponse.json({ error: "NOT_FOUND" });
  }
}
