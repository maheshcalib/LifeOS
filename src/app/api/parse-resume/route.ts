import { NextResponse } from "next/server";
import { parseResumeFile } from "@/lib/resume-parser";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Resume file is required." }, { status: 400 });
  }

  try {
    const resumeText = await parseResumeFile(file);
    return NextResponse.json({ resumeText });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to parse resume.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
