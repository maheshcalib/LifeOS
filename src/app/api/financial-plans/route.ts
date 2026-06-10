import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { FinancialGoal } from "@/types";

async function syncGoals(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  planId: string,
  goals: FinancialGoal[]
) {
  const { error: deleteError } = await supabase.from("financial_goals").delete().eq("plan_id", planId);
  if (deleteError) return deleteError;
  if (!goals.length) return null;
  const { error } = await supabase.from("financial_goals").insert(goals.map((goal) => ({
    plan_id: planId,
    user_id: userId,
    type: goal.type,
    title: goal.title,
    target_amount: goal.targetAmount,
    target_year: goal.targetYear,
    existing_corpus: goal.existingCorpus,
    priority: goal.priority
  })));
  return error;
}

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const { data, error } = await supabase.from("financial_plans").select("*").order("updated_at", { ascending: false });
  return error ? NextResponse.json({ error: error.message }, { status: 400 }) : NextResponse.json({ plans: data });
}

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.inputs || !body?.results) return NextResponse.json({ error: "name, inputs, and results are required." }, { status: 400 });
  const { data, error } = await supabase.from("financial_plans").insert({ user_id: user.id, name: body.name, inputs: body.inputs, assumptions: body.inputs.assumptions, selected_career_path: body.selectedCareerPath || {}, results: body.results, ai_explanation: body.aiExplanation || {} }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  const goalError = await syncGoals(supabase, user.id, data.id, body.inputs.goals || []);
  return NextResponse.json({ plan: data, goalSyncWarning: goalError?.message });
}

export async function DELETE(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required." }, { status: 400 });
  const { error } = await supabase.from("financial_plans").delete().eq("id", id);
  return error ? NextResponse.json({ error: error.message }, { status: 400 }) : NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body?.id || !body?.inputs || !body?.results) return NextResponse.json({ error: "id, inputs, and results are required." }, { status: 400 });
  const { data, error } = await supabase.from("financial_plans").update({ name: body.name, inputs: body.inputs, assumptions: body.inputs.assumptions, selected_career_path: body.selectedCareerPath || {}, results: body.results, ai_explanation: body.aiExplanation || {}, updated_at: new Date().toISOString() }).eq("id", body.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  const goalError = await syncGoals(supabase, user.id, data.id, body.inputs.goals || []);
  return NextResponse.json({ plan: data, goalSyncWarning: goalError?.message });
}
