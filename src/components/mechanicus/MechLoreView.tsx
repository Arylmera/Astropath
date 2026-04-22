import type { ReactNode } from 'react'
import { formatFileId } from '@/lib/lexicon'
import { MechanicalCog } from '@/screens/AdeptusMechanicusScreen'
import { createArchiveView } from '@/components/shared/createArchiveView'
import type { ManifestField } from '@/components/shared/ArchiveLoreView'

export type { ManifestField }

const MECH_NUMERAL = (
  <svg viewBox="-180 -180 360 360" width="100%" height="100%">
    <MechanicalCog teeth={24} outer={170} inner={148} />
  </svg>
)

const PresetView = createArchiveView({
  datasetKey: 'admech',
  archiveLabel: 'Adeptus Mechanicus',
  numeral: MECH_NUMERAL,
  numeralClass: 'forge-roman',
  classification: 'Classified · Ferrum',
})

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

export default function MechLoreView({ id, manifest = [], ...rest }: Props) {
  return (
    <PresetView
      id={id}
      filename={`FILE-${formatFileId(id)}`}
      manifest={manifest}
      {...rest}
    />
  )
}
