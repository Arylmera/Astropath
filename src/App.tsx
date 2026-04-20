import { useEffect, useState } from 'react'
import './App.css'
import type { Nav, Theme, View } from '@/data/types'
import DATA from '@/data/astropath'
import Chrome from '@/components/Chrome'
import Tweaks from '@/components/Tweaks'
import GalaxyMap from '@/components/GalaxyMap'
import Lexicon from '@/components/Lexicon'
import LegionView from '@/components/LegionView'
import LoreView from '@/components/LoreView'
import MechanicusArchive from '@/components/MechanicusArchive'
import SororitasArchive from '@/components/SororitasArchive'
import ForgeSchematic from '@/components/ForgeSchematic'
import StainedGlass from '@/components/StainedGlass'
import { allegianceClass, formatFileId } from '@/lib/lexicon'

const NAV_KEY   = 'astropath.nav'
const THEME_KEY = 'astropath.theme'

function loadNav(): Nav {
  try {
    const s = localStorage.getItem(NAV_KEY)
    return s ? JSON.parse(s) : { view: 'galaxy', id: null }
  } catch {
    return { view: 'galaxy', id: null }
  }
}

function loadTheme(): Theme {
  return (localStorage.getItem(THEME_KEY) as Theme) || 'void'
}

function archiveOf(view: View): string {
  if (view === 'mechanicus' || view === 'forge') return 'mechanicus'
  if (view === 'sororitas'  || view === 'order') return 'sororitas'
  return 'primarchs'
}

