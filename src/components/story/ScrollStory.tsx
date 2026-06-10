"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ActionRoadmapVisual,
  ResumeScanVisual,
  RoleBranchesVisual,
  TaskTransformationVisual
} from "@/components/story/ProductStoryVisual";

const stories = [
  {
    eyebrow: "01 · Understand",
    title: "Turn a resume into a clear career profile.",
    body: "LifeOS extracts experience, strengths, gaps, and measurable signals before making recommendations."
  },
  {
    eyebrow: "02 · Adapt",
    title: "See where AI replaces tasks—not your entire career.",
    body: "Separate work to automate, skills to augment with AI, and human capabilities worth strengthening."
  },
  {
    eyebrow: "03 · Choose",
    title: "Compare roles designed for a human + AI economy.",
    body: "Prioritize roles that still depend on judgment, trust, leadership, and accountable decision-making."
  },
  {
    eyebrow: "04 · Act",
    title: "Leave with a practical transition roadmap.",
    body: "Know what to do in the next 30 days, 90 days, and 12 months—and what proof to build."
  }
];

const visuals = [ResumeScanVisual, TaskTransformationVisual, RoleBranchesVisual, ActionRoadmapVisual];

function StoryCopy({ index }: { index: number }) {
  return (
    <div className="max-w-xl">
      <p className="inline-flex rounded bg-[#E8EFF4] px-3 py-1.5 text-xs font-bold uppercase text-[#315A75]">{stories[index].eyebrow}</p>
      <h2 className="mt-5 text-3xl font-semibold leading-[1.12] text-[#071A2B] sm:text-4xl lg:text-5xl">{stories[index].title}</h2>
      <p className="mt-5 text-base font-medium leading-7 text-[#526D82] sm:text-lg sm:leading-8">{stories[index].body}</p>
    </div>
  );
}

function StoryBand({
  index,
  reverse = false,
  intro = false
}: {
  index: number;
  reverse?: boolean;
  intro?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const Visual = visuals[index];

  return (
    <section className={`${index % 2 === 0 ? "bg-white" : "bg-[#F4F7FA]"} border-b border-[#D9E2EC]`}>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.55 }}
        className={`container grid items-center gap-10 py-16 lg:gap-14 ${intro ? "lg:grid-cols-[0.72fr_1.28fr] lg:py-20" : "lg:grid-cols-[0.78fr_1.22fr] lg:py-24"}`}
      >
        <div className={reverse ? "lg:order-2" : ""}><StoryCopy index={index} /></div>
        <div className={reverse ? "lg:order-1" : ""}><Visual /></div>
      </motion.div>
    </section>
  );
}

export function ScrollStory() {
  return (
    <div className="border-t border-[#D9E2EC]">
      <StoryBand index={0} intro />
      <StoryBand index={1} />
      <StoryBand index={2} reverse />
      <StoryBand index={3} />
    </div>
  );
}
