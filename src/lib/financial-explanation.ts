export interface FinancialExplanation {
  summary?: string;
  nextActions?: string[];
}

export function normalizeFinancialExplanation(
  value: unknown,
  fallbackSummary = ""
): FinancialExplanation {
  const candidate = value && typeof value === "object"
    ? value as { summary?: unknown; nextActions?: unknown }
    : {};
  const summary = typeof candidate.summary === "string" && candidate.summary.trim()
    ? candidate.summary
    : fallbackSummary;
  const nextActions = Array.isArray(candidate.nextActions)
    ? candidate.nextActions.filter((action): action is string => typeof action === "string" && Boolean(action.trim()))
    : typeof candidate.nextActions === "string" && candidate.nextActions.trim()
      ? [candidate.nextActions]
      : [];

  return { summary, nextActions };
}
