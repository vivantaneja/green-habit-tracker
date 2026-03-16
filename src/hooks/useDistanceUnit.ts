import type { DistanceUnit } from '../lib/distanceUnit'
import { useLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'green-habit-distance-unit'

export function useDistanceUnit(): [
  DistanceUnit,
  (unit: DistanceUnit) => void
] {
  const [unit, setUnit] = useLocalStorage<DistanceUnit>(STORAGE_KEY, 'km')
  return [unit, setUnit]
}
