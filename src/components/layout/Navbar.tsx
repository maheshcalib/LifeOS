import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/journey", label: "Guided Plan" },
  { href: "/upgrade", label: "Upgrade" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#DCE3EA] bg-white/95 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-[#132238]">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#155E75] text-white">
            <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
          </span>
          CareerLens
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#3E6B89]">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild className="bg-[#155E75] text-white hover:bg-[#164E63]">
          <Link href="/journey">Start My Plan</Link>
        </Button>
      </div>
    </header>
  );
}
