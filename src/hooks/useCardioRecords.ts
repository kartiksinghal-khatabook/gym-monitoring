import { useLiveQuery } from 'dexie-react-hooks';
import { getCardioRecords } from '../db/derived';

export function useCardioRecords(exerciseId: string | undefined) {
  return useLiveQuery(
    () => (exerciseId ? getCardioRecords(exerciseId) : null),
    [exerciseId],
  );
}
