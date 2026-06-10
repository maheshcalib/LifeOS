"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/layout/BrandMark";

const navItems = [
  { href: "/journey", label: "Product" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/upgrade", label: "Pricing" }
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const landing = pathname === "/";

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${landing && !scrolled ? "bg-[#F6F8FA]" : "bg-white/95 shadow-[0_8px_30px_rgba(7,26,43,0.08)] backdrop-blur-xl"}`}>
      <div className="container flex h-20 items-center justify-between gap-5 border-b border-[#D9E2EC]">
        <Link href="/" className="flex shrink-0 items-center" aria-label="LifeOS home">
          <BrandMark />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold uppercase text-[#315A75] md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#071A2B]">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild className="hidden bg-[#102A43] text-white hover:bg-[#071A2B] sm:inline-flex">
          <Link href="/journey">Start My Plan</Link>
        </Button>
        <Button asChild variant="outline" size="icon" className="sm:hidden" title="Open guided plan">
          <Link href="/journey"><Menu /></Link>
        </Button>
      </div>
    </header>
  );
}
