import type { Habit } from '../types'

/** Fixed list of green habits with impact per completion */
export const HABITS: Habit[] = [
  {
    id: 'no-plastic-bottle',
    name: 'No Plastic Water Bottle',
    unit: 'bottles saved',
    bottlesPerCompletion: 1,
    co2KgPerCompletion: 0,
    supportsCount: false,
  },
  {
    id: 'reusable-bag',
    name: 'Reusable Bag',
    unit: 'bags avoided',
    bottlesPerCompletion: 0,
    co2KgPerCompletion: 0.02,
    supportsCount: true,
  },
  {
    id: 'bike-walk',
    name: 'Bike or Walk Instead of Car',
    unit: 'km',
    bottlesPerCompletion: 0,
    co2KgPerCompletion: 0,
    supportsCount: true,
    /** ~0.12 kg CO2/km for average car avoided (EU ~0.1, conservative) */
    co2KgPerKm: 0.12,
  },
  {
    id: 'recycle',
    name: 'Recycle',
    unit: 'items',
    bottlesPerCompletion: 0,
    co2KgPerCompletion: 0.1,
    supportsCount: true,
  },
  {
    id: 'meat-free-day',
    name: 'Meat-Free Day',
    unit: 'days',
    bottlesPerCompletion: 0,
    co2KgPerCompletion: 0.5,
    supportsCount: false,
  },
  {
    id: 'lights-off',
    name: 'Turned Off Lights / Saved Energy',
    unit: 'times',
    bottlesPerCompletion: 0,
    co2KgPerCompletion: 0.02,
    supportsCount: true,
  },
  {
    id: 'shorter-shower',
    name: 'Shorter Shower',
    unit: 'minutes saved',
    // Approximate water savings shown as 500ml-bottle equivalents per minute.
    bottlesPerCompletion: 2,
    co2KgPerCompletion: 0.05,
    supportsCount: true,
  },
  {
    id: 'public-transport',
    name: 'Public Transport Instead of Car',
    unit: 'km',
    bottlesPerCompletion: 0,
    co2KgPerCompletion: 0.3,
    supportsCount: true,
  },
  {
    id: 'composted',
    name: 'Food Waste Composted',
    unit: 'grams',
    bottlesPerCompletion: 0,
    co2KgPerCompletion: 0.05,
    supportsCount: true,
  },
  {
    id: 'paper-recycled',
    name: 'Paper/Cardboard Recycled',
    unit: 'items',
    bottlesPerCompletion: 0,
    co2KgPerCompletion: 0.08,
    supportsCount: true,
  },
  {
    id: 'glass-recycled',
    name: 'Glass Recycled',
    unit: 'items',
    bottlesPerCompletion: 0,
    co2KgPerCompletion: 0.1,
    supportsCount: true,
  },
]

/** kg CO2 absorbed per tree per year (approx) – for "trees equivalent" */
export const KG_CO2_PER_TREE_PER_YEAR = 21

export function getHabitById(id: string): Habit | undefined {
  return HABITS.find((h) => h.id === id)
}
