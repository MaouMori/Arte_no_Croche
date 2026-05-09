-- Reparo rapido para acesso ao painel admin e permissoes de escrita.
-- Rode no Supabase SQL Editor depois de trocar o email se necessario.

create extension if not exists pgcrypto;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and (
        role = 'Administrador'
        or permissions @> array['all']::text[]
        or permissions @> array['*']::text[]
      )
  );
$$;

-- Promove a conta principal para admin.
update public.profiles
set
  role = 'Administrador',
  role_color = '#df745c',
  permissions = array['all']
where lower(email) = 'maou@gmail.com';

-- Caso o usuario exista no Auth mas ainda nao exista em profiles.
insert into public.profiles (id, name, email, avatar, role, role_color, permissions)
select
  users.id,
  coalesce(
    nullif(users.raw_user_meta_data->>'name', ''),
    split_part(coalesce(users.email, ''), '@', 1),
    'maou'
  ),
  coalesce(users.email, ''),
  '/avatars/default.jpg',
  'Administrador',
  '#df745c',
  array['all']
from auth.users
where lower(users.email) = 'maou@gmail.com'
on conflict (id) do update set
  role = 'Administrador',
  role_color = '#df745c',
  permissions = array['all'];

-- Garante que as configuracoes globais existam.
insert into public.site_settings (key, value)
values
  ('whatsapp_number', '5512991234567'),
  ('whatsapp_message', 'Ola! Vim pelo site Arte no Croche e quero fazer um pedido.'),
  ('discord_url', 'https://discord.gg/quanticstore')
on conflict (key) do nothing;
