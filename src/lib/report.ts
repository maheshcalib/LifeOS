import type {
  ActionPlanItem,
  AnalysisResult,
  CareerPath,
  JobMatch,
  JourneyState
} from "@/types";

const roleSkills: Record<string, string[]> = {
  "Product Manager": ["Product Strategy", "Analytics", "Leadership", "Communication"],
  "Data Product Manager": ["SQL", "Analytics", "Product Strategy", "AI Tools"],
  "AI Product Manager": ["AI Tools", "Product Strategy", "Analytics", "Leadership"],
  "Engineering Manager": ["Leadership", "System Design", "Communication", "AI Tools"],
  "Data Analyst": ["SQL", "Analytics", "Data Visualization", "Communication"],
  "Software Engineer": ["System Design", "AI Tools", "Communication", "Problem Solving"]
};

export function buildJobMatches(
  journey: JourneyState,
  analysis: AnalysisResult
): JobMatch[] {
  const currentSkills = [
    ...analysis.skills.technical,
    ...analysis.skills.soft
  ].map((skill) => skill.toLowerCase());

  return journey.targetRoles.map((role, index) => {
    const expected = roleSkills[role] ?? [
      ...analysis.skills.technical.slice(0, 2),
      ...analysis.skills.soft.slice(0, 2)
    ];
    const transferableSkills = expected.filter((skill) =>
      currentSkills.includes(skill.toLowerCase())
    );
    const missingSkills = expected.filter(
      (skill) => !currentSkills.includes(skill.toLowerCase())
    );
    const readiness = Math.min(
      95,
      Math.max(
        40,
        Math.round(
          analysis.careerHealthScore * 0.55 +
            analysis.atsScore * 0.25 +
            (transferableSkills.length / Math.max(expected.length, 1)) * 20 -
            index * 3
        )
      )
    );
    const salaryMin = Math.round(
      Math.max(journey.currentSalary * 1.15, journey.targetSalary * (0.72 + index * 0.04))
    );

    return {
      role,
      readiness,
      salaryMin,
      salaryMax: Math.round(salaryMin * 1.3),
      transferableSkills,
      missingSkills,
      nextStep: missingSkills.length
        ? `Build proof of work demonstrating ${missingSkills[0]}.`
        : `Prepare targeted applications and interview stories for ${role}.`
    };
  });
}

export function buildActionPlan(
  journey: JourneyState,
  analysis: AnalysisResult
): ActionPlanItem[] {
  const primaryRole = journey.targetRoles[0] || "your target role";
  const firstGap = analysis.skills.gaps[0] || "your highest-priority skill gap";
  const firstRoadmap = analysis.upskilling[0]?.title || firstGap;

  return [
    {
      horizon: "30 days",
      title: "Clarify and position",
      actions: [
        analysis.improvements[0] || "Quantify the impact shown in your resume.",
        `Create a role-specific profile for ${primaryRole}.`,
        `Begin ${firstRoadmap} with ${journey.weeklyLearningHours} focused hours each week.`
      ]
    },
    {
      horizon: "90 days",
      title: "Build evidence",
      actions: [
        `Publish one practical project demonstrating ${firstGap}.`,
        `Have five conversations with professionals working as ${primaryRole}.`,
        "Complete two interview-ready career stories with measurable outcomes."
      ]
    },
    {
      horizon: "12 months",
      title: "Make the transition",
      actions: [
        `Reach application readiness for ${primaryRole}.`,
        `Target compensation between your current salary and ${journey.targetSalary}.`,
        "Review progress quarterly and update the plan as the market changes."
      ]
    }
  ];
}

export function buildCareerPaths(
  journey: JourneyState,
  analysis: AnalysisResult
): CareerPath[] {
  const matches = buildJobMatches(journey, analysis);
  const best = matches[0];
  const baseRole = best?.role || journey.currentRole || "Target role";
  const baseReadiness = best?.readiness || analysis.careerHealthScore;
  const baseSalary = Math.max(best?.salaryMax || 0, journey.targetSalary);
  const primaryGap = best?.missingSkills[0] || analysis.skills.gaps[0] || "market positioning";
  const resilientSkill =
    analysis.aiImpact.resilientStrengths[0] || analysis.skills.soft[0] || "human judgment";

  const definitions = [
    {
      kind: "best-fit" as const,
      label: "Best fit",
      role: baseRole,
      summary: "The most direct transition using your existing strengths.",
      readiness: baseReadiness,
      aiResilience: 76,
      multiplier: 1
    },
    {
      kind: "ai-resilient" as const,
      label: "AI resilient",
      role: `AI-enabled ${baseRole}`,
      summary: "A defensible path built around judgment, ownership, and AI leverage.",
      readiness: Math.max(45, baseReadiness - 8),
      aiResilience: 91,
      multiplier: 1.14
    },
    {
      kind: "ambitious" as const,
      label: "Ambitious",
      role: journey.careerGoal === "leadership" ? `${baseRole} Lead` : `Senior ${baseRole}`,
      summary: "A faster-growth path requiring stronger proof and broader ownership.",
      readiness: Math.max(40, baseReadiness - 14),
      aiResilience: 83,
      multiplier: 1.32
    }
  ];

  return definitions.map((path) => {
    const salaryEnd = Math.round(baseSalary * path.multiplier);
    return {
      ...path,
      salaryEnd,
      milestones: [
        {
          year: 1,
          title: "Close the readiness gap",
          description: `Build a practical proof project around ${primaryGap}.`,
          salary: Math.round(journey.currentSalary * 1.12),
          skill: primaryGap
        },
        {
          year: 3,
          title: `Move into ${path.role}`,
          description: `Use measurable portfolio evidence to win broader ${path.role} responsibilities.`,
          salary: Math.round((journey.currentSalary + salaryEnd) / 2),
          skill: resilientSkill
        },
        {
          year: 5,
          title: "Own higher-value outcomes",
          description: "Lead complex decisions while using AI to accelerate execution.",
          salary: salaryEnd,
          skill: "AI-enabled leadership"
        }
      ]
    };
  });
}
