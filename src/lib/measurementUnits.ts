import type { DistanceUnit } from './distanceUnit'
import { kmToMiles, milesToKm } from './distanceUnit'

export type MassUnitPreference = 'auto' | 'grams' | 'kilograms'
export type VolumeUnitPreference = 'auto' | 'millilitres' | 'litres'
export type DurationUnitPreference = 'auto' | 'minutes' | 'hours'

export interface UnitPreferences {
  distance: DistanceUnit
  mass: MassUnitPreference
  volume: VolumeUnitPreference
  duration: DurationUnitPreference
}

export const DEFAULT_UNIT_PREFERENCES: UnitPreferences = {
  distance: 'km',
  mass: 'auto',
  volume: 'auto',
  duration: 'auto',
}

type MeasurementKind = 'distance' | 'mass' | 'volume' | 'duration'
type BaseUnit = 'km' | 'g' | 'ml' | 'min'
type DisplayUnit = 'km' | 'mi' | 'g' | 'kg' | 'ml' | 'l' | 'min' | 'h'

interface MeasurementDefinition {
  kind: MeasurementKind
  baseUnit: BaseUnit
}

const HABIT_MEASUREMENTS: Record<string, MeasurementDefinition> = {
  'bike-walk': { kind: 'distance', baseUnit: 'km' },
  'public-transport': { kind: 'distance', baseUnit: 'km' },
  composted: { kind: 'mass', baseUnit: 'g' },
  'shorter-shower': { kind: 'duration', baseUnit: 'min' },
}

export function getMeasurementDefinition(habitId: string): MeasurementDefinition | null {
  return HABIT_MEASUREMENTS[habitId] ?? null
}

function resolveDisplayUnit(def: MeasurementDefinition, prefs: UnitPreferences, baseValue: number): DisplayUnit {
  if (def.kind === 'distance') {
    return prefs.distance === 'miles' ? 'mi' : 'km'
  }
  if (def.kind === 'mass') {
    if (prefs.mass === 'kilograms') return 'kg'
    if (prefs.mass === 'grams') return 'g'
    return Math.abs(baseValue) >= 1000 ? 'kg' : 'g'
  }
  if (def.kind === 'volume') {
    if (prefs.volume === 'litres') return 'l'
    if (prefs.volume === 'millilitres') return 'ml'
    return Math.abs(baseValue) >= 1000 ? 'l' : 'ml'
  }
  if (prefs.duration === 'hours') return 'h'
  if (prefs.duration === 'minutes') return 'min'
  return Math.abs(baseValue) >= 60 ? 'h' : 'min'
}

function convertBaseToDisplay(baseValue: number, displayUnit: DisplayUnit): number {
  switch (displayUnit) {
    case 'mi':
      return kmToMiles(baseValue)
    case 'kg':
      return baseValue / 1000
    case 'l':
      return baseValue / 1000
    case 'h':
      return baseValue / 60
    default:
      return baseValue
  }
}

function convertDisplayToBase(displayValue: number, displayUnit: DisplayUnit): number {
  switch (displayUnit) {
    case 'mi':
      return milesToKm(displayValue)
    case 'kg':
      return displayValue * 1000
    case 'l':
      return displayValue * 1000
    case 'h':
      return displayValue * 60
    default:
      return displayValue
  }
}

function getDisplayStep(displayUnit: DisplayUnit): number {
  if (displayUnit === 'mi') return 0.1
  if (displayUnit === 'km') return 0.5
  if (displayUnit === 'kg') return 0.1
  if (displayUnit === 'l') return 0.1
  if (displayUnit === 'h') return 0.1
  return 1
}

function formatNumber(value: number, decimals = 1): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(decimals)
}

export interface HabitDisplayMeasurement {
  value: number
  valueLabel: string
  unit: string
  shortUnit: string
  inputStep: number
  quickStepBase: number
}

export function getHabitDisplayMeasurement(
  habitId: string,
  baseValue: number,
  prefs: UnitPreferences,
  fallbackUnit: string
): HabitDisplayMeasurement {
  const def = getMeasurementDefinition(habitId)
  if (!def) {
    const rounded = Math.round(baseValue)
    return {
      value: rounded,
      valueLabel: String(rounded),
      unit: fallbackUnit,
      shortUnit: fallbackUnit.replace(/\s+(saved|avoided)$/i, ''),
      inputStep: 1,
      quickStepBase: 1,
    }
  }

  const displayUnit = resolveDisplayUnit(def, prefs, baseValue)
  const displayValue = convertBaseToDisplay(baseValue, displayUnit)
  const unit = displayUnit
  return {
    value: displayValue,
    valueLabel: formatNumber(displayValue),
    unit,
    shortUnit: unit,
    inputStep: getDisplayStep(displayUnit),
    quickStepBase: convertDisplayToBase(1, displayUnit),
  }
}

export function convertHabitDisplayAmountToBase(
  habitId: string,
  displayAmount: number,
  prefs: UnitPreferences,
  currentBaseValue: number
): number {
  const def = getMeasurementDefinition(habitId)
  if (!def) return displayAmount
  const displayUnit = resolveDisplayUnit(def, prefs, currentBaseValue)
  return convertDisplayToBase(displayAmount, displayUnit)
}
