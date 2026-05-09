import { Heart, Leaf, MapPin, MessageCircle, PackageCheck, ShieldCheck, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAdmin } from '../context/useAdmin'
import { products as defaultProducts, reviews as defaultReviews } from '../data/storeData'
import { getWhatsAppUrl } from '../lib/whatsapp'

const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`

export default function Home() {
  const { products, feedbacks } = useAdmin()
  const featuredProducts = (products.length ? products : defaultProducts).slice(0, 5)
  const homeReviews = feedbacks.filter(feedback => feedback.approved).length
    ? feedbacks.filter(feedback => feedback.approved).slice(0, 3)
    : defaultReviews

  return (
    <div className="overflow-hidden">
      <section className="relative overflow-hidden bg-[#fbefe3] lg:min-h-[calc(100vh-5rem)]">
        <div className="absolute inset-y-0 left-0 z-10 hidden w-[42%] bg-[#fff8f2] lg:block" />
        <div className="absolute bottom-0 left-0 z-20 hidden h-64 w-20 rounded-tr-[100%] border-r border-neon-pink/20 opacity-70 lg:block" />
        <div className="relative grid lg:min-h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-[38%_62%]">
          <div className="relative z-20 flex flex-col justify-center px-5 py-8 sm:px-12 lg:px-16 xl:pl-24">
            <div className="mb-8 flex items-end gap-3 lg:mb-16">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-neon-pink/40 text-neon-pink sm:h-16 sm:w-16">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <div className="leading-none">
                <span className="block font-display text-5xl font-semibold text-text-main sm:text-6xl">Arte</span>
                <span className="-mt-2 block font-['Caveat'] text-3xl text-neon-pink sm:text-4xl">no croche</span>
              </div>
            </div>

            <div className="mb-5 text-sm font-extrabold uppercase tracking-[0.16em] text-neon-pink sm:text-base">
              Arte que transforma
            </div>

            <h1 className="font-display text-[clamp(2.8rem,15vw,6rem)] font-semibold leading-[0.96] text-text-main">
              Detalhes que
              <span className="block font-['Caveat'] text-[clamp(3.4rem,16vw,7rem)] font-semibold italic leading-[0.85] text-neon-pink">transformam</span>
              seu lar.
            </h1>

            <div className="mt-8 flex w-52 items-center gap-4 text-neon-pink">
              <span className="h-px flex-1 bg-neon-pink/45" />
              <Heart className="h-7 w-7" />
              <span className="h-px flex-1 bg-neon-pink/45" />
            </div>

            <p className="mt-7 max-w-md text-base leading-8 text-text-muted sm:text-lg sm:leading-9">
              Pecas feitas a mao que levam aconchego, beleza e personalidade para cada cantinho da sua casa.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-5 sm:items-start">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-neon-pink px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-neon-pink/20 transition hover:bg-hot-pink sm:px-8 sm:py-5 sm:text-base"
              >
                <MessageCircle className="h-5 w-5" />
                Comprar pelo WhatsApp
              </a>
              <div className="flex items-center gap-3 text-base text-text-muted">
                <MapPin className="h-6 w-6 text-neon-pink" />
                <span>Atendemos somente Lorena e regiao</span>
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[calc(100vh-5rem)]">
            <div className="absolute inset-y-0 -left-24 z-10 hidden w-56 rounded-r-[50%] bg-[#fff8f2] lg:block" />
            <img
              src="/crochet/choce.png"
              alt="Sousplats artesanais em croche preto com acabamento dourado"
              className="h-full min-h-[320px] w-full object-cover object-center sm:min-h-[420px] lg:min-h-[calc(100vh-5rem)]"
            />
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 rounded-2xl bg-white/85 p-4 shadow-xl shadow-[#9f7e56]/10 backdrop-blur sm:grid-cols-2 sm:p-5 lg:grid-cols-4 lg:rounded-3xl">
          {[
            { icon: MapPin, title: 'Atendemos Lorena e regiao', desc: 'Entrega local e personalizada.' },
            { icon: MessageCircle, title: 'Compre pelo WhatsApp', desc: 'Rapido, pratico e seguro.' },
            { icon: Heart, title: 'Produtos exclusivos', desc: 'Pecas autorais feitas com amor.' },
            { icon: Leaf, title: 'Feito para transformar', desc: 'Sua casa com historia.' },
          ].map(item => (
            <div key={item.title} className="flex items-center gap-4 border-neon-pink/10 lg:border-r lg:last:border-r-0">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fff1e8] text-neon-pink">
                <item.icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold uppercase text-text-main">{item.title}</h3>
                <p className="mt-1 text-xs leading-5 text-text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fff8f2] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl font-semibold text-text-main">Nossas tapecarias</h2>
            <div className="mx-auto mt-3 flex w-36 items-center justify-center gap-2 text-neon-pink">
              <span className="h-px flex-1 bg-neon-pink/35" />
              <Heart className="h-4 w-4" />
              <span className="h-px flex-1 bg-neon-pink/35" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {featuredProducts.map(product => (
              <article key={product.id} className="overflow-hidden rounded-xl border border-neon-pink/15 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#9f7e56]/10">
                <Link to={`/produto/${product.id}`} className="block aspect-[4/4.2] overflow-hidden bg-void-light">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                </Link>
                <div className="p-4 text-center">
                  <Link to={`/produto/${product.id}`} className="font-semibold text-text-main transition hover:text-neon-pink">
                    {product.name}
                  </Link>
                  <p className="mt-1 text-xs text-text-muted">{product.specs?.[0]?.value || 'Feito a mao'}</p>
                  <p className="mt-3 text-lg font-bold text-text-main">{formatPrice(product.price)}</p>
                  <a
                    href={getWhatsAppUrl(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-neon-pink px-3 py-3 text-[11px] font-extrabold uppercase text-white transition hover:bg-hot-pink"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Comprar pelo WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden rounded-2xl bg-[#fff1e8] lg:grid-cols-[0.9fr_1fr_0.9fr] lg:rounded-[2rem]">
          <img src="/crochet/hero-crochet.png" alt="" className="h-full min-h-72 w-full object-cover" />
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <h2 className="font-display text-3xl leading-tight text-text-main sm:text-4xl">Mais que decoracao, <span className="block font-['Caveat'] text-4xl text-neon-pink sm:text-5xl">um sentimento.</span></h2>
            <p className="mt-5 text-sm leading-7 text-text-muted">Cada peca e criada para levar aconchego, estilo e personalidade para o seu lar. Feito a mao com amor em cada detalhe.</p>
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-neon-pink px-6 py-3 text-sm font-bold uppercase text-white">
              <MessageCircle className="h-5 w-5" />
              Comprar pelo WhatsApp
            </a>
          </div>
          <div className="flex flex-col justify-center bg-[#f8d8cc]/45 p-8 lg:p-10">
            <MapPin className="mb-5 h-12 w-12 text-neon-pink" />
            <h3 className="font-display text-3xl text-text-main">Atendemos somente Lorena e regiao</h3>
            <p className="mt-4 text-sm leading-7 text-text-muted">Nossas entregas sao feitas pessoalmente com todo carinho e cuidado.</p>
            <span className="mt-6 inline-flex w-fit rounded-full border border-neon-pink/35 px-5 py-3 text-xs font-bold uppercase tracking-wide text-neon-pink">Lorena - SP e regiao</span>
          </div>
        </div>
      </section>

      <section className="bg-[#fff8f2] px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl font-semibold text-text-main">O que nossas clientes dizem</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {homeReviews.map(review => (
              <div key={review.id} className="rounded-xl border border-neon-pink/15 bg-white p-6 shadow-sm">
                <p className="text-5xl leading-none text-neon-pink/70">"</p>
                <p className="min-h-24 text-sm leading-7 text-text-muted">{review.text}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff1e8] text-neon-pink">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-text-main">{review.name}</p>
                    <p className="text-xs text-text-muted">Lorena - SP</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-4 rounded-2xl border border-neon-pink/15 bg-white p-5 sm:grid-cols-3">
            {[
              { icon: Truck, text: 'Entrega local combinada' },
              { icon: ShieldCheck, text: 'Pedido combinado pelo WhatsApp' },
              { icon: PackageCheck, text: 'Pecas embaladas com cuidado' },
            ].map(item => (
              <div key={item.text} className="flex items-center justify-center gap-3 text-sm font-semibold text-text-muted">
                <item.icon className="h-5 w-5 text-neon-pink" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
