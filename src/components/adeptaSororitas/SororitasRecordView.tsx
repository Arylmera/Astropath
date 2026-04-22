import type { Entry } from '@/lib/datasets'
import { formatFileId } from '@/lib/lexicon'
import { createArchiveView } from '@/components/shared/createArchiveView'

interface Props {
  entry: Entry
  onBack: () => void
}

const PresetView = createArchiveView({
  datasetKey: 'sororitas',
  archiveLabel: 'Sororitas Archive',
  numeralClass: 'order-roman',
  backLabel: 'Back to archive',
  footerBackLabel: 'Sororitas archive',
})

export default function SororitasRecordView({ entry, onBack }: Props) {
  return (
    <PresetView
      id={entry.id}
      filename={`FILE-${formatFileId(entry.id)}`}
      title={entry.title}
      epithet={entry.page.replace(/_/g, ' ')}
      kicker={<>
        <span>Adepta Sororitas</span>
        <span className="lore-mast-sep">—</span>
        <span>{entry.subtitle}</span>
      </>}
      classification={entry.subtitle}
      numeral={entry.badge}
      manifest={[
        { label: 'Classification', value: entry.subtitle },
        { label: 'Archive Mark',   value: entry.badge },
      ]}
      image={entry.portrait ?? undefined}
      onBack={onBack}
    />
  )
}
