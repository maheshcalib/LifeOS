import Link from "next/link";
import { ArrowRight, BrainCircuit, CalendarClock, FileScan, Route } from "lucide-react";
import { CareerPathLine } from "@/components/visuals/CareerPathLine";
import { ScrollStory } from "@/components/story/ScrollStory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "AI Impact Assessment",
    description:
      "Identify which parts of your role are exposed to automation and which strengths remain hard to replace.",
    icon: BrainCircuit
  },
  {
    title: "Upskilling Roadmap",
    description:
      "Turn resume gaps into sequenced learning moves with timeframes, priorities, and proof-of-work ideas.",
    icon: Route
  },
  {
    title: "Life Planning",
    description:
      "Model relocation, education, family, and savings decisions alongside career scenarios.",
    icon: CalendarClock
  }
];

const proofPoints = ["Resume intelligence", "AI disruption model", "Life-aware scenarios"];

export default function LandingPage() {
  return (
    <div className="overflow-hidden bg-[#F7F9FC]">
      <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-[#F6F8FA]">
        <div className="absolute inset-0 ink-grid opacity-50" />
        <div className="absolute left-1/2 top-[42%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D9E2EC]" />
        <div className="absolute left-1/2 top-[42%] h-[25rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E3EAF0]" />
        <div className="container relative flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center pb-24 pt-14 text-center">
          <div className="animate-rise">
            <p className="text-xs font-bold uppercase text-[#315A75]">Career clarity, built around your life</p>
            <h1 className="mx-auto mt-5 max-w-6xl text-5xl font-semibold leading-[0.98] text-[#071A2B] sm:text-7xl lg:text-[6.5rem]">
              Your career. Your life.
              <span className="block text-[#315A75]">Five years ahead.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#526D82] sm:text-lg">
              Turn your resume, ambitions, and life priorities into one clear five-year path with role opportunities, AI-resilient skills, and practical next moves.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 bg-[#102A43] px-6 text-base hover:bg-[#071A2B]"
              >
                <Link href="/journey">
                  Upload My Resume — It&apos;s Free
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-[#102A43] bg-transparent px-6 text-base text-[#102A43] hover:bg-white"
              >
                <Link href="#how-it-works">See how it works</Link>
              </Button>
            </div>
            <CareerPathLine />
            <div className="mt-7 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-semibold uppercase text-[#526D82]">
              {proofPoints.map((point) => <span key={point}>{point}</span>)}
            </div>
          </div>
        </div>
      </section>

      <div id="how-it-works"><ScrollStory /></div>

      <section className="container py-20">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-[#3E6B89]">
              Product intelligence
            </p>
            <h2 className="text-4xl font-semibold tracking-normal text-[#132238]">
              A career dashboard that feels alive.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Every module is designed to help users see risk, opportunity, and
              momentum at a glance instead of reading a static report.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="premium-card rounded-lg animate-rise"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-[#1B3A5C] text-white shadow-lg shadow-slate-900/10">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg text-[#132238]">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-6 text-slate-600">
                    {feature.description}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-lg border border-[#315A75] bg-[#102A43] p-6 text-white shadow-2xl">
              <div className="absolute inset-0 career-grid opacity-20" />
              <div className="relative z-10 grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-lg border border-[#6489A1] bg-[#071A2B]/55 p-5 backdrop-blur">
                  <FileScan className="mb-5 h-8 w-8 text-[#9FB3C8]" aria-hidden="true" />
                  <p className="text-sm font-semibold text-[#D9E2EC]">Resume scan complete</p>
                  <p className="mt-2 text-5xl font-semibold text-white">94%</p>
                  <p className="mt-4 text-sm leading-6 text-[#C4D4DF]">
                    Parsed experience, mapped achievements, and detected role
                    trajectory signals.
                  </p>
                </div>
                <div className="space-y-4 rounded-lg border border-[#DCE3EA] bg-white p-5 text-[#132238]">
                  {[
                    ["Leadership signal", 91],
                    ["AI adaptation", 76],
                    ["Market transferability", 84],
                    ["Compensation upside", 68]
                  ].map(([label, value]) => (
                    <div key={label as string}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span>{label}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-[#3E6B89] animate-progress-fill"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="neon-panel rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-[#132238]">
              From upload to strategy.
            </h3>
            <div className="mt-6 space-y-5">
              {["Upload resume", "Analyze AI impact", "Build roadmap", "Plan scenarios"].map(
                (step, index) => (
                  <div key={step} className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3E6B89] text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-[#132238]">{step}</p>
                      <p className="text-sm text-slate-500">
                        {index === 0
                          ? "PDF, DOCX, or TXT parsing."
                          : "Modeled as a product workflow."}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
