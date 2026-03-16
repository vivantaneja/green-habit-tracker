const STORAGE_KEYS = [
  'green-habit-logs',
  'green-habit-return',
  'green-habit-quick-log-ids',
  'green-habit-suggestions',
] as const

/** Remove all app data from localStorage. Caller should reload or re-initialise state. */
export function clearAllAppData(): void {
  for (const key of STORAGE_KEYS) {
    try {
      localStorage.removeItem(key)
    } catch {
      // ignore
    }
  }
}
