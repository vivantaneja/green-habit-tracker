import { useCallback } from 'react'
import type { ReTurnEntry } from '../types'
import { useLocalStorage } from './useLocalStorage'
import { computeReTurnTotals } from '../lib/return'

const STORAGE_KEY = 'green-habit-return'

export function useReTurnLogs() {
  const [entries, setEntries] = useLocalStorage<ReTurnEntry[]>(STORAGE_KEY, [])

  const totals = computeReTurnTotals(entries)

  const upsertEntry = useCallback(
    (date: string, smallCount: number, largeCount: number) => {
      setEntries((prev) => {
        const rest = prev.filter((e) => e.date !== date)
        if (smallCount === 0 && largeCount === 0) return rest
        return [...rest, { date, smallCount, largeCount }]
      })
    },
    [setEntries]
  )

  const getEntryForDate = useCallback(
    (date: string): ReTurnEntry | undefined => {
      return entries.find((e) => e.date === date)
    },
    [entries]
  )

  const removeEntry = useCallback(
    (date: string) => {
      setEntries((prev) => prev.filter((e) => e.date !== date))
    },
    [setEntries]
  )

  return { entries, totals, upsertEntry, getEntryForDate, removeEntry }
}
