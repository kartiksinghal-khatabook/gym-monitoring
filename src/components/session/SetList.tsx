import type { SetEntry } from '../../types/models';
import { deleteSet } from '../../db/sets.repo';
import { getUnit, formatWeightValue } from '../../utils/units';
import './SetList.css';

export function SetList({ sets }: { sets: SetEntry[] }) {
  const unit = getUnit();

  return (
    <ul className="set-list">
      {sets.map((set) => (
        <li key={set.id} className="set-list__row">
          <span className="set-list__number">#{set.setNumber}</span>
          <span>
            {formatWeightValue(set.weight, set.weightMode, unit)} × {set.reps}
          </span>
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
