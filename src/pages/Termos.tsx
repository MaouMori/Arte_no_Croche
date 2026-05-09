import { Shield, FileText, RefreshCw, MessageSquare } from 'lucide-react'

export default function Termos() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FileText className="w-6 h-6 text-neon-pink" />
          <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
            TERMOS E CONDICOES
          </h1>
          <FileText className="w-6 h-6 text-neon-pink" />
        </div>
        <p className="text-text-muted max-w-2xl mx-auto">
          Leia atentamente nossos termos antes de realizar uma compra.
        </p>
      </div>

      <div className="space-y-6">
        {[
          {
            icon: FileText,
            title: '1. Sobre os Produtos',
            content:
              'Todos os produtos da Arte no Croche sao pecas artesanais feitas a mao. Pequenas variacoes de ponto, textura e cor podem acontecer e fazem parte da identidade manual de cada produto.',
          },
          {
            icon: RefreshCw,
            title: '2. Compra e Entrega',
            content:
              'A compra e combinada pelo WhatsApp. Atendemos somente Lorena e regiao, com entrega local personalizada conforme disponibilidade e combinados feitos no atendimento.',
          },
          {
            icon: Shield,
            title: '3. Politica de Reembolso',
            content:
              'Trocas, ajustes e devolucoes sao avaliados caso a caso pelo atendimento. Produtos personalizados ou feitos sob encomenda podem ter condicoes especificas combinadas antes da producao.',
          },
          {
            icon: MessageSquare,
            title: '4. Suporte',
            content:
              'Nosso suporte e realizado pelo WhatsApp. O tempo de resposta pode variar conforme a rotina de producao e entregas, mas responderemos assim que possivel.',
          },
        ].map((section, i) => (
          <div key={i} className="review-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-neon-pink/10 border border-neon-pink/20 flex items-center justify-center">
                <section.icon className="w-5 h-5 text-neon-pink" />
              </div>
              <h2 className="font-heading font-bold text-lg text-text-main">
                {section.title}
              </h2>
            </div>
            <p className="text-text-muted leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
