import { Badge } from "@/components/ui/badge";

interface SkillsGridProps {
  skills: string[];
  title?: string;
}

export function SkillsGrid({ skills, title = "Skills snapshot" }: SkillsGridProps) {
  return (
    <div className="premium-card rounded-lg p-5">
      <h3 className="mb-4 font-semibold text-[#132238]">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="border border-[#D9E2EC] bg-[#EDF2F7] px-3 py-1 text-[#3E6B89]"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
