// Shared lore cleanup used by fetch scripts and the polish CLI.
// Operates on the already-stripped wikitext produced by the fetch scripts;
// removes residual scraping artifacts and normalises whitespace.

const BRACKET_ARTIFACTS = [
  /\.\]\]/g,   // ".]]" — common caption tail after File/Image strip
  /\]\]/g,     // orphan closing wikilinks
  /\[\[/g,     // orphan opening wikilinks
];

const IMAGE_SYNTAX = [
  /\b(?:thumb|right|left|center|none|frame|frameless|border|upright)\|/gi,
  /\b\d+px\|/gi,
];

const CITATION_MARKERS = /\[(?:citation needed|note[^\]]*|\d+)\]/gi;

export function polishLore(input) {
  if (typeof input !== "string" || input.length === 0) return input;
  let t = input;

  for (const r of BRACKET_ARTIFACTS) t = t.replace(r, "");
  for (const r of IMAGE_SYNTAX) t = t.replace(r, "");
  t = t.replace(CITATION_MARKERS, "");

  // Lines that became just brackets/pipes after stripping
  t = t.replace(/^\s*[\[\]|]+\s*$/gm, "");
  // Leading orphan pipe on a line ("| foo" → "foo")
  t = t.replace(/^\s*\|\s*/gm, "");

  // Collapse runs of non-newline whitespace
  t = t.replace(/[ \t]{2,}/g, " ");
  // Trim trailing whitespace per line
  t = t.replace(/[ \t]+$/gm, "");
  // Collapse 3+ blank lines to a single blank line
  t = t.replace(/\n{3,}/g, "\n\n");

  // Ensure blank line around `## Heading` so parseLore keeps sections apart
  t = t.replace(/([^\n])\n(## )/g, "$1\n\n$2");
  t = t.replace(/(## [^\n]+)\n([^\n#])/g, "$1\n\n$2");

  return t.trim();
}

// Given a parsed JSON object shaped like { lore: string, ... }, return a
// new object with `lore` polished. Leaves all other fields untouched.
export function polishLoreEntry(entry) {
  if (!entry || typeof entry !== "object") return entry;
  if (typeof entry.lore !== "string") return entry;
  return { ...entry, lore: polishLore(entry.lore) };
}
