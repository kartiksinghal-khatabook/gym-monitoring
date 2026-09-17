import type { SessionDataPoint } from '../../db/derived';
import { TrendChart } from './TrendChart';
import { formatDuration } from '../../utils/cardio';

export function DurationTrendChart({ history }: { history: SessionDataPoint[] }) {
  return (
    <TrendChart
      title="Duration"
      valueLabel="duration (min)"
      points={history.map((h) => ({ date: h.session.date, value: h.totalDurationMinutes }))}
      formatValue={formatDuration}
    />
  );
}
