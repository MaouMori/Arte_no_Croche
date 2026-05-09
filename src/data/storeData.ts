export interface Product {
  id: number
  name: string
  price: number
  image: string
  images: string[]
  category: string
  subcategory?: string
  style?: string[]
  color?: string[]
  isNew: boolean
  isBestseller: boolean
  discountPercent?: number
  rating?: number
  ratingCount?: number
  collectionId?: number | null
  sellIndividually?: boolean
  description: string
  inGameImages?: string[]
  specs?: { label: string; value: string }[]
  createdAt?: string
}

export const categories = [
  { value: 'todos', label: 'Todos os produtos' },
  { value: 'tapecarias', label: 'Tapecarias' },
  { value: 'quadros', label: 'Quadros' },
  { value: 'almofadas', label: 'Almofadas' },
  { value: 'acessorios', label: 'Acessorios' },
]

export const styles = [
  { value: 'boho', label: 'Boho' },
  { value: 'minimalista', label: 'Minimalista' },
  { value: 'botanico', label: 'Botanico' },
  { value: 'organico', label: 'Organico' },
  { value: 'afetivo', label: 'Afetivo' },
]

export const colors = [
  { value: 'cru', hex: '#f7eadc' },
  { value: 'terracota', hex: '#c96c55' },
  { value: 'rose', hex: '#e6a394' },
  { value: 'verde', hex: '#75815f' },
  { value: 'madeira', hex: '#a8754b' },
  { value: 'dourado', hex: '#c89754' },
]

const heroImage = '/crochet/hero-crochet.png'
const crochetImages = [
  '/crochet/foto_2.jpeg',
  '/crochet/foto_3.jpeg',
  '/crochet/foto_4.jpeg',
  '/crochet/foto_5.jpeg',
  '/crochet/foto_6.jpeg',
  '/crochet/foto_7.jpeg',
  '/crochet/foto_8.jpeg',
  '/crochet/foto_9.jpeg',
  '/crochet/foto_10.jpeg',
  '/crochet/foto_11.jpeg',
  '/crochet/foto_12.jpeg',
  '/crochet/foto_13.jpeg',
]

