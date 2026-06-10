import type { JobDescription } from "@/types";

const privateHosts = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^192\.168\./,
  /^169\.254\./,
  /^0\./,
  /^::1$/,
  /^fc/i,
  /^fd/i
];

export function validateJobUrl(value: string) {
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Use an HTTP or HTTPS job listing URL.");
  }
  if (privateHosts.some((pattern) => pattern.test(url.hostname))) {
    throw new Error("Use a public job listing URL.");
  }
  return url;
}

function cleanHtml(value: string) {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|li|div|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function findJobPosting(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object") return null;
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findJobPosting(item);
      if (found) return found;
    }
    return null;
  }
  const record = value as Record<string, unknown>;
  if (record["@type"] === "JobPosting") return record;
  return findJobPosting(record["@graph"]);
}

export function extractJobDescription(html: string): JobDescription {
  const scripts = Array.from(
    html.matchAll(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    )
  );
  for (const match of scripts) {
    try {
      const posting = findJobPosting(JSON.parse(match[1]));
      if (posting) {
        const organization = posting.hiringOrganization as Record<string, unknown> | undefined;
        return {
          title: String(posting.title || "Imported job"),
          company: String(organization?.name || "Company"),
          text: cleanHtml(String(posting.description || ""))
        };
      }
    } catch {
      // Continue to visible-page fallback.
    }
  }

  const text = cleanHtml(
    html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "")
  );
  if (text.length < 80) throw new Error("The job description could not be read.");
  return { title: "Imported job", company: "Company", text: text.slice(0, 30000) };
}
