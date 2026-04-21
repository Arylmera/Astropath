interface Props { label: string; onClick: () => void }

export default function BackButton({ label, onClick }: Props) {
  return (
    <div style={{ marginBottom: 28 }}>
      <button className="back-btn" onClick={onClick}>← {label}</button>
    </div>
  )
}