export const products: Product[] = [
  {
    id: 1,
    name: 'Folhagem Encanto',
    price: 349.90,
    image: crochetImages[0],
    images: [crochetImages[0], crochetImages[1]],
    category: 'tapecarias',
    style: ['botanico', 'boho'],
    color: ['cru', 'verde', 'terracota'],
    isNew: true,
    isBestseller: true,
    rating: 5,
    ratingCount: 18,
    collectionId: 1,
    description: 'Tapecaria artesanal em croche com desenho botanico, feita para transformar paredes com delicadeza.',
    specs: [
      { label: 'Material', value: 'Fio de algodao' },
      { label: 'Producao', value: 'Feita a mao' },
      { label: 'Entrega', value: 'Lorena e regiao' },
    ],
    createdAt: '2026-05-01T10:00:00.000Z',
  },
  {
    id: 2,
    name: 'Fases da Lua',
    price: 299.90,
    image: crochetImages[1],
    images: [crochetImages[1], crochetImages[2]],
    category: 'tapecarias',
    style: ['minimalista', 'boho'],
    color: ['cru', 'dourado'],
    isNew: true,
    isBestseller: true,
    rating: 5,
    ratingCount: 12,
    collectionId: 1,
    description: 'Peca de parede com acabamento manual para um ambiente calmo, acolhedor e cheio de personalidade.',
    specs: [
      { label: 'Material', value: 'Algodao natural' },
      { label: 'Prazo', value: 'Sob encomenda' },
      { label: 'Atendimento', value: 'Pelo WhatsApp' },
    ],
    createdAt: '2026-05-02T10:00:00.000Z',
  },
  {
    id: 3,
    name: 'Formas Organicas',
    price: 349.90,
    image: crochetImages[2],
    images: [crochetImages[2], crochetImages[3]],
    category: 'tapecarias',
    style: ['organico', 'afetivo'],
    color: ['cru', 'rose', 'verde'],
    isNew: true,
    isBestseller: true,
    rating: 5,
    ratingCount: 21,
    collectionId: 2,
    description: 'Tapecaria em tons suaves, pensada para quartos, salas e espacos de descanso.',
    specs: [
      { label: 'Material', value: 'Algodao premium' },
      { label: 'Cuidados', value: 'Limpeza delicada' },
      { label: 'Producao', value: 'Manual' },
    ],
    createdAt: '2026-05-03T10:00:00.000Z',
  },
  {
    id: 4,
    name: 'Sol Nascente',
    price: 329.90,
    image: crochetImages[3],
    images: [crochetImages[3], crochetImages[4]],
    category: 'tapecarias',
    style: ['boho', 'minimalista'],
    color: ['cru', 'terracota'],
    isNew: true,
    isBestseller: false,
    rating: 5,
    ratingCount: 9,
    collectionId: 2,
    description: 'Peca com visual solar e textura aconchegante para trazer calor visual ao ambiente.',
    specs: [
      { label: 'Material', value: 'Fio de algodao' },
      { label: 'Instalacao', value: 'Pronta para pendurar' },
      { label: 'Entrega', value: 'Entrega local' },
    ],
    createdAt: '2026-05-04T10:00:00.000Z',
  },
  {
    id: 5,
    name: 'Vaso de Afeto',
    price: 249.90,
    image: crochetImages[4],
    images: [crochetImages[4], crochetImages[5]],
    category: 'quadros',
    style: ['botanico', 'afetivo'],
    color: ['cru', 'verde', 'terracota'],
    isNew: false,
    isBestseller: true,
    rating: 5,
    ratingCount: 16,
    collectionId: 3,
    description: 'Quadro em croche com toque afetivo para decorar com leveza e carinho.',
    specs: [
      { label: 'Material', value: 'Algodao e bastidor' },
      { label: 'Acabamento', value: 'Artesanal' },
      { label: 'Entrega', value: 'Local personalizada' },
    ],
  },
  {
    id: 6,
    name: 'Almofada Jardim',
    price: 159.90,
    image: crochetImages[5],
    images: [crochetImages[5], crochetImages[6]],
    category: 'almofadas',
    style: ['botanico', 'boho'],
    color: ['cru', 'verde'],
    isNew: true,
    isBestseller: false,
    rating: 5,
    ratingCount: 7,
    collectionId: 3,
    description: 'Almofada de croche com textura alta e toque artesanal para sofa, cama ou poltrona.',
    specs: [
      { label: 'Material', value: 'Capa em algodao' },
      { label: 'Enchimento', value: 'Macio e confortavel' },
      { label: 'Producao', value: 'Feita a mao' },
    ],
  },
  {
    id: 7,
    name: 'Trama Aconchego',
    price: 189.90,
    image: crochetImages[6],
    images: [crochetImages[6]],
    category: 'almofadas',
    style: ['minimalista', 'afetivo'],
    color: ['cru', 'rose'],
    isNew: true,
    isBestseller: true,
    rating: 5,
    ratingCount: 11,
    collectionId: 3,
    description: 'Peca macia e decorativa para completar cantinhos de descanso com textura artesanal.',
    specs: [
      { label: 'Material', value: 'Fio macio' },
      { label: 'Uso', value: 'Decorativo' },
      { label: 'Atendimento', value: 'Pelo WhatsApp' },
    ],
  },
  {
    id: 8,
    name: 'Jardim Suspenso',
    price: 279.90,
    image: crochetImages[7],
    images: [crochetImages[7]],
    category: 'tapecarias',
    style: ['botanico', 'organico'],
    color: ['verde', 'cru', 'madeira'],
    isNew: false,
    isBestseller: true,
    rating: 5,
    ratingCount: 14,
    collectionId: 1,
    description: 'Decoracao de parede com inspiracao botanica para deixar o ambiente mais vivo.',
    specs: [
      { label: 'Material', value: 'Algodao' },
      { label: 'Acabamento', value: 'Com detalhes manuais' },
      { label: 'Entrega', value: 'Lorena e regiao' },
    ],
  },
  {
    id: 9,
    name: 'Lares de Algodao',
    price: 219.90,
    image: crochetImages[8],
    images: [crochetImages[8]],
    category: 'acessorios',
    style: ['boho', 'afetivo'],
    color: ['cru', 'madeira'],
    isNew: true,
    isBestseller: false,
    rating: 5,
    ratingCount: 6,
    collectionId: 3,
    description: 'Detalhe artesanal para compor mesas, aparadores e cantinhos especiais da casa.',
    specs: [
      { label: 'Material', value: 'Algodao' },
      { label: 'Uso', value: 'Decoracao' },
      { label: 'Producao', value: 'Manual' },
    ],
  },
  {
    id: 10,
    name: 'Flor de Parede',
    price: 269.90,
    image: crochetImages[9],
    images: [crochetImages[9]],
    category: 'quadros',
    style: ['botanico', 'boho'],
    color: ['cru', 'rose', 'verde'],
    isNew: true,
    isBestseller: true,
    rating: 5,
    ratingCount: 13,
    collectionId: 2,
    description: 'Quadro/tapecaria floral para trazer delicadeza e textura para a parede.',
    specs: [
      { label: 'Material', value: 'Fio de algodao' },
      { label: 'Acabamento', value: 'Artesanal' },
      { label: 'Atendimento', value: 'Pelo WhatsApp' },
    ],
  },
  {
    id: 11,
    name: 'Canto Sereno',
    price: 199.90,
    image: crochetImages[10],
    images: [crochetImages[10]],
    category: 'acessorios',
    style: ['minimalista', 'organico'],
    color: ['cru', 'dourado'],
    isNew: false,
    isBestseller: false,
    rating: 5,
    ratingCount: 5,
    collectionId: 1,
    description: 'Peca artesanal pequena para dar charme a detalhes do ambiente.',
    specs: [
      { label: 'Material', value: 'Algodao' },
      { label: 'Uso', value: 'Decorativo' },
      { label: 'Entrega', value: 'Local' },
    ],
  },
  {
    id: 12,
    name: 'Textura do Lar',
    price: 239.90,
    image: crochetImages[11],
    images: [crochetImages[11]],
    category: 'tapecarias',
    style: ['afetivo', 'boho'],
    color: ['cru', 'terracota'],
    isNew: true,
    isBestseller: false,
    rating: 5,
    ratingCount: 8,
    collectionId: 2,
    description: 'Tapecaria artesanal para deixar a casa mais acolhedora e com identidade propria.',
    specs: [
      { label: 'Material', value: 'Fio artesanal' },
      { label: 'Producao', value: 'Feita a mao' },
      { label: 'Entrega', value: 'Lorena e regiao' },
    ],
  },
]

