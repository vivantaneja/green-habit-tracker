import { Sparkles } from '../components/Icons'
import { SuggestionForm } from '../components/SuggestionForm'
import { SuggestionList } from '../components/SuggestionList'
import { useSuggestions } from '../hooks/useSuggestions'

function downloadSuggestionsAsFile(suggestions: { id: string; text: string; createdAt: string }[]) {
  const blob = new Blob(
    [JSON.stringify({ exportedAt: new Date().toISOString(), suggestions }, null, 2)],
    { type: 'application/json' }
  )
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `green-habit-suggestions-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export default function Suggestions() {
  const { suggestions, addSuggestion, removeSuggestion, clearAllSuggestions } = useSuggestions()

  const handleClearAll = () => {
    if (suggestions.length === 0) return
    if (window.confirm(`Clear all ${suggestions.length} suggestion${suggestions.length === 1 ? '' : 's'}? This cannot be undone.`)) {
      clearAllSuggestions()
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-primary-600" size={28} />
          Request an option
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Suggest a new habit or feature. Stored locally on your device.
        </p>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
        <h2 className="text-sm font-medium text-slate-900 mb-3">Add suggestion</h2>
        <SuggestionForm onSubmit={addSuggestion} />
      </section>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-medium text-slate-900">Your suggestions</h2>
          {suggestions.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => downloadSuggestionsAsFile(suggestions)}
                className="text-sm font-medium text-primary-700 hover:text-primary-800 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
              >
                Download all to file
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-sm font-medium text-slate-500 hover:text-slate-700 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 rounded"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
        <SuggestionList suggestions={suggestions} onRemove={removeSuggestion} />
      </section>
    </div>
  )
}
