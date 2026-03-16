/** User-facing distance unit. Data is always stored in km. */
export type DistanceUnit = 'km' | 'miles'

export const KM_TO_MILES = 0.62137119223733

export function kmToMiles(km: number): number {
  return km * KM_TO_MILES
}

export function milesToKm(miles: number): number {
  return miles / KM_TO_MILES
}

export function formatDistance(km: number, unit: DistanceUnit): string {
  if (unit === 'miles') {
    return `${kmToMiles(km).toFixed(1)} mi`
  }
  return `${km.toFixed(1)} km`
}

export function formatDistanceNumber(km: number, unit: DistanceUnit, decimals = 1): string {
  if (unit === 'miles') {
    return kmToMiles(km).toFixed(decimals)
  }
  return km.toFixed(decimals)
}
