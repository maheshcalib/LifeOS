"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  FileSearch,
  Route,
  UserRoundCheck,
  WandSparkles
} from "lucide-react";

const stages = [
  {
    label: "Resume intelligence",
    title: "Profile extracted",
    score: "86%",
    icon: FileSearch,
    items: ["8 years experience", "12 verified skills", "4 measurable outcomes"]
  },
  {
    label: "Human + AI advantage",
    title: "Work redesigned",
    score: "3 paths",
    icon: Bot,
    items: ["Automate routine reporting", "Augment analysis with AI", "Differentiate through judgment"]
  },
  {
    label: "AI-resilient roles",
    title: "Best-fit opportunities",
    score: "84%",
    icon: BriefcaseBusiness,
    items: ["AI Product Manager", "Data Product Manager", "AI Transformation Consultant"]
  },
  {
    label: "Action roadmap",
    title: "Transition plan ready",
    score: "12 mo",
    icon: Route,
    items: ["30 days: reposition", "90 days: build proof", "12 months: transition"]
  }
];

export function ProductStoryVisual({ activeStage }: { activeStage: number }) {
  const reduceMotion = useReducedMotion();
  const stage = stages[activeStage] ?? stages[0];
  const Icon = stage.icon;

  return (
    <div className="sticky top-24">
      <div className="overflow-hidden rounded-lg border border-[#D9E2EC] bg-white shadow-[0_24px_70px_rgba(7,26,43,0.14)]">
        <div className="flex items-center justify-between border-b border-[#D9E2EC] px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#102A43]" />
            <span className="text-xs font-semibold text-[#102A43]">CareerLens intelligence</span>
          </div>
          <span className="rounded-full bg-[#F0F4F8] px-3 py-1 text-[11px] font-medium text-[#486581]">Live profile model</span>
        </div>
        <div className="grid min-h-[520px] md:grid-cols-[0.32fr_0.68fr]">
          <aside className="border-r border-[#D9E2EC] bg-[#F4F7FA] p-4">
            {stages.map((item, index) => {
              const StageIcon = item.icon;
              return (
                <div key={item.label} className={`mb-2 flex items-center gap-3 rounded-md p-3 text-xs ${index === activeStage ? "bg-white font-semibold text-[#102A43] shadow-sm" : "text-[#829AB1]"}`}>
                  <StageIcon className="h-4 w-4" />
                  {item.label}
                </div>
              );
            })}
          </aside>
          <main className="relative overflow-hidden p-6">
            <div className="absolute inset-0 ink-grid opacity-50" />
            <motion.div
              key={stage.label}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-[#3E6B89]">{stage.label}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-[#102A43]">{stage.title}</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#102A43] text-white">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-8 rounded-lg border border-[#D9E2EC] bg-white p-5">
                <p className="text-xs text-[#627D98]">Primary signal</p>
                <p className="mt-1 text-4xl font-semibold text-[#102A43]">{stage.score}</p>
                <div className="mt-5 h-2 rounded-full bg-[#EAF0F5]">
                  <motion.div
                    key={`${stage.label}-bar`}
                    initial={reduceMotion ? false : { width: "15%" }}
                    animate={{ width: `${68 + activeStage * 7}%` }}
                    transition={{ duration: 0.7 }}
                    className="h-2 rounded-full bg-[#3E6B89]"
                  />
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {stage.items.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-center gap-3 rounded-md border border-[#D9E2EC] bg-white p-4"
                  >
                    {activeStage === 1 ? (
                      index === 0 ? <Bot className="h-4 w-4 text-[#B7791F]" /> : index === 1 ? <WandSparkles className="h-4 w-4 text-[#3E6B89]" /> : <UserRoundCheck className="h-4 w-4 text-[#2F855A]" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-[#2F855A]" />
                    )}
                    <span className="text-sm text-[#486581]">{item}</span>
                    <ArrowUpRight className="ml-auto h-4 w-4 text-[#9FB3C8]" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
