/*
  # Auto-confirm admin auth users

  This removes the email-confirmation friction for admin accounts created by super admin.
  - Existing admin auth users are marked confirmed
  - New auth users are auto-confirmed if their email exists in public.admin_users
*/

create or replace function public.auto_confirm_admin_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if exists (
    select 1
    from public.admin_users au
    where lower(au.email) = lower(new.email)
      and au.is_active = true
  ) then
    update auth.users
    set email_confirmed_at = coalesce(email_confirmed_at, now()),
        updated_at = now()
    where id = new.id;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_auto_confirm_admin_auth_user on auth.users;

create trigger trg_auto_confirm_admin_auth_user
after insert on auth.users
for each row
execute function public.auto_confirm_admin_auth_user();

update auth.users u
set email_confirmed_at = coalesce(u.email_confirmed_at, now()),
    updated_at = now()
where lower(u.email) in (
  select lower(au.email)
  from public.admin_users au
  where au.is_active = true
);
