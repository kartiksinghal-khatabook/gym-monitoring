import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { getOrCreateTodaySession } from '../db/sessions.repo';
import { listSetsForSession } from '../db/sets.repo';
import type { WorkoutSession, SetEntry } from '../types/models';

const EMPTY_SETS: SetEntry[] = [];

/** Ensures today's session exists, then returns it plus its sets, reactively. */
export function useTodaySession() {
  const [session, setSession] = useState<WorkoutSession | null>(null);

  useEffect(() => {
    let cancelled = false;
    getOrCreateTodaySession().then((s) => {
      if (!cancelled) setSession(s);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const sets = useLiveQuery<SetEntry[], SetEntry[]>(
    () => (session ? listSetsForSession(session.id) : EMPTY_SETS),
    [session?.id],
    EMPTY_SETS,
  );

  return { session, sets: sets ?? EMPTY_SETS };
}
