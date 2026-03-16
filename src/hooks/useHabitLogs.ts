import { useCallback } from 'react'
import type { LogEntry } from '../types'
import { useLocalStorage } from './useLocalStorage'

export function useHabitLogs() {
  const [logs, setLogs] = useLocalStorage<LogEntry[]>('green-habit-logs', [])

  const addLog = useCallback((entry: LogEntry) => {
    setLogs((prev) => {
      const copy = prev.filter(
        (l) => !(l.date === entry.date && l.habitId === entry.habitId)
      )
      copy.push({ ...entry, count: entry.count ?? 1 })
      return copy
    })
  }, [setLogs])

  const removeLog = useCallback((date: string, habitId: string) => {
    setLogs((prev) =>
      prev.filter((l) => !(l.date === date && l.habitId === habitId))
    )
  }, [setLogs])

  return { logs, addLog, removeLog, setLogs }
}
