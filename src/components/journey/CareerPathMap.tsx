"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { formatINR } from "@/lib/currency";
import type { CareerPath, CareerPathKind } from "@/types";

const icons = {
  "best-fit": Sparkles,
  "ai-resilient": ShieldCheck,
  ambitious: TrendingUp
};

export function CareerPathMap({
  paths,
  selected,
  onSelect
}: {
  paths: CareerPath[];
  selected: CareerPathKind;
  onSelect: (kind: CareerPathKind) => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-lg border border-[#D9E2EC] bg-[#071A2B] p-5 text-white md:p-7">
      <div className="absolute inset-0 ink-grid opacity-30" />
      <div className="relative">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase text-[#A9C1D3]">Five-year decision map</p>
            <h2 className="mt-2 text-2xl font-semibold">Choose the future worth building.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#A9C1D3]">
            Compare three realistic paths. Select one to reveal the milestones behind it.
          </p>
        </div>

        <div className="relative mt-8 grid gap-3 lg:grid-cols-3">
          <div className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-[#3E6B89]/60 lg:block" />
          {paths.map((path, index) => {
            const Icon = icons[path.kind];
            const active = path.kind === selected;
            return (
              <motion.button
                key={path.kind}
                type="button"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => onSelect(path.kind)}
                className={`relative rounded-md border p-4 text-left transition ${
                  active
                    ? "border-[#8FB3C9] bg-white text-[#102A43]"
                    : "border-[#315A75] bg-[#102A43]/80 text-white hover:border-[#6489A1]"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                    active ? "border-[#3E6B89] bg-[#E8EFF4]" : "border-[#6489A1] bg-[#071A2B]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <p className={`mt-4 text-xs font-semibold uppercase ${active ? "text-[#3E6B89]" : "text-[#A9C1D3]"}`}>
                  {path.label}
                </p>
                <h3 className="mt-1 font-semibold">{path.role}</h3>
                <div className={`mt-4 flex justify-between text-xs ${active ? "text-[#526D82]" : "text-[#A9C1D3]"}`}>
                  <span>{path.readiness}% ready</span>
                  <span>{path.aiResilience}% AI resilient</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {paths
          .filter((path) => path.kind === selected)
          .map((path) => (
            <motion.div
              key={path.kind}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 rounded-md border border-[#315A75] bg-[#0B2235] p-5"
            >
              <div className="flex flex-col justify-between gap-3 md:flex-row">
                <p className="max-w-2xl text-sm leading-6 text-[#C4D4DF]">{path.summary}</p>
                <p className="text-sm font-semibold text-white">Year 5 estimate: {formatINR(path.salaryEnd)}</p>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {path.milestones.map((milestone, index) => (
                  <div key={milestone.year} className="relative border-l border-[#6489A1] pl-4">
                    <span className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-[#8FB3C9]" />
                    <p className="text-xs font-semibold uppercase text-[#A9C1D3]">Year {milestone.year}</p>
                    <p className="mt-2 font-medium">{milestone.title}</p>
                    <p className="mt-2 text-sm leading-5 text-[#A9C1D3]">{milestone.description}</p>
                    <p className="mt-3 flex items-center gap-2 text-xs text-white">
                      {formatINR(milestone.salary)}
                      {index < 2 ? <ArrowRight className="h-3 w-3 text-[#8FB3C9]" /> : null}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
