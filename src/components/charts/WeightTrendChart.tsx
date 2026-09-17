import { getDominantWeightMode, type SessionDataPoint } from '../../db/derived';
import { TrendChart } from './TrendChart';
import { getUnit, formatWeightValue } from '../../utils/units';

export function WeightTrendChart({ history }: { history: SessionDataPoint[] }) {
  const unit = getUnit();
  const mode = getDominantWeightMode(history);
  const label = mode === 'bars' ? 'bars' : `weight (${unit})`;

  return (
    <TrendChart
      title={mode === 'bars' ? 'Top bars' : 'Top weight'}
      valueLabel={label}
      points={history.map((h) => ({ date: h.session.date, value: h.topWeight }))}
      formatValue={(v) => formatWeightValue(v, mode, unit)}
    />
  );
}
