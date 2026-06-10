"use client";

import { motion, useReducedMotion } from "framer-motion";

const milestones = [
  { label: "Resume", x: "8%" },
  { label: "Skills", x: "35%" },
  { label: "Target role", x: "64%" },
  { label: "Year five", x: "92%" }
];

export function CareerPathLine() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto mt-12 h-20 w-full max-w-4xl" aria-hidden="true">
      <svg className="absolute inset-x-0 top-4 h-10 w-full overflow-visible" viewBox="0 0 1000 80" preserveAspectRatio="none">
        <path d="M20 56 C210 56 220 18 410 28 S690 72 980 20" fill="none" stroke="#C7D5DF" strokeWidth="2" />
        <motion.path
          d="M20 56 C210 56 220 18 410 28 S690 72 980 20"
          fill="none"
          stroke="#315A75"
          strokeWidth="3"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.35 }}
        />
      </svg>
      {milestones.map((milestone, index) => (
        <motion.div
          key={milestone.label}
          className="absolute top-1 -translate-x-1/2 text-center"
          style={{ left: milestone.x }}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 + index * 0.16 }}
        >
          <span className="mx-auto block h-3 w-3 rounded-full border-2 border-[#315A75] bg-[#F6F8FA]" />
          <span className="mt-9 block whitespace-nowrap text-[10px] font-bold uppercase text-[#526D82] sm:text-xs">{milestone.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
