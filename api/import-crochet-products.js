import { createClient } from '@supabase/supabase-js'

const getBearerToken = request => {
  const header = request.headers.authorization || ''
  return header.startsWith('Bearer ') ? header.slice(7) : ''
}

const products = [
  ['choce.png', 'Sousplat Preto com Dourado', 189.90, 'sousplats', ['preto', 'dourado']],
  ['foto_2.jpeg', 'Peca Artesanal Folhagem', 349.90, 'croches-artesanais', ['cru', 'terracota']],
  ['foto_3.jpeg', 'Croche Fases da Lua', 299.90, 'croches-artesanais', ['cru', 'dourado']],
  ['foto_4.jpeg', 'Croche Formas Organicas', 349.90, 'croches-artesanais', ['cru', 'terracota']],
  ['foto_5.jpeg', 'Croche Sol Nascente', 329.90, 'croches-artesanais', ['cru', 'terracota']],
  ['foto_6.jpeg', 'Croche Vaso do Afeto', 249.90, 'croches-artesanais', ['cru', 'terracota']],
  ['foto_7.jpeg', 'Peca Artesanal Textura Natural', 179.90, 'croches-artesanais', ['cru']],
  ['foto_8.jpeg', 'Croche Decorativo Autoral', 219.90, 'croches-artesanais', ['cru', 'terracota']],
  ['foto_9.jpeg', 'Croche Afeto da Casa', 199.90, 'croches-artesanais', ['cru']],
  ['foto_10.jpeg', 'Peca Artesanal Flor Serena', 159.90, 'croches-artesanais', ['cru', 'terracota']],
  ['foto_11.jpeg', 'Croche Mesa Posta', 189.90, 'sousplats', ['cru']],
  ['foto_12.jpeg', 'Peca Artesanal Aconchego', 169.90, 'croches-artesanais', ['cru']],
  ['foto_13.jpeg', 'Croche Detalhe Natural', 149.90, 'croches-artesanais', ['cru', 'terracota']],
  ['hero-crochet.png', 'Croche Decorativo do Lar', 329.90, 'decoracao', ['cru', 'terracota']],
]

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    response.status(500).json({ error: 'Configure VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no Vercel.' })
    return
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const token = getBearerToken(request)
  if (!token) {
    response.status(401).json({ error: 'Sessao de administrador obrigatoria.' })
    return
  }

  const { data: authData, error: authError } = await admin.auth.getUser(token)
  if (authError || !authData.user) {
    response.status(401).json({ error: 'Sessao invalida ou expirada.' })
    return
  }

  const { data: requester, error: requesterError } = await admin
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .maybeSingle()

  if (requesterError || requester?.role !== 'Administrador') {
    response.status(403).json({ error: 'Apenas administradores podem importar produtos.' })
    return
  }

  const categories = [
    { name: 'Croches artesanais', slug: 'croches-artesanais', active: true },
    { name: 'Sousplats', slug: 'sousplats', active: true },
    { name: 'Decoracao', slug: 'decoracao', active: true },
  ]
  const styles = [
    { name: 'Artesanal', slug: 'artesanal', active: true },
    { name: 'Mesa posta', slug: 'mesa-posta', active: true },
    { name: 'Decorativo', slug: 'decorativo', active: true },
  ]
  const colors = [
    { name: 'Cru', slug: 'cru', hex: '#f7eadc', active: true },
    { name: 'Preto', slug: 'preto', hex: '#17120f', active: true },
    { name: 'Dourado', slug: 'dourado', hex: '#c89754', active: true },
    { name: 'Terracota', slug: 'terracota', hex: '#c96c55', active: true },
  ]

  const importedIds = products.map((_, index) => 1001 + index)
  const rows = products.map(([file, name, price, category, color], index) => ({
    id: 1001 + index,
    name,
    price,
    image: `/crochet/${file}`,
    images: [`/crochet/${file}`],
    category,
    style: ['artesanal'],
    color,
    is_new: true,
    is_bestseller: index < 5,
    discount_percent: 0,
    rating: 5,
    rating_count: 0,
    collection_id: 1001,
    sell_individually: true,
    description: 'Peca de croche artesanal cadastrada a partir das imagens reais do site.',
    in_game_images: [],
    specs: [
      { label: 'Producao', value: 'Feita a mao' },
      { label: 'Atendimento', value: 'Pelo WhatsApp' },
      { label: 'Entrega', value: 'Lorena e regiao' },
    ],
    created_at: new Date(Date.UTC(2026, 4, 9, 12, index)).toISOString(),
  }))

  const operations = [
    admin.from('product_categories').upsert(categories, { onConflict: 'slug' }),
    admin.from('product_styles').upsert(styles, { onConflict: 'slug' }),
    admin.from('product_colors').upsert(colors, { onConflict: 'slug' }),
    admin.from('collections').upsert({
      id: 1001,
      name: 'Croches Artesanais',
      subtitle: 'Todas as pecas reais cadastradas a partir das imagens do site.',
      image: '/crochet/choce.png',
      color: '#df745c',
      price: 149.90,
      discount_percent: 0,
      active: true,
      product_ids: importedIds,
      created_at: '2026-05-09T12:00:00.000Z',
    }, { onConflict: 'id' }),
    admin.from('products').upsert(rows, { onConflict: 'id' }),
  ]

  for (const operation of operations) {
    const { error } = await operation
    if (error) {
      response.status(400).json({ error: error.message })
      return
    }
  }

  const { data: testUsers } = await admin.auth.admin.listUsers()
  const testUser = testUsers?.users?.find(user => user.email === 'teste-import-check@example.com')
  if (testUser) await admin.auth.admin.deleteUser(testUser.id)

  const { count, error: countError } = await admin
    .from('products')
    .select('id', { count: 'exact', head: true })
    .in('id', importedIds)

  if (countError) {
    response.status(400).json({ error: countError.message })
    return
  }

  response.status(200).json({
    imported: count,
    ids: importedIds,
    images: rows.map(product => product.image),
  })
}
