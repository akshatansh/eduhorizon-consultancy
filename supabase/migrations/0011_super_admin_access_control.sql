/*
  # Super Admin access control

  - Adds is_active support on admin_users
  - Adds helper function is_super_admin()
  - Restricts admin_users management to super admins only
  - Updates authenticate_admin to deny inactive admins
*/

create extension if not exists pgcrypto;

alter table public.admin_users
  add column if not exists is_active boolean not null default true;

create or replace function public.is_super_admin()
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
      and role::text = 'super_admin'
      and is_active = true
  );
$$;

grant execute on function public.is_super_admin() to authenticated;

-- Ensure base admin check also respects active status
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
      and is_active = true
  );
$$;

grant execute on function public.is_admin() to authenticated;

create or replace function public.create_admin_user(
  p_email text,
  p_password text,
  p_role text default 'admin'
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  has_admin_role_type boolean;
begin
  if not public.is_super_admin() then
    raise exception 'Only super admin can create admin users';
  end if;

  if p_role not in ('admin', 'super_admin', 'editor') then
    raise exception 'Invalid role. Allowed: admin, super_admin, editor';
  end if;

  select exists (
    select 1 from pg_type where typname = 'admin_role'
  ) into has_admin_role_type;

  if has_admin_role_type then
    execute '
      insert into public.admin_users (email, password_hash, role, is_active)
      values ($1, extensions.crypt($2, extensions.gen_salt(''bf'')), $3::admin_role, true)
      on conflict (email)
      do update set
        password_hash = extensions.crypt($2, extensions.gen_salt(''bf'')),
        role = $3::admin_role,
        is_active = true
      returning id
    '
    into v_id
    using lower(trim(p_email)), p_password, p_role;
  else
    execute '
      insert into public.admin_users (email, password_hash, role, is_active)
      values ($1, extensions.crypt($2, extensions.gen_salt(''bf'')), $3, true)
      on conflict (email)
      do update set
        password_hash = extensions.crypt($2, extensions.gen_salt(''bf'')),
        role = $3,
        is_active = true
      returning id
    '
    into v_id
    using lower(trim(p_email)), p_password, p_role;
  end if;

  return v_id;
end;
$$;

grant execute on function public.create_admin_user(text, text, text) to authenticated;

-- Refresh authenticate_admin to reject inactive admins
drop function if exists authenticate_admin(text, text);

create or replace function authenticate_admin(
  admin_email text,
  admin_password text
) returns json as $$
declare
  admin_user admin_users%rowtype;
  result json;
begin
  select * into admin_user
  from admin_users
  where email = admin_email
    and password_hash = crypt(admin_password, password_hash)
    and is_active = true;

  if admin_user.id is not null then
    update admin_users
    set last_login = now()
    where id = admin_user.id;

    result := json_build_object(
      'success', true,
      'user', json_build_object(
        'id', admin_user.id,
        'email', admin_user.email,
        'role', admin_user.role,
        'is_active', admin_user.is_active
      )
    );
  else
    result := json_build_object(
      'success', false,
      'message', 'Invalid credentials or inactive account'
    );
  end if;

  return result;
end;
$$ language plpgsql security definer;

-- Admin user policies
drop policy if exists "Admins can read all admin users" on public.admin_users;
drop policy if exists "Admins can read all_admin_users" on public.admin_users;
drop policy if exists "Admin can read own admin_users row" on public.admin_users;
drop policy if exists "Admins can read own admin row" on public.admin_users;
drop policy if exists "Admins can read own data" on public.admin_users;
drop policy if exists "Super admins can read all admin users" on public.admin_users;
drop policy if exists "Super admins can manage admin users" on public.admin_users;
drop policy if exists "Super admins can insert admin users" on public.admin_users;
drop policy if exists "Super admins can update admin users" on public.admin_users;
drop policy if exists "Super admins can delete admin users" on public.admin_users;

create policy "Admins can read own admin row"
  on public.admin_users
  for select
  to authenticated
  using (lower(email) = lower(auth.jwt() ->> 'email'));

create policy "Super admins can read all admin users"
  on public.admin_users
  for select
  to authenticated
  using (public.is_super_admin());

create policy "Super admins can insert admin users"
  on public.admin_users
  for insert
  to authenticated
  with check (public.is_super_admin());

create policy "Super admins can update admin users"
  on public.admin_users
  for update
  to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

create policy "Super admins can delete admin users"
  on public.admin_users
  for delete
  to authenticated
  using (public.is_super_admin());
