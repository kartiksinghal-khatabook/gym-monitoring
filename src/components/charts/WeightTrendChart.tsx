import type { SessionDataPoint } from '../../db/derived';
import { TrendChart } from './TrendChart';
import { getUnit } from '../../utils/units';

export function WeightTrendChart({ history }: { history: SessionDataPoint[] }) {
  const unit = getUnit();
  return (
    <TrendChart
      title="Top weight"
      valueLabel={`weight (${unit})`}
      points={history.map((h) => ({ date: h.session.date, value: h.topWeight }))}
      formatValue={(v) => `${v} ${unit}`}
    />
  );
}
