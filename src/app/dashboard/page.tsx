import Link from "next/link";
import { ArrowUpRight, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import { AIImpactCard } from "@/components/career/AIImpactCard";
import { CareerHealthScore } from "@/components/career/CareerHealthScore";
import { SkillsGrid } from "@/components/career/SkillsGrid";
import { UpskillRoadmap } from "@/components/career/UpskillRoadmap";
import { MetricOrbit } from "@/components/visuals/MetricOrbit";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="bg-[#F7F9FC]">
      <section className="mesh-bg text-white">
        <div className="container grid gap-8 py-12 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-[#D9E2EC]">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Career command center
            </p>
            <h1 className="text-4xl font-semibold tracking-normal">Dashboard</h1>
            <p className="mt-3 max-w-2xl text-slate-200">
              Track resume strength, AI exposure, market readiness, and next
              career moves in one decision layer.
            </p>
            <div className="mt-6">
              <Button asChild className="bg-[#3E6B89] hover:bg-[#315A75]">
                <Link href="/upload">
                  New analysis <ArrowUpRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
          <MetricOrbit
            metrics={[
              { label: "ATS", value: "78" },
              { label: "AI risk", value: "Med" },
              { label: "Upside", value: "₹18L" },
              { label: "Plan", value: "90d" }
            ]}
          />
        </div>
      </section>
      <section className="container -mt-8 pb-12">
        <div className="grid gap-5 lg:grid-cols-3">
          <CareerHealthScore score={82} />
          <AIImpactCard
            riskLevel="medium"
            summary="Your role has meaningful AI exposure, but your product judgment, stakeholder skills, and systems thinking remain strong differentiators."
          />
          <Card className="premium-card rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#132238]">
                <ShieldCheck className="h-5 w-5 text-[#3E6B89]" aria-hidden="true" />
                Latest analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-slate-600">
              ATS score: 78. Update project impact metrics and add AI-assisted
              workflow examples to strengthen your profile.
            </CardContent>
          </Card>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <SkillsGrid
            skills={["Product Strategy", "SQL", "Roadmapping", "AI Tools", "Analytics"]}
          />
          <UpskillRoadmap
            items={[
              { title: "AI workflow automation", timeframe: "30 days", priority: "high" },
              { title: "Advanced analytics storytelling", timeframe: "60 days", priority: "medium" },
              { title: "Systems design for product leaders", timeframe: "90 days", priority: "medium" }
            ]}
          />
        </div>
        <div className="neon-panel mt-5 rounded-lg p-6 text-white shadow-2xl">
          <div className="flex items-center gap-2 text-[#D9E2EC]">
            <Clock3 className="h-5 w-5" aria-hidden="true" />
            Next 7 days
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {["Rewrite resume bullets", "Publish AI workflow case", "Shortlist target roles"].map(
              (task) => (
                <div key={task} className="rounded-lg border border-white/10 bg-white/10 p-4">
                  <p className="font-medium">{task}</p>
                  <p className="mt-2 text-sm text-slate-300">Recommended next action</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
