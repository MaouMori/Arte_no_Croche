import { Heart, Leaf, MapPin, MessageCircle, PackageCheck, ShieldCheck, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAdmin } from '../context/useAdmin'
import { useCart } from '../context/useCart'
import { products as defaultProducts, reviews as defaultReviews } from '../data/storeData'

const whatsappUrl = 'https://wa.me/5512991234567?text=Ola!%20Vim%20pelo%20site%20Arte%20no%20Croche%20e%20quero%20fazer%20um%20pedido.'

const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`

export default function Home() {
  const { products, feedbacks } = useAdmin()
  const { addItem } = useCart()
  const featuredProducts = (products.length ? products : defaultProducts).slice(0, 5)
  const homeReviews = feedbacks.filter(feedback => feedback.approved).length
    ? feedbacks.filter(feedback => feedback.approved).slice(0, 3)
    : defaultReviews

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[calc(100vh-5rem)] bg-[#fff8f2]">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[#f7dfd2]/45" />
        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
          <div className="z-10 max-w-xl">
            <div className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-neon-pink">
              <Heart className="h-4 w-4" />
              Arte que transforma
            </div>

            <h1 className="font-display text-[clamp(3rem,8vw,6.8rem)] font-semibold leading-[0.94] text-text-main">
              Sua casa.
              <span className="block text-neon-pink">Sua essencia.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-text-muted sm:text-lg">
              Tapecarias exclusivas feitas a mao que levam aconchego, beleza e personalidade para o seu ambiente.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neon-pink px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-neon-pink/20 transition hover:bg-hot-pink"
              >
                <MessageCircle className="h-5 w-5" />
                Comprar pelo WhatsApp
              </a>
              <Link
                to="/loja"
                className="inline-flex items-center justify-center rounded-full border border-neon-pink/30 px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-neon-pink transition hover:bg-neon-pink/10"
              >
                Ver produtos
              </Link>
            </div>

            <div className="mt-8 max-w-sm rounded-2xl border border-neon-pink/20 bg-white/55 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center gap-4">
                <MapPin className="h-9 w-9 text-neon-pink" />
                <div>
                  <p className="font-bold text-text-main">Atendemos somente Lorena e regiao</p>
                  <p className="mt-1 text-sm text-text-muted">Entrega local e personalizada.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[380px] lg:min-h-[650px]">
            <div className="absolute -left-10 top-14 hidden h-[520px] w-44 rounded-[50%] bg-[#fff8f2] lg:block" />
            <img
              src="/crochet/hero-crochet.png"
              alt="Sala acolhedora com tapecaria artesanal em croche"
              className="h-full min-h-[380px] w-full rounded-[2rem] object-cover object-center shadow-2xl shadow-[#9f7e56]/15 lg:min-h-[650px]"
            />
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 rounded-3xl bg-white/85 p-5 shadow-xl shadow-[#9f7e56]/10 backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
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
                  <button
                    onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-neon-pink px-3 py-3 text-[11px] font-extrabold uppercase text-white transition hover:bg-hot-pink"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Comprar pelo WhatsApp
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden rounded-[2rem] bg-[#fff1e8] lg:grid-cols-[0.9fr_1fr_0.9fr]">
          <img src="/crochet/hero-crochet.png" alt="" className="h-full min-h-72 w-full object-cover" />
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <h2 className="font-display text-4xl leading-tight text-text-main">Mais que decoracao, <span className="block font-['Caveat'] text-5xl text-neon-pink">um sentimento.</span></h2>
            <p className="mt-5 text-sm leading-7 text-text-muted">Cada peca e criada para levar aconchego, estilo e personalidade para o seu lar. Feito a mao com amor em cada detalhe.</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-neon-pink px-6 py-3 text-sm font-bold uppercase text-white">
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
              { icon: ShieldCheck, text: 'Pagamento por Pix' },
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
