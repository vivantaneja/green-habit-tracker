/** Timeline filter: daily resets to today only; week = last 7 days; month = last 30 days; all = no filter */
export type Timeline = 'all' | 'today' | 'week' | 'month'

function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

export interface DateRange {
  start: string | null
  end: string
  daysInRange: number
}

export function getDateRangeForTimeline(timeline: Timeline): DateRange {
  const end = todayStr()
  const endDate = new Date(end)

  switch (timeline) {
    case 'today':
      return { start: end, end, daysInRange: 1 }
    case 'week': {
      const startDate = new Date(endDate)
      startDate.setDate(startDate.getDate() - 6)
      const start = startDate.toISOString().slice(0, 10)
      return { start, end, daysInRange: 7 }
    }
    case 'month': {
      const startDate = new Date(endDate)
      startDate.setDate(startDate.getDate() - 29)
      const start = startDate.toISOString().slice(0, 10)
      return { start, end, daysInRange: 30 }
    }
    default:
      return { start: null, end, daysInRange: 0 }
  }
}

export function filterLogsByTimeline<T extends { date: string }>(
  items: T[],
  timeline: Timeline
): T[] {
  if (timeline === 'all') return items
  const { start, end } = getDateRangeForTimeline(timeline)
  if (!start) return items
  return items.filter((item) => item.date >= start && item.date <= end)
}

/** Days from first log to today (for "all time" average) */
export function getDaysInRangeForAllTime(logs: { date: string }[]): number {
  if (logs.length === 0) return 1
  const dates = [...new Set(logs.map((l) => l.date))].sort()
  const first = dates[0]
  const last = todayStr()
  if (first > last) return 1
  const a = new Date(first)
  const b = new Date(last)
  return Math.max(1, Math.ceil((b.getTime() - a.getTime()) / (24 * 60 * 60 * 1000)) + 1)
}
