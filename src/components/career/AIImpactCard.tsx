import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AIImpactCardProps {
  riskLevel: "low" | "medium" | "high";
  summary: string;
}

export function AIImpactCard({ riskLevel, summary }: AIImpactCardProps) {
  return (
    <Card className="premium-card overflow-hidden rounded-lg">
      <div className="data-line h-1" />
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <CardTitle className="text-[#132238]">AI impact</CardTitle>
        <Badge className="bg-amber-50 text-[#B45309] capitalize">{riskLevel}</Badge>
      </CardHeader>
      <CardContent className="text-sm leading-6 text-slate-400">{summary}</CardContent>
    </Card>
  );
}
