import { useLiveQuery } from 'dexie-react-hooks';
import { listExercises, getExercise } from '../db/exercises.repo';

export function useExercises() {
  return useLiveQuery(() => listExercises(), [], []);
}

export function useExercise(id: string | undefined) {
  return useLiveQuery(() => (id ? getExercise(id) : undefined), [id]);
}
