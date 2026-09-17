import { db } from './schema';
import type { SetEntry, WeightMode } from '../types/models';

export async function listSetsForSession(sessionId: string): Promise<SetEntry[]> {
  return db.sets.where('sessionId').equals(sessionId).sortBy('createdAt');
}

export async function listSetsForExercise(exerciseId: string): Promise<SetEntry[]> {
  return db.sets.where('exerciseId').equals(exerciseId).sortBy('createdAt');
}

async function nextSetNumber(sessionId: string, exerciseId: string): Promise<number> {
  const priorSets = await db.sets
    .where('[sessionId+exerciseId]')
    .equals([sessionId, exerciseId])
    .count();
  return priorSets + 1;
}

export async function addSet(
  sessionId: string,
  exerciseId: string,
  weight: number,
  reps: number,
  weightMode: WeightMode = 'weight',
): Promise<SetEntry> {
  const set: SetEntry = {
    id: crypto.randomUUID(),
    sessionId,
    exerciseId,
    setNumber: await nextSetNumber(sessionId, exerciseId),
    weight,
    weightMode,
    reps,
    createdAt: Date.now(),
  };
  await db.sets.add(set);
  return set;
}

export async function addCardioEntry(
  sessionId: string,
  exerciseId: string,
  durationMinutes: number,
  distanceKm: number,
): Promise<SetEntry> {
  const entry: SetEntry = {
    id: crypto.randomUUID(),
    sessionId,
    exerciseId,
    setNumber: await nextSetNumber(sessionId, exerciseId),
    weight: 0,
    reps: 0,
    durationMinutes,
    distanceKm,
    createdAt: Date.now(),
  };
  await db.sets.add(entry);
  return entry;
}

export async function updateSet(
  id: string,
  changes: Partial<Pick<SetEntry, 'weight' | 'reps' | 'durationMinutes' | 'distanceKm' | 'notes'>>,
): Promise<void> {
  await db.sets.update(id, changes);
}

export async function deleteSet(id: string): Promise<void> {
  await db.sets.delete(id);
}