export const storeCollections = [
  {
    id: 1,
    name: 'Tapecarias Autorais',
    subtitle: 'Pecas de parede feitas a mao para dar alma ao ambiente.',
    image: crochetImages[0],
    color: '#df745c',
    price: 299.90,
    discountPercent: 0,
    active: true,
    productIds: [1, 2, 8, 11],
    createdAt: '2026-05-01T10:00:00.000Z',
  },
  {
    id: 2,
    name: 'Tons da Terra',
    subtitle: 'Texturas em cru, rose, verde e terracota para uma casa acolhedora.',
    image: crochetImages[3],
    color: '#9f7e56',
    price: 329.90,
    discountPercent: 0,
    active: true,
    productIds: [3, 4, 10, 12],
    createdAt: '2026-05-02T10:00:00.000Z',
  },
  {
    id: 3,
    name: 'Afetos da Casa',
    subtitle: 'Quadros, almofadas e detalhes para presentear ou morar melhor.',
    image: crochetImages[5],
    color: '#75815f',
    price: 159.90,
    discountPercent: 0,
    active: true,
    productIds: [5, 6, 7, 9],
    createdAt: '2026-05-03T10:00:00.000Z',
  },
]

export const collections = storeCollections

export const reviews = [
  {
    id: 1,
    name: 'Juliana M.',
    avatar: '/avatars/default.jpg',
    rating: 5,
    text: 'Simplesmente apaixonada. A peca e ainda mais linda pessoalmente e transformou meu ambiente.',
  },
  {
    id: 2,
    name: 'Camila R.',
    avatar: '/avatars/default.jpg',
    rating: 5,
    text: 'Pecas unicas, feitas com muito carinho e capricho. Chegou rapido e veio tudo perfeito.',
  },
  {
    id: 3,
    name: 'Fernanda L.',
    avatar: '/avatars/default.jpg',
    rating: 5,
    text: 'A tapecaria deixou minha sala linda e super aconchegante. Da para sentir o amor em cada detalhe.',
  },
]

export const heroSlides = [
  {
    id: 1,
    title: 'Sua casa.',
    title2: 'Sua essencia.',
    title3: 'Feita a mao.',
    subtitle: 'Tapecarias exclusivas em croche que levam aconchego, beleza e personalidade para o seu ambiente.',
    cta: 'Comprar pelo WhatsApp',
    image: heroImage,
  },
]

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, limit)
}
