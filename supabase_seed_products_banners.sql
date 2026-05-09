-- Seed enxuto para levar os produtos e banners padrao do site para o Supabase.
-- Rode no Supabase SQL Editor. Nao apaga dados: cria ou atualiza pelo id/slug.

create extension if not exists pgcrypto;

insert into public.product_categories (name, slug, active)
values
  ('Tapecarias', 'tapecarias', true),
  ('Quadros', 'quadros', true),
  ('Almofadas', 'almofadas', true),
  ('Acessorios', 'acessorios', true)
on conflict (slug) do update set
  name = excluded.name,
  active = excluded.active;

insert into public.product_styles (name, slug, active)
values
  ('Boho', 'boho', true),
  ('Minimalista', 'minimalista', true),
  ('Botanico', 'botanico', true),
  ('Organico', 'organico', true),
  ('Afetivo', 'afetivo', true)
on conflict (slug) do update set
  name = excluded.name,
  active = excluded.active;

insert into public.product_colors (name, slug, hex, active)
values
  ('Cru', 'cru', '#f7eadc', true),
  ('Terracota', 'terracota', '#c96c55', true),
  ('Rose', 'rose', '#e6a394', true),
  ('Verde', 'verde', '#75815f', true),
  ('Madeira', 'madeira', '#a8754b', true),
  ('Dourado', 'dourado', '#c89754', true)
on conflict (slug) do update set
  name = excluded.name,
  hex = excluded.hex,
  active = excluded.active;

insert into public.collections (id, name, subtitle, image, color, price, discount_percent, active, product_ids, created_at)
values
  (1, 'Tapecarias Autorais', 'Pecas de parede feitas a mao para dar alma ao ambiente.', '/crochet/foto_2.jpeg', '#df745c', 299.90, 0, true, array[1,2,8,11], '2026-05-01T10:00:00.000Z'),
  (2, 'Tons da Terra', 'Texturas em cru, rose, verde e terracota para uma casa acolhedora.', '/crochet/foto_5.jpeg', '#9f7e56', 329.90, 0, true, array[3,4,10,12], '2026-05-02T10:00:00.000Z'),
  (3, 'Afetos da Casa', 'Quadros, almofadas e detalhes para presentear ou morar melhor.', '/crochet/foto_7.jpeg', '#75815f', 159.90, 0, true, array[5,6,7,9], '2026-05-03T10:00:00.000Z')
on conflict (id) do update set
  name = excluded.name,
  subtitle = excluded.subtitle,
  image = excluded.image,
  color = excluded.color,
  price = excluded.price,
  discount_percent = excluded.discount_percent,
  active = excluded.active,
  product_ids = excluded.product_ids,
  created_at = excluded.created_at;

select setval(pg_get_serial_sequence('public.collections', 'id'), greatest((select max(id) from public.collections), 1), true);

