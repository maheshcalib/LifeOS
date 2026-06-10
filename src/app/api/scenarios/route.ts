import { NextResponse } from "next/server";
import { getAnthropicClient } from "@/lib/anthropic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.profile) {
    return NextResponse.json({ error: "profile is required" }, { status: 400 });
  }

  const anthropic = getAnthropicClient();

  if (!anthropic) {
    return NextResponse.json({
      scenarios: [
        { label: "Stay and specialize", salary: 165000, confidence: 72 },
        { label: "Move into AI product", salary: 205000, confidence: 64 },
        { label: "Leadership track", salary: 230000, confidence: 58 }
      ],
      warning: "ANTHROPIC_API_KEY is not configured; returning scaffold scenarios."
    });
  }

  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-latest",
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: `Generate three five-year career scenarios from this profile. Return concise JSON only.\n\n${JSON.stringify(body.profile)}`
      }
    ]
  });

  return NextResponse.json({ raw: message.content });
}
