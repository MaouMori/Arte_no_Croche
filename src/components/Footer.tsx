import { Link } from 'react-router-dom'
import { Heart, MapPin, MessageCircle, PackageCheck, Shield, Sparkles } from 'lucide-react'
import { useHelpTopics } from '../lib/siteConfig'
import { getWhatsAppUrl } from '../lib/whatsapp'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { topics } = useHelpTopics()
  const helpLinks = topics.filter(topic => topic.active).slice(0, 4)

  return (
    <footer className="border-t border-neon-pink/10 bg-void">
      <div className="border-b border-neon-pink/10 bg-void-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: MapPin,
                title: 'ATENDEMOS LORENA E REGIAO',
                desc: 'Entrega local e personalizada para voce.',
              },
              {
                icon: MessageCircle,
                title: 'COMPRA PELO WHATSAPP',
                desc: 'A unica forma de compra: rapido, pratico e seguro.',
              },
              {
                icon: Sparkles,
                title: 'PRODUTOS EXCLUSIVOS',
                desc: 'Pecas autorais feitas com amor e materiais de qualidade.',
              },
              {
                icon: PackageCheck,
                title: 'FEITO PARA TRANSFORMAR',
                desc: 'Mais que decoracao: sua casa com historia.',
              },
            ].map(f => (
              <div key={f.title} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-neon-pink/10 border border-neon-pink/20 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-neon-pink" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-text-main tracking-wider">{f.title}</h4>
                  <p className="text-text-dim text-[11px] mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-end gap-2 mb-3">
              <span className="font-display text-3xl text-text-main">Arte</span>
              <span className="font-['Caveat'] text-2xl text-neon-pink">no croche</span>
            </div>
            <p className="text-text-dim text-xs leading-relaxed">
              Arte que transforma ambientes e conecta voce ao que realmente importa: o seu lar.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-xs text-text-main tracking-wider mb-3">LINKS RAPIDOS</h3>
            <ul className="space-y-1.5">
              {[
                { path: '/', label: 'Inicio' },
                { path: '/loja', label: 'Tapecarias' },
                { path: '/colecoes', label: 'Colecoes' },
                { path: '/sobre', label: 'Sobre' },
                { path: '/ajuda', label: 'Ajuda' },
                { path: '/termos', label: 'Termos' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-text-dim text-xs hover:text-neon-pink transition-colors flex items-center gap-1">
                    <span className="text-neon-pink/50">-</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-xs text-text-main tracking-wider mb-3">AJUDA</h3>
            <ul className="space-y-1.5">
              {helpLinks.map(item => (
                <li key={item.id}>
                  <Link to={`/ajuda#${item.id}`} className="text-text-dim text-xs hover:text-neon-pink transition-colors flex items-center gap-1">
                    <span className="text-neon-pink/50">-</span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-xs text-text-main tracking-wider mb-3">ATENDIMENTO</h3>
            <div className="flex flex-wrap gap-1.5">
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-full bg-neon-pink text-white text-[10px] font-bold uppercase">
                WhatsApp
              </a>
              <span className="px-3 py-2 rounded-full bg-void-lighter border border-neon-pink/10 text-text-muted text-[10px] font-bold uppercase">
                Entrega local
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-xs text-text-main tracking-wider mb-3">IMPORTANTE</h3>
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-neon-pink flex-shrink-0 mt-0.5" />
              <p className="text-text-dim text-[11px] leading-relaxed">
                A unica forma de compra e pelo WhatsApp. Nao trabalhamos com site de pagamentos nem cartoes.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-neon-pink/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-dim text-[11px]">
            © {currentYear} Arte no Croche. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1.5">
            <Heart className="w-3 h-3 text-neon-pink fill-neon-pink" />
            <span className="text-text-dim text-[11px]">Feito com carinho</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
