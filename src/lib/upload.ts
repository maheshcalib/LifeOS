const MAX_RESUME_SIZE = 10 * 1024 * 1024;
const SUPPORTED_EXTENSIONS = [".pdf", ".docx", ".txt"];

export function validateResumeFile(file: File): string | null {
  const fileName = file.name.toLowerCase();
  const hasSupportedExtension = SUPPORTED_EXTENSIONS.some((extension) =>
    fileName.endsWith(extension)
  );

  if (!hasSupportedExtension) {
    return "Unsupported file. Upload a PDF, DOCX, or TXT resume.";
  }

  if (file.size > MAX_RESUME_SIZE) {
    return "Resume files must be 10MB or smaller.";
  }

  if (file.size === 0) {
    return "The selected resume is empty.";
  }

  return null;
}
