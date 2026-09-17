import { useLiveQuery } from 'dexie-react-hooks';
import { getExerciseHistory } from '../db/derived';

export function useExerciseHistory(exerciseId: string | undefined) {
  return useLiveQuery(() => (exerciseId ? getExerciseHistory(exerciseId) : []), [exerciseId], []);
}
