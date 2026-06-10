"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AIImpactCard } from "@/components/career/AIImpactCard";
import { CareerHealthScore } from "@/components/career/CareerHealthScore";
import { SkillsGrid } from "@/components/career/SkillsGrid";
import { UpskillRoadmap } from "@/components/career/UpskillRoadmap";
import { Button } from "@/components/ui/button";
import { loadAnalysis } from "@/lib/analysis-store";
import type { AnalysisResult } from "@/types";

export function AnalysisResults({ id }: { id: string }) {
  const [result, setResult] = useState<AnalysisResult | null | undefined>(undefined);

  useEffect(() => {
    setResult(loadAnalysis(id));
  }, [id]);

  if (result === undefined) {
    return (
      <div className="premium-card rounded-lg p-8 text-center text-slate-600">
        Loading your analysis...
      </div>
    );
  }

  if (!result) {
    return (
      <div className="premium-card rounded-lg p-8 text-center">
        <h2 className="text-xl font-semibold text-[#132238]">Analysis not found</h2>
        <p className="mt-2 text-sm text-slate-600">
          Results are stored for the current browser session. Upload your resume again
          to generate a new analysis.
        </p>
        <Button asChild className="mt-5 bg-[#3E6B89] hover:bg-[#315A75]">
          <Link href="/upload">Upload Resume</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-2">
        <CareerHealthScore score={result.careerHealthScore} />
        <AIImpactCard
          riskLevel={result.aiImpact.riskLevel}
          summary={result.aiImpact.summary}
        />
        <SkillsGrid
          title="Detected strengths"
          skills={[...result.skills.technical, ...result.skills.soft]}
        />
        <UpskillRoadmap items={result.upskilling} />
      </div>
      <div className="premium-card mt-5 rounded-lg p-6">
        <h3 className="font-semibold text-[#132238]">Resume improvements</h3>
        <ul className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
          {result.improvements.map((improvement) => (
            <li key={improvement} className="rounded-md border border-white/10 bg-white p-3">
              {improvement}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
