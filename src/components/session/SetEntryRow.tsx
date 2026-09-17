import { useState } from 'react';
import { NumberStepper } from '../common/NumberStepper';
import { getUnit } from '../../utils/units';
import './SetEntryRow.css';

interface SetEntryRowProps {
  onAdd: (weight: number, reps: number) => void;
  defaultWeight?: number;
  defaultReps?: number;
}

export function SetEntryRow({ onAdd, defaultWeight = 0, defaultReps = 0 }: SetEntryRowProps) {
  const [weight, setWeight] = useState(defaultWeight);
  const [reps, setReps] = useState(defaultReps);
  const unit = getUnit();

  return (
    <div className="set-entry-row">
      <NumberStepper label={`weight (${unit})`} value={weight} step={2.5} onChange={setWeight} />
      <NumberStepper label="reps" value={reps} step={1} onChange={setReps} />
      <button
        type="button"
        className="set-entry-row__add"
        onClick={() => onAdd(weight, reps)}
        disabled={weight <= 0 && reps <= 0}
      >
        Add set
      </button>
    </div>
  );
}
