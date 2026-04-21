import { useState } from 'react'
import type { Theme } from '@/data/types'

interface Props {
  theme: Theme
  setTheme: (t: Theme) => void
}

const THEMES: { key: Theme; label: string; hint: string }[] = [
  { key: 'void',      label: 'Void',      hint: 'Deep space · ember accent' },
  { key: 'archive',   label: 'Archive',   hint: 'Bone paper · oxblood' },
  { key: 'cathedral', label: 'Cathedral', hint: 'Indigo void · stained glass' },
  { key: 'codex',     label: 'Codex',     hint: 'Ink & illuminated gold' },
]

export default function Tweaks({ theme, setTheme }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`tweaks-shell ${open ? 'open' : ''}`}>
      <button
        className="tweaks-toggle"
        aria-label="Tweaks menu"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className="tweaks-toggle-bars">
          <span /><span /><span />
        </span>
        <span className="tweaks-toggle-label">{open ? 'Close' : 'Theme'}</span>
      </button>

      {open && (
        <div className="tweaks-panel" role="menu">
          <div className="tweaks-panel-head">
            <span>Theme</span>
            <span className="tweaks-panel-current">
              {THEMES.find(t => t.key === theme)?.label}
            </span>
          </div>
          <div className="tweaks-panel-list">
            {THEMES.map(t => (
              <button
                key={t.key}
                role="menuitemradio"
                aria-checked={theme === t.key}
                className={`tweaks-opt ${theme === t.key ? 'active' : ''}`}
                onClick={() => setTheme(t.key)}
              >
                <span className="tweaks-opt-dot" data-theme-preview={t.key} />
                <span className="tweaks-opt-text">
                  <span className="tweaks-opt-label">{t.label}</span>
                  <span className="tweaks-opt-hint">{t.hint}</span>
                </span>
                {theme === t.key && <span className="tweaks-opt-check">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
