import type { DistanceUnit } from '../lib/distanceUnit'
import { useUnitPreferences } from './useUnitPreferences'

export function useDistanceUnit(): [
  DistanceUnit,
  (unit: DistanceUnit) => void
] {
  const [prefs, setPrefs] = useUnitPreferences()
  return [
    prefs.distance,
    (unit) => setPrefs((prev) => ({ ...prev, distance: unit })),
  ]
}
