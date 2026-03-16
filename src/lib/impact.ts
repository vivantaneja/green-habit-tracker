import type { LogEntry, ImpactTotals } from '../types'
import { HABITS, KG_CO2_PER_TREE_PER_YEAR, getHabitById } from './habits'

export function computeImpactTotals(logs: LogEntry[]): ImpactTotals {
  const byHabit: Record<string, { bottles: number; co2Kg: number; count: number }> = {}
  for (const h of HABITS) {
    byHabit[h.id] = { bottles: 0, co2Kg: 0, count: 0 }
  }

  let totalBottlesSaved = 0
  let totalBagsAvoided = 0
  let totalCo2Kg = 0
  let bikeKm = 0
  let recycleItems = 0

  for (const log of logs) {
    const habit = getHabitById(log.habitId)
    if (!habit) continue
    const count = log.count ?? 1
    const bottles = habit.bottlesPerCompletion * count
    const co2 =
      habit.co2KgPerKm != null
        ? count * habit.co2KgPerKm
        : habit.co2KgPerCompletion * count

    byHabit[log.habitId].bottles += bottles
    byHabit[log.habitId].co2Kg += co2
    byHabit[log.habitId].count += count

    totalBottlesSaved += bottles
    totalCo2Kg += co2
    if (log.habitId === 'reusable-bag') totalBagsAvoided += count
    if (log.habitId === 'bike-walk') bikeKm += count
    if (log.habitId === 'recycle') recycleItems += count
  }

  const treeEquivalent = totalCo2Kg / KG_CO2_PER_TREE_PER_YEAR

  return {
    totalBottlesSaved,
    totalBagsAvoided,
    totalCo2Kg,
    treeEquivalent,
    bikeKm,
    recycleItems,
    byHabit,
  }
}

/** Get current streak: consecutive days up to today with at least one log */
export function getStreak(logs: LogEntry[]): number {
  const dates = [...new Set(logs.map((l) => l.date))].sort().reverse()
  if (dates.length === 0) return 0
  const today = new Date().toISOString().slice(0, 10)
  if (dates[0] !== today) return 0
  let streak = 0
  let d = new Date(today)
  for (const _ of dates) {
    const key = d.toISOString().slice(0, 10)
    if (dates.includes(key)) {
      streak++
      d.setDate(d.getDate() - 1)
    } else break
  }
  return streak
}

/** Get logs grouped by date for the last N days */
export function getLogsByDay(logs: LogEntry[], days: number): { date: string; count: number }[] {
  const result: { date: string; count: number }[] = []
  const today = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const date = d.toISOString().slice(0, 10)
    const count = logs.filter((l) => l.date === date).length
    result.push({ date, count })
  }
  return result
}
