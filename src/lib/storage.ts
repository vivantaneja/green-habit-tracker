import type { LogEntry } from '../types'

const STORAGE_KEY = 'green-habit-logs'

export function loadLogs(): LogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as LogEntry[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveLogs(logs: LogEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
}

export function addLog(entry: LogEntry): LogEntry[] {
  const logs = loadLogs()
  const existing = logs.findIndex(
    (l) => l.date === entry.date && l.habitId === entry.habitId
  )
  let next: LogEntry[]
  if (existing >= 0) {
    next = [...logs]
    next[existing] = { ...entry, count: entry.count ?? next[existing].count ?? 1 }
  } else {
    next = [...logs, { ...entry, count: entry.count ?? 1 }]
  }
  saveLogs(next)
  return next
}

export function removeLog(date: string, habitId: string): LogEntry[] {
  const logs = loadLogs().filter((l) => !(l.date === date && l.habitId === habitId))
  saveLogs(logs)
  return logs
}

export function getLogsForDate(logs: LogEntry[], date: string): LogEntry[] {
  return logs.filter((l) => l.date === date)
}
