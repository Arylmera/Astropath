import type { Primarch } from '@/data/types'
import { allegianceClass } from '@/lib/lexicon'
import ArchiveLoreView from '@/components/shared/ArchiveLoreView'

interface Props {
  primarch: Primarch
  onBack: () => void
}

export default function LoreView({ primarch, onBack }: Props) {
  const metaLabel  = primarch.isEmperor ? 'EMPEROR' : 'PRIMARCH'
  const loyalClass = allegianceClass(primarch.allegiance)
  const filename   = `FILE-${primarch.num}-${primarch.id.toUpperCase().replace(/-/g, '‑')}`

  return (
    <ArchiveLoreView
      datasetKey="primarchs"
      id={primarch.id}
      filename={filename}
      title={primarch.name}
      epithet={primarch.epithet}
      kicker={<>
        <span>{metaLabel} · {primarch.num}</span>
        <span className="lore-mast-sep">—</span>
        <span>{primarch.legion}</span>
      </>}
      classification="Classified · Vermilion"
      archiveLabel="Segmentum Solar"
      numeral={primarch.roman}
      manifest={[
        { label: 'Homeworld',  value: primarch.homeworld },
        { label: 'Allegiance', value: <span className={`lore-manifest-v ${loyalClass}`}>{primarch.allegiance}</span> },
        { label: 'Status',     value: primarch.status },
      ]}
      image={primarch.portrait}
      onBack={onBack}
      backLabel="Back to lexicon"
      footerBackLabel={primarch.name.replace(/^The\s+/, '')}
    />
  )
}