export default function App() {
  const [nav,   setNav]   = useState<Nav>(loadNav)
  const [theme, setTheme] = useState<Theme>(loadTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem(NAV_KEY, JSON.stringify(nav))
  }, [nav])

  const go = (view: View, id: string | null = null) => setNav({ view, id })

  const primarch  = nav.id ? (DATA.primarchs.find(p  => p.id  === nav.id) ?? null) : null
  const legion    = nav.id ? (DATA.legions.find(l   => l.id  === nav.id) ?? null) : null
  const forge     = nav.id ? (DATA.mechanicus.find(f => f.id === nav.id) ?? null) : null
  const order     = nav.id ? (DATA.sororitas.find(o  => o.id === nav.id) ?? null) : null

  const currentLabel: string | null = (() => {
    if (nav.view === 'primarch' || nav.view === 'lore') return primarch?.name ?? null
    if (nav.view === 'legion')  return legion?.name ?? null
    if (nav.view === 'forge')   return forge?.name ?? null
    if (nav.view === 'order')   return order?.name ?? null
    return null
  })()

  const handleArchive = (v: View) => go(v)
  const handleHome    = () => go('galaxy')

  const getPrimarchLegion = (p: typeof primarch) => {
    if (!p || !p.legionId) return null
    return DATA.legions.find(l => l.id === p.legionId) ?? null
  }
  const getLegionPrimarch = (l: typeof legion) => {
    if (!l) return null
    return DATA.primarchs.find(p => p.id === l.primarchId) ?? null
  }

  const renderView = () => {
    switch (nav.view) {
      case 'galaxy':
        return (
          <GalaxyMap
            primarchs={DATA.primarchs}
            onOpen={id => go('primarch', id)}
          />
        )

      case 'primarch': {
        if (!primarch) return <div className="view"><p>Not found.</p></div>
        const metaLabel = primarch.isEmperor ? 'EMPEROR' : 'PRIMARCH'
        const leg = getPrimarchLegion(primarch)
        return (
          <Lexicon
            variant={primarch.isEmperor ? 'emperor' : 'primarch'}
            portrait={<img src={primarch.portrait} alt={primarch.name} />}
            meta={[
              `${metaLabel} · ${primarch.num}`,
              primarch.homeworld.toUpperCase(),
              `FILE · ${formatFileId(primarch.id)}`,
            ]}
            roman={primarch.roman}
            backLabel="Galaxy Map"
            onBack={() => go('galaxy')}
            kicker={<>
              <span className="lexicon-kicker-num">
                {primarch.roleLabel ?? 'Primarch'}{primarch.isEmperor ? '' : ` ${primarch.num}`}
              </span>
              <span>·</span>
              <span>{primarch.legion}</span>
            </>}
            name={primarch.name}
            epithet={primarch.epithet}
            chips={[
              { label: 'Homeworld', value: primarch.homeworld },
              { value: primarch.allegiance, className: allegianceClass(primarch.allegiance) },
              ...(!primarch.isEmperor ? [{ label: 'Legion', value: primarch.num }] : []),
              { label: 'Status', value: primarch.status },
            ]}
            lore={(primarch.lore ?? []).slice(0, 1)}
          >
            <div
              className="lexicon-links lore-link"
              onClick={() => go('lore', primarch.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && go('lore', primarch.id)}
            >
              <div className="lexicon-links-l">
                <div className="lexicon-links-kicker">Full Archive Record · {metaLabel} · {primarch.num}</div>
                <div className="lexicon-links-name">Read the complete file on {primarch.name.replace(/^The\s+/, '')}</div>
              </div>
              <div className="lexicon-links-arrow">Open record →</div>
            </div>
            {leg && (
              <div
                className="lexicon-links"
                onClick={() => go('legion', leg.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && go('legion', leg.id)}
              >
                <div className="lexicon-links-l">
                  <div className="lexicon-links-kicker">His Legion · {leg.num} · {leg.allegiance}</div>
                  <div className="lexicon-links-name">{leg.name}</div>
                </div>
                <div className="lexicon-links-arrow">Open file →</div>
              </div>
            )}
          </Lexicon>
        )
      }

      case 'lore':
        if (!primarch) return <div className="view"><p>Not found.</p></div>
        return (
          <LoreView
            primarch={primarch}
            onBack={() => go('primarch', primarch.id)}
          />
        )

      case 'legion':
        if (!legion) return <div className="view"><p>Not found.</p></div>
        return (
          <LegionView
            legion={legion}
            primarch={getLegionPrimarch(legion)}
            onOpenPrimarch={id => go('primarch', id)}
            onBack={() => go('galaxy')}
          />
        )

      case 'mechanicus':
        return (
          <MechanicusArchive
            forges={DATA.mechanicus}
            onOpen={id => go('forge', id)}
          />
        )

      case 'forge': {
        if (!forge) return <div className="view"><p>Not found.</p></div>
        return (
          <Lexicon
            variant="forge"
            portrait={<ForgeSchematic seed={forge.iconSeed} label={forge.name} />}
            portraitClass="forge-portrait"
            meta={[
              `FORGE · SEGMENTUM ${forge.segmentum.toUpperCase()}`,
              forge.primacy.toUpperCase(),
              `FILE · ${formatFileId(forge.id)}`,
            ]}
            roman="⚙"
            romanClass="forge-roman"
            backLabel="Forge Worlds"
            onBack={() => go('mechanicus')}
            kicker={<>
              <span className="lexicon-kicker-num">Forge World</span>
              <span>·</span>
              <span>Segmentum {forge.segmentum}</span>
            </>}
            name={forge.name}
            epithet={forge.epithet}
            chips={[
              { label: 'Titan Legion', value: forge.titanLegion },
              { label: 'Dogma',        value: forge.dogma },
              { label: 'Colours',      value: forge.colors },
              { label: 'Primacy',      value: forge.primacy },
            ]}
            lore={forge.lore}
          />
        )
      }

      case 'sororitas':
        return (
          <SororitasArchive
            orders={DATA.sororitas}
            onOpen={id => go('order', id)}
          />
        )

      case 'order': {
        if (!order) return <div className="view"><p>Not found.</p></div>
        const [halo, gold, stroke] = order.glass
        return (
          <Lexicon
            variant="order"
            portrait={<StainedGlass icon={order.icon} halo={halo} gold={gold} stroke={stroke} />}
            portraitClass="order-portrait"
            meta={[
              `ORDER MILITANT · ${order.matriarch.toUpperCase()}`,
              order.convent.toUpperCase(),
              `FILE · ${formatFileId(order.id)}`,
            ]}
            roman="✚"
            romanClass="order-roman"
            backLabel="Orders Militant"
            onBack={() => go('sororitas')}
            kicker={<>
              <span className="lexicon-kicker-num">Order Militant</span>
              <span>·</span>
              <span>Founded {order.founded}</span>
            </>}
            name={order.name}
            epithet={order.epithet}
            chips={[
              { label: 'Matriarch', value: order.matriarch },
              { label: 'Convent',   value: order.convent },
              { label: 'Parish',    value: order.parish },
              { label: 'Colours',   value: order.colors },
            ]}
            lore={order.lore}
          />
        )
      }

      default:
        return <div className="view"><p>Unknown view.</p></div>
    }
  }

  return (
    <>
      <Chrome
        view={nav.view}
        archive={archiveOf(nav.view)}
        onHome={handleHome}
        onArchive={handleArchive}
        currentLabel={currentLabel}
      />
      <main className="app-main">
        {renderView()}
      </main>
      <footer className="app-footer">
        <a
          href="https://github.com/Arylmera/astropath"
          target="_blank"
          rel="noopener noreferrer"
          className="app-footer-link"
        >
          github.com/Arylmera/astropath
        </a>
      </footer>
      <Tweaks theme={theme} setTheme={setTheme} />
    </>
  )
}
