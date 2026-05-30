create table if not exists public.courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  progress    integer not null default 0 check (progress >= 0 and progress <= 100),
  icon_name   text not null default 'BookOpen',
  created_at  timestamptz not null default now()
);

alter table public.courses enable row level security;

create policy "Allow public read access"
  on public.courses
  for select
  using (true);

insert into public.courses (title, progress, icon_name) values
  ('Advanced React Patterns',         75, 'Code2'),
  ('PostgreSQL & Supabase Deep Dive',  42, 'Database'),
  ('System Design Fundamentals',       60, 'Layers'),
  ('TypeScript Mastery',               88, 'Zap');
