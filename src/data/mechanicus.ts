import type { Forge } from './types'

const mechanicus: Forge[] = [
  {
    id: 'mars', name: 'Mars', epithet: 'The Red Planet',
    segmentum: 'Solar', titanLegion: 'Legio Ignatum · Legio Tempestus',
    fabricator: 'Fabricator-General of Mars', dogma: 'Glory to the Omnissiah',
    colors: 'Crimson · silver · black', primacy: 'Forge World Principal', iconSeed: 'mars',
    lore: [
      "Mars — the first and greatest of all Forge Worlds, the Red Planet, the birthplace of the Cult Mechanicus. Headquarters of the Adeptus Mechanicus and a world sacred to the Omnissiah.",
      "Millennia of incessant construction have turned the surface into a smog-choked hellscape of forge complexes, refineries and sky-scraping weapons shops. Above the equator turns the Ring of Iron — a vast geosynchronous lattice of drydocks that built the Great Crusade fleet and still builds Battlefleet Solar today.",
      "Beneath the Noctis Labyrinth, Mechanicus legend holds that the Void Dragon — an entity of the C'tan — sleeps. Should it ever wake, the very heart of the Imperium will tremble.",
    ],
  },
  {
    id: 'agripinaa', name: 'Agripinaa', epithet: 'Orb of a Million Scars',
    segmentum: 'Obscurus', titanLegion: 'Legio Praesidium Vortex',
    fabricator: 'Fabricator-Locum — ranks decimated', dogma: 'Staunch Defenders',
    colors: 'Black · reversed crimson', primacy: 'Borderworld to the Eye', iconSeed: 'agrip',
    lore: [
      'Agripinaa — industrial heartland of the old Cadian Gate, now an orb of a million scars. A world of sealed hives and toxic skies, whose only purpose is to arm the fronts that face the Eye of Terror.',
      "Its Skitarii wear the heraldry of Mars reversed — black over crimson — and accent their plate with metals distilled from strata yet unscarred by the Eye's unclean light.",
      "Since the Fall of Cadia and the opening of the Great Rift, Agripinaa has been besieged without end. Its priesthood has become expert in defensive warfare and the particular hatred reserved for the servants of Chaos.",
    ],
  },
  {
    id: 'graia', name: 'Graia', epithet: 'Crown of Miracles',
    segmentum: 'Tempestus', titanLegion: 'Legio Astraman — "Morning Stars"',
    fabricator: 'Archimandrite of the Graian Crown', dogma: 'Refusal to Yield',
    colors: 'Crimson · bleached bone · funereal black', primacy: 'Only foundry for Warlord-class Titans', iconSeed: 'graia',
    lore: [
      "Graia — the Crown of Miracles. Its defenders reside not upon a planet but within the Graian Crown, a geometrically perfect lattice of void-stations crowning the sphere like a diadem.",
      "The Crown is a secret: its fusion engines allow it to slip gravity and translate the Warp, carrying Graia's armies and forges to any world worth the plundering. That secret has drawn both Necron raiders and Chaos Daemons in turn.",
      'The Ajakis Manufactorum is one of the few facilities in the Imperium still capable of constructing a Warlord-class Titan — which makes Graia a prize worth any war.',
    ],
  },
  {
    id: 'lucius', name: 'Lucius', epithet: 'The Hollow Forge',
    segmentum: 'Obscurus', titanLegion: 'Legio Astorum — "Warp Runners"',
    fabricator: 'Magos Dominus of the Solar Blessing', dogma: 'The Solar Blessing',
    colors: 'Mars-red · solar-scorched black · cream', primacy: 'Hollow-world sun-core', iconSeed: 'lucius',
    lore: [
      'Lucius — the Hollow Forge. At its centre, where a planetary core should be, burns an artificial sun: a titanic fusion reactor that powers the industrial sprawl coating the inside of the world.',
      'No one living knows how that sun came to be, though the priesthood will claim the credit if asked. The Solar Blessing it grants forges Luciun alloy — scorched black, reserved for masterworks and bionics.',
      'The Warp Runners of Legio Astorum are the only god-engines sophisticated enough to teleport directly into battle. It is a point of pride among the Lucians, and a point of envy amongst every other Legion.',
    ],
  },
  {
    id: 'metalica', name: 'Metalica', epithet: 'Gleaming Giant of Ultima',
    segmentum: 'Ultima', titanLegion: 'Legio Metalica — "Iron Skulls"',
    fabricator: 'Archimagos of the Hissing Forge', dogma: 'Anarchy is Anathema',
    colors: 'Gunmetal · bone · white stripe', primacy: 'Sole-source foundry to Armageddon', iconSeed: 'metalica',
    lore: [
      "Metalica — formed almost entirely of metal. No rocky crust covers its dull silver surface, no flora nor fauna has been suffered to endure, and its atmosphere is inimical to life.",
      'The engine-driven monstrosities that grind out of its furnaces are born by the hundred every dawn. All weapons produced here share a signature blaring note — made deliberately loud so that the foe might hear the industrial glory of the Omnissiah before they perish.',
      'The Iron Skulls of Legio Metalica have fought — and bled — in all three Wars for Armageddon. Their priesthood bears a special revulsion for anarchy, and answers Armageddon\'s call whenever it rings.',
    ],
  },
  {
    id: 'ryza', name: 'Ryza', epithet: 'Furnace of Shackled Stars',
    segmentum: 'Ultima', titanLegion: 'Legio Crucius — "Warmongers"',
    fabricator: 'Magos Dominus Prosperata', dogma: 'Plasma & Containment',
    colors: 'Plasma-blue · soot-black · hazard yellow', primacy: 'STC-holder for plasma weaponry', iconSeed: 'ryza',
    lore: [
      'Ryza — the Furnace of Shackled Stars. Famed across the Imperium for its magnetic containment fields and plasma weapons; the Leman Russ Executioner and the Stormblade super-heavy were first forged within its armour-cradles.',
      "For forty standard years the planet bore the brunt of two Ork WAAAGH!s — Grax and Rarguts — and every bullet, stubber and plasma coil it could forge was turned inward to its own defenders. The tech-priests confess they welcomed the opportunity.",
      'Ryza was held. The Warlord Titan Pugnus Vindictae finally put Warlord Grax down, and the Warmongers now stand ready for whatever furnace-war comes next.',
    ],
  },
  {
    id: 'stygies-viii', name: 'Stygies VIII', epithet: 'The Ever-Staring Cyclops',
    segmentum: 'Pacificus', titanLegion: 'Legio Honorum — "Death Bolts"',
    fabricator: 'Xenarite Conclave (unofficial)', dogma: 'Xenos technology is sacred data',
    colors: 'Void-black · bronze · violet trim', primacy: 'Least-trusted forge in the Imperium', iconSeed: 'stygies',
    lore: [
      "Stygies VIII — the Ever-Staring Cyclops. No Forge World is less trusted by the Imperium. Its priesthood pursues xenos war-tech with a fervour the orthodox find heretical and the Deathwatch find actionable.",
      "In the Horus Heresy the world was saved from Chaos only by the intervention of the Aeldari of Saim-Hann, who came to deny Chaos the forge — not to save its inhabitants. From that event rose the secretive Xenarite sect.",
      'A quiet war still unfolds in its reliquary-halls: Kill-teams of the Ordo Xenos hunt Radical magi who would plunder the Black Library itself for the Quest for Knowledge.',
    ],
  },
]

export default mechanicus
