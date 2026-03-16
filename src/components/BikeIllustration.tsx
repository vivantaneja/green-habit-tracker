import { formatDistance } from '../lib/distanceUnit'
import type { DistanceUnit } from '../lib/distanceUnit'

interface BikeIllustrationProps {
  /** Distance in km (biked or walked) */
  km: number
  /** Display unit (default km) */
  unit?: DistanceUnit
  className?: string
}

export function BikeIllustration({ km, unit = 'km', className = '' }: BikeIllustrationProps) {
  const scale = Math.min(1, 0.3 + km * 0.03)
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 80 50"
        className="max-h-20 w-auto"
        style={{ transform: `scale(${scale})` }}
        aria-hidden
      >
        <g stroke="#059669" strokeWidth="2" fill="none">
          <circle cx="20" cy="35" r="8" fill="#ecfdf5" />
          <circle cx="60" cy="35" r="8" fill="#ecfdf5" />
          <path d="M28 35h24M35 35l10-20M45 15l10 5M55 20v15" />
          <path d="M45 15c0-2 1.5-4 4-4s4 2 4 4" strokeLinecap="round" />
          <path d="M20 27v-5l8-8h12" />
        </g>
      </svg>
      <p className="mt-2 text-center text-sm font-medium text-slate-700 tabular-nums">
        {km > 0 ? formatDistance(km, unit) : unit === 'miles' ? '0 mi' : '0 km'}
      </p>
    </div>
  )
}
