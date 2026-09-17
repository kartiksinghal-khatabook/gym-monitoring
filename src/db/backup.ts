import { db } from './schema';
import type { Exercise, WorkoutSession, SetEntry } from '../types/models';

const BACKUP_FORMAT_VERSION = 1;

export interface BackupPayload {
  formatVersion: number;
  exportedAt: number;
  exercises: Exercise[];
  sessions: WorkoutSession[];
  sets: SetEntry[];
}

export async function buildBackup(): Promise<BackupPayload> {
  const [exercises, sessions, sets] = await Promise.all([
    db.exercises.toArray(),
    db.sessions.toArray(),
    db.sets.toArray(),
  ]);
  return { formatVersion: BACKUP_FORMAT_VERSION, exportedAt: Date.now(), exercises, sessions, sets };
}

export async function downloadBackup(): Promise<void> {
  const payload = await buildBackup();
  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const date = new Date().toISOString().slice(0, 10);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gym-log-backup-${date}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export interface RestoreResult {
  exercises: number;
  sessions: number;
  sets: number;
}

function isBackupPayload(value: unknown): value is BackupPayload {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return Array.isArray(v.exercises) && Array.isArray(v.sessions) && Array.isArray(v.sets);
}

/** Upserts records from a previously exported backup file. Existing data is kept; matching ids are overwritten. */
export async function restoreBackup(file: File): Promise<RestoreResult> {
  const text = await file.text();
  const parsed: unknown = JSON.parse(text);

  if (!isBackupPayload(parsed)) {
    throw new Error('This file does not look like a Gym Log backup.');
  }

  await db.transaction('rw', db.exercises, db.sessions, db.sets, async () => {
    await db.exercises.bulkPut(parsed.exercises);
    await db.sessions.bulkPut(parsed.sessions);
    await db.sets.bulkPut(parsed.sets);
  });

  return {
    exercises: parsed.exercises.length,
    sessions: parsed.sessions.length,
    sets: parsed.sets.length,
  };
}
