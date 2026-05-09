-- Libera leitura publica dos dados reais que o site precisa exibir.
-- Rode no SQL Editor do Supabase conectado ao projeto usado pelo Vercel.

alter table public.products enable row level security;
alter table public.collections enable row level security;
alter table public.product_categories enable row level security;
alter table public.product_styles enable row level security;
alter table public.product_colors enable row level security;
alter table public.banners enable row level security;
alter table public.feedbacks enable row level security;
alter table public.site_settings enable row level security;
alter table public.help_topics enable row level security;

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products"
on public.products for select
using (true);

drop policy if exists "Public can read active collections" on public.collections;
create policy "Public can read active collections"
on public.collections for select
using (coalesce(active, true) = true);

drop policy if exists "Public can read categories" on public.product_categories;
create policy "Public can read categories"
on public.product_categories for select
using (active = true);

drop policy if exists "Public can read styles" on public.product_styles;
create policy "Public can read styles"
on public.product_styles for select
using (active = true);

drop policy if exists "Public can read colors" on public.product_colors;
create policy "Public can read colors"
on public.product_colors for select
using (active = true);

drop policy if exists "Public can read active banners" on public.banners;
create policy "Public can read active banners"
on public.banners for select
using (active = true);

drop policy if exists "Feedbacks public read approved" on public.feedbacks;
create policy "Feedbacks public read approved"
on public.feedbacks for select
using (approved = true);

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings for select
using (true);

drop policy if exists "Public can read help topics" on public.help_topics;
create policy "Public can read help topics"
on public.help_topics for select
using (active = true);
