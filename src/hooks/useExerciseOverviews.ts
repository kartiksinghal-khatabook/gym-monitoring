import { useLiveQuery } from 'dexie-react-hooks';
import { getExerciseOverviews } from '../db/derived';

export function useExerciseOverviews() {
  return useLiveQuery(() => getExerciseOverviews(), [], []);
}
