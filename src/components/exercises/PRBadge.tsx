import type { PersonalRecords } from '../../db/derived';
import { getUnit, formatWeightValue } from '../../utils/units';
import './PRBadge.css';

export function PRBadge({ records }: { records: PersonalRecords | null | undefined }) {
  const unit = getUnit();

  if (!records || (!records.maxWeightSet && !records.maxRepsSet)) {
    return null;
  }

  return (
    <div className="pr-badge">
      <div className="pr-badge__stat">
        <span className="pr-badge__label">
          {records.maxWeightSet?.weightMode === 'bars' ? 'Max bars' : 'Max weight'}
        </span>
        <span className="pr-badge__value">
          {records.maxWeightSet
            ? `${formatWeightValue(records.maxWeightSet.weight, records.maxWeightSet.weightMode, unit)} × ${records.maxWeightSet.reps}`
            : '—'}
        </span>
      </div>
      <div className="pr-badge__stat">
        <span className="pr-badge__label">Max reps</span>
        <span className="pr-badge__value">
          {records.maxRepsSet
            ? `${records.maxRepsSet.reps} @ ${formatWeightValue(records.maxRepsSet.weight, records.maxRepsSet.weightMode, unit)}`
            : '—'}
        </span>
      </div>
    </div>
  );
}
