import { CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatINR } from "@/lib/currency";

interface GoalCardProps {
  title: string;
  year: number;
  cost?: number;
}

export function GoalCard({ title, year, cost }: GoalCardProps) {
  return (
    <Card className="premium-card rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-[#132238]">
          <CalendarDays className="h-4 w-4 text-[#3E6B89]" aria-hidden="true" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-slate-600">
        Target year: {year}
        {typeof cost === "number" ? ` · Estimated cost: ${formatINR(cost)}` : null}
      </CardContent>
    </Card>
  );
}