insert into public.products (
  id, name, price, image, images, category, style, color, is_new, is_bestseller,
  discount_percent, rating, rating_count, collection_id, sell_individually,
  description, in_game_images, specs, created_at
)
values
  (
    1,
    'Folhagem Encanto',
    349.90,
    '/crochet/foto_2.jpeg',
    array['/crochet/foto_2.jpeg', '/crochet/foto_3.jpeg'],
    'tapecarias',
    array['botanico', 'boho'],
    array['cru', 'verde', 'terracota'],
    true,
    true,
    0,
    5,
    18,
    1,
    true,
    'Tapecaria artesanal em croche com desenho botanico, feita para transformar paredes com delicadeza.',
    array[]::text[],
    '[{"label":"Material","value":"Fio de algodao"},{"label":"Producao","value":"Feita a mao"},{"label":"Entrega","value":"Lorena e regiao"}]'::jsonb,
    '2026-05-01T10:00:00.000Z'
  ),
  (
    2,
    'Fases da Lua',
    299.90,
    '/crochet/foto_3.jpeg',
    array['/crochet/foto_3.jpeg', '/crochet/foto_4.jpeg'],
    'tapecarias',
    array['minimalista', 'boho'],
    array['cru', 'dourado'],
    true,
    true,
    0,
    5,
    12,
    1,
    true,
    'Peca de parede com acabamento manual para um ambiente calmo, acolhedor e cheio de personalidade.',
    array[]::text[],
    '[{"label":"Material","value":"Algodao natural"},{"label":"Prazo","value":"Sob encomenda"},{"label":"Atendimento","value":"Pelo WhatsApp"}]'::jsonb,
    '2026-05-02T10:00:00.000Z'
  ),
  (
    3,
    'Formas Organicas',
    349.90,
    '/crochet/foto_4.jpeg',
    array['/crochet/foto_4.jpeg', '/crochet/foto_5.jpeg'],
    'tapecarias',
    array['organico', 'afetivo'],
    array['cru', 'rose', 'verde'],
    true,
    true,
    0,
    5,
    21,
    2,
    true,
    'Tapecaria em tons suaves, pensada para quartos, salas e espacos de descanso.',
    array[]::text[],
    '[{"label":"Material","value":"Algodao premium"},{"label":"Cuidados","value":"Limpeza delicada"},{"label":"Producao","value":"Manual"}]'::jsonb,
    '2026-05-03T10:00:00.000Z'
  ),
  (
    4,
    'Sol Nascente',
    329.90,
    '/crochet/foto_5.jpeg',
    array['/crochet/foto_5.jpeg', '/crochet/foto_6.jpeg'],
    'tapecarias',
    array['boho', 'minimalista'],
    array['cru', 'terracota'],
    true,
    false,
    0,
    5,
    9,
    2,
    true,
    'Peca com visual solar e textura aconchegante para trazer calor visual ao ambiente.',
    array[]::text[],
    '[{"label":"Material","value":"Fio de algodao"},{"label":"Instalacao","value":"Pronta para pendurar"},{"label":"Entrega","value":"Entrega local"}]'::jsonb,
    '2026-05-04T10:00:00.000Z'
  ),
  (
    5,
    'Vaso de Afeto',
    249.90,
    '/crochet/foto_6.jpeg',
    array['/crochet/foto_6.jpeg', '/crochet/foto_7.jpeg'],
    'quadros',
    array['botanico', 'afetivo'],
    array['cru', 'verde', 'terracota'],
    false,
    true,
    0,
    5,
    16,
    3,
    true,
    'Quadro em croche com toque afetivo para decorar com leveza e carinho.',
    array[]::text[],
    '[{"label":"Material","value":"Algodao e bastidor"},{"label":"Acabamento","value":"Artesanal"},{"label":"Entrega","value":"Local personalizada"}]'::jsonb,
    '2026-05-05T10:00:00.000Z'
  ),
  (
    6,
    'Almofada Jardim',
    159.90,
    '/crochet/foto_7.jpeg',
    array['/crochet/foto_7.jpeg', '/crochet/foto_8.jpeg'],
    'almofadas',
    array['botanico', 'boho'],
    array['cru', 'verde'],
    true,
    false,
    0,
    5,
    7,
    3,
    true,
    'Almofada de croche com textura alta e toque artesanal para sofa, cama ou poltrona.',
    array[]::text[],
    '[{"label":"Material","value":"Capa em algodao"},{"label":"Enchimento","value":"Macio e confortavel"},{"label":"Producao","value":"Feita a mao"}]'::jsonb,
    '2026-05-06T10:00:00.000Z'
  ),
  (
    7,
    'Trama Aconchego',
    189.90,
    '/crochet/foto_8.jpeg',
    array['/crochet/foto_8.jpeg'],
    'almofadas',
    array['minimalista', 'afetivo'],
    array['cru', 'rose'],
    true,
    true,
    0,
    5,
    11,
    3,
    true,
    'Peca macia e decorativa para completar cantinhos de descanso com textura artesanal.',
    array[]::text[],
    '[{"label":"Material","value":"Fio macio"},{"label":"Uso","value":"Decorativo"},{"label":"Atendimento","value":"Pelo WhatsApp"}]'::jsonb,
    '2026-05-07T10:00:00.000Z'
  ),
  (
    8,
    'Jardim Suspenso',
    279.90,
    '/crochet/foto_9.jpeg',
    array['/crochet/foto_9.jpeg'],
    'tapecarias',
    array['botanico', 'organico'],
    array['verde', 'cru', 'madeira'],
    false,
    true,
    0,
    5,
    14,
    1,
    true,
    'Decoracao de parede com inspiracao botanica para deixar o ambiente mais vivo.',
    array[]::text[],
    '[{"label":"Material","value":"Algodao"},{"label":"Acabamento","value":"Com detalhes manuais"},{"label":"Entrega","value":"Lorena e regiao"}]'::jsonb,
    '2026-05-08T10:00:00.000Z'
  ),
  (
    9,
    'Lares de Algodao',
    219.90,
    '/crochet/foto_10.jpeg',
    array['/crochet/foto_10.jpeg'],
    'acessorios',
    array['boho', 'afetivo'],
    array['cru', 'madeira'],
    true,
    false,
    0,
    5,
    6,
    3,
    true,
    'Detalhe artesanal para compor mesas, aparadores e cantinhos especiais da casa.',
    array[]::text[],
    '[{"label":"Material","value":"Algodao"},{"label":"Uso","value":"Decoracao"},{"label":"Producao","value":"Manual"}]'::jsonb,
    '2026-05-09T10:00:00.000Z'
  ),
  (
    10,
    'Flor de Parede',
    269.90,
    '/crochet/foto_11.jpeg',
    array['/crochet/foto_11.jpeg'],
    'quadros',
    array['botanico', 'boho'],
    array['cru', 'rose', 'verde'],
    true,
    true,
    0,
    5,
    13,
    2,
    true,
    'Quadro/tapecaria floral para trazer delicadeza e textura para a parede.',
    array[]::text[],
    '[{"label":"Material","value":"Fio de algodao"},{"label":"Acabamento","value":"Artesanal"},{"label":"Atendimento","value":"Pelo WhatsApp"}]'::jsonb,
    '2026-05-10T10:00:00.000Z'
  ),
  (
    11,
    'Canto Sereno',
    199.90,
    '/crochet/foto_12.jpeg',
    array['/crochet/foto_12.jpeg'],
    'acessorios',
    array['minimalista', 'organico'],
    array['cru', 'dourado'],
    false,
    false,
    0,
    5,
    5,
    1,
    true,
    'Peca artesanal pequena para dar charme a detalhes do ambiente.',
    array[]::text[],
    '[{"label":"Material","value":"Algodao"},{"label":"Uso","value":"Decorativo"},{"label":"Entrega","value":"Local"}]'::jsonb,
    '2026-05-11T10:00:00.000Z'
  ),
  (
    12,
    'Textura do Lar',
    239.90,
    '/crochet/foto_13.jpeg',
    array['/crochet/foto_13.jpeg'],
    'tapecarias',
    array['afetivo', 'boho'],
    array['cru', 'terracota'],
    true,
    false,
    0,
    5,
    8,
    2,
    true,
    'Tapecaria artesanal para deixar a casa mais acolhedora e com identidade propria.',
    array[]::text[],
    '[{"label":"Material","value":"Fio artesanal"},{"label":"Producao","value":"Feita a mao"},{"label":"Entrega","value":"Lorena e regiao"}]'::jsonb,
    '2026-05-12T10:00:00.000Z'
  )
