"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, LoaderCircle, UploadCloud } from "lucide-react";
import { saveAnalysis } from "@/lib/analysis-store";
import { validateResumeFile } from "@/lib/upload";
import type { AnalysisResult } from "@/types";
import { Button } from "@/components/ui/button";

type UploadStatus = "idle" | "parsing" | "analyzing" | "error";

export function ResumeUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  function selectFile(selectedFile: File) {
    const validationError = validateResumeFile(selectedFile);
    setError(validationError ?? "");
    setFile(validationError ? null : selectedFile);
    setStatus(validationError ? "error" : "idle");
  }

  async function analyzeResume() {
    if (!file) {
      setError("Choose a resume before starting the analysis.");
      setStatus("error");
      return;
    }

    try {
      setError("");
      setStatus("parsing");
      const formData = new FormData();
      formData.append("file", file);

      const parseResponse = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData
      });
      const parsed = (await parseResponse.json()) as { resumeText?: string; error?: string };

      if (!parseResponse.ok || !parsed.resumeText) {
        throw new Error(parsed.error || "Unable to parse the selected resume.");
      }

      setStatus("analyzing");
      const analysisResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: parsed.resumeText })
      });
      const analysis = (await analysisResponse.json()) as {
        result?: AnalysisResult;
        error?: string;
      };

      if (!analysisResponse.ok || !analysis.result) {
        throw new Error(analysis.error || "Unable to analyze the selected resume.");
      }

      const id = crypto.randomUUID();
      saveAnalysis(id, analysis.result);
      router.push(`/results/${id}`);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Upload failed.");
      setStatus("error");
    }
  }

  const busy = status === "parsing" || status === "analyzing";

  return (
    <div
      className={`relative flex min-h-96 flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed bg-white p-8 text-center transition-colors ${
        dragActive ? "border-[#3E6B89] bg-[#EDF2F7]" : "border-[#BCCCDC]"
      }`}
      onDragEnter={(event) => {
        event.preventDefault();
        setDragActive(true);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={() => setDragActive(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragActive(false);
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) selectFile(droppedFile);
      }}
    >
      <input
        ref={inputRef}
        className="sr-only"
        type="file"
        accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
        onChange={(event) => {
          const selectedFile = event.target.files?.[0];
          if (selectedFile) selectFile(selectedFile);
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(13,148,136,0.12),transparent_36%)]" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#3E6B89] text-white shadow-lg">
        {busy ? (
          <LoaderCircle className="h-9 w-9 animate-spin" aria-hidden="true" />
        ) : file ? (
          <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
        ) : (
          <UploadCloud className="h-9 w-9" aria-hidden="true" />
        )}
      </div>
      <p className="relative mt-5 text-xl font-semibold text-[#132238]">
        {file ? file.name : "Drop your resume here"}
      </p>
      <p className="relative mt-2 text-sm text-slate-500">
        {status === "parsing"
          ? "Reading resume content..."
          : status === "analyzing"
            ? "Generating your LifeOS analysis..."
            : file
              ? `${(file.size / 1024).toFixed(1)} KB ready to analyze`
              : "PDF, DOCX, or TXT up to 10MB"}
      </p>
      {error ? (
        <p className="relative mt-4 max-w-md text-sm font-medium text-red-600">{error}</p>
      ) : null}
      <div className="relative mt-7 flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          Choose File
        </Button>
        <Button
          type="button"
          disabled={!file || busy}
          className="bg-[#3E6B89] hover:bg-[#315A75]"
          onClick={analyzeResume}
        >
          {busy ? "Working..." : "Analyze Resume"}
        </Button>
      </div>
    </div>
  );
}
