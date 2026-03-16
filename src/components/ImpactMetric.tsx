import type { ReactNode } from 'react'

interface ImpactMetricProps {
  value: string | number
  label: string
  icon?: ReactNode
}

export function ImpactMetric({ value, label, icon }: ImpactMetricProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-white border border-slate-200 p-5 shadow-card">
      {icon && (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
          {icon}
        </div>
      )}
      <div>
        <div className="text-2xl font-semibold text-slate-900 tabular-nums tracking-tight">
          {value}
        </div>
        <div className="text-sm text-slate-500 mt-0.5">{label}</div>
      </div>
    </div>
  )
}
