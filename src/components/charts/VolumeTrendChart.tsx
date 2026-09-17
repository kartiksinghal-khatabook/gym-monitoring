import { getDominantWeightMode, type SessionDataPoint } from '../../db/derived';
import { TrendChart } from './TrendChart';
import { getUnit } from '../../utils/units';

export function VolumeTrendChart({ history }: { history: SessionDataPoint[] }) {
  const unit = getUnit();
  const mode = getDominantWeightMode(history);
  const unitLabel = mode === 'bars' ? 'bars' : unit;

  return (
    <TrendChart
      title={`Volume (${mode === 'bars' ? 'bars' : 'weight'} × reps)`}
      valueLabel={`volume (${unitLabel})`}
      points={history.map((h) => ({ date: h.session.date, value: h.volume }))}
      formatValue={(v) => `${v} ${unitLabel}`}
    />
  );
}
