"use client";

import { useState } from "react";
import { LoaderCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function MagicLinkForm({ next = "/dashboard" }: { next?: string }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit() {
    setBusy(true);
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` }
    });
    setMessage(error ? error.message : "Magic link sent. Check your email.");
    setBusy(false);
  }

  return (
    <div className="rounded-lg border border-[#D9E2EC] bg-white p-6 shadow-sm">
      <Mail className="h-6 w-6 text-[#315A75]" />
      <h1 className="mt-4 text-2xl font-semibold text-[#102A43]">Sign in to save your LifeOS plans</h1>
      <p className="mt-2 text-sm leading-6 text-[#526D82]">We will email a secure passwordless sign-in link.</p>
      <input className="mt-5 h-11 w-full rounded-md border border-[#D9E2EC] px-3 text-sm outline-none focus:border-[#315A75]" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
      <Button className="mt-4 w-full bg-[#102A43] hover:bg-[#071A2B]" disabled={!email || busy} onClick={submit}>{busy ? <LoaderCircle className="animate-spin" /> : <Mail />}Send magic link</Button>
      {message ? <p className="mt-4 text-sm text-[#526D82]">{message}</p> : null}
    </div>
  );
}
