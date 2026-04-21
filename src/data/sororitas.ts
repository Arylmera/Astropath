import type { Order } from './types'

const sororitas: Order[] = [
  {
    id: 'martyred-lady', name: 'Order of Our Martyred Lady', epithet: 'Fire of the Righteous',
    matriarch: 'Saint Katherine', convent: 'Convent Sanctorum · Ophelia VII',
    founded: '36th Millennium', parish: 'Segmentum Obscurus',
    dogma: 'Unrelenting pursuit of the faithless', colors: 'Black · bone white · bloody crimson',
    icon: 'skull-and-tears', glass: ['#a31622', '#1b1a1c', '#e5dccd'],
    lore: [
      "The Order of Our Martyred Lady — Saint Katherine's own. The most numerous and most widely spread of all Orders Militant, their name evokes hope in the righteous and terror in the faithless alike.",
      "On Armageddon half their number was martyred holding the Sanctorum of Saint Katherine against Ghazghkull Thraka — but they drew so many greenskins into the siege that other fronts were lit by their sacrifice.",
      'On Cadia during the Thirteenth Black Crusade, their faith called the Living Saint herself into being. Where Celestine walks, the Martyred Lady walks first.',
    ],
  },
  {
    id: 'ebon-chalice', name: 'Order of the Ebon Chalice', epithet: 'The Eldest Daughters',
    matriarch: 'Saint Alicia Dominica', convent: 'Convent Prioris · Terra',
    founded: '36th Millennium', parish: 'Segmentum Solar',
    dogma: 'Keepers of the first truth', colors: 'Black · gold · bone',
    icon: 'chalice', glass: ['#0a0a0c', '#c9a042', '#efe6cd'],
    lore: [
      'The Order of the Ebon Chalice — oldest of the Orders Militant, founded at the very birth of the Adepta Sororitas by Saint Alicia Dominica herself.',
      'The most honoured of their sisters are entrusted with a fragment of the hallowed truth Dominica learned in the chamber of the Golden Throne. What she saw there, the order does not say.',
      'In the Era Indomitus they have stood shoulder to shoulder with the Custodes and the Mechanicus, and eradicated more than one warband marching for Terra. The Chalice does not empty.',
    ],
  },
  {
    id: 'bloody-rose', name: 'Order of the Bloody Rose', epithet: 'Blades in Earnest',
    matriarch: 'Saint Mina', convent: 'Convent Sanctorum · Ophelia VII',
    founded: '38th Millennium', parish: 'Drusus Marches · Southern Rift',
    dogma: 'Martial prowess above all', colors: 'Deep crimson · black · silver',
    icon: 'rose-and-sword', glass: ['#6d0f1d', '#1a0a0c', '#9aa0a8'],
    lore: [
      "The Order of the Bloody Rose — Saint Mina's heirs. She was said to be Dominica's champion, and to have duelled the leader of the Custodians in the Ecclesiarchal Palace to a standstill before terms of alliance were spoken.",
      'Where their sisters pray, the Bloody Rose spar. They revere Mina as the epitome of martial virtue and dedicate themselves to emulating her prowess — blade, bolt, and the long reach of the power-maul.',
      'They stand against the Hive Fleets in the galactic south and against the Cult of Duplicity that serves the Thousand Sons. Against sorcery they answer only with the sharpened edge.',
    ],
  },
  {
    id: 'valorous-heart', name: 'Order of the Valorous Heart', epithet: 'The Penitent',
    matriarch: 'Saint Lucia', convent: 'Convent Prioris · Terra',
    founded: '36th Millennium', parish: 'Ultima Segmentum · the Abacination',
    dogma: 'Atonement through endurance', colors: 'Sable · silver · ember',
    icon: 'heart-and-thorn', glass: ['#1c1c26', '#3a5061', '#cfcfd4'],
    lore: [
      "The Order of the Valorous Heart — Saint Lucia's heirs, the penitent. They were Dominica's level-headed counterpoint to Katherine's burning passion: the immovable anvil to the Fiery Heart's hammer.",
      "A disproportionate number of their number take the vows of the Sisters Repentia. They still believe they must atone for the Sisterhood's service to the mad High Lord Vandire during the Age of Apostasy — no matter that the sin is ten thousand years old.",
      "Many of their sanctuaries now lie in Imperium Nihilus, blinded by the Great Rift. They call this the Hour of Abacination — the Imperium has been blinded, as Lucia was blinded. They endure.",
    ],
  },
  {
    id: 'argent-shroud', name: 'Order of the Argent Shroud', epithet: 'The Silent Sisters',
    matriarch: 'Saint Silvana', convent: 'Convent Prioris · Terra',
    founded: '36th Millennium', parish: 'Borders of the Great Rift',
    dogma: 'Deeds, not words', colors: 'Silver · black · unstained white',
    icon: 'shroud', glass: ['#8a8c93', '#1a1b1f', '#e6e7eb'],
    lore: [
      "The Order of the Argent Shroud — Saint Silvana's heirs. She was the quiet one of Dominica's five, struck down by poison before she could ever lead a War of Faith. Her body lay in state for a week — then vanished, unexplained.",
      'Her sisters speak little. Where other orders preach, the Shroud simply acts. Multiple preceptories once thought lost to the Noctis Aeterna have since been seen in battle on the Rift — appearing without warning, striking at the unprepared, then gone again.',
      'They never say what became of their sanctuary-worlds. That silence is, itself, the answer.',
    ],
  },
  {
    id: 'fiery-heart', name: 'Order of the Fiery Heart', epithet: 'The Burning Faithful',
    matriarch: 'Saint Katherine', convent: 'Convent Sanctorum · Ophelia VII',
    founded: '36th Millennium', parish: 'Segmentum Solar · the Ember Worlds',
    dogma: 'Faith purified through flame', colors: 'White · flame-red · gold',
    icon: 'flaming-heart', glass: ['#c44010', '#e8920a', '#f5deb0'],
    lore: [
      "The Order of the Fiery Heart — Saint Katherine's own line, eldest daughters of righteous fire. Where the Martyred Lady mourns, the Fiery Heart burns. Their faith is not a shield; it is a pyre.",
      "They are recorded as the hammer to the Valorous Heart's anvil — drawn forward into the hottest engagements, trusting that the Emperor's will ignites them where lesser warriors would break.",
      "Many of their sanctuaries were consumed in the opening of the Great Rift. The surviving sisters did not retreat. They advanced into the flame.",
    ],
  },
  {
    id: 'sacred-rose', name: 'Order of the Sacred Rose', epithet: 'Beacons of Hope',
    matriarch: 'Saint Arabella', convent: 'Convent Prioris · Terra',
    founded: '38th Millennium', parish: 'Ultima Segmentum · light in the dark',
    dogma: 'Faith against despair', colors: 'White · rose-gold · pale blue',
    icon: 'rose-bloom', glass: ['#f1e9d8', '#d5a37a', '#8fa7c1'],
    lore: [
      "The Order of the Sacred Rose — Saint Arabella's heirs, canonised only after her death. She was a miracle-worker in life, walking the stars as a commander and beacon of faith for solar decades before her martyrdom.",
      'The circumstances of her death are not recorded in any Ecclesiarchal text. The Sacred Rose do not ask. They carry her flame instead.',
      'Where the light of the Imperium has grown faint, they establish sanctuaries — outposts of divinity in the most remote corners of the galaxy. The rose blooms where nothing else will.',
    ],
  },
]

export default sororitas
