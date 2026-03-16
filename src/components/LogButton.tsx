interface LogButtonProps {
  logged: boolean
  onToggle: () => void
}

export function LogButton({ logged, onToggle }: LogButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
        logged
          ? 'bg-primary-400 text-primary-900 hover:bg-primary-300 shadow-card'
          : 'bg-white border-2 border-primary-600 text-primary-800 hover:bg-primary-50'
      }`}
    >
      {logged ? 'Done' : 'Log'}
    </button>
  )
}
