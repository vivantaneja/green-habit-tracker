import { Sparkles } from '../components/Icons'
import { useHabitLogs } from '../hooks/useHabitLogs'
import { useQuickLogHabits } from '../hooks/useQuickLogHabits'
import { useDistanceUnit } from '../hooks/useDistanceUnit'
import { useUnitPreferences } from '../hooks/useUnitPreferences'
import { formatDistanceNumber } from '../lib/distanceUnit'
import { useImpactTotals } from '../hooks/useImpactTotals'
import { HABITS } from '../lib/habits'
import { HabitCard } from '../components/HabitCard'
import { getHabitDisplayMeasurement } from '../lib/measurementUnits'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export default function Habits() {
  const { logs, addLog, removeLog } = useHabitLogs()
  const { quickLogIds, isInQuickLog, toggleQuickLog } = useQuickLogHabits()
  const [distanceUnit] = useDistanceUnit()
  const [unitPrefs] = useUnitPreferences()
  const totals = useImpactTotals(logs)
  const today = todayStr()
  const todayLogs = logs.filter((l) => l.date === today)

  const getCount = (habitId: string) =>
    todayLogs.find((l) => l.habitId === habitId)?.count ?? 0

  const handleAdjust = (habitId: string, delta: number) => {
    const current = getCount(habitId)
    const next = Math.max(0, current + delta)
    if (next <= 0) {
      removeLog(today, habitId)
      return
    }
    addLog({ date: today, habitId, count: next })
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-slate-900 tracking-tight">
          Habits
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Use quick +/− controls or a custom amount to adjust today’s total for every habit.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-card">
        <Sparkles className="h-5 w-5 shrink-0 text-primary-500" size={20} />
        <p className="text-sm text-slate-600">
          Quick +/− updates today instantly. Use Custom amount for larger changes.
        </p>
      </div>

      <section id="quick-log" className="rounded-lg border border-slate-200 bg-white p-5 shadow-card scroll-mt-6 transition-all duration-300 hover:shadow-card-hover">
        <h2 className="text-sm font-medium text-slate-900">Dashboard quick log</h2>
        <p className="mt-0.5 text-sm text-slate-500 mb-4">
          Choose which habits appear in &quot;Today’s habits&quot; on the Dashboard.
          {quickLogIds.length > 0 && (
            <span className="block mt-1 text-slate-600">
              {quickLogIds.length} habit{quickLogIds.length === 1 ? '' : 's'} on Dashboard
            </span>
          )}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {HABITS.map((habit) => (
            <label key={habit.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isInQuickLog(habit.id)}
                onChange={() => toggleQuickLog(habit.id)}
                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
              />
              <span className="text-sm text-slate-700">{habit.name}</span>
            </label>
          ))}
        </div>
      </section>

      <div className="space-y-4">
        {HABITS.map((habit) => {
          const count = Math.max(0, Number(getCount(habit.id) ?? 0))
          const impact = totals.byHabit[habit.id]
          const isDistanceHabit = habit.co2KgPerKm != null
          const hasImpact = impact && (Math.max(0, Number(impact.count ?? 0)) > 0 || Math.max(0, Number(impact.bottles ?? 0)) > 0 || Math.max(0, Number(impact.co2Kg ?? 0)) > 0)
          const showCo2 = (habit.co2KgPerCompletion > 0 || habit.co2KgPerKm != null) && (Number(impact?.co2Kg) || 0) > 0
          return (
            <div key={habit.id} className="space-y-2">
              <HabitCard
                habit={habit}
                count={count}
                onAdjust={(delta) => handleAdjust(habit.id, delta)}
                distanceUnit={distanceUnit}
              />
              {hasImpact && (
                <p className="text-xs text-slate-500 pl-1">
                  Total: {isDistanceHabit
                    ? `${formatDistanceNumber(Math.max(0, Number(impact?.count ?? 0)), distanceUnit)} ${distanceUnit === 'miles' ? 'mi' : 'km'}`
                    : (() => {
                        const display = getHabitDisplayMeasurement(
                          habit.id,
                          Math.max(0, Number(impact?.count ?? 0)),
                          unitPrefs,
                          habit.unit
                        )
                        return `${display.valueLabel} ${display.unit}`
                      })()}
                  {showCo2 && ` · ~${(Number(impact?.co2Kg) || 0).toFixed(1)} kg CO₂`}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
