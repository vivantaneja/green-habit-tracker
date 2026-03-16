export interface Habit {
  id: string
  name: string
  unit: string
  /** Impact per single completion (e.g. 1 bottle, 0.5 kg CO2) */
  bottlesPerCompletion: number
  /** kg CO2 avoided per completion (ignored when co2KgPerKm is set) */
  co2KgPerCompletion: number
  /** Optional: for habits that support count (e.g. bags used) */
  supportsCount?: boolean
  /** When set, count is treated as distance in km and CO2 = count * co2KgPerKm (e.g. bike/walk) */
  co2KgPerKm?: number
}

export interface LogEntry {
  date: string // YYYY-MM-DD
  habitId: string
  count?: number // optional; for binary habits treat as 1 if present
}

export interface ImpactTotals {
  totalBottlesSaved: number
  totalBagsAvoided: number
  totalCo2Kg: number
  treeEquivalent: number
  bikeKm: number
  recycleItems: number
  byHabit: Record<string, { bottles: number; co2Kg: number; count: number }>
}

/** Irish Re-turn deposit scheme: one entry per date */
export interface ReTurnEntry {
  date: string // YYYY-MM-DD
  smallCount: number // 150ml–500ml, 15c
  largeCount: number // 500ml–3L, 25c
}

export interface ReTurnTotals {
  moneyEuros: number
  containersReturned: number
  weightKgEquivalent: number
}

export interface UserSuggestion {
  id: string
  text: string
  createdAt: string // ISO
}
