import type { AnalysisResult } from "@/types";

const storageKey = (id: string) => `careerlens:analysis:${id}`;

export function saveAnalysis(id: string, result: AnalysisResult) {
  sessionStorage.setItem(storageKey(id), JSON.stringify(result));
}

export function loadAnalysis(id: string): AnalysisResult | null {
  const value = sessionStorage.getItem(storageKey(id));

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as AnalysisResult;
  } catch {
    return null;
  }
}
