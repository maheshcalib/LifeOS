"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness, CheckCircle2, FileSearch, Route } from "lucide-react";

export function ProductHeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-[560px] overflow-hidden rounded-lg border border-[#D9E2EC] bg-[#F4F7FA] shadow-[0_28px_80px_rgba(7,26,43,0.2)]">
      <div className="absolute inset-0 ink-grid" />
      <div className="relative m-5 overflow-hidden rounded-lg border border-[#D9E2EC] bg-white">
        <div className="flex items-center justify-between border-b border-[#D9E2EC] px-5 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#102A43]">
            <BriefcaseBusiness className="h-4 w-4" /> LifeOS
          </div>
          <span className="rounded-full bg-[#EAF0F5] px-3 py-1 text-[11px] text-[#486581]">Career model ready</span>
        </div>
        <div className="grid min-h-[490px] grid-cols-[0.28fr_0.72fr]">
          <div className="border-r border-[#D9E2EC] bg-[#F4F7FA] p-4">
            {["Profile", "AI impact", "Role matches", "Action plan"].map((item, index) => (
              <motion.div
                key={item}
                initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`mb-2 rounded-md p-3 text-xs ${index === 2 ? "bg-white font-semibold text-[#102A43] shadow-sm" : "text-[#829AB1]"}`}
              >
                {item}
              </motion.div>
            ))}
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-[#3E6B89]">Recommended path</p>
                <h3 className="mt-2 text-2xl font-semibold text-[#102A43]">AI Product Manager</h3>
              </div>
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-[#2F855A]">88% resilient</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[["Fit", "84%"], ["Salary", "₹28–36L"], ["Transition", "Medium"]].map(([label, value], index) => (
                <motion.div
                  key={label}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="rounded-md border border-[#D9E2EC] p-3"
                >
                  <p className="text-[11px] text-[#829AB1]">{label}</p>
                  <p className="mt-1 font-semibold text-[#102A43]">{value}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 rounded-md border border-[#D9E2EC] p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-[#102A43]"><FileSearch className="h-4 w-4 text-[#3E6B89]" /> Human + AI advantage</div>
              <div className="mt-4 space-y-3">
                {["Automate routine reporting", "Augment analysis with AI", "Differentiate through judgment"].map((item, index) => (
                  <motion.div key={item} initial={reduceMotion ? false : { width: "20%" }} animate={{ width: `${72 + index * 8}%` }} transition={{ duration: 0.8, delay: 0.35 + index * 0.1 }} className="rounded-md bg-[#EAF0F5] px-3 py-2 text-xs text-[#486581]">{item}</motion.div>
                ))}
              </div>
            </div>
            <div className="mt-4 rounded-md bg-[#102A43] p-4 text-white">
              <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-medium"><Route className="h-4 w-4" /> Next action</span><ArrowUpRight className="h-4 w-4" /></div>
              <div className="mt-3 flex items-start gap-2 text-xs leading-5 text-[#D9E2EC]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> Build one AI-assisted product workflow case study in the next 30 days.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
