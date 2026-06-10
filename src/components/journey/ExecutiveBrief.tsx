"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Printer, ShieldAlert, Target, WandSparkles } from "lucide-react";
import { CareerPathMap } from "@/components/journey/CareerPathMap";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/currency";
import { buildAIAdvantage } from "@/lib/ai-resilience";
import { buildActionPlan, buildCareerPaths } from "@/lib/report";
import type { AnalysisResult, CareerPathKind, JourneyState } from "@/types";

function DetailSection({
  title,
  summary,
  children
}: {
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-b border-[#DCE3EA] py-5 last:border-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-[#102A43]">{title}</h3>
          <p className="mt-1 text-sm text-[#64748B]">{summary}</p>
        </div>
        <ChevronDown className="h-5 w-5 shrink-0 text-[#64748B] transition-transform group-open:rotate-180" />
      </summary>
      <div className="pt-5">{children}</div>
    </details>
  );
}

export function ExecutiveBrief({
  journey,
  analysis,
  onRestart,
  onEdit
}: {
  journey: JourneyState;
  analysis: AnalysisResult;
  onRestart: () => void;
  onEdit: () => void;
}) {
  const paths = useMemo(() => buildCareerPaths(journey, analysis), [journey, analysis]);
  const actionPlan = useMemo(() => buildActionPlan(journey, analysis), [journey, analysis]);
  const advantage = useMemo(() => buildAIAdvantage(analysis), [analysis]);
  const [selected, setSelected] = useState<CareerPathKind>("best-fit");
  const activePath = paths.find((path) => path.kind === selected) || paths[0];
  const topGap = analysis.skills.gaps[0] || "Interview positioning";

  return (
    <div className="report-canvas">
      <div className="flex flex-col justify-between gap-4 border-b border-[#DCE3EA] pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-[#3E6B89]">Your career decision brief</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#102A43]">One clear direction. Three possible paths.</h1>
          <p className="mt-2 text-[#64748B]">Explore the map first. Open the evidence only when you need it.</p>
        </div>
        <div className="no-print flex gap-2">
          <Button variant="outline" onClick={onEdit}>Update answers</Button>
          <Button variant="outline" size="icon" title="Print report" onClick={() => window.print()}>
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <section className="mt-7 grid gap-3 md:grid-cols-3">
        {[
          { label: "Recommended direction", value: activePath.role, icon: Target },
          { label: "Biggest skill gap", value: topGap, icon: ShieldAlert },
          { label: "Immediate action", value: `Build proof of ${topGap}`, icon: WandSparkles }
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-lg border border-[#DCE3EA] bg-white p-4">
            <Icon className="h-4 w-4 text-[#3E6B89]" />
            <p className="mt-4 text-xs font-semibold uppercase text-[#64748B]">{label}</p>
            <p className="mt-1 font-semibold text-[#102A43]">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-5">
        <CareerPathMap paths={paths} selected={selected} onSelect={setSelected} />
      </section>

      <section className="mt-5 flex flex-col justify-between gap-5 rounded-lg border border-[#B8C9D6] bg-[#E8EFF4] p-5 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase text-[#3E6B89]">Turn direction into an application</p>
          <h2 className="mt-2 text-xl font-semibold text-[#102A43]">Tailor your resume for {activePath.role}</h2>
          <p className="mt-1 text-sm text-[#526D82]">Compare a live job description and approve only evidence-backed rewrites.</p>
        </div>
        <Button asChild className="bg-[#102A43] hover:bg-[#071A2B]">
          <Link href={`/tailor?role=${encodeURIComponent(activePath.role)}`}>Tailor resume</Link>
        </Button>
      </section>

      <section className="mt-7 rounded-lg border border-[#DCE3EA] bg-white px-6">
        <DetailSection title="Your next three moves" summary="A focused 30-day, 90-day, and 12-month plan.">
          <div className="grid gap-4 md:grid-cols-3">
            {actionPlan.map((item) => (
              <div key={item.horizon} className="rounded-md bg-[#F4F7FA] p-4">
                <p className="text-xs font-semibold uppercase text-[#3E6B89]">{item.horizon}</p>
                <p className="mt-2 font-semibold text-[#102A43]">{item.title}</p>
                <ul className="mt-3 space-y-2 text-sm text-[#64748B]">{item.actions.slice(0, 2).map((action) => <li key={action}>• {action}</li>)}</ul>
              </div>
            ))}
          </div>
        </DetailSection>
        <DetailSection title="AI advantage" summary="Work to automate, augment, and strengthen.">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Automate", advantage.automate],
              ["Augment", advantage.augment],
              ["Differentiate", advantage.differentiate]
            ].map(([title, items]) => (
              <div key={title as string} className="rounded-md bg-[#F4F7FA] p-4">
                <p className="font-semibold text-[#102A43]">{title}</p>
                <ul className="mt-3 space-y-2 text-sm text-[#64748B]">{(items as string[]).slice(0, 3).map((item) => <li key={item}>• {item}</li>)}</ul>
              </div>
            ))}
          </div>
        </DetailSection>
        <DetailSection title="Career and life assumptions" summary="The context behind salary and timing estimates.">
          <p className="text-sm leading-6 text-[#64748B]">
            Estimates model growth from {formatINR(journey.currentSalary)} toward {formatINR(activePath.salaryEnd)} over five years, with a {journey.transitionMonths}-month transition window. Salary outcomes are directional, not guarantees.
          </p>
        </DetailSection>
      </section>

      <div className="no-print mt-8 flex justify-end"><Button variant="outline" onClick={onRestart}>Start a new plan</Button></div>
    </div>
  );
}
