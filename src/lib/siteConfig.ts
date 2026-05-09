import { useCallback, useEffect, useState } from 'react'
import { supabase } from './supabase'
import { setWhatsAppSettings, WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_NUMBER } from './whatsapp'

const isSupabaseConfigured = () => {
  return !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
}

export const DEFAULT_DISCORD_URL = 'https://discord.gg/quanticstore'
export const DEFAULT_WHATSAPP_NUMBER = WHATSAPP_NUMBER
export const DEFAULT_WHATSAPP_MESSAGE = WHATSAPP_DEFAULT_MESSAGE

export const DEFAULT_HELP_TOPICS = [
  {
    id: 'faq',
    title: 'Perguntas Frequentes',
    answer: 'Aqui voce encontra respostas para as principais duvidas sobre produtos, pedidos, entrega e suporte.',
    sortOrder: 1,
    active: true,
  },
  {
    id: 'como-comprar',
    title: 'Como comprar',
    answer: 'Escolha a peca desejada e clique em comprar pelo WhatsApp. O atendimento, combinados de entrega e pagamento acontecem por la.',
    sortOrder: 2,
    active: true,
  },
  {
    id: 'trocas-devolucoes',
    title: 'Trocas e Devolucoes',
    answer: 'Como as pecas sao artesanais, trocas e ajustes sao avaliados pelo atendimento de acordo com cada caso.',
    sortOrder: 3,
    active: true,
  },
  {
    id: 'fale-conosco',
    title: 'Fale Conosco',
    answer: 'O atendimento acontece pelo WhatsApp oficial da loja. Chame a gente para tirar duvidas, combinar entrega e fazer seu pedido.',
    sortOrder: 4,
    active: true,
  },
]

export type HelpTopic = {
  id: string
  title: string
  answer: string
  sortOrder: number
  active: boolean
}

export const slugifyHelpTitle = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export function useDiscordUrl() {
  const [discordUrl, setDiscordUrl] = useState(DEFAULT_DISCORD_URL)

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured()) return

    try {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'discord_url')
        .maybeSingle<{ value: string }>()
      setDiscordUrl(data?.value || DEFAULT_DISCORD_URL)
    } catch (error) {
      console.warn('Nao foi possivel carregar o link do Discord.', error)
      setDiscordUrl(DEFAULT_DISCORD_URL)
    }
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured()) return

    const timeoutId = window.setTimeout(() => {
      void refresh()
    }, 0)

    const intervalId = window.setInterval(() => {
      if (!document.hidden) void refresh()
    }, 15000)

    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [refresh])

  return discordUrl
}

export function useSiteSettingsLoader() {
  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured()) return

    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key,value')
        .in('key', ['whatsapp_number', 'whatsapp_message'])

      if (error || !data) return

      const settings = Object.fromEntries(data.map(item => [item.key, item.value]))
      setWhatsAppSettings(settings.whatsapp_number, settings.whatsapp_message)
    } catch (error) {
      console.warn('Nao foi possivel carregar configuracoes globais do site.', error)
    }
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured()) return
    const timeoutId = window.setTimeout(() => void refresh(), 0)
    const intervalId = window.setInterval(() => {
      if (!document.hidden) void refresh()
    }, 15000)

    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [refresh])
}

export function useHelpTopics() {
  const [topics, setTopics] = useState<HelpTopic[]>(DEFAULT_HELP_TOPICS)
  const [loading, setLoading] = useState(isSupabaseConfigured())

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setTopics(DEFAULT_HELP_TOPICS)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('help_topics')
        .select('id,title,answer,sort_order,active')
        .order('sort_order', { ascending: true })

      if (!error && data && data.length > 0) {
        setTopics(data.map((topic, index) => ({
          id: topic.id || `topico-${index + 1}`,
          title: topic.title || 'Ajuda',
          answer: topic.answer || '',
          sortOrder: topic.sort_order ?? index + 1,
          active: topic.active ?? true,
        })))
      }
    } catch (error) {
      console.warn('Nao foi possivel carregar os topicos de ajuda.', error)
      setTopics(DEFAULT_HELP_TOPICS)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured()) return

    const timeoutId = window.setTimeout(() => {
      void refresh()
    }, 0)

    const intervalId = window.setInterval(() => {
      if (!document.hidden) void refresh()
    }, 15000)

    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [refresh])

  return { topics, loading, refresh }
}
