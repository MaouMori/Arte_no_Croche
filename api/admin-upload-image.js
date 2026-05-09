import { createClient } from '@supabase/supabase-js'

const getBearerToken = request => {
  const header = request.headers.authorization || ''
  return header.startsWith('Bearer ') ? header.slice(7) : ''
}

const sanitizeSegment = value =>
  String(value || 'uploads')
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'uploads'

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    response.status(500).json({ error: 'Configure SUPABASE_SERVICE_ROLE_KEY no Vercel para enviar imagens.' })
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
    response.status(403).json({ error: 'Apenas administradores podem enviar imagens.' })
    return
  }

  const { fileBase64, fileName, contentType, path } = request.body || {}
  if (!fileBase64 || !fileName || !contentType) {
    response.status(400).json({ error: 'Imagem invalida.' })
    return
  }

  const extension = String(fileName).split('.').pop()?.toLowerCase() || 'jpg'
  const filePath = `${sanitizeSegment(path)}/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`
  const buffer = Buffer.from(fileBase64, 'base64')

  const { error: uploadError } = await admin.storage
    .from('images')
    .upload(filePath, buffer, {
      contentType,
      upsert: false,
    })

  if (uploadError) {
    response.status(400).json({ error: uploadError.message })
    return
  }

  const { data } = admin.storage.from('images').getPublicUrl(filePath)
  response.status(200).json({ url: data.publicUrl, path: filePath })
}
