"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  FileSearch,
  Sparkles,
  Target,
  UserRoundCheck,
  WandSparkles
} from "lucide-react";

function VisualShell({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#D9E2EC] bg-[#F4F7FA] shadow-[0_22px_60px_rgba(7,26,43,0.12)]">
      <div className="flex items-center justify-between border-b border-[#D9E2EC] bg-white px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#102A43]" />
          <span className="text-xs font-semibold text-[#102A43]">LifeOS intelligence</span>
        </div>
        <span className="rounded-full bg-[#E8EFF4] px-3 py-1 text-[11px] font-semibold text-[#315A75]">{label}</span>
      </div>
      <div className="relative min-h-[480px] overflow-hidden ink-grid sm:min-h-[520px]">{children}</div>
    </div>
  );
}

export function ResumeScanVisual() {
  const reduceMotion = useReducedMotion();
  const signals = [
    ["Experience", "8 years", 88],
    ["Verified skills", "12", 76],
    ["Measurable outcomes", "4", 68],
    ["Role trajectory", "Strong", 82]
  ] as const;

  return (
    <VisualShell label="Profile extracted">
      <div className="grid min-h-[480px] gap-5 p-5 sm:min-h-[520px] sm:p-7 md:grid-cols-[0.88fr_1.12fr]">
        <div className="relative overflow-hidden rounded-lg border border-[#D9E2EC] bg-white p-6">
          <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[#D9E2EC]/70 to-transparent animate-scan" />
          <FileSearch className="h-8 w-8 text-[#315A75]" />
          <p className="mt-8 text-xs font-bold uppercase text-[#526D82]">Resume scan complete</p>
          <p className="mt-2 text-7xl font-semibold text-[#102A43]">94%</p>
          <p className="mt-5 max-w-xs text-sm leading-6 text-[#627D98]">Experience, achievements, and trajectory signals mapped into a clear career profile.</p>
        </div>
        <div className="grid content-center gap-3">
          {signals.map(([label, value, score], index) => (
            <motion.div
              key={label}
              initial={reduceMotion ? false : { opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border border-[#D9E2EC] bg-white p-4"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-[#102A43]">{label}</span>
                <span className="text-[#526D82]">{value}</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E8EFF4]">
                <motion.div initial={reduceMotion ? false : { width: 0 }} whileInView={{ width: `${score}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 + index * 0.12 }} className="h-full rounded-full bg-[#315A75]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </VisualShell>
  );
}

export function TaskTransformationVisual() {
  const reduceMotion = useReducedMotion();
  const lanes = [
    { title: "Automate", icon: Bot, items: ["Routine reports", "First drafts", "Data cleanup"], tone: "border-[#E5B8B5] bg-[#FFF6F5] text-[#9F1C14]" },
    { title: "Augment", icon: WandSparkles, items: ["Research", "Analysis", "Decision options"], tone: "border-[#B8C9D6] bg-[#E8EFF4] text-[#315A75]" },
    { title: "Differentiate", icon: UserRoundCheck, items: ["Judgment", "Leadership", "Stakeholder trust"], tone: "border-[#B7D7C4] bg-[#F1FAF4] text-[#116438]" }
  ];

  return (
    <VisualShell label="Work redesigned">
      <div className="relative min-h-[480px] p-5 sm:min-h-[520px] sm:p-7">
        <div className="absolute left-1/2 top-14 h-[390px] w-px bg-[#C7D5DF]" />
        <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative z-10 mx-auto flex w-fit items-center gap-3 rounded-lg border border-[#D9E2EC] bg-white px-5 py-4 shadow-sm">
          <Sparkles className="h-5 w-5 text-[#315A75]" />
          <div><p className="text-xs font-bold uppercase text-[#526D82]">Your role today</p><p className="font-semibold text-[#102A43]">Business Analyst</p></div>
        </motion.div>
        <div className="relative z-10 mt-16 grid gap-4 md:grid-cols-3">
          {lanes.map(({ title, icon: Icon, items, tone }, index) => (
            <motion.div
              key={title}
              initial={reduceMotion ? false : { opacity: 0, y: -22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ delay: 0.15 + index * 0.16 }}
              className={`rounded-lg border p-4 ${tone}`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white shadow-sm"><Icon className="h-5 w-5" /></span>
              <p className="mt-4 font-semibold">{title}</p>
              <div className="mt-3 space-y-2">
                {items.map((item) => <div key={item} className="rounded bg-white px-3 py-2 text-xs font-medium shadow-sm">{item}</div>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </VisualShell>
  );
}

export function RoleBranchesVisual() {
  const reduceMotion = useReducedMotion();
  const roles = [
    { role: "AI Product Manager", fit: 88, salary: "₹28–36L", position: "left-[3%] top-6" },
    { role: "Data Product Manager", fit: 84, salary: "₹24–32L", position: "right-[2%] top-[38%]" },
    { role: "Transformation Lead", fit: 79, salary: "₹30–40L", position: "bottom-6 left-[7%]" }
  ];

  return (
    <VisualShell label="Role opportunities">
      <div className="relative min-h-[480px] overflow-hidden p-5 sm:min-h-[520px] sm:p-7">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 520" preserveAspectRatio="none" aria-hidden="true">
          {["M300 260 C225 260 220 92 125 92", "M300 260 C385 260 390 260 500 260", "M300 260 C220 260 220 430 140 430"].map((path) => (
            <motion.path key={path} d={path} fill="none" stroke="#8FA7B8" strokeWidth="2" initial={reduceMotion ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.9 }} />
          ))}
        </svg>
        <motion.div initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-4 border-white bg-[#102A43] text-center text-white shadow-[0_18px_45px_rgba(7,26,43,0.22)]">
          <Target className="h-6 w-6" /><p className="mt-2 text-sm font-semibold">Your next move</p>
        </motion.div>
        {roles.map((item, index) => (
          <motion.div key={item.role} initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ delay: 0.25 + index * 0.17 }} className={`absolute z-10 w-52 rounded-lg border border-[#D9E2EC] bg-white p-4 shadow-md ${item.position}`}>
            <p className="font-semibold text-[#102A43]">{item.role}</p>
            <div className="mt-3 flex justify-between text-xs font-semibold text-[#526D82]"><span>{item.fit}% fit</span><span>{item.salary}</span></div>
            <div className="mt-3 h-1.5 rounded-full bg-[#E8EFF4]"><motion.div initial={reduceMotion ? false : { width: 0 }} whileInView={{ width: `${item.fit}%` }} viewport={{ once: true }} transition={{ delay: 0.45 + index * 0.17, duration: 0.7 }} className="h-full rounded-full bg-[#315A75]" /></div>
          </motion.div>
        ))}
      </div>
    </VisualShell>
  );
}

export function ActionRoadmapVisual() {
  const reduceMotion = useReducedMotion();
  const steps = [
    { horizon: "30 days", title: "Reposition", body: "Tailor resume and clarify target role." },
    { horizon: "90 days", title: "Build proof", body: "Publish one role-relevant project." },
    { horizon: "12 months", title: "Make the move", body: "Apply with evidence and interview stories." }
  ];

  return (
    <VisualShell label="Transition plan">
      <div className="relative min-h-[480px] p-5 sm:min-h-[520px] sm:p-7">
        <div className="absolute bottom-20 left-12 top-14 w-1 rounded-full bg-[#D9E2EC] sm:left-16">
          <motion.div initial={reduceMotion ? false : { height: 0 }} whileInView={{ height: "100%" }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="w-full rounded-full bg-[#315A75]" />
        </div>
        <div className="space-y-5 pl-14 sm:pl-20">
          {steps.map((step, index) => (
            <motion.div key={step.horizon} initial={reduceMotion ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ delay: 0.15 + index * 0.22 }} className="relative rounded-lg border border-[#D9E2EC] bg-white p-5 shadow-sm">
              <span className="absolute -left-[3.45rem] top-6 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#F4F7FA] bg-[#102A43] text-white sm:-left-[4.45rem]"><Check className="h-3 w-3" /></span>
              <p className="text-xs font-bold uppercase text-[#315A75]">{step.horizon}</p>
              <p className="mt-1 font-semibold text-[#102A43]">{step.title}</p>
              <p className="mt-2 text-sm leading-6 text-[#627D98]">{step.body}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.85 }} className="ml-14 mt-5 flex items-center gap-3 rounded-lg bg-[#102A43] p-4 text-white sm:ml-20">
          <CheckCircle2 className="h-5 w-5" /><span className="text-sm font-semibold">Transition plan ready to execute</span><ArrowRight className="ml-auto h-4 w-4" />
        </motion.div>
      </div>
    </VisualShell>
  );
}
