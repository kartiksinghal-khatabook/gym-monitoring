import { useState } from 'react';
import { NumberStepper } from '../common/NumberStepper';
import { getUnit } from '../../utils/units';
import { getLastWeightMode, setLastWeightMode } from '../../utils/weightMode';
import type { WeightMode } from '../../types/models';
import './SetEntryRow.css';

interface SetEntryRowProps {
  exerciseId: string;
  onAdd: (weight: number, reps: number, weightMode: WeightMode) => void;
  defaultWeight?: number;
  defaultReps?: number;
}

export function SetEntryRow({ exerciseId, onAdd, defaultWeight = 0, defaultReps = 0 }: SetEntryRowProps) {
  const [weight, setWeight] = useState(defaultWeight);
  const [reps, setReps] = useState(defaultReps);
  const [mode, setMode] = useState<WeightMode>(() => getLastWeightMode(exerciseId));
  const unit = getUnit();

  function handleModeChange(next: WeightMode) {
    setMode(next);
    setLastWeightMode(exerciseId, next);
  }

  return (
    <div className="set-entry-row">
      <div className="set-entry-row__mode" role="group" aria-label="how to log weight">
        <button
          type="button"
          className={mode === 'weight' ? 'active' : ''}
          onClick={() => handleModeChange('weight')}
        >
          {unit}
        </button>
        <button
          type="button"
          className={mode === 'bars' ? 'active' : ''}
          onClick={() => handleModeChange('bars')}
        >
          Bars
        </button>
      </div>
      <NumberStepper
        label={mode === 'bars' ? 'bars' : `weight (${unit})`}
        value={weight}
        step={mode === 'bars' ? 1 : 2.5}
        onChange={setWeight}
      />
      <NumberStepper label="reps" value={reps} step={1} onChange={setReps} />
      <button
        type="button"
        className="set-entry-row__add"
        onClick={() => onAdd(weight, reps, mode)}
        disabled={weight <= 0 && reps <= 0}
      >
        Add set
      </button>
    </div>
  );
}
