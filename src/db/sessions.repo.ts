import { db } from './schema';
import type { WorkoutSession } from '../types/models';
import { toDateKey } from '../utils/date';

export async function getSessionByDate(date: string): Promise<WorkoutSession | undefined> {
  return db.sessions.where('date').equals(date).first();
}

export async function getOrCreateTodaySession(): Promise<WorkoutSession> {
  const date = toDateKey();
  const existing = await getSessionByDate(date);
  if (existing) return existing;

  const session: WorkoutSession = {
    id: crypto.randomUUID(),
    date,
    startedAt: Date.now(),
  };
  await db.sessions.add(session);
  return session;
}

export async function getSession(id: string): Promise<WorkoutSession | undefined> {
  return db.sessions.get(id);
}

export async function listSessions(): Promise<WorkoutSession[]> {
  return db.sessions.orderBy('date').reverse().toArray();
}
