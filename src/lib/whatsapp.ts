import type { Product } from '../data/storeData'

// Troque este numero uma vez e todos os botoes do site usam o novo WhatsApp.
// Formato: codigo do pais + DDD + numero, somente numeros.
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5512991234567'

export const WHATSAPP_DEFAULT_MESSAGE =
  import.meta.env.VITE_WHATSAPP_MESSAGE ||
  'Ola! Vim pelo site Arte no Croche e quero fazer um pedido.'

export const WHATSAPP_NUMBER_STORAGE_KEY = 'arte-no-croche:whatsapp_number'
export const WHATSAPP_MESSAGE_STORAGE_KEY = 'arte-no-croche:whatsapp_message'

export const normalizeWhatsAppNumber = (value: string) => value.replace(/\D/g, '')

export function setWhatsAppSettings(number?: string | null, message?: string | null) {
  if (typeof window === 'undefined') return
  if (number) window.localStorage.setItem(WHATSAPP_NUMBER_STORAGE_KEY, normalizeWhatsAppNumber(number))
  if (message) window.localStorage.setItem(WHATSAPP_MESSAGE_STORAGE_KEY, message)
}

function getCurrentWhatsAppNumber() {
  if (typeof window === 'undefined') return normalizeWhatsAppNumber(WHATSAPP_NUMBER)
  return normalizeWhatsAppNumber(window.localStorage.getItem(WHATSAPP_NUMBER_STORAGE_KEY) || WHATSAPP_NUMBER)
}

function getCurrentWhatsAppMessage() {
  if (typeof window === 'undefined') return WHATSAPP_DEFAULT_MESSAGE
  return window.localStorage.getItem(WHATSAPP_MESSAGE_STORAGE_KEY) || WHATSAPP_DEFAULT_MESSAGE
}

type WhatsAppProduct = Pick<Product, 'name' | 'price'> & {
  finalPrice?: number
  quantity?: number
}

export function getWhatsAppUrl(product?: WhatsAppProduct) {
  const message = product
    ? [
        'Ola! Vim pelo site Arte no Croche e tenho interesse nesta peca:',
        `Produto: ${product.name}`,
        `Valor: R$ ${(product.finalPrice ?? product.price).toFixed(2).replace('.', ',')}`,
        product.quantity && product.quantity > 1 ? `Quantidade: ${product.quantity}` : '',
      ].filter(Boolean).join('\n')
    : getCurrentWhatsAppMessage()

  return `https://wa.me/${getCurrentWhatsAppNumber()}?text=${encodeURIComponent(message)}`
}
