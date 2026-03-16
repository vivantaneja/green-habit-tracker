import { useCallback } from 'react'
import type { UserSuggestion } from '../types'
import { useLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'green-habit-suggestions'

function generateId(): string {
  return crypto.randomUUID?.() ?? `s-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useSuggestions() {
  const [suggestions, setSuggestions] = useLocalStorage<UserSuggestion[]>(STORAGE_KEY, [])

  const addSuggestion = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return
      setSuggestions((prev) => [
        ...prev,
        { id: generateId(), text: trimmed, createdAt: new Date().toISOString() },
      ])
    },
    [setSuggestions]
  )

  const removeSuggestion = useCallback(
    (id: string) => {
      setSuggestions((prev) => prev.filter((s) => s.id !== id))
    },
    [setSuggestions]
  )

  const clearAllSuggestions = useCallback(() => {
    setSuggestions([])
  }, [setSuggestions])

  return { suggestions, addSuggestion, removeSuggestion, clearAllSuggestions }
}
