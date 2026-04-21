export const CATEGORY_ORDER = [
  'overview',
  'order-militant',
  'character',
  'concept',
  'related',
] as const

export type CategoryKey = typeof CATEGORY_ORDER[number]

export const CATEGORY_COPY: Record<string, { title: string; lede: string }> = {
  overview: {
    title: 'Foundations of the Sisterhood',
    lede: 'Core records that frame the Adepta Sororitas, their creed, and their place within the Ecclesiarchy.',
  },
  'order-militant': {
    title: 'Orders Militant',
    lede: 'The great martial orders descended from Dominica\u2019s daughters, each preserved as its own chapel-panel.',
  },
  character: {
    title: 'Saints and Commanders',
    lede: 'Canonised martyrs, living exemplars, and leaders whose deeds shape the Sororitas in the current age.',
  },
  concept: {
    title: 'Ranks and Sacred Offices',
    lede: 'Terms, titles, and archetypes that define how the Sisterhood is organised and remembered.',
  },
  related: {
    title: 'Adjacent Sisterhoods',
    lede: 'Closely related institutions and parallel orders often invoked beside the Sororitas in Imperial records.',
  },
}

export const ARCHIVE_HEADER = {
  kicker: 'Archive \u00b7 Adepta Sororitas',
  cross: '\u271a',
  title: 'Archive of the Sisterhood',
  lede: 'The Sororitas records are now split by category, from foundational doctrine to the Orders Militant, saints, ranks, and related Imperial sisterhoods. Enter a chapel-panel to open its archive record.',
}

export const ARCHIVE_FOOTER = [
  'Ave Imperator',
  'In His Name we Burn',
] as const

export const PANEL_DEFAULTS = {
  glass: ['#3a1822', '#c7a15b', '#eadfc8'] as [string, string, string],
  epithet: 'Archive Record',
  dogma: 'Open the transcript from the Sororitas archive',
  unknownCategoryLede: 'Additional archive records preserved under this classification.',
}
