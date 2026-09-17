import type { SessionDataPoint } from '../../db/derived';
import { TrendChart } from './TrendChart';
import { formatDistance } from '../../utils/cardio';

export function DistanceTrendChart({ history }: { history: SessionDataPoint[] }) {
  return (
    <TrendChart
      title="Distance"
      valueLabel="distance (km)"
      points={history.map((h) => ({ date: h.session.date, value: h.topDistanceKm }))}
      formatValue={formatDistance}
    />
  );
}
