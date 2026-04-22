import type { Entry } from '@/lib/datasets'
import ArchiveLoreView from '@/components/shared/ArchiveLoreView'

interface Props {
  entry: Entry
  onBack: () => void
}

export default function SororitasRecordView({ entry, onBack }: Props) {
  const filename = `FILE-${entry.id.toUpperCase().replace(/-/g, '‑')}`
  return (
    <ArchiveLoreView
      datasetKey="sororitas"
      id={entry.id}
      filename={filename}
      title={entry.title}
      epithet={entry.page.replace(/_/g, ' ')}
      kicker={<>
        <span>Adepta Sororitas</span>
        <span className="lore-mast-sep">—</span>
        <span>{entry.subtitle}</span>
      </>}
      classification={entry.subtitle}
      archiveLabel="Sororitas Archive"
      numeral={entry.badge}
      numeralClass="order-roman"
      manifest={[
        { label: 'Classification', value: entry.subtitle },
        { label: 'Archive Mark',   value: entry.badge },
      ]}
      image={entry.portrait ?? undefined}
      onBack={onBack}
      backLabel="Back to archive"
      footerBackLabel="Sororitas archive"
    />
  )
}
