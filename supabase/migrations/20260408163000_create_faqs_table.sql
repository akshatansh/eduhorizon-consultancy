-- Create FAQs table for EduHorizon
-- This allows admins to manage frequently asked questions

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  position integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create index for ordering FAQs
create index if not exists idx_faqs_position on public.faqs(position);
create index if not exists idx_faqs_category on public.faqs(category);
create index if not exists idx_faqs_published on public.faqs(published);

-- Enable RLS
alter table public.faqs enable row level security;

-- Allow public to read published FAQs
create policy "Public can read published FAQs"
  on public.faqs
  for select
  to anon, authenticated
  using (published = true);

-- Allow admins to manage all FAQs
create policy "Admins can manage FAQs"
  on public.faqs
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Add updated_at trigger
do $$
begin
  if not exists (
    select 1 from pg_trigger where tgname = 'trg_faqs_updated_at'
  ) then
    create trigger trg_faqs_updated_at
    before update on public.faqs
    for each row
    execute function public.set_updated_at();
  end if;
end $$;