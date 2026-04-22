import type { Primarch } from '@/data/types'
import { allegianceClass, formatFileId } from '@/lib/lexicon'
import { createArchiveView } from '@/components/shared/createArchiveView'

interface Props {
  primarch: Primarch
  onBack: () => void
}

const PresetView = createArchiveView({
  datasetKey: 'primarchs',
  archiveLabel: 'Segmentum Solar',
  classification: 'Classified · Vermilion',
  backLabel: 'Back to lexicon',
})

export default function LoreView({ primarch, onBack }: Props) {
  const metaLabel  = primarch.isEmperor ? 'EMPEROR' : 'PRIMARCH'
  const loyalClass = allegianceClass(primarch.allegiance)

  return (
    <PresetView
      id={primarch.id}
      filename={`FILE-${primarch.num}-${formatFileId(primarch.id)}`}
      title={primarch.name}
      epithet={primarch.epithet}
      kicker={<>
        <span>{metaLabel} · {primarch.num}</span>
        <span className="lore-mast-sep">—</span>
        <span>{primarch.legion}</span>
      </>}
      numeral={primarch.roman}
      manifest={[
        { label: 'Homeworld',  value: primarch.homeworld },
        { label: 'Allegiance', value: <span className={`lore-manifest-v ${loyalClass}`}>{primarch.allegiance}</span> },
        { label: 'Status',     value: primarch.status },
      ]}
      image={primarch.portrait}
      onBack={onBack}
      footerBackLabel={primarch.name.replace(/^The\s+/, '')}
    />
  )
}
