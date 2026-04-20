interface Props {
  lore: string[]
  className?: string
}

export default function LoreList({ lore, className = 'lexicon-lore' }: Props) {
  return (
    <div className={className}>
      {lore.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  )
}
