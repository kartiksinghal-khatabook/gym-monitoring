import { useMemo, useState } from 'react';
import { useExercises } from '../../hooks/useExercises';
import { createExercise } from '../../db/exercises.repo';
import type { Exercise } from '../../types/models';
import './ExercisePicker.css';

interface ExercisePickerProps {
  excludeIds: string[];
  onPick: (exercise: Exercise) => void;
}

export function ExercisePicker({ excludeIds, onPick }: ExercisePickerProps) {
  const exercises = useExercises();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const excluded = new Set(excludeIds);
    const q = query.trim().toLowerCase();
    return (exercises ?? []).filter(
      (e) => !excluded.has(e.id) && (!q || e.name.toLowerCase().includes(q)),
    );
  }, [exercises, excludeIds, query]);

  const exactMatch = filtered.some((e) => e.name.toLowerCase() === query.trim().toLowerCase());

  async function handleCreateAndPick() {
    const exercise = await createExercise(query);
    setQuery('');
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
          <li>
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
