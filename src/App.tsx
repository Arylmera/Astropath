import { useEffect, useState } from 'react'
import './App.css'
import type { Nav, Theme, View } from '@/data/types'
import DATA from '@/data/astropath'
import Chrome from '@/components/Chrome'
import Tweaks from '@/components/Tweaks'
import GalaxyMap from '@/components/GalaxyMap'
import Dossier from '@/components/Dossier'
import LegionView from '@/components/LegionView'
import LoreView from '@/components/LoreView'
import MechanicusArchive from '@/components/MechanicusArchive'
import ForgeDossier from '@/components/ForgeDossier'
import SororitasArchive from '@/components/SororitasArchive'
import OrderDossier from '@/components/OrderDossier'

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

  // resolve entities for the current nav
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

      case 'primarch':
        if (!primarch) return <div className="view"><p>Not found.</p></div>
        return (
          <Dossier
            primarch={primarch}
            legion={getPrimarchLegion(primarch)}
            onOpenLegion={id => go('legion', id)}
            onOpenLore={id => go('lore', id)}
            onBack={() => go('galaxy')}
          />
        )

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

      case 'forge':
        if (!forge) return <div className="view"><p>Not found.</p></div>
        return (
          <ForgeDossier
            forge={forge}
            onBack={() => go('mechanicus')}
          />
        )

      case 'sororitas':
        return (
          <SororitasArchive
            orders={DATA.sororitas}
            onOpen={id => go('order', id)}
          />
        )

      case 'order':
        if (!order) return <div className="view"><p>Not found.</p></div>
        return (
          <OrderDossier
            order={order}
            onBack={() => go('sororitas')}
          />
        )

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
      <Tweaks theme={theme} setTheme={setTheme} />
    </>
  )
}
