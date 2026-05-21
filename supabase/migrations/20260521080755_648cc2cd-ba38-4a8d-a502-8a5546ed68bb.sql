
-- Roles enum + table (separate to avoid privilege escalation)
create type public.app_role as enum ('admin', 'student');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);

create table public.module_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  day int not null check (day between 1 and 25),
  completed_at timestamptz not null default now(),
  unique (user_id, day)
);

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.module_progress enable row level security;

-- Security-definer role check (avoids recursive RLS)
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- Profiles policies
create policy "users read own profile" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "admins read all profiles" on public.profiles for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "users update own profile" on public.profiles for update to authenticated using (auth.uid() = id);

-- user_roles policies
create policy "users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);
create policy "admins read all roles" on public.user_roles for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- module_progress policies
create policy "users read own progress" on public.module_progress for select to authenticated using (auth.uid() = user_id);
create policy "users insert own progress" on public.module_progress for insert to authenticated with check (auth.uid() = user_id);
create policy "users delete own progress" on public.module_progress for delete to authenticated using (auth.uid() = user_id);
create policy "admins read all progress" on public.module_progress for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Auto-create profile + student role on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, last_login_at)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', now());

  insert into public.user_roles (user_id, role) values (new.id, 'student');
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- RPC for clients to bump their last_login_at
create or replace function public.touch_last_login()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles set last_login_at = now() where id = auth.uid();
end;
$$;

grant execute on function public.touch_last_login() to authenticated;
