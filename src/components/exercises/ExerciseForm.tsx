import { useState, type FormEvent } from 'react';
import { createExercise } from '../../db/exercises.repo';
import type { ActivityType } from '../../types/models';
import './ExerciseForm.css';

export function ExerciseForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<ActivityType>('strength');
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    await createExercise(name, category, type);
    setName('');
    setCategory('');
    setType('strength');
    setOpen(false);
  }

  if (!open) {
    return (
      <button type="button" className="exercise-form__open" onClick={() => setOpen(true)}>
        + New Exercise
      </button>
    );
  }

  return (
    <form className="exercise-form" onSubmit={handleSubmit}>
      <input
        autoFocus
        placeholder="Exercise name (e.g. Bench Press)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <div className="exercise-form__type" role="group" aria-label="exercise type">
        <button type="button" className={type === 'strength' ? 'active' : ''} onClick={() => setType('strength')}>
          Strength
        </button>
        <button type="button" className={type === 'cardio' ? 'active' : ''} onClick={() => setType('cardio')}>
          Cardio
        </button>
      </div>
      <div className="exercise-form__actions">
        <button type="button" onClick={() => setOpen(false)}>
          Cancel
        </button>
        <button type="submit" className="primary">
          Add
        </button>
      </div>
    </form>
  );
}
