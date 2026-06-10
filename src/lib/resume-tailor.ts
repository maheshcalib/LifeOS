import type { TailoringResult } from "@/types";

const keywords = [
  "SQL",
  "Analytics",
  "AI",
  "Product Strategy",
  "Stakeholder Leadership",
  "Kubernetes",
  "Python",
  "Communication",
  "System Design"
];

export function buildDemoTailoringResult({
  resumeText,
  jobDescription,
  targetRole
}: {
  resumeText: string;
  jobDescription: string;
  targetRole: string;
}): TailoringResult {
  const resumeLower = resumeText.toLowerCase();
  const jdLower = jobDescription.toLowerCase();
  const required = keywords.filter((keyword) => jdLower.includes(keyword.toLowerCase()));
  const matchedKeywords = required.filter((keyword) => resumeLower.includes(keyword.toLowerCase()));
  const unsupportedRequirements = required.filter(
    (keyword) => !resumeLower.includes(keyword.toLowerCase())
  );
  const evidence =
    resumeText
      .split(/\n+/)
      .map((line) => line.trim())
      .find((line) => line.length > 20) || resumeText.slice(0, 180);
  const suggested = `Applied ${matchedKeywords.join(" and ") || "analytical"} experience to deliver clear, stakeholder-ready outcomes.`;

  return {
    source: "demo",
    matchScore: required.length
      ? Math.round((matchedKeywords.length / required.length) * 100)
      : 60,
    matchedKeywords,
    missingKeywords: unsupportedRequirements,
    unsupportedRequirements,
    rewrites: [
      {
        id: "experience-1",
        section: "experience",
        original: evidence,
        suggested,
        reason: `Aligns existing evidence with the ${targetRole} job description.`,
        sourceEvidence: evidence
      }
    ],
    tailoredResume: {
      targetRole,
      headline: `${targetRole} candidate`,
      summary: `Results-focused professional targeting ${targetRole} opportunities.`,
      skills: matchedKeywords,
      experienceBullets: [suggested],
      education: []
    }
  };
}
