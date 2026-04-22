import type { ReactNode } from 'react'
import { formatFileId } from '@/lib/lexicon'
import { MechanicalCog } from '@/screens/AdeptusMechanicusScreen'
import ArchiveLoreView, { type ManifestField } from '@/components/shared/ArchiveLoreView'

interface Props {
  id: string
  title: string
  epithet?: string
  kicker: ReactNode
  classification?: string
  manifest?: ManifestField[]
  onBack: () => void
  backLabel?: string
  image?: string
}

const MECH_NUMERAL = (
  <svg viewBox="-180 -180 360 360" width="100%" height="100%">
    <MechanicalCog teeth={24} outer={170} inner={148} />
  </svg>
)

export default function MechLoreView({
  id,
  title,
  epithet,
  kicker,
  classification = 'Classified · Ferrum',
  manifest = [],
  onBack,
  backLabel,
  image,
}: Props) {
  return (
    <ArchiveLoreView
      datasetKey="admech"
      id={id}
      filename={`FILE-${formatFileId(id)}`}
      title={title}
      epithet={epithet}
      kicker={kicker}
      classification={classification}
      archiveLabel="Adeptus Mechanicus"
      numeral={MECH_NUMERAL}
      numeralClass="forge-roman"
      manifest={manifest}
      image={image}
      onBack={onBack}
      backLabel={backLabel}
    />
  )
}
