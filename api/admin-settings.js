import { createClient } from '@supabase/supabase-js'

const getBearerToken = request => {
  const header = request.headers.authorization || ''
  return header.startsWith('Bearer ') ? header.slice(7) : ''
}

const normalizeWhatsAppNumber = value => String(value || '').replace(/\D/g, '')

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    response.status(500).json({ error: 'Configure SUPABASE_SERVICE_ROLE_KEY no Vercel para salvar configuracoes.' })
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
    response.status(403).json({ error: 'Apenas administradores podem salvar configuracoes.' })
    return
  }

  const whatsappNumber = normalizeWhatsAppNumber(request.body?.whatsappNumber)
  const whatsappMessage = String(request.body?.whatsappMessage || '').trim()
  const extraLinkUrl = String(request.body?.extraLinkUrl || '').trim()

  if (!whatsappNumber) {
    response.status(400).json({ error: 'Informe o numero do WhatsApp com DDD.' })
    return
  }

  const updatedAt = new Date().toISOString()
  const { error } = await admin.from('site_settings').upsert([
    {
      key: 'extra_link_url',
      value: extraLinkUrl,
      updated_at: updatedAt,
    },
    {
      key: 'whatsapp_number',
      value: whatsappNumber,
      updated_at: updatedAt,
    },
    {
      key: 'whatsapp_message',
      value: whatsappMessage,
      updated_at: updatedAt,
    },
  ], { onConflict: 'key' })

  if (error) {
    response.status(400).json({ error: error.message })
    return
  }

  response.status(200).json({
    whatsappNumber,
    whatsappMessage,
    extraLinkUrl,
  })
}
