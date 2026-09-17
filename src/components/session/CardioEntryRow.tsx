import { useState } from 'react';
import { NumberStepper } from '../common/NumberStepper';
import './SetEntryRow.css';

interface CardioEntryRowProps {
  onAdd: (durationMinutes: number, distanceKm: number) => void;
  defaultDurationMinutes?: number;
  defaultDistanceKm?: number;
}

export function CardioEntryRow({
  onAdd,
  defaultDurationMinutes = 0,
  defaultDistanceKm = 0,
}: CardioEntryRowProps) {
  const [duration, setDuration] = useState(defaultDurationMinutes);
  const [distance, setDistance] = useState(defaultDistanceKm);

  return (
    <div className="set-entry-row">
      <NumberStepper label="duration (min)" value={duration} step={5} onChange={setDuration} />
      <NumberStepper label="distance (km)" value={distance} step={0.5} onChange={setDistance} />
      <button
        type="button"
        className="set-entry-row__add"
        onClick={() => onAdd(duration, distance)}
        disabled={duration <= 0 && distance <= 0}
      >
        Add walk
      </button>
    </div>
  );
}
