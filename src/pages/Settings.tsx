import { useDistanceUnit } from '../hooks/useDistanceUnit'

export default function Settings() {
  const [distanceUnit, setDistanceUnit] = useDistanceUnit()

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
        <h2 className="text-sm font-medium text-slate-900 mb-3">Distance unit</h2>
        <p className="text-sm text-slate-500 mb-4">
          Used for bike/walk distance on the Dashboard, Habits, and Impact pages.
        </p>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="distanceUnit"
              checked={distanceUnit === 'km'}
              onChange={() => setDistanceUnit('km')}
              className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-slate-700">Kilometres (km)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="distanceUnit"
              checked={distanceUnit === 'miles'}
              onChange={() => setDistanceUnit('miles')}
              className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-slate-700">Miles (mi)</span>
          </label>
        </div>
      </section>
    </div>
  )
}
