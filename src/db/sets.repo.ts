import { db } from './schema';
import type { SetEntry, WeightMode } from '../types/models';

export async function listSetsForSession(sessionId: string): Promise<SetEntry[]> {
  return db.sets.where('sessionId').equals(sessionId).sortBy('createdAt');
}

export async function listSetsForExercise(exerciseId: string): Promise<SetEntry[]> {
  return db.sets.where('exerciseId').equals(exerciseId).sortBy('createdAt');
}

export async function addSet(
  sessionId: string,
  exerciseId: string,
  weight: number,
  reps: number,
  weightMode: WeightMode = 'weight',
): Promise<SetEntry> {
  const priorSets = await db.sets
    .where('[sessionId+exerciseId]')
    .equals([sessionId, exerciseId])
    .count();

  const set: SetEntry = {
    id: crypto.randomUUID(),
    sessionId,
    exerciseId,
    setNumber: priorSets + 1,
    weight,
    weightMode,
    reps,
    createdAt: Date.now(),
  };
  await db.sets.add(set);
  return set;
}

export async function updateSet(
  id: string,
  changes: Partial<Pick<SetEntry, 'weight' | 'reps' | 'notes'>>,
): Promise<void> {
  await db.sets.update(id, changes);
}

export async function deleteSet(id: string): Promise<void> {
  await db.sets.delete(id);
}
