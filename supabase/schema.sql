-- GraphixMo database schema.
-- Run this in Supabase SQL Editor after opening the project.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  plan text not null default 'free' check (plan in ('free', 'pro')),
  design_points integer not null default 50 check (design_points >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null check (provider in ('stripe', 'mobile_money')),
  amount integer not null check (amount > 0),
  currency text not null default 'XOF',
  status text not null default 'pending' check (status in ('pending', 'succeeded', 'failed', 'refunded')),
  provider_payment_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  plan text not null default 'pro' check (plan in ('free', 'pro')),
  status text not null default 'active' check (status in ('active', 'past_due', 'canceled', 'incomplete')),
  provider text check (provider in ('stripe', 'mobile_money')),
  provider_subscription_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.designs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Untitled design',
  design_type text not null default 'social-post',
  content jsonb not null default '{}'::jsonb,
  thumbnail_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payments_user_id_idx on public.payments(user_id);
create index if not exists profiles_created_at_idx on public.profiles(created_at desc);
create index if not exists subscriptions_user_id_idx on public.subscriptions(user_id);
create index if not exists designs_user_id_idx on public.designs(user_id);
create index if not exists designs_updated_at_idx on public.designs(updated_at desc);

alter table public.profiles enable row level security;
alter table public.payments enable row level security;
alter table public.subscriptions enable row level security;
alter table public.designs enable row level security;

create policy "Users can view their profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update their profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can view their payments" on public.payments for select using (auth.uid() = user_id);
create policy "Users can create their payments" on public.payments for insert with check (auth.uid() = user_id);
create policy "Users can view their subscription" on public.subscriptions for select using (auth.uid() = user_id);
create policy "Users can view their designs" on public.designs for select using (auth.uid() = user_id);
create policy "Users can create their designs" on public.designs for insert with check (auth.uid() = user_id);
create policy "Users can update their designs" on public.designs for update using (auth.uid() = user_id);
create policy "Users can delete their designs" on public.designs for delete using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do update
  set full_name = excluded.full_name, updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Repair users created before the profile trigger was available.
insert into public.profiles (id, full_name)
select id, raw_user_meta_data ->> 'full_name'
from auth.users
on conflict (id) do update
set full_name = excluded.full_name, updated_at = now();