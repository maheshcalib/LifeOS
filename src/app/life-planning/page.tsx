import { CorpusPlanner } from "@/components/life/CorpusPlanner";

export default function LifePlanningPage({
  searchParams
}: {
  searchParams: { growth?: string };
}) {
  return (
    <div className="bg-[#F7F9FC]">
      <section className="border-b border-[#D9E2EC] bg-white">
        <div className="container py-10">
          <p className="text-xs font-bold uppercase text-[#315A75]">Career-to-corpus planner</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold text-[#102A43]">Can your career path fund the life you are planning?</h1>
          <p className="mt-4 max-w-3xl leading-7 text-[#526D82]">Compare your current income path with a higher-growth career move, then see the monthly savings waterfall required for each goal.</p>
        </div>
      </section>
      <div className="container py-8"><CorpusPlanner selectedGrowth={Number(searchParams.growth) || 12} /></div>
    </div>
  );
}
