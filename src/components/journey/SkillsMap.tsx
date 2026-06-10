export function SkillsMap({
  strengths,
  gaps
}: {
  strengths: string[];
  gaps: string[];
}) {
  return (
    <div className="premium-card relative overflow-hidden rounded-lg p-5">
      <div className="relative">
        <h3 className="font-semibold">Skills map</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-[#0F766E]">Strengths</p>
            <div className="flex flex-wrap gap-2">
              {strengths.map((skill) => (
                <span key={skill} className="rounded-full border border-[#BCCCDC] bg-[#EDF2F7] px-3 py-1 text-xs text-[#0F766E]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-[#B45309]">Growth areas</p>
            <div className="flex flex-wrap gap-2">
              {gaps.map((skill) => (
                <span key={skill} className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs text-[#B45309]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
