import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { HABITS } from '../lib/habits'

const STORAGE_KEY = 'green-habit-quick-log-ids'

const DEFAULT_QUICK_LOG_IDS: string[] = HABITS.slice(0, 4).map((h) => h.id)

export function useQuickLogHabits() {
  const [quickLogIds, setQuickLogIds] = useLocalStorage<string[]>(STORAGE_KEY, DEFAULT_QUICK_LOG_IDS)

  const isInQuickLog = useCallback(
    (habitId: string) => quickLogIds.includes(habitId),
    [quickLogIds]
  )

  const toggleQuickLog = useCallback(
    (habitId: string) => {
      setQuickLogIds((prev) =>
        prev.includes(habitId) ? prev.filter((id) => id !== habitId) : [...prev, habitId]
      )
    },
    [setQuickLogIds]
  )

  return { quickLogIds, isInQuickLog, toggleQuickLog }
}
