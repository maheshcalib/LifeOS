const REPORT_PROGRESS_KEY = "careerlens:report-progress";

export function saveReportProgress(completedActions: string[]) {
  sessionStorage.setItem(REPORT_PROGRESS_KEY, JSON.stringify(completedActions));
}

export function loadReportProgress(): string[] {
  const value = sessionStorage.getItem(REPORT_PROGRESS_KEY);
  if (!value) return [];

  try {
    return JSON.parse(value) as string[];
  } catch {
    return [];
  }
}
