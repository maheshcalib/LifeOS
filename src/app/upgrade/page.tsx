import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    name: "Free",
    price: "₹0",
    features: ["One resume analysis", "Career health score", "Basic upskilling roadmap"]
  },
  {
    name: "Pro",
    price: "₹999",
    features: ["Unlimited analyses", "Life planning AI", "Five-year scenarios", "Email reports"]
  }
];

export default function UpgradePage() {
  return (
    <div className="bg-[#F7F9FC]">
      <section className="mesh-bg text-white">
        <div className="container py-14 text-center">
          <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-[#D9E2EC]">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Unlock deeper planning
          </p>
          <h1 className="text-4xl font-semibold tracking-normal">
            Upgrade LifeOS
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-200">
            Go deeper on scenarios, life planning, and follow-up reports.
          </p>
        </div>
      </section>
      <section className="container -mt-8 grid gap-5 pb-12 md:grid-cols-2">
        {plans.map((plan, index) => (
          <Card
            key={plan.name}
            className="premium-card rounded-lg animate-rise"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <CardHeader>
              <CardTitle className="text-[#132238]">{plan.name}</CardTitle>
              <p className="text-5xl font-semibold">
                {plan.price}
                <span className="text-base font-normal text-slate-500">/mo</span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-slate-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check className="h-4 w-4 text-[#3E6B89]" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full bg-[#3E6B89] hover:bg-[#315A75]">
                {plan.name === "Free" ? "Start Free" : "Upgrade to Pro"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
