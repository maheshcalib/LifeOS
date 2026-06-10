import { NextResponse } from "next/server";
import { getAnthropicClient } from "@/lib/anthropic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.events || typeof body?.salary !== "number") {
    return NextResponse.json(
      { error: "events and salary are required" },
      { status: 400 }
    );
  }

  const anthropic = getAnthropicClient();

  if (!anthropic) {
    return NextResponse.json({
      result: {
        summary: "Configuration pending. Add ANTHROPIC_API_KEY to generate a life plan.",
        events: body.events,
        salary: body.salary
      }
    });
  }

  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-latest",
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: `Create a career-aware life plan from these events and salary. Return concise JSON only.\n\n${JSON.stringify(body)}`
      }
    ]
  });

  return NextResponse.json({ raw: message.content });
}
