create table public.financial_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  inputs jsonb not null default '{}'::jsonb,
  assumptions jsonb not null default '{}'::jsonb,
  selected_career_path jsonb not null default '{}'::jsonb,
  results jsonb not null default '{}'::jsonb,
  ai_explanation jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.financial_goals (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.financial_plans(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  title text not null,
  target_amount numeric not null,
  target_year integer not null,
  existing_corpus numeric not null default 0,
  priority integer not null default 1,
  created_at timestamptz not null default now()
);

alter table public.financial_plans enable row level security;
alter table public.financial_goals enable row level security;

create policy "Users manage own financial plans" on public.financial_plans
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own financial goals" on public.financial_goals
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.users (id, email, name) values (new.id, new.email, new.raw_user_meta_data->>'name')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure public.handle_new_user();
