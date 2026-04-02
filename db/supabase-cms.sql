-- Tabelle CMS admin dashboard
create extension if not exists "pgcrypto";

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  logo_url text,
  site_name text not null default 'endu24.com',
  updated_at timestamptz not null default now()
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  url text not null,
  "order" int not null default 0,
  is_active boolean not null default true
);

-- Row di default settings (singolo record)
insert into public.settings (site_name)
select 'endu24.com'
where not exists (select 1 from public.settings);

-- RLS
alter table public.settings enable row level security;
alter table public.menu_items enable row level security;

create policy "public read settings" on public.settings
for select using (true);

create policy "public read active menu" on public.menu_items
for select using (is_active = true);

create policy "authenticated full settings" on public.settings
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "authenticated full menu" on public.menu_items
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Storage bucket logo
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

create policy "public read site-assets" on storage.objects
for select using (bucket_id = 'site-assets');

create policy "authenticated upload site-assets" on storage.objects
for insert with check (bucket_id = 'site-assets' and auth.role() = 'authenticated');

create policy "authenticated update site-assets" on storage.objects
for update using (bucket_id = 'site-assets' and auth.role() = 'authenticated');
