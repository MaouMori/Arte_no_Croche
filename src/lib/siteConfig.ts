import { useCallback, useEffect, useState } from 'react'
import { supabase } from './supabase'
import { setWhatsAppSettings, WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_NUMBER } from './whatsapp'

const isSupabaseConfigured = () => {
  return !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
}

export const DEFAULT_EXTRA_LINK_URL = 'https://instagram.com/artenocroche'
export const DEFAULT_WHATSAPP_NUMBER = WHATSAPP_NUMBER
export const DEFAULT_WHATSAPP_MESSAGE = WHATSAPP_DEFAULT_MESSAGE

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
  const [topics, setTopics] = useState<HelpTopic[]>([])
  const [loading, setLoading] = useState(isSupabaseConfigured())

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setTopics([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('help_topics')
        .select('id,title,answer,sort_order,active')
        .order('sort_order', { ascending: true })

      if (!error && data) {
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
      setTopics([])
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
