create table public.users (
  id uuid primary key,
  email text not null unique,
  name text,
  plan text not null default 'free' check (plan in ('free', 'pro')),
  created_at timestamptz not null default now()
);

create table public.analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  resume_text text not null,
  results jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.life_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  events jsonb not null default '[]'::jsonb,
  results jsonb not null default '{}'::jsonb,
  salary numeric,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.analyses enable row level security;
alter table public.life_plans enable row level security;

create policy "Users can read their own row"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can insert their own row"
  on public.users for insert
  with check (auth.uid() = id);

create policy "Users can update their own row"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can delete their own row"
  on public.users for delete
  using (auth.uid() = id);

create policy "Users can read their own analyses"
  on public.analyses for select
  using (auth.uid() = user_id);

create policy "Users can insert their own analyses"
  on public.analyses for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own analyses"
  on public.analyses for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own analyses"
  on public.analyses for delete
  using (auth.uid() = user_id);

create policy "Users can read their own life plans"
  on public.life_plans for select
  using (auth.uid() = user_id);

create policy "Users can insert their own life plans"
  on public.life_plans for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own life plans"
  on public.life_plans for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own life plans"
  on public.life_plans for delete
  using (auth.uid() = user_id);
