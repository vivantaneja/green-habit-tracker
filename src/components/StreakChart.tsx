import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

interface StreakChartProps {
  data: { date: string; count: number }[]
}

function formatShortDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export function StreakChart({ data }: StreakChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    label: formatShortDate(d.date),
  }))

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10 }}
            tickFormatter={(v) => {
              const d = chartData.find((x) => x.label === v)?.date
              return d ? new Date(d).toLocaleDateString('en-US', { weekday: 'short' }) : v
            }}
          />
          <YAxis allowDecimals={false} width={24} tick={{ fontSize: 10 }} />
          <Tooltip
            formatter={(value: number) => [value, 'Habits logged']}
            labelFormatter={(_, payload) =>
              payload?.[0] ? formatShortDate(payload[0].payload.date) : ''
            }
          />
          <Bar dataKey="count" fill="#059669" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
