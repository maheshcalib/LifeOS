"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ProductStoryVisual } from "@/components/story/ProductStoryVisual";

const stories = [
  { eyebrow: "01 · Understand", title: "Turn a resume into a clear career profile.", body: "CareerLens extracts experience, strengths, gaps, and measurable signals before making recommendations." },
  { eyebrow: "02 · Adapt", title: "See where AI replaces tasks—not your entire career.", body: "Separate work to automate, skills to augment with AI, and human capabilities worth strengthening." },
  { eyebrow: "03 · Choose", title: "Compare roles designed for a human + AI economy.", body: "Prioritize roles that still depend on judgment, trust, leadership, and accountable decision-making." },
  { eyebrow: "04 · Act", title: "Leave with a practical transition roadmap.", body: "Know what to do in the next 30 days, 90 days, and 12 months—and what proof to build." }
];

function StorySection({ index, onActive }: { index: number; onActive: (index: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <motion.article
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0.3, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 12 }}
      transition={{ duration: 0.45 }}
      className="flex min-h-[72vh] items-center py-16"
    >
      <div>
        <p className="text-sm font-semibold uppercase text-[#3E6B89]">{stories[index].eyebrow}</p>
        <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-[#102A43]">{stories[index].title}</h2>
        <p className="mt-5 max-w-lg text-lg leading-8 text-[#627D98]">{stories[index].body}</p>
      </div>
    </motion.article>
  );
}

export function ScrollStory() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section className="border-y border-[#D9E2EC] bg-[#F4F7FA]">
      <div className="container grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
        <div>{stories.map((_, index) => <StorySection key={index} index={index} onActive={setActiveStage} />)}</div>
        <div className="py-20"><ProductStoryVisual activeStage={activeStage} /></div>
      </div>
    </section>
  );
}
