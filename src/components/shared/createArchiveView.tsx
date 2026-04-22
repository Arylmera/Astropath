import ArchiveLoreView, { type ArchiveLoreViewProps } from './ArchiveLoreView'

type PresetKeys =
  | 'datasetKey'
  | 'archiveLabel'
  | 'numeral'
  | 'numeralClass'
  | 'classification'
  | 'backLabel'
  | 'footerBackLabel'

type Preset = Pick<ArchiveLoreViewProps, PresetKeys>

export type ArchiveViewInput =
  Omit<ArchiveLoreViewProps, PresetKeys> & Partial<Preset>

export function createArchiveView(preset: Partial<Preset>) {
  return function PresetArchiveView(props: ArchiveViewInput) {
    return <ArchiveLoreView {...(preset as Preset)} {...props} />
  }
}
