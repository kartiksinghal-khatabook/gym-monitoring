import { useLiveQuery } from 'dexie-react-hooks';
import { getPersonalRecords } from '../db/derived';

export function usePRs(exerciseId: string | undefined) {
  return useLiveQuery(
    () => (exerciseId ? getPersonalRecords(exerciseId) : null),
    [exerciseId],
  );
}
