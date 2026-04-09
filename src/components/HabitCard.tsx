import { useState } from 'react'
import type { ComponentType } from 'react'
import type { Habit } from '../types'
import type { DistanceUnit } from '../lib/distanceUnit'
import { Bottle, ShoppingBag, Bike, Recycle, Lightbulb, Droplets, Bus, Utensils, Leaf } from './Icons'
import { useUnitPreferences } from '../hooks/useUnitPreferences'
import {
  convertHabitDisplayAmountToBase,
  getHabitDisplayMeasurement,
} from '../lib/measurementUnits'

const HABIT_ICONS: Record<string, ComponentType<{ className?: string; size?: number }>> = {
  'no-plastic-bottle': Bottle,
  'reusable-bag': ShoppingBag,
  'bike-walk': Bike,
  recycle: Recycle,
  'meat-free-day': Utensils,
  'lights-off': Lightbulb,
  'shorter-shower': Droplets,
  'public-transport': Bus,
  composted: Leaf,
  'paper-recycled': Recycle,
  'glass-recycled': Bottle,
}

interface HabitCardProps {
  habit: Habit
  /** Total for today (in storage unit: count or km) */
  count: number
  /** Called when user adjusts today's total; delta is in storage unit (count or km). */
  onAdjust: (delta: number) => void
  /** Display unit for distance habits (count is always stored in km) */
  distanceUnit?: DistanceUnit
}

export function HabitCard({
  habit,
  count = 0,
  onAdjust,
  distanceUnit,
}: HabitCardProps) {
  const [unitPrefs] = useUnitPreferences()
  const effectivePrefs = distanceUnit
    ? { ...unitPrefs, distance: distanceUnit }
    : unitPrefs
  const display = getHabitDisplayMeasurement(habit.id, count, effectivePrefs, habit.unit)
  const [addInput, setAddInput] = useState('')
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  const getAmountValue = () => {
    const parsed = addInput.trim() === '' ? null : parseFloat(addInput)
    return parsed != null && !Number.isNaN(parsed) && parsed > 0 ? parsed : 1
  }

  const getAmountFromInput = () => {
    return convertHabitDisplayAmountToBase(
      habit.id,
      getAmountValue(),
      effectivePrefs,
      count
    )
  }

  const handleQuickAdd = () => {
    onAdjust(display.quickStepBase)
  }

  const handleQuickReduce = () => {
    onAdjust(-display.quickStepBase)
  }

  const handleCustomAdd = () => {
    onAdjust(getAmountFromInput())
    setAddInput('')
  }

  const handleCustomReduce = () => {
    onAdjust(-getAmountFromInput())
    setAddInput('')
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="min-w-0 space-y-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
            {(() => {
              const Icon = HABIT_ICONS[habit.id] ?? Recycle
              return <Icon className="h-5 w-5" size={20} />
            })()}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900 truncate">{habit.name}</h3>
            <p className="text-sm text-slate-500 mt-0.5 truncate">{display.unit}</p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Today
            </p>
            <p className="mt-0.5 tabular-nums text-slate-900">
              <span className="text-2xl font-bold">
                {display.valueLabel}
              </span>{' '}
              <span className="text-base font-medium text-slate-600">{display.unit}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
          <p className="text-sm font-medium text-slate-600">Quick adjust</p>
          <div className="inline-flex items-center overflow-hidden rounded-lg border border-slate-300 bg-white">
            <button
              type="button"
              onClick={handleQuickReduce}
              className="h-11 w-11 bg-slate-50 text-lg font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset"
              aria-label="Decrease by one"
              title="Decrease by one"
            >
              -
            </button>
            <div className="min-w-[5.5rem] px-3 text-center text-xs font-medium uppercase tracking-wide text-slate-500">
              1 {display.shortUnit}
            </div>
            <button
              type="button"
              onClick={handleQuickAdd}
              className="h-11 w-11 bg-primary-600 text-lg font-semibold text-white transition-colors hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset"
              aria-label="Increase by one"
              title="Increase by one"
            >
              +
            </button>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => setIsAdvancedOpen((open) => !open)}
            className="text-sm font-medium text-primary-700 hover:text-primary-800"
            aria-expanded={isAdvancedOpen}
          >
            {isAdvancedOpen ? 'Hide custom amount' : 'Custom amount'}
          </button>

          {isAdvancedOpen && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <input
                type="number"
                min={0}
                step={display.inputStep}
                className="h-11 w-24 rounded-lg border-2 border-slate-300 px-3 py-0 text-sm tabular-nums focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none"
                value={addInput}
                placeholder="1"
                onChange={(e) => setAddInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleCustomAdd())}
                aria-label={`Custom amount in ${display.shortUnit}`}
              />
              <span className="text-sm text-slate-500">{display.shortUnit}</span>
              <button
                type="button"
                onClick={handleCustomReduce}
                className="h-11 min-w-20 rounded-lg bg-slate-100 px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
              >
                Apply -
              </button>
              <button
                type="button"
                onClick={handleCustomAdd}
                className="h-11 min-w-20 rounded-lg bg-primary-600 px-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              >
                Apply +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
