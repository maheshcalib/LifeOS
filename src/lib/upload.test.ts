import { describe, expect, it } from "vitest";
import { validateResumeFile } from "@/lib/upload";

describe("validateResumeFile", () => {
  it("accepts supported resume files", () => {
    const file = new File(["resume content"], "resume.txt", { type: "text/plain" });

    expect(validateResumeFile(file)).toBeNull();
  });

  it("rejects unsupported file types", () => {
    const file = new File(["image"], "photo.png", { type: "image/png" });

    expect(validateResumeFile(file)).toContain("PDF, DOCX, or TXT");
  });

  it("rejects files larger than 10MB", () => {
    const file = new File([new Uint8Array(10 * 1024 * 1024 + 1)], "resume.pdf", {
      type: "application/pdf"
    });

    expect(validateResumeFile(file)).toContain("10MB");
  });
});
