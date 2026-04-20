export type LoreBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }

export type LoreSection = {
  heading: string | null
  blocks: LoreBlock[]
}

export type GalleryItem = {
  file: string
  caption: string
  url: string
}

export type ParsedLore = {
  sections: LoreSection[]
  gallery: GalleryItem[]
  categories: string[]
  sources: string[]
  videos: string[]
}

const SKIP_SECTIONS = new Set(['gallery', 'videos', 'sources'])

function fileUrl(file: string): string {
  return `https://warhammer40k.fandom.com/wiki/Special:FilePath/${encodeURIComponent(file.replace(/\s+/g, '_'))}`
}

function parseFileLine(line: string): GalleryItem | null {
  const m = line.match(/^File:([^|]+)(?:\|(.+))?$/)
  if (!m) return null
  const file = m[1].trim()
  return { file, caption: (m[2] ?? '').trim(), url: fileUrl(file) }
}

export function parseLore(lore: string): ParsedLore {
  const sections: LoreSection[] = []
  const gallery: GalleryItem[] = []
  const categories: string[] = []
  const sources: string[] = []
  const videos: string[] = []

  let current: LoreSection = { heading: null, blocks: [] }
  let currentKey = ''
  let pendingList: string[] | null = null

  function flushList() {
    if (pendingList?.length) current.blocks.push({ type: 'ul', items: pendingList })
    pendingList = null
  }

  function commitSection() {
    flushList()
    const isSkip = current.heading !== null && SKIP_SECTIONS.has(currentKey)
    if (!isSkip && (current.heading !== null || current.blocks.length)) {
      sections.push(current)
    }
    current = { heading: null, blocks: [] }
  }

  for (const rawLine of lore.split('\n')) {
    const line = rawLine.trim()
    if (!line) { flushList(); continue }

    const heading = line.match(/^##\s+(.+?)\s*$/)?.[1]
    if (heading) {
      commitSection()
      currentKey = heading.toLowerCase()
      current = { heading, blocks: [] }
      continue
    }

    const category = line.match(/^Category:(.+)$/)?.[1]?.replace(/_/g, ' ').trim()
    if (category) {
      if (category.length > 1) categories.push(category)
      continue
    }

    if (/^[a-z]{2,3}:[A-Z]/.test(line) && !line.startsWith('File:')) continue

    if (line.startsWith('File:')) {
      const item = parseFileLine(line)
      if (item) {
        if (currentKey === 'videos' || /\.(webm|mp4|ogv)$/i.test(item.file)) {
          videos.push(item.caption || item.file)
        } else {
          gallery.push(item)
        }
      }
      continue
    }

    if (line.startsWith('*')) {
      const item = line.replace(/^\*+\s*/, '').trim()
      if (!item) continue
      if (currentKey === 'sources') { sources.push(item); continue }
      if (SKIP_SECTIONS.has(currentKey)) continue
      ;(pendingList ??= []).push(item)
      continue
    }

    if (SKIP_SECTIONS.has(currentKey)) continue
    flushList()
    current.blocks.push({ type: 'p', text: line })
  }

  commitSection()
  return { sections, gallery, categories, sources, videos }
}
