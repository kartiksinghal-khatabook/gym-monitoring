import { db } from './schema';
import type { ActivityType, Exercise } from '../types/models';

export async function listExercises(): Promise<Exercise[]> {
  return db.exercises
    .filter((e) => !e.archivedAt)
    .toArray()
    .then((list) => list.sort((a, b) => a.name.localeCompare(b.name)));
}

export async function getExercise(id: string): Promise<Exercise | undefined> {
  return db.exercises.get(id);
}

export async function createExercise(
  name: string,
  category?: string,
  type: ActivityType = 'strength',
): Promise<Exercise> {
  const exercise: Exercise = {
    id: crypto.randomUUID(),
    name: name.trim(),
    category: category?.trim() || undefined,
    type,
    createdAt: Date.now(),
  };
  await db.exercises.add(exercise);
  return exercise;
}

export async function updateExercise(
  id: string,
  changes: Partial<Pick<Exercise, 'name' | 'category'>>,
): Promise<void> {
  await db.exercises.update(id, changes);
}

export async function archiveExercise(id: string): Promise<void> {
  await db.exercises.update(id, { archivedAt: Date.now() });
}
