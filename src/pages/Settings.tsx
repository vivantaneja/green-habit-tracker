import { useUnitPreferences } from '../hooks/useUnitPreferences'

export default function Settings() {
  const [unitPrefs, setUnitPrefs] = useUnitPreferences()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-slate-900 tracking-tight">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Preferences for how data is displayed. Stored on your device.
        </p>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
        <h2 className="text-sm font-medium text-slate-900 mb-3">Distance</h2>
        <p className="text-sm text-slate-500 mb-4">
          Used for bike/walk distance on the Dashboard, Habits, and Impact pages.
        </p>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="distanceUnit"
              checked={unitPrefs.distance === 'km'}
              onChange={() => setUnitPrefs((prev) => ({ ...prev, distance: 'km' }))}
              className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-slate-700">Kilometres (km)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="distanceUnit"
              checked={unitPrefs.distance === 'miles'}
              onChange={() => setUnitPrefs((prev) => ({ ...prev, distance: 'miles' }))}
              className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-slate-700">Miles (mi)</span>
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
        <h2 className="text-sm font-medium text-slate-900 mb-3">Mass</h2>
        <p className="text-sm text-slate-500 mb-4">
          Used for weight-based habits (for example composting).
        </p>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="massUnit"
              checked={unitPrefs.mass === 'auto'}
              onChange={() => setUnitPrefs((prev) => ({ ...prev, mass: 'auto' }))}
              className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-slate-700">Auto (g ↔ kg)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="massUnit"
              checked={unitPrefs.mass === 'grams'}
              onChange={() => setUnitPrefs((prev) => ({ ...prev, mass: 'grams' }))}
              className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-slate-700">Grams (g)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="massUnit"
              checked={unitPrefs.mass === 'kilograms'}
              onChange={() => setUnitPrefs((prev) => ({ ...prev, mass: 'kilograms' }))}
              className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-slate-700">Kilograms (kg)</span>
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
        <h2 className="text-sm font-medium text-slate-900 mb-3">Volume</h2>
        <p className="text-sm text-slate-500 mb-4">
          Used for volume-based habits.
        </p>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="volumeUnit"
              checked={unitPrefs.volume === 'auto'}
              onChange={() => setUnitPrefs((prev) => ({ ...prev, volume: 'auto' }))}
              className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-slate-700">Auto (ml ↔ l)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="volumeUnit"
              checked={unitPrefs.volume === 'millilitres'}
              onChange={() => setUnitPrefs((prev) => ({ ...prev, volume: 'millilitres' }))}
              className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-slate-700">Millilitres (ml)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="volumeUnit"
              checked={unitPrefs.volume === 'litres'}
              onChange={() => setUnitPrefs((prev) => ({ ...prev, volume: 'litres' }))}
              className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-slate-700">Litres (l)</span>
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
        <h2 className="text-sm font-medium text-slate-900 mb-3">Duration</h2>
        <p className="text-sm text-slate-500 mb-4">
          Used for time-based habits.
        </p>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="durationUnit"
              checked={unitPrefs.duration === 'auto'}
              onChange={() => setUnitPrefs((prev) => ({ ...prev, duration: 'auto' }))}
              className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-slate-700">Auto (min ↔ h)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="durationUnit"
              checked={unitPrefs.duration === 'minutes'}
              onChange={() => setUnitPrefs((prev) => ({ ...prev, duration: 'minutes' }))}
              className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-slate-700">Minutes (min)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="durationUnit"
              checked={unitPrefs.duration === 'hours'}
              onChange={() => setUnitPrefs((prev) => ({ ...prev, duration: 'hours' }))}
              className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-slate-700">Hours (h)</span>
          </label>
        </div>
      </section>
    </div>
  )
}
