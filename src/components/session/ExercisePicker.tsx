import { useMemo, useState } from 'react';
import { useExercises } from '../../hooks/useExercises';
import { createExercise } from '../../db/exercises.repo';
import type { ActivityType, Exercise } from '../../types/models';
import './ExercisePicker.css';

interface ExercisePickerProps {
  excludeIds: string[];
  onPick: (exercise: Exercise) => void;
}

export function ExercisePicker({ excludeIds, onPick }: ExercisePickerProps) {
  const exercises = useExercises();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [newType, setNewType] = useState<ActivityType>('strength');

  const filtered = useMemo(() => {
    const excluded = new Set(excludeIds);
    const q = query.trim().toLowerCase();
    return (exercises ?? []).filter(
      (e) => !excluded.has(e.id) && (!q || e.name.toLowerCase().includes(q)),
    );
  }, [exercises, excludeIds, query]);

  const exactMatch = filtered.some((e) => e.name.toLowerCase() === query.trim().toLowerCase());

  async function handleCreateAndPick() {
    const exercise = await createExercise(query, undefined, newType);
    setQuery('');
    setNewType('strength');
    setOpen(false);
    onPick(exercise);
  }

  if (!open) {
    return (
      <button type="button" className="exercise-picker__open" onClick={() => setOpen(true)}>
        + Add exercise to today
      </button>
    );
  }

  return (
    <div className="exercise-picker">
      <input
        autoFocus
        placeholder="Search or create exercise..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="exercise-picker__results">
        {filtered.map((exercise) => (
          <li key={exercise.id}>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setOpen(false);
                onPick(exercise);
              }}
            >
              {exercise.name}
            </button>
          </li>
        ))}
        {query.trim() && !exactMatch && (
          <li className="exercise-picker__create">
            <div className="exercise-picker__type" role="group" aria-label="new exercise type">
              <button
                type="button"
                className={newType === 'strength' ? 'active' : ''}
                onClick={() => setNewType('strength')}
              >
                Strength
              </button>
              <button
                type="button"
                className={newType === 'cardio' ? 'active' : ''}
                onClick={() => setNewType('cardio')}
              >
                Cardio
              </button>
            </div>
            <button type="button" onClick={handleCreateAndPick}>
              + Create "{query.trim()}"
            </button>
          </li>
        )}
      </ul>
      <button type="button" className="exercise-picker__cancel" onClick={() => setOpen(false)}>
        Cancel
      </button>
    </div>
  );
}
