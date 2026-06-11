import Link from "next/link";
import {
  ArrowRight,
  Check,
  CircleHelp,
  Crown,
  FileSearch,
  LockKeyhole,
  Sparkles,
  Target,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    description: "Understand where you stand and identify your next best move.",
    price: "$0",
    cadence: "forever",
    icon: FileSearch,
    cta: "Start free",
    href: "/journey",
    features: [
      "1 complete resume analysis",
      "Career health and ATS scores",
      "AI-impact snapshot",
      "1 recommended career path",
      "Basic 30-day upskilling roadmap",
      "1 life-event investment plan"
    ]
  },
  {
    name: "Pro",
    description: "Build, compare, and execute a complete career-to-life plan.",
    price: "$12",
    cadence: "per month",
    icon: Crown,
    cta: "Join Pro waitlist",
    href: "/login?next=/dashboard",
    popular: true,
    features: [
      "Unlimited resume analyses",
      "All AI-resilient career paths",
      "Job-description resume tailoring",
      "Complete five-year scenario comparison",
      "Unlimited life and investment plans",
      "Save, reopen, and update plans",
      "AI plan explanations and action reports",
      "Priority product support"
    ]
  },
  {
    name: "Career Coach",
    description: "For professionals who want structured support around major moves.",
    price: "$39",
    cadence: "per month",
    icon: Users,
    cta: "Request early access",
    href: "/login?next=/dashboard",
    upcoming: true,
    features: [
      "Everything included in Pro",
      "Advanced transition scenario review",
      "Interview preparation workspace",
      "Accountability check-ins",
      "Personalized proof-project feedback",
      "Priority access to coaching features"
    ]
  }
];

const comparison = [
  ["Resume and AI-impact analysis", "1 analysis", "Unlimited", "Unlimited"],
  ["AI-resilient career paths", "1 path", "All paths", "All paths"],
  ["JD-based resume tailoring", "—", "Included", "Included"],
  ["Career-to-corpus planning", "1 plan", "Unlimited", "Unlimited"],
  ["Saved plans and reports", "—", "Included", "Included"],
  ["Interview and coaching workspace", "—", "—", "Early access"]
];

const faqs = [
  {
    question: "Can I use LifeOS without a paid plan?",
    answer: "Yes. The Free plan provides the complete guided journey for one resume and one life-event investment plan."
  },
  {
    question: "Does LifeOS provide financial advice?",
    answer: "No. LifeOS provides educational projections using editable assumptions and broad strategy categories. It does not recommend named financial products."
  },
  {
    question: "Is payment checkout available today?",
    answer: "Paid plans are currently in early access. You can sign in to save your work and join the waitlist for paid capabilities."
  },
  {
    question: "Can LifeOS guarantee a job or investment return?",
    answer: "No. Career outcomes, salaries, and financial returns are directional estimates intended to support better decisions."
  }
];

export default function UpgradePage() {
  return (
    <div className="bg-[#F7F9FC] text-[#102A43]">
      <section className="border-b border-[#D9E2EC] bg-white">
        <div className="container grid gap-8 py-14 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#315A75]">
              <Sparkles className="h-4 w-4" />
              Simple USD pricing
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-[#102A43] md:text-5xl">
              Plan the career move and the life it needs to fund.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#526D82]">
              Start with one complete decision journey. Upgrade when you need
              continuous analysis, tailored applications, and multiple financial scenarios.
            </p>
          </div>
          <div className="rounded-lg border border-[#B8C9D6] bg-[#E8EFF4] p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-[#102A43]">
              <LockKeyhole className="h-4 w-4 text-[#315A75]" />
              Built for responsible decisions
            </p>
            <p className="mt-2 text-sm leading-6 text-[#526D82]">
              Deterministic financial calculations, evidence-backed resume rewrites,
              and no fabricated experience or guaranteed outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <article
                key={plan.name}
                className={`relative flex min-h-[590px] flex-col rounded-lg border bg-white p-6 shadow-[0_16px_50px_rgba(7,26,43,0.07)] animate-rise ${
                  plan.popular ? "border-[#315A75] ring-2 ring-[#D9E2EC]" : "border-[#D9E2EC]"
                }`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {plan.popular ? (
                  <span className="absolute right-4 top-4 rounded-md bg-[#102A43] px-2.5 py-1 text-xs font-semibold text-white">
                    Most popular
                  </span>
                ) : plan.upcoming ? (
                  <span className="absolute right-4 top-4 rounded-md bg-[#E8EFF4] px-2.5 py-1 text-xs font-semibold text-[#315A75]">
                    Early access
                  </span>
                ) : null}
                <span className={`flex h-11 w-11 items-center justify-center rounded-md ${plan.popular ? "bg-[#102A43] text-white" : "bg-[#E8EFF4] text-[#315A75]"}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 text-xl font-semibold">{plan.name}</h2>
                <p className="mt-2 min-h-14 text-sm leading-6 text-[#526D82]">{plan.description}</p>
                <div className="mt-6 border-y border-[#D9E2EC] py-5">
                  <span className="text-4xl font-semibold text-[#102A43]">{plan.price}</span>
                  <span className="ml-2 text-sm text-[#64748B]">{plan.cadence}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-[#526D82]">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#315A75]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className={`mt-7 w-full ${plan.popular ? "bg-[#102A43] hover:bg-[#071A2B]" : "bg-[#315A75] hover:bg-[#102A43]"}`}>
                  <Link href={plan.href}>{plan.cta}<ArrowRight /></Link>
                </Button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[#D9E2EC] bg-white">
        <div className="container py-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase text-[#315A75]">Compare plans</p>
            <h2 className="mt-2 text-3xl font-semibold">Choose based on the decisions you need to make.</h2>
          </div>
          <div className="mt-8 overflow-x-auto rounded-lg border border-[#D9E2EC]">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead className="bg-[#102A43] text-white">
                <tr>
                  <th className="p-4 font-semibold">Capability</th>
                  <th className="p-4 font-semibold">Free</th>
                  <th className="p-4 font-semibold">Pro</th>
                  <th className="p-4 font-semibold">Career Coach</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row[0]} className="border-t border-[#D9E2EC] bg-white">
                    {row.map((cell, index) => (
                      <td key={cell} className={`p-4 ${index === 0 ? "font-medium text-[#102A43]" : "text-[#526D82]"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="container grid gap-8 py-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase text-[#315A75]"><CircleHelp className="h-4 w-4" />Pricing questions</p>
          <h2 className="mt-3 text-3xl font-semibold">Clear expectations before you begin.</h2>
          <p className="mt-4 text-sm leading-6 text-[#526D82]">LifeOS is currently an MVP. Paid plans represent the product direction and early-access offering.</p>
        </div>
        <div className="divide-y divide-[#D9E2EC] border-y border-[#D9E2EC]">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#102A43]">
                {faq.question}
                <Target className="h-4 w-4 shrink-0 text-[#315A75] transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#526D82]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-[#102A43] text-white">
        <div className="container flex flex-col justify-between gap-6 py-10 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-[#A9C1D3]">Start with clarity</p>
            <h2 className="mt-2 text-2xl font-semibold">Build your first complete LifeOS plan for free.</h2>
          </div>
          <Button asChild size="lg" className="bg-white text-[#102A43] hover:bg-[#E8EFF4]">
            <Link href="/journey">Start my plan<ArrowRight /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
