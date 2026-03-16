import { useMemo } from 'react'
import type { LogEntry, ImpactTotals } from '../types'
import { computeImpactTotals } from '../lib/impact'

export function useImpactTotals(logs: LogEntry[]): ImpactTotals {
  return useMemo(() => computeImpactTotals(logs), [logs])
}
