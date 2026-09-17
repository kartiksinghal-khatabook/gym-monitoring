import type { PersonalRecords } from '../../db/derived';
import { getUnit } from '../../utils/units';
import './PRBadge.css';

export function PRBadge({ records }: { records: PersonalRecords | null | undefined }) {
  const unit = getUnit();

  if (!records || (!records.maxWeightSet && !records.maxRepsSet)) {
    return null;
  }

  return (
    <div className="pr-badge">
      <div className="pr-badge__stat">
        <span className="pr-badge__label">Max weight</span>
        <span className="pr-badge__value">
          {records.maxWeightSet
            ? `${records.maxWeightSet.weight} ${unit} × ${records.maxWeightSet.reps}`
            : '—'}
        </span>
      </div>
      <div className="pr-badge__stat">
        <span className="pr-badge__label">Max reps</span>
        <span className="pr-badge__value">
          {records.maxRepsSet
            ? `${records.maxRepsSet.reps} @ ${records.maxRepsSet.weight} ${unit}`
            : '—'}
        </span>
      </div>
    </div>
  );
}
