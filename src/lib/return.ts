import type { ReTurnEntry, ReTurnTotals } from '../types'

/** Irish Re-turn: 15c for 150ml–500ml, 25c for 500ml–3L */
export const RE_TURN_CENTS_SMALL = 15
export const RE_TURN_CENTS_LARGE = 25
/** Approximate kg per container for "plastic/containers diverted" */
const KG_PER_CONTAINER = 0.025

export function computeReTurnTotals(entries: ReTurnEntry[]): ReTurnTotals {
  let smallTotal = 0
  let largeTotal = 0
  for (const e of entries) {
    smallTotal += e.smallCount
    largeTotal += e.largeCount
  }
  const containersReturned = smallTotal + largeTotal
  const moneyEuros = (smallTotal * RE_TURN_CENTS_SMALL + largeTotal * RE_TURN_CENTS_LARGE) / 100
  const weightKgEquivalent = containersReturned * KG_PER_CONTAINER
  return { moneyEuros, containersReturned, weightKgEquivalent }
}

export function getReTurnEntriesByDay(
  entries: ReTurnEntry[],
  days: number
): { date: string; smallCount: number; largeCount: number; total: number }[] {
  const result: { date: string; smallCount: number; largeCount: number; total: number }[] = []
  const today = new Date()
  const byDate = new Map(entries.map((e) => [e.date, e]))
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const date = d.toISOString().slice(0, 10)
    const e = byDate.get(date)
    const smallCount = e?.smallCount ?? 0
    const largeCount = e?.largeCount ?? 0
    result.push({ date, smallCount, largeCount, total: smallCount + largeCount })
  }
  return result
}
