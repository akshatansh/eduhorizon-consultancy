/*
  # CMS: Blogs + Colleges (admin-managed)

  Creates:
  - blog_posts
  - colleges
  - storage buckets: blog-images, college-images

  Permissions:
  - Public can read published blog posts + all colleges
  - Admins (public.is_admin()) can full CRUD + upload images
*/

create extension if not exists pgcrypto;

-- Admin helper (safe even if already exists)
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant execute on function public.is_admin() to authenticated;

-- BLOG POSTS
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content_html text not null,
  cover_image_url text,
  category text,
  tags text[] not null default '{}',
  author_name text,
  author_role text,
  author_avatar_url text,
  read_time text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
begin
  if not exists (
    select 1 from pg_trigger where tgname = 'trg_blog_posts_updated_at'
  ) then
    create trigger trg_blog_posts_updated_at
    before update on public.blog_posts
    for each row
    execute function public.set_updated_at();
  end if;
end $$;

alter table public.blog_posts enable row level security;

drop policy if exists "Public can read published blog_posts" on public.blog_posts;
create policy "Public can read published blog_posts"
  on public.blog_posts
  for select
  to anon, authenticated
  using (published = true);

drop policy if exists "Admins can manage blog_posts" on public.blog_posts;
create policy "Admins can manage blog_posts"
  on public.blog_posts
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- COLLEGES
create table if not exists public.colleges (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  location text not null,
  courses text[] not null default '{}',
  images text[] not null default '{}',
  description text,
  fees text,
  website text,
  established text,
  ranking text,
  facilities text[] not null default '{}',
  highlights text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
begin
  if not exists (
    select 1 from pg_trigger where tgname = 'trg_colleges_updated_at'
  ) then
    create trigger trg_colleges_updated_at
    before update on public.colleges
    for each row
    execute function public.set_updated_at();
  end if;
end $$;

alter table public.colleges enable row level security;

drop policy if exists "Public can read colleges" on public.colleges;
create policy "Public can read colleges"
  on public.colleges
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can manage colleges" on public.colleges;
create policy "Admins can manage colleges"
  on public.colleges
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- STORAGE BUCKETS
do $$
begin
  if not exists (select 1 from storage.buckets where id = 'blog-images') then
    insert into storage.buckets (id, name, public)
    values ('blog-images', 'blog-images', true);
  end if;
  if not exists (select 1 from storage.buckets where id = 'college-images') then
    insert into storage.buckets (id, name, public)
    values ('college-images', 'college-images', true);
  end if;
end $$;

-- Storage RLS policies
-- NOTE:
-- Some hosted projects restrict SQL ownership changes on storage.objects.
-- If you see ownership errors, configure Storage policies from Dashboard:
-- Storage -> Policies for buckets `blog-images` and `college-images`.
