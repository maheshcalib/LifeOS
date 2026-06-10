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
    resumeText.split(/\n+/).map((line) => line.trim()).filter((line) => line.length > 20);
  const primaryEvidence = evidence[0] || resumeText.slice(0, 180);
  const skillPhrase = matchedKeywords.join(", ") || "analytical delivery";
  const rewrites = [
    {
      id: "summary-1",
      section: "summary" as const,
      original: primaryEvidence,
      suggested: `${targetRole} candidate with demonstrated experience in ${skillPhrase}, focused on clear business outcomes and stakeholder needs.`,
      reason: `Positions supported strengths against the ${targetRole} priorities.`,
      sourceEvidence: primaryEvidence
    },
    {
      id: "skills-1",
      section: "skills" as const,
      original: primaryEvidence,
      suggested: skillPhrase,
      reason: "Surfaces only JD keywords already supported by the source resume.",
      sourceEvidence: primaryEvidence
    },
    {
      id: "experience-1",
      section: "experience" as const,
      original: primaryEvidence,
      suggested: `Applied ${skillPhrase} experience to deliver clear, stakeholder-ready outcomes.`,
      reason: `Aligns existing evidence with the ${targetRole} job description.`,
      sourceEvidence: primaryEvidence
    }
  ];
  const experienceBullets = [
    rewrites[2].suggested,
    ...evidence.slice(1, 3).map((line) => line.replace(/^[-•]\s*/, ""))
  ];
  while (experienceBullets.length < 3) {
    experienceBullets.push(primaryEvidence.replace(/^[-•]\s*/, ""));
  }

  return {
    source: "demo",
    matchScore: required.length
      ? Math.round((matchedKeywords.length / required.length) * 100)
      : 60,
    jdPriorities: required.slice(0, 6),
    matchedKeywords,
    missingKeywords: unsupportedRequirements,
    unsupportedRequirements,
    keywordRecommendations: matchedKeywords.map((keyword, index) => ({
      keyword,
      evidence: evidence[index] || primaryEvidence,
      suggestedPlacement: index === 0 ? "summary" : index === 1 ? "skills" : "experience"
    })),
    rewrites,
    tailoredResume: {
      targetRole,
      headline: `${targetRole} candidate`,
      summary: rewrites[0].suggested,
      skills: matchedKeywords.length ? matchedKeywords : ["Analytical delivery", "Stakeholder communication"],
      experienceBullets,
      education: []
    }
  };
}
