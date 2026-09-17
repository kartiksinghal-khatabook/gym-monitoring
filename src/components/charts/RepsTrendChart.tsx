import type { SessionDataPoint } from '../../db/derived';
import { TrendChart } from './TrendChart';

export function RepsTrendChart({ history }: { history: SessionDataPoint[] }) {
  return (
    <TrendChart
      title="Top reps"
      valueLabel="reps"
      points={history.map((h) => ({ date: h.session.date, value: h.topReps }))}
    />
  );
}
