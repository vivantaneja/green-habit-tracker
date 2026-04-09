import { useMemo, useState } from 'react'
import type { ComponentType } from 'react'
import { Flame, Bottle, Leaf, Wind, Bike, Recycle, ShoppingBag, CircleDollar, Lightbulb, Droplets, Bus, Utensils } from '../components/Icons'
import { useHabitLogs } from '../hooks/useHabitLogs'
import { useReTurnLogs } from '../hooks/useReTurnLogs'
import { useImpactTotals } from '../hooks/useImpactTotals'
import { getStreak, getLogsByDay } from '../lib/impact'
import { computeReTurnTotals } from '../lib/return'
import {
  type Timeline,
  getDateRangeForTimeline,
  filterLogsByTimeline,
  getDaysInRangeForAllTime,
} from '../lib/timeline'
import { clearAllAppData } from '../lib/resetData'
import { formatDistanceNumber } from '../lib/distanceUnit'
import { useDistanceUnit } from '../hooks/useDistanceUnit'
import { useUnitPreferences } from '../hooks/useUnitPreferences'
import { HABITS } from '../lib/habits'
import { ImpactMetric } from '../components/ImpactMetric'
import { ImpactBar } from '../components/ImpactBar'
import { StreakChart } from '../components/StreakChart'
import { ProgressChart } from '../components/ProgressChart'
import { BottleIllustration } from '../components/BottleIllustration'
import { TreeIllustration } from '../components/TreeIllustration'
import { BikeIllustration } from '../components/BikeIllustration'
import { getHabitDisplayMeasurement } from '../lib/measurementUnits'

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

