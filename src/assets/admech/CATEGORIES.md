# Adeptus Mechanicus — Entry Categories & Sub-tab Plan

## Overview
The mechanicus page currently shows only **Forge Worlds** (7 entries) in the archive wheel.
The remaining 25 entries are grouped into 7 categories, each planned as a sub-tab.

---

## Categories & Entries

### Forge World (7) — current archive wheel
| ID | Title |
|----|-------|
| mars | Mars |
| ryza | Ryza |
| metalica | Metalica |
| stygies-viii | Stygies VIII |
| lucius | Lucius |
| agripinaa | Agripinaa |
| graia | Graia |

Fields: `epithet · segmentum · titanLegion · fabricator · dogma · colors · primacy · iconSeed · lore`

---

### Organisation (3) — planned sub-tab
| ID | Title |
|----|-------|
| adeptus-mechanicus | Adeptus Mechanicus |
| mechanicum | Mechanicum (pre-Heresy) |
| cult-mechanicus | Cult Mechanicus |

Fields: `epithet · founded · dogma · colors · specialty · lore`

---

### Theology (3) — planned sub-tab
| ID | Title |
|----|-------|
| omnissiah | Omnissiah |
| machine-god | Machine God |
| machine-spirit | Machine Spirit |

Fields: `epithet · aspect · dogma · worship · lore`

---

### Rank (4) — planned sub-tab
| ID | Title |
|----|-------|
| fabricator-general | Fabricator-General |
| tech-priest | Tech-Priest |
| magos | Magos |
| archmagos | Archmagos |

Fields: `epithet · tier · specialty · lore`

---

### Character (2) — planned sub-tab
| ID | Title |
|----|-------|
| belisarius-cawl | Belisarius Cawl |
| kelbor-hal | Kelbor-Hal |

Fields: `epithet · homeworld · allegiance · specialty · lore`

---

### Military (10) — planned sub-tab
| ID | Title |
|----|-------|
| skitarii | Skitarii |
| kataphron | Kataphron |
| electro-priest | Electro-Priest |
| sicarian | Sicarian Infiltrator |
| ironstrider | Ironstrider |
| kastelan-robot | Kastelan Robot |
| legio-cybernetica | Legio Cybernetica |
| titan | Titan |
| collegia-titanica | Collegia Titanica |
| imperial-knights | Imperial Knights |

Fields: `epithet · specialty · strength · lore`

---

### Technology (1) — planned sub-tab
| ID | Title |
|----|-------|
| standard-template-construct | Standard Template Construct |

Fields: `epithet · specialty · status · lore`

---

### History (2) — planned sub-tab
| ID | Title |
|----|-------|
| dark-age-of-technology | Dark Age of Technology |
| schism-of-mars | Schism of Mars |

Fields: `epithet · period · specialty · lore`

---

## UI Plan
- Mechanicus page gets a **tab bar** along the top or side
- Tabs: `Forge Worlds | Organisation | Theology | Rank | Character | Military | Technology | History`
- Each tab renders a category-appropriate card layout
- Forge Worlds tab = existing archive wheel (unchanged)
- Other tabs = new card/list views reading from the category-specific JSON fields
