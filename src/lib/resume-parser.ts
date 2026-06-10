import mammoth from "mammoth";
import pdf from "pdf-parse";

export async function parseResumeFile(file: File): Promise<string> {
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Resume files must be 10MB or smaller.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name.toLowerCase();
  let text: string;

  if (file.type === "application/pdf" || fileName.endsWith(".pdf")) {
    const result = await pdf(buffer);
    text = result.text.trim();
  } else if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName.endsWith(".docx")
  ) {
    const result = await mammoth.extractRawText({ buffer });
    text = result.value.trim();
  } else if (file.type === "text/plain" || fileName.endsWith(".txt")) {
    text = buffer.toString("utf-8").trim();
  } else {
    throw new Error("Unsupported resume format. Upload a PDF, DOCX, or TXT file.");
  }

  if (!text) {
    throw new Error("The selected resume does not contain readable text.");
  }

  return text;
}
