import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { formatDateKey } from '../../utils/date';
import './TrendChart.css';

export interface TrendPoint {
  date: string;
  value: number;
}

interface TrendChartProps {
  title: string;
  points: TrendPoint[];
  valueLabel: string;
  formatValue?: (v: number) => string;
}

export function TrendChart({ title, points, valueLabel, formatValue }: TrendChartProps) {
  if (points.length < 2) {
    return (
      <div className="trend-chart trend-chart--empty">
        <h3>{title}</h3>
        <p>Log at least two sessions to see a trend here.</p>
      </div>
    );
  }

  return (
    <div className="trend-chart">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={points} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="date"
            tickFormatter={(v: string) => formatDateKey(v).replace(/, \d+$/, '')}
            tick={{ fill: 'var(--text)', fontSize: 11 }}
            axisLine={{ stroke: 'var(--border)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'var(--text)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip
            formatter={(value) => [
              formatValue ? formatValue(Number(value)) : String(value),
              valueLabel,
            ]}
            labelFormatter={(v) => formatDateKey(String(v))}
            contentStyle={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              color: 'var(--text-h)',
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            name={valueLabel}
            stroke="var(--accent)"
            strokeWidth={2}
            dot={{ r: 4, fill: 'var(--accent)', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
