import type { Product } from '../data/storeData'

// Troque este numero uma vez e todos os botoes do site usam o novo WhatsApp.
// Formato: codigo do pais + DDD + numero, somente numeros.
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5512991234567'

export const WHATSAPP_DEFAULT_MESSAGE =
  import.meta.env.VITE_WHATSAPP_MESSAGE ||
  'Ola! Vim pelo site Arte no Croche e quero fazer um pedido.'

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
    : WHATSAPP_DEFAULT_MESSAGE

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
