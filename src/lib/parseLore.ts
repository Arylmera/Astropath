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
  const clean = file.replace(/\s+/g, '_')
  return `https://warhammer40k.fandom.com/wiki/Special:FilePath/${encodeURIComponent(clean)}`
}

function parseFileLine(line: string): GalleryItem | null {
  const m = line.match(/^File:([^|]+)(?:\|(.+))?$/)
  if (!m) return null
  const file = m[1].trim()
  const caption = (m[2] ?? '').trim()
  return { file, caption, url: fileUrl(file) }
}

export function parseLore(lore: string): ParsedLore {
  const rawLines = lore.split('\n')

  const sections: LoreSection[] = []
  const gallery: GalleryItem[] = []
  const categories: string[] = []
  const sources: string[] = []
  const videos: string[] = []

  let current: LoreSection = { heading: null, blocks: [] }
  let currentList: string[] | null = null
  let currentKey = ''

  const flushList = () => {
    if (currentList && currentList.length) {
      current.blocks.push({ type: 'ul', items: currentList })
    }
    currentList = null
  }

  const pushSection = () => {
    flushList()
    if (current.heading !== null || current.blocks.length) {
      sections.push(current)
    }
    current = { heading: null, blocks: [] }
  }

  for (const rawLine of rawLines) {
    const line = rawLine.trim()
    if (!line) {
      flushList()
      continue
    }

    // Headings
    const h = line.match(/^##\s+(.+?)\s*$/)
    if (h) {
      pushSection()
      const heading = h[1].trim()
      currentKey = heading.toLowerCase()
      current = { heading, blocks: [] }
      continue
    }

    // Categories (trailing)
    const cat = line.match(/^Category:(.+)$/)
    if (cat) {
      const name = cat[1].replace(/_/g, ' ').trim()
      // Skip single-letter alphabetical sort-key categories (e.g. "L" for Lorgar)
      if (name.length > 1) categories.push(name)
      continue
    }

    // Interwiki prefixes like "es:Foo", "de:Bar"
    if (/^[a-z]{2,3}:[A-Z]/.test(line) && !line.startsWith('File:')) {
      continue
    }

    // Files (gallery images or video thumbs)
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

    // Bullets
    if (line.startsWith('*')) {
      const item = line.replace(/^\*+\s*/, '').trim()
      if (!item) continue
      if (currentKey === 'sources') {
        sources.push(item)
        continue
      }
      if (SKIP_SECTIONS.has(currentKey)) continue
      if (!currentList) currentList = []
      currentList.push(item)
      continue
    }

    // Plain paragraph — skip if inside gallery/videos/sources
    if (SKIP_SECTIONS.has(currentKey)) continue

    flushList()
    current.blocks.push({ type: 'p', text: line })
  }

  pushSection()

  // Drop sections we handled specially
  const cleanSections = sections.filter((s) => {
    if (s.heading && SKIP_SECTIONS.has(s.heading.toLowerCase())) return false
    return s.heading !== null || s.blocks.length > 0
  })

  return { sections: cleanSections, gallery, categories, sources, videos }
}
