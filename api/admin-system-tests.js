import { createClient } from '@supabase/supabase-js'

const getBearerToken = request => {
  const header = request.headers.authorization || ''
  return header.startsWith('Bearer ') ? header.slice(7) : ''
}

const requireAdmin = async (admin, token) => {
  if (!token) throw new Error('Sessao de administrador obrigatoria.')

  const { data: authData, error: authError } = await admin.auth.getUser(token)
  if (authError || !authData.user) throw new Error('Sessao invalida ou expirada.')

  const { data: requester, error: requesterError } = await admin
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .maybeSingle()

  if (requesterError || requester?.role !== 'Administrador') {
    throw new Error('Apenas administradores podem executar diagnosticos.')
  }

  return authData.user
}

const assertDb = (result, label = 'Operacao') => {
  if (result?.error) throw new Error(`${label}: ${result.error.message}`)
  return result
}

const nowCode = () => Date.now().toString().slice(-8)

const tests = {
  env: {
    title: 'Ambiente Vercel/Supabase',
    description: 'Confere variaveis essenciais do backend.',
    run: async ({ supabaseUrl, serviceRoleKey, anonKey }) => {
      if (!supabaseUrl) throw new Error('VITE_SUPABASE_URL nao configurada.')
      if (!serviceRoleKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY nao configurada.')
      if (!anonKey) throw new Error('VITE_SUPABASE_ANON_KEY nao configurada.')
      return `Ambiente OK: ${new URL(supabaseUrl).host}`
    },
  },
  publicRead: {
    title: 'Leitura publica',
    description: 'Confere se loja publica consegue ler produtos, colecoes e banners.',
    run: async ({ supabaseUrl, anonKey }) => {
      const client = createClient(supabaseUrl, anonKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      })
      const tables = ['products', 'collections', 'product_categories', 'product_styles', 'product_colors', 'banners', 'site_settings']
      const counts = []
      for (const table of tables) {
        const { count, error } = await client.from(table).select('*', { count: 'exact', head: true })
        if (error) throw new Error(`${table}: ${error.message}`)
        counts.push(`${table}: ${count ?? 0}`)
      }
      return counts.join(' | ')
    },
  },
  products: {
    title: 'Produtos',
    description: 'Cria, edita e apaga produto de teste.',
    run: async ({ admin }) => {
      const marker = nowCode()
      const inserted = assertDb(await admin.from('products').insert({
        name: `TESTE PRODUTO ${marker}`,
        price: 1,
        image: '/crochet/choce.png',
        images: ['/crochet/choce.png'],
        category: 'croches-artesanais',
        style: ['artesanal'],
        color: ['cru'],
        is_new: true,
        is_bestseller: false,
        discount_percent: 0,
        rating: 0,
        rating_count: 0,
        stock_quantity: 1,
        sell_individually: true,
        description: 'Produto criado pelo teste automatico do painel.',
        in_game_images: [],
        specs: [],
      }).select('id').single(), 'Criar produto')

      assertDb(await admin.from('products').update({ name: `TESTE PRODUTO OK ${marker}` }).eq('id', inserted.data.id), 'Editar produto')
      assertDb(await admin.from('products').delete().eq('id', inserted.data.id), 'Apagar produto')
      return `Produto ${inserted.data.id} criado, editado e apagado.`
    },
  },
  collections: {
    title: 'Colecoes',
    description: 'Cria, edita e apaga colecao de teste.',
    run: async ({ admin }) => {
      const inserted = assertDb(await admin.from('collections').insert({
        name: `TESTE COLECAO ${nowCode()}`,
        subtitle: 'Colecao criada pelo teste automatico.',
        image: '/crochet/choce.png',
        color: '#df745c',
        price: 1,
        discount_percent: 0,
        active: true,
        product_ids: [],
      }).select('id').single(), 'Criar colecao')

      assertDb(await admin.from('collections').update({ active: false }).eq('id', inserted.data.id), 'Editar colecao')
      assertDb(await admin.from('collections').delete().eq('id', inserted.data.id), 'Apagar colecao')
      return `Colecao ${inserted.data.id} criada, editada e apagada.`
    },
  },
  banners: {
    title: 'Banners',
    description: 'Cria, edita e apaga banner de teste.',
    run: async ({ admin }) => {
      const id = crypto.randomUUID()
      assertDb(await admin.from('banners').insert({
        id,
        title: `TESTE BANNER ${nowCode()}`,
        image: '/crochet/choce.png',
        link: '/loja',
        position: 'loja',
        active: true,
      }), 'Criar banner')
      assertDb(await admin.from('banners').update({ active: false }).eq('id', id), 'Editar banner')
      assertDb(await admin.from('banners').delete().eq('id', id), 'Apagar banner')
      return `Banner ${id} criado, editado e apagado.`
    },
  },
  settings: {
    title: 'Configuracoes',
    description: 'Salva e le configuracoes globais do site.',
    run: async ({ admin }) => {
      const key = 'diagnostic_last_run'
      const value = new Date().toISOString()
      assertDb(await admin.from('site_settings').upsert({ key, value, updated_at: value }, { onConflict: 'key' }), 'Salvar configuracao')
      const read = assertDb(await admin.from('site_settings').select('value').eq('key', key).maybeSingle(), 'Ler configuracao')
      if (read.data?.value !== value) throw new Error('Configuracao salva com valor diferente.')
      return 'Configuracoes salvam e leem corretamente.'
    },
  },
  help: {
    title: 'Ajuda/FAQ',
    description: 'Cria, edita e apaga pergunta de ajuda.',
    run: async ({ admin }) => {
      const id = `teste-${nowCode()}`
      assertDb(await admin.from('help_topics').insert({
        id,
        title: 'Teste automatico',
        answer: 'Resposta de teste.',
        sort_order: 999,
        active: false,
      }), 'Criar ajuda')
      assertDb(await admin.from('help_topics').update({ answer: 'Resposta editada.' }).eq('id', id), 'Editar ajuda')
      assertDb(await admin.from('help_topics').delete().eq('id', id), 'Apagar ajuda')
      return `Topico ${id} criado, editado e apagado.`
    },
  },
  feedbacks: {
    title: 'Depoimentos',
    description: 'Cria, aprova e apaga depoimento de teste.',
    run: async ({ admin }) => {
      const inserted = assertDb(await admin.from('feedbacks').insert({
        name: 'Cliente Teste',
        email: 'cliente.teste@arte.local',
        rating: 5,
        text: 'Depoimento criado pelo teste automatico.',
        approved: false,
      }).select('id').single(), 'Criar depoimento')
      assertDb(await admin.from('feedbacks').update({ approved: true }).eq('id', inserted.data.id), 'Editar depoimento')
      assertDb(await admin.from('feedbacks').delete().eq('id', inserted.data.id), 'Apagar depoimento')
      return `Depoimento ${inserted.data.id} criado, editado e apagado.`
    },
  },
  orders: {
    title: 'Pedidos',
    description: 'Cria, edita e apaga pedido de teste.',
    run: async ({ admin }) => {
      const id = crypto.randomUUID()
      assertDb(await admin.from('orders').insert({
        id,
        customer_name: 'Cliente Teste',
        customer_email: 'cliente.teste@arte.local',
        customer_avatar: '/avatars/default.jpg',
        status: 'em_processamento',
        total: 1,
        items: [{ product_id: 0, name: 'Item Teste', price: 1, quantity: 1 }],
      }), 'Criar pedido')
      assertDb(await admin.from('orders').update({ status: 'pago' }).eq('id', id), 'Editar pedido')
      assertDb(await admin.from('orders').delete().eq('id', id), 'Apagar pedido')
      return `Pedido ${id} criado, editado e apagado.`
    },
  },
  roles: {
    title: 'Cargos',
    description: 'Cria, edita e apaga cargo de teste.',
    run: async ({ admin }) => {
      const id = crypto.randomUUID()
      assertDb(await admin.from('roles').insert({
        id,
        name: `Teste ${nowCode()}`,
        color: '#df745c',
        permissions: ['panel_limited'],
      }), 'Criar cargo')
      assertDb(await admin.from('roles').update({ color: '#9f7e56' }).eq('id', id), 'Editar cargo')
      assertDb(await admin.from('roles').delete().eq('id', id), 'Apagar cargo')
      return `Cargo ${id} criado, editado e apagado.`
    },
  },
  taxonomy: {
    title: 'Categorias/cores/estilos',
    description: 'Testa cadastros auxiliares de produto.',
    run: async ({ admin }) => {
      const suffix = nowCode()
      const category = `teste-cat-${suffix}`
      const style = `teste-estilo-${suffix}`
      const color = `teste-cor-${suffix}`
      assertDb(await admin.from('product_categories').insert({ name: 'Teste Categoria', slug: category, active: false }), 'Criar categoria')
      assertDb(await admin.from('product_styles').insert({ name: 'Teste Estilo', slug: style, active: false }), 'Criar estilo')
      assertDb(await admin.from('product_colors').insert({ name: 'Teste Cor', slug: color, hex: '#df745c', active: false }), 'Criar cor')
      assertDb(await admin.from('product_categories').delete().eq('slug', category), 'Apagar categoria')
      assertDb(await admin.from('product_styles').delete().eq('slug', style), 'Apagar estilo')
      assertDb(await admin.from('product_colors').delete().eq('slug', color), 'Apagar cor')
      return 'Categorias, estilos e cores criam e apagam corretamente.'
    },
  },
  ratings: {
    title: 'Avaliacoes',
    description: 'Confere tabela e funcao rate_product.',
    run: async ({ admin }) => {
      const table = await admin.from('product_ratings').select('*', { count: 'exact', head: true })
      if (table.error) throw new Error(`product_ratings: ${table.error.message}`)
      const rpc = await admin.rpc('rate_product', { p_product_id: -1, p_rating: 5 })
      if (rpc.error && rpc.error.message.toLowerCase().includes('could not find the function')) {
        throw new Error('Funcao rate_product nao existe. Rode supabase_stock_promotions_ratings.sql.')
      }
      return 'Tabela product_ratings existe e funcao rate_product esta registrada.'
    },
  },
  storage: {
    title: 'Upload de imagens',
    description: 'Envia e apaga uma imagem pequena no Storage.',
    run: async ({ admin }) => {
      const path = `diagnostics/test-${nowCode()}.svg`
      const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="#df745c"/></svg>')
      assertDb(await admin.storage.from('images').upload(path, svg, { contentType: 'image/svg+xml' }), 'Enviar imagem')
      const { data } = admin.storage.from('images').getPublicUrl(path)
      if (!data?.publicUrl) throw new Error('Storage nao retornou URL publica.')
      assertDb(await admin.storage.from('images').remove([path]), 'Apagar imagem')
      return 'Upload, URL publica e remocao funcionam.'
    },
  },
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    response.status(500).json({ error: 'Configure VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no Vercel.' })
    return
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  try {
    await requireAdmin(admin, getBearerToken(request))
    const requested = request.body?.test || 'all'
    const keys = requested === 'all' ? Object.keys(tests) : [requested]
    const results = []

    for (const key of keys) {
      const item = tests[key]
      if (!item) {
        results.push({ key, name: key, success: false, message: 'Teste desconhecido.' })
        continue
      }

      try {
        const message = await item.run({ admin, supabaseUrl, serviceRoleKey, anonKey })
        results.push({ key, name: item.title, success: true, message })
      } catch (error) {
        results.push({ key, name: item.title, success: false, message: error.message || 'Teste falhou.' })
      }
    }

    response.status(200).json({ results })
  } catch (error) {
    response.status(403).json({ error: error.message || 'Nao autorizado.' })
  }
}
