import type { Order } from '@/data/types'
import StainedGlass from './StainedGlass'

interface Props {
  order: Order
  onBack: () => void
}

export default function OrderLexicon({ order, onBack }: Props) {
  return (
    <div className="view lexicon order-lexicon">
      <div className="lexicon-hero">
        <div className="lexicon-portrait order-portrait">
          <StainedGlass icon={order.icon} a={order.glass[0]} b={order.glass[1]} c={order.glass[2]} />
          <div className="lexicon-corner tl" />
          <div className="lexicon-corner tr" />
          <div className="lexicon-portrait-meta">
            <span>ORDER MILITANT · {order.matriarch.toUpperCase()}</span>
            <span>{order.convent.toUpperCase()}</span>
            <span>FILE · {order.id.toUpperCase().replace('-', '‑')}</span>
          </div>
        </div>

        <div className="lexicon-info">
          <div className="lexicon-roman order-roman">✚</div>

          <div style={{ marginBottom: 28 }}>
            <button className="back-btn" onClick={onBack}>← Orders Militant</button>
          </div>

          <div className="lexicon-kicker">
            <span className="lexicon-kicker-num">Order Militant</span>
            <span>·</span>
            <span>Founded {order.founded}</span>
          </div>

          <h1 className="lexicon-name">{order.name}</h1>
          <p className="lexicon-epithet">"{order.epithet}"</p>

          <div className="lexicon-chips">
            <span className="chip">
              <span className="chip-label">Matriarch</span>
              <span className="chip-value">{order.matriarch}</span>
            </span>
            <span className="chip">
              <span className="chip-label">Convent</span>
              <span className="chip-value">{order.convent}</span>
            </span>
            <span className="chip">
              <span className="chip-label">Parish</span>
              <span className="chip-value">{order.parish}</span>
            </span>
            <span className="chip">
              <span className="chip-label">Colours</span>
              <span className="chip-value">{order.colors}</span>
            </span>
          </div>

          <div className="lexicon-lore">
            {order.lore.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </div>
  )
}
