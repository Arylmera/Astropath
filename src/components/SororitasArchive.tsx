import type { Order } from '@/data/types'
import StainedGlass from './StainedGlass'

interface Props {
  orders: Order[]
  onOpen: (id: string) => void
}

export default function SororitasArchive({ orders, onOpen }: Props) {
  return (
    <div className="view sororitas-view">
      <div className="sor-header">
        <div className="sor-header-kicker">
          <span className="sor-cross">✚</span>
          <span>Archive · Adepta Sororitas</span>
        </div>
        <h1>Orders Militant of the Ecclesiarchy</h1>
        <p className="sor-header-lede">
          The six major Orders Militant of the Sisters of Battle, founded in the shadow of Dominica's
          five daughters. Enter a chapel-panel to read its lives and martyrs.
        </p>
      </div>

      <div className="sor-nave">
        {orders.map(o => {
          const [halo, gold, stroke] = o.glass
          return (
          <article
            key={o.id}
            className="sor-panel"
            style={{
              '--glass-a': halo,
              '--glass-b': gold,
              '--glass-c': stroke,
            } as React.CSSProperties}
            onClick={() => onOpen(o.id)}
          >
            <div className="sor-panel-glass">
              <StainedGlass icon={o.icon} halo={halo} gold={gold} stroke={stroke} />
            </div>
            <div className="sor-panel-plate">
              <div className="sor-panel-matriarch">Saint · {o.matriarch}</div>
              <h2 className="sor-panel-name">{o.name}</h2>
              <div className="sor-panel-epithet">"{o.epithet}"</div>
              <div className="sor-panel-dogma">{o.dogma}</div>
            </div>
            <div className="sor-panel-rule" />
          </article>
          )
        })}
      </div>

      <div className="sor-floor-rule" />
      <div className="sor-footer">
        <span>Ave Imperator</span>
        <span>·</span>
        <span>In His Name we Burn</span>
        <span>·</span>
        <span>VI Orders of the Six Daughters</span>
        <span>·</span>
        <a href="https://github.com/Arylmera/astropath" target="_blank" rel="noopener noreferrer" className="sor-footer-link">
          github.com/Arylmera/astropath
        </a>
      </div>
    </div>
  )
}
