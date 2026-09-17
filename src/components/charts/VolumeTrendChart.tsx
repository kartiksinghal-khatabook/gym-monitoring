import type { SessionDataPoint } from '../../db/derived';
import { TrendChart } from './TrendChart';
import { getUnit } from '../../utils/units';

export function VolumeTrendChart({ history }: { history: SessionDataPoint[] }) {
  const unit = getUnit();
  return (
    <TrendChart
      title="Volume (weight × reps)"
      valueLabel={`volume (${unit})`}
      points={history.map((h) => ({ date: h.session.date, value: h.volume }))}
      formatValue={(v) => `${v} ${unit}`}
    />
  );
}
