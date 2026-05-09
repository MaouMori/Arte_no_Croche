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

export const products: Product[] = [
  {
    id: 1,
    name: 'Folhagem Encanto',
    price: 349.90,
    image: heroImage,
    images: [heroImage],
    category: 'tapecarias',
    style: ['botanico', 'boho'],
    color: ['cru', 'verde', 'terracota'],
    isNew: true,
    isBestseller: true,
    rating: 5,
    ratingCount: 18,
    collectionId: 1,
    description: 'Tapecaria artesanal em croche com desenho botanico, feita em fio de algodao para transformar paredes com delicadeza.',
    specs: [
      { label: 'Medidas', value: '120 x 150 cm' },
      { label: 'Material', value: 'Algodao e madeira' },
      { label: 'Entrega', value: 'Lorena e regiao' },
    ],
    createdAt: '2026-05-01T10:00:00.000Z',
  },
  {
    id: 2,
    name: 'Fases da Lua',
    price: 299.90,
    image: heroImage,
    images: [heroImage],
    category: 'tapecarias',
    style: ['minimalista', 'boho'],
    color: ['cru', 'dourado'],
    isNew: true,
    isBestseller: true,
    rating: 5,
    ratingCount: 12,
    collectionId: 1,
    description: 'Peca de parede com fases da lua, franjas macias e acabamento manual para um ambiente calmo e acolhedor.',
    specs: [
      { label: 'Medidas', value: '100 x 150 cm' },
      { label: 'Material', value: 'Algodao natural' },
      { label: 'Prazo', value: 'Feito sob encomenda' },
    ],
    createdAt: '2026-05-02T10:00:00.000Z',
  },
  {
    id: 3,
    name: 'Formas Organicas',
    price: 349.90,
    image: heroImage,
    images: [heroImage],
    category: 'tapecarias',
    style: ['organico', 'afetivo'],
    color: ['cru', 'rose', 'verde'],
    isNew: true,
    isBestseller: true,
    rating: 5,
    ratingCount: 21,
    collectionId: 2,
    description: 'Tapecaria com blocos organicos em tons suaves, pensada para quartos, salas e espacos de descanso.',
    specs: [
      { label: 'Medidas', value: '120 x 150 cm' },
      { label: 'Material', value: 'Algodao premium' },
      { label: 'Cuidados', value: 'Limpeza delicada a seco' },
    ],
    createdAt: '2026-05-03T10:00:00.000Z',
  },
  {
    id: 4,
    name: 'Sol Nascente',
    price: 329.90,
    image: heroImage,
    images: [heroImage],
    category: 'tapecarias',
    style: ['boho', 'minimalista'],
    color: ['cru', 'terracota'],
    isNew: true,
    isBestseller: false,
    rating: 5,
    ratingCount: 9,
    collectionId: 2,
    description: 'Peca com desenho solar, linhas alongadas e franjas para trazer calor visual ao ambiente.',
    specs: [
      { label: 'Medidas', value: '130 x 150 cm' },
      { label: 'Material', value: 'Fio de algodao' },
      { label: 'Instalacao', value: 'Acompanha suporte de madeira' },
    ],
    createdAt: '2026-05-04T10:00:00.000Z',
  },
  {
    id: 5,
    name: 'Vaso de Afeto',
    price: 249.90,
    image: heroImage,
    images: [heroImage],
    category: 'quadros',
    style: ['botanico', 'afetivo'],
    color: ['cru', 'verde', 'terracota'],
    isNew: false,
    isBestseller: true,
    rating: 5,
    ratingCount: 16,
    collectionId: 3,
    description: 'Quadro em croche com vaso e folhas, uma peca afetiva para decorar com leveza.',
    specs: [
      { label: 'Medidas', value: '90 x 120 cm' },
      { label: 'Material', value: 'Algodao e bastidor' },
      { label: 'Entrega', value: 'Entrega local personalizada' },
    ],
  },
  {
    id: 6,
    name: 'Almofada Jardim',
    price: 159.90,
    image: heroImage,
    images: [heroImage],
    category: 'almofadas',
    style: ['botanico', 'boho'],
    color: ['cru', 'verde'],
    isNew: true,
    isBestseller: false,
    rating: 5,
    ratingCount: 7,
    collectionId: 3,
    description: 'Almofada de croche com textura alta, capa removivel e toque artesanal para sofa ou poltrona.',
    specs: [
      { label: 'Medidas', value: '45 x 45 cm' },
      { label: 'Material', value: 'Capa em algodao' },
      { label: 'Enchimento', value: 'Fibra siliconada' },
    ],
  },
]

export const storeCollections = [
  {
    id: 1,
    name: 'Tapecarias Autorais',
    subtitle: 'Pecas de parede feitas a mao para dar alma ao ambiente.',
    image: heroImage,
    color: '#df745c',
    price: 299.90,
    discountPercent: 0,
    active: true,
    productIds: [1, 2],
    createdAt: '2026-05-01T10:00:00.000Z',
  },
  {
    id: 2,
    name: 'Tons da Terra',
    subtitle: 'Texturas em cru, rose, verde e terracota para uma casa acolhedora.',
    image: heroImage,
    color: '#9f7e56',
    price: 329.90,
    discountPercent: 0,
    active: true,
    productIds: [3, 4],
    createdAt: '2026-05-02T10:00:00.000Z',
  },
  {
    id: 3,
    name: 'Afetos da Casa',
    subtitle: 'Quadros, almofadas e detalhes para presentear ou morar melhor.',
    image: heroImage,
    color: '#75815f',
    price: 159.90,
    discountPercent: 0,
    active: true,
    productIds: [5, 6],
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