const TIMELINES: { value: Timeline; label: string }[] = [
  { value: 'all', label: 'All time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
]

export default function Impact() {
  const { logs } = useHabitLogs()
  const { entries: reTurnEntries, totals: reTurnTotalsAll } = useReTurnLogs()
  const [distanceUnit] = useDistanceUnit()
  const [unitPrefs] = useUnitPreferences()
  const [timeline, setTimeline] = useState<Timeline>('all')
  const [daysRange, setDaysRange] = useState<7 | 30>(7)

  const filteredLogs = useMemo(
    () => filterLogsByTimeline(logs, timeline),
    [logs, timeline]
  )
  const filteredReTurnEntries = useMemo(
    () => filterLogsByTimeline(reTurnEntries, timeline),
    [reTurnEntries, timeline]
  )

  const totals = useImpactTotals(filteredLogs)
  const reTurnTotals = useMemo(
    () => computeReTurnTotals(filteredReTurnEntries),
    [filteredReTurnEntries]
  )
  const streak = getStreak(filteredLogs)

  const dateRange = getDateRangeForTimeline(timeline)
  const daysForAverage =
    timeline === 'all'
      ? getDaysInRangeForAllTime(logs)
      : dateRange.daysInRange

  const chartDays = timeline === 'today' ? 1 : timeline === 'week' ? 7 : timeline === 'month' ? 30 : daysRange
  const chartData = getLogsByDay(filteredLogs, chartDays)

  const hasAnyLogs = logs.length > 0
  const bottles = Math.max(0, Number(totals.totalBottlesSaved ?? 0))
  const co2Kg = Math.max(0, Number(totals.totalCo2Kg ?? 0))
  const trees = Math.max(0, Number(totals.treeEquivalent ?? 0))
  const bikeKm = Math.max(0, Number(totals.bikeKm ?? 0))
  const maxImpact = Math.max(
    bottles,
    Math.ceil(co2Kg) || 1,
    trees * 10 || 1
  )

  const avgBottles = daysForAverage > 0 ? bottles / daysForAverage : 0
  const avgCo2Kg = daysForAverage > 0 ? co2Kg / daysForAverage : 0
  const avgTrees = daysForAverage > 0 ? trees / daysForAverage : 0
  const avgContainers =
    daysForAverage > 0
      ? Math.max(0, Number(reTurnTotals.containersReturned) || 0) / daysForAverage
      : 0
  const avgMoney =
    daysForAverage > 0
      ? Math.max(0, Number(reTurnTotals.moneyEuros) || 0) / daysForAverage
      : 0

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-slate-900 tracking-tight">
          Impact & Stats
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          View trends and impact over time. Filter by period to see daily reset or averages.
        </p>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
        <h2 className="text-sm font-medium text-slate-900 mb-3">Time period</h2>
        <div className="flex flex-wrap gap-2">
          {TIMELINES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTimeline(value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                timeline === value
                  ? 'bg-primary-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {!hasAnyLogs && (
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-sm text-slate-600">
            Log habits on the Dashboard or Habits page to see your impact here.
          </p>
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ImpactMetric
          value={bottles}
          label="Bottles saved"
          icon={<Bottle className="h-5 w-5" size={20} />}
        />
        <ImpactMetric
          value={`~${co2Kg.toFixed(1)} kg`}
          label="CO₂ avoided"
          icon={<Wind className="h-5 w-5" size={20} />}
        />
        <ImpactMetric
          value={`~${trees.toFixed(1)}`}
          label="Trees equivalent"
          icon={<Leaf className="h-5 w-5" size={20} />}
        />
        <ImpactMetric
          value={Math.max(0, Number(streak ?? 0))}
          label="Day streak"
          icon={<Flame className={`h-5 w-5 text-orange-500 ${streak > 0 ? 'animate-streak-flame' : ''}`} size={20} />}
        />
      </section>

      {hasAnyLogs && (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
          <h3 className="text-sm font-medium text-slate-900 mb-4">Daily average</h3>
          <p className="text-xs text-slate-500 mb-3">
            Average per day over the selected period{timeline === 'all' ? ' (all time)' : ''}.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ImpactMetric
              value={avgBottles.toFixed(1)}
              label="Bottles saved per day"
              icon={<Bottle className="h-5 w-5" size={20} />}
            />
            <ImpactMetric
              value={`~${avgCo2Kg.toFixed(2)} kg`}
              label="CO₂ avoided per day"
              icon={<Wind className="h-5 w-5" size={20} />}
            />
            <ImpactMetric
              value={`~${avgTrees.toFixed(2)}`}
              label="Trees equivalent per day"
              icon={<Leaf className="h-5 w-5" size={20} />}
            />
            <ImpactMetric
              value={bikeKm > 0 ? formatDistanceNumber(bikeKm / daysForAverage, distanceUnit) : '0'}
              label={distanceUnit === 'miles' ? 'mi biked/walked per day' : 'km biked/walked per day'}
              icon={<Bike className="h-5 w-5" size={20} />}
            />
          </div>
          {Math.max(0, Number(reTurnTotals.containersReturned) || 0) > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100 grid gap-4 sm:grid-cols-2">
              <ImpactMetric
                value={avgContainers.toFixed(1)}
                label="Containers returned per day"
                icon={<Bottle className="h-5 w-5" size={20} />}
              />
              <ImpactMetric
                value={`€${avgMoney.toFixed(2)}`}
                label="Re-turn refund per day"
                icon={<CircleDollar className="h-5 w-5" size={20} />}
              />
            </div>
          )}
        </section>
      )}

      {Math.max(0, Number(reTurnTotals.containersReturned) || 0) > 0 && (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
          <h3 className="text-sm font-medium text-slate-900 mb-4">Re-turn (Ireland DRS)</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <ImpactMetric
              value={`€${(Number(reTurnTotals.moneyEuros) || 0).toFixed(2)}`}
              label="Money earned"
              icon={<CircleDollar className="h-5 w-5" size={20} />}
            />
            <ImpactMetric
              value={Math.max(0, Number(reTurnTotals.containersReturned) || 0)}
              label="Containers returned"
              icon={<Bottle className="h-5 w-5" size={20} />}
            />
            <ImpactMetric
              value={`~${(Number(reTurnTotals.weightKgEquivalent) || 0).toFixed(2)} kg`}
              label="Plastic diverted"
              icon={<Leaf className="h-5 w-5" size={20} />}
            />
          </div>
        </section>
      )}

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-card">
        <h3 className="text-sm font-medium text-slate-900 mb-4">Impact overview</h3>
        <div className="space-y-5">
          <ImpactBar
            label="Bottles saved"
            value={bottles}
            max={Math.max(maxImpact, 1)}
          />
          <ImpactBar
            label="CO₂ avoided (kg)"
            value={co2Kg}
            max={Math.max(maxImpact, 1)}
            format={(n) => n.toFixed(1)}
          />
          <ImpactBar
            label="Trees equivalent"
            value={trees}
            max={Math.max(maxImpact / 10, 0.1)}
            format={(n) => n.toFixed(1)}
          />
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-slate-900">Habits over time</h2>
          {timeline === 'all' && (
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setDaysRange(7)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  daysRange === 7
                    ? 'bg-primary-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                7 days
              </button>
              <button
                type="button"
                onClick={() => setDaysRange(30)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  daysRange === 30
                    ? 'bg-primary-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                30 days
              </button>
            </div>
          )}
        </div>
        <StreakChart data={chartData} />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
        <h2 className="mb-4 text-sm font-medium text-slate-900">Completions per day</h2>
        <ProgressChart data={chartData} label="Habits logged" />
      </section>

      <section>
        <h2 className="mb-1 text-sm font-medium text-slate-900">What you&apos;ve saved by habit</h2>
        <p className="mb-4 text-xs text-slate-500">
          Count of each action and the impact for the selected period.
        </p>
        <ul className="space-y-3">
          {HABITS.map((habit) => {
            const byHabit = totals.byHabit[habit.id]
            const count = Math.max(0, Number(byHabit?.count ?? 0))
            if (count === 0) return null
            const habitBottles = Math.max(0, Number(byHabit?.bottles ?? 0))
            const habitCo2 = Math.max(0, Number(byHabit?.co2Kg ?? 0))
            const display = getHabitDisplayMeasurement(
              habit.id,
              count,
              { ...unitPrefs, distance: distanceUnit },
              habit.unit
            )
            const Icon = HABIT_ICONS[habit.id] ?? Recycle
            return (
              <li
                key={habit.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Icon className="h-5 w-5" size={20} />
                  </div>
                  <span className="font-medium text-slate-900">{habit.name}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-semibold tabular-nums text-slate-900">{display.valueLabel}</span>
                    <span className="text-sm text-slate-500">{display.unit}</span>
                  </div>
                  {habitCo2 > 0 && (
                    <span className="text-sm text-slate-500">~{habitCo2.toFixed(1)} kg CO₂ avoided</span>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-900">
            <Bottle className="h-4 w-4 text-primary-600" size={16} /> Bottles
          </h3>
          <BottleIllustration count={bottles} />
          <p className="mt-2 text-sm text-slate-600">
            <span className="font-semibold tabular-nums">{bottles}</span> bottles saved
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-900">
            <Leaf className="h-4 w-4 text-primary-600" size={16} /> Tree
          </h3>
          <TreeIllustration progress={Math.min(1, trees)} />
          <p className="mt-2 text-sm text-slate-600">
            <span className="font-semibold tabular-nums">{trees.toFixed(2)}</span> trees equivalent
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-900">
            <Bike className="h-4 w-4 text-primary-600" size={16} /> {distanceUnit === 'miles' ? 'mi' : 'km'} biked or walked
          </h3>
          <BikeIllustration km={bikeKm} unit={distanceUnit} />
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-card border-l-4 border-l-red-200">
        <h2 className="text-sm font-medium text-slate-900 mb-2">Reset data</h2>
        <p className="text-sm text-slate-500 mb-4">
          Permanently delete all habit logs, Re-turn entries, quick-log choices, and suggestions from this device. This cannot be undone.
        </p>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Delete all your data? This cannot be undone. The page will reload.')) {
              clearAllAppData()
              window.location.reload()
            }
          }}
          className="rounded-lg border-2 border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
        >
          Reset all data
        </button>
      </section>
    </div>
  )
}
