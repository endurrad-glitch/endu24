-- endu24 SaaS CMS foundation
create extension if not exists "pgcrypto";

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  site_name text not null default 'endu24.com',
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  url text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_settings_updated_at on public.settings;
create trigger trg_settings_updated_at
before update on public.settings
for each row execute function public.set_updated_at();

drop trigger if exists trg_menu_items_updated_at on public.menu_items;
create trigger trg_menu_items_updated_at
before update on public.menu_items
for each row execute function public.set_updated_at();

insert into public.settings (site_name)
select 'endu24.com'
where not exists (select 1 from public.settings);

-- RLS
alter table public.settings enable row level security;
alter table public.menu_items enable row level security;

-- Public read policies
create policy if not exists "public_read_settings"
on public.settings for select
to anon, authenticated
using (true);

create policy if not exists "public_read_active_menu"
on public.menu_items for select
to anon, authenticated
using (is_active = true or auth.role() = 'authenticated');

-- Admin write policies (authenticated users)
create policy if not exists "admin_write_settings"
on public.settings for all
to authenticated
using (true)
with check (true);

create policy if not exists "admin_write_menu"
on public.menu_items for all
to authenticated
using (true)
with check (true);

-- Storage
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

create policy if not exists "public_read_site_assets"
on storage.objects for select
to public
using (bucket_id = 'site-assets');

create policy if not exists "admin_upload_site_assets"
on storage.objects for insert
to authenticated
with check (bucket_id = 'site-assets');

create policy if not exists "admin_update_site_assets"
on storage.objects for update
to authenticated
using (bucket_id = 'site-assets')
with check (bucket_id = 'site-assets');

create policy if not exists "admin_delete_site_assets"
on storage.objects for delete
to authenticated
using (bucket_id = 'site-assets');
