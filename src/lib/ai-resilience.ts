import type {
  AIAdvantage,
  AIResilientRole,
  AnalysisResult,
  JourneyState
} from "@/types";

const resilientCatalog = [
  {
    role: "AI Product Manager",
    skills: ["AI Tools", "Analytics", "Leadership", "Communication", "Product Strategy"],
    resilience: 88,
    salaryMultiplier: 1.75,
    why: "Combines product judgment, customer context, prioritisation, and AI orchestration."
  },
  {
    role: "AI Transformation Consultant",
    skills: ["AI Tools", "Leadership", "Communication", "Problem Solving", "Analytics"],
    resilience: 86,
    salaryMultiplier: 1.65,
    why: "Requires organisational judgment, change leadership, and domain-specific implementation."
  },
  {
    role: "Data Product Manager",
    skills: ["SQL", "Analytics", "Leadership", "Communication", "Product Strategy"],
    resilience: 84,
    salaryMultiplier: 1.55,
    why: "Connects technical data capabilities with business decisions and stakeholder needs."
  },
  {
    role: "AI Governance Lead",
    skills: ["AI Governance", "Leadership", "Communication", "Problem Solving"],
    resilience: 92,
    salaryMultiplier: 1.7,
    why: "Responsible AI requires accountability, risk judgment, policy interpretation, and trust."
  },
  {
    role: "Customer Solutions Architect",
    skills: ["Problem Solving", "Communication", "Leadership", "AI Tools", "System Design"],
    resilience: 87,
    salaryMultiplier: 1.6,
    why: "Complex customer environments still require consultation, tradeoffs, and trusted relationships."
  }
];

export function buildAIResilientRoles(
  journey: JourneyState,
  analysis: AnalysisResult
): AIResilientRole[] {
  const current = [...analysis.skills.technical, ...analysis.skills.soft].map((skill) =>
    skill.toLowerCase()
  );

  return resilientCatalog
    .map((item) => {
      const transferableSkills = item.skills.filter((skill) =>
        current.includes(skill.toLowerCase())
      );
      const missingSkills = item.skills.filter(
        (skill) => !current.includes(skill.toLowerCase())
      );
      const fit = Math.min(
        96,
        Math.max(
          45,
          Math.round(
            analysis.careerHealthScore * 0.45 +
              analysis.atsScore * 0.25 +
              (transferableSkills.length / item.skills.length) * 30
          )
        )
      );
      const salaryMin = Math.round(
        Math.max(journey.currentSalary * 1.15, journey.currentSalary * item.salaryMultiplier)
      );

      return {
        role: item.role,
        fit,
        aiResilience: item.resilience,
        salaryMin,
        salaryMax: Math.round(salaryMin * 1.28),
        transitionDifficulty:
          missingSkills.length <= 1 ? "Low" : missingSkills.length <= 3 ? "Medium" : "High",
        transferableSkills,
        missingSkills,
        whyResilient: item.why,
        proofProject: `Build a portfolio case study showing how a ${item.role} would use AI to improve a real business workflow while managing human decisions and risk.`
      } satisfies AIResilientRole;
    })
    .sort((a, b) => b.fit + b.aiResilience - (a.fit + a.aiResilience))
    .slice(0, 4);
}

export function buildAIAdvantage(analysis: AnalysisResult): AIAdvantage {
  const automate = analysis.aiImpact.affectedTasks.length
    ? analysis.aiImpact.affectedTasks
    : ["Routine reporting", "First-draft documentation"];
  const augment = [
    ...analysis.skills.technical.slice(0, 2).map((skill) => `${skill} with AI copilots`),
    "Research and synthesis with AI verification"
  ];
  const differentiate = analysis.aiImpact.resilientStrengths.length
    ? analysis.aiImpact.resilientStrengths
    : [...analysis.skills.soft.slice(0, 3), "Judgment"];
  const priorities = [
    ...analysis.skills.gaps.slice(0, 2),
    "AI workflow design",
    "Responsible AI decision-making"
  ].slice(0, 4);

  return {
    automate,
    augment,
    differentiate,
    upskillPlan: priorities.map((skill, index) => ({
      skill,
      whyItMatters:
        index === 0
          ? "Closes the most important readiness gap for future-facing roles."
          : "Increases your ability to supervise AI and own higher-value outcomes.",
      aiChange: `AI will handle more execution; your advantage is designing, reviewing, and improving ${skill.toLowerCase()} outcomes.`,
      learningTask: `Spend two weeks learning the core concepts, then apply ${skill} to one real workflow.`,
      proofProject: `Publish a short case study demonstrating ${skill}, measurable impact, and the human decisions AI could not make alone.`,
      timeframe: index < 2 ? "30–60 days" : "60–90 days"
    }))
  };
}
