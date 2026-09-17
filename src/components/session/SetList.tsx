import type { SetEntry } from '../../types/models';
import { deleteSet } from '../../db/sets.repo';
import { getUnit, formatWeightValue } from '../../utils/units';
import { formatDuration, formatDistance } from '../../utils/cardio';
import './SetList.css';

function formatEntry(set: SetEntry, unit: string): string {
  if (set.durationMinutes !== undefined || set.distanceKm !== undefined) {
    return `${formatDistance(set.distanceKm ?? 0)} in ${formatDuration(set.durationMinutes ?? 0)}`;
  }
  return `${formatWeightValue(set.weight, set.weightMode, unit as 'kg' | 'lb')} × ${set.reps}`;
}

export function SetList({ sets }: { sets: SetEntry[] }) {
  const unit = getUnit();

  return (
    <ul className="set-list">
      {sets.map((set) => (
        <li key={set.id} className="set-list__row">
          <span className="set-list__number">#{set.setNumber}</span>
          <span>{formatEntry(set, unit)}</span>
          <button
            type="button"
            className="set-list__delete"
            aria-label={`delete set ${set.setNumber}`}
            onClick={() => deleteSet(set.id)}
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}