on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  image = excluded.image,
  images = excluded.images,
  category = excluded.category,
  style = excluded.style,
  color = excluded.color,
  is_new = excluded.is_new,
  is_bestseller = excluded.is_bestseller,
  discount_percent = excluded.discount_percent,
  rating = excluded.rating,
  rating_count = excluded.rating_count,
  collection_id = excluded.collection_id,
  sell_individually = excluded.sell_individually,
  description = excluded.description,
  in_game_images = excluded.in_game_images,
  specs = excluded.specs,
  created_at = excluded.created_at;

insert into public.banners (id, title, image, link, position, active, created_at)
values
  ('00000000-0000-4000-8000-000000000101', 'Home - Detalhes que transformam', '/crochet/choce.png', '/', 'home', true, now()),
  ('00000000-0000-4000-8000-000000000102', 'Loja - Arte no Croche', '/crochet/hero-crochet.png', '/loja', 'loja', true, now()),
  ('00000000-0000-4000-8000-000000000103', 'Colecoes - Pecas autorais', '/crochet/foto_2.jpeg', '/colecoes', 'colecoes', true, now())
on conflict (id) do update set
  title = excluded.title,
  image = excluded.image,
  link = excluded.link,
  position = excluded.position,
  active = excluded.active;

insert into public.site_settings (key, value)
values
  ('whatsapp_number', '5512991234567'),
  ('whatsapp_message', 'Ola! Vim pelo site Arte no Croche e quero fazer um pedido.')
on conflict (key) do nothing;
