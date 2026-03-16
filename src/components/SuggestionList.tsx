import type { UserSuggestion } from '../types'

interface SuggestionListProps {
  suggestions: UserSuggestion[]
  onRemove: (id: string) => void
}

export function SuggestionList({ suggestions, onRemove }: SuggestionListProps) {
  if (suggestions.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No suggestions yet. Add one above to request a new habit or option.
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {suggestions.map((s) => (
        <li
          key={s.id}
          className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-card transition-all hover:shadow-card-hover"
        >
          <span className="text-sm text-slate-800">{s.text}</span>
          <button
            type="button"
            onClick={() => onRemove(s.id)}
            className="shrink-0 rounded px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            aria-label="Remove suggestion"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}
