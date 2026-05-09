-- Sincroniza usuarios criados no Supabase Auth com a tabela public.profiles.
-- Rode este arquivo no Supabase SQL Editor.

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    name,
    email,
    avatar,
    role,
    role_color,
    permissions
  )
  values (
    new.id,
    coalesce(
      nullif(new.raw_user_meta_data->>'name', ''),
      nullif(new.raw_user_meta_data->>'full_name', ''),
      split_part(coalesce(new.email, ''), '@', 1),
      'Usuario'
    ),
    coalesce(new.email, ''),
    coalesce(nullif(new.raw_user_meta_data->>'avatar_url', ''), '/avatars/default.jpg'),
    'Cliente',
    '#9c8378',
    array[]::text[]
  )
  on conflict (id) do update set
    name = coalesce(nullif(excluded.name, ''), public.profiles.name),
    email = coalesce(nullif(excluded.email, ''), public.profiles.email),
    avatar = coalesce(nullif(excluded.avatar, ''), public.profiles.avatar);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

-- Cria profiles que ja estejam faltando para usuarios existentes no Auth.
insert into public.profiles (
  id,
  name,
  email,
  avatar,
  role,
  role_color,
  permissions
)
select
  users.id,
  coalesce(
    nullif(users.raw_user_meta_data->>'name', ''),
    nullif(users.raw_user_meta_data->>'full_name', ''),
    split_part(coalesce(users.email, ''), '@', 1),
    'Usuario'
  ),
  coalesce(users.email, ''),
  coalesce(nullif(users.raw_user_meta_data->>'avatar_url', ''), '/avatars/default.jpg'),
  'Cliente',
  '#9c8378',
  array[]::text[]
from auth.users
where not exists (
  select 1
  from public.profiles
  where profiles.id = users.id
);
