import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from 'recharts'

interface ProgressChartProps {
  data: { date: string; count: number }[]
  dataKey?: string
  label?: string
}

function formatShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function ProgressChart({
  data,
  dataKey = 'count',
  label = 'Habits',
}: ProgressChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    label: formatShortDate(d.date),
  }))

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10 }}
            tickFormatter={(v) => {
              const d = chartData.find((x) => x.label === v)?.date
              return d ? formatShortDate(d) : v
            }}
          />
          <YAxis allowDecimals={false} width={24} tick={{ fontSize: 10 }} />
          <Tooltip
            formatter={(value: number) => [value, label]}
            labelFormatter={(_, payload) =>
              payload?.[0] ? formatShortDate(payload[0].payload.date) : ''
            }
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#059669"
            strokeWidth={2}
            dot={{ fill: '#059669', r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
