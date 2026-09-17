import Dexie, { type EntityTable } from 'dexie';
import type { Exercise, WorkoutSession, SetEntry } from '../types/models';

export class GymDatabase extends Dexie {
  exercises!: EntityTable<Exercise, 'id'>;
  sessions!: EntityTable<WorkoutSession, 'id'>;
  sets!: EntityTable<SetEntry, 'id'>;

  constructor() {
    super('gym-monitoring');

    this.version(1).stores({
      exercises: 'id, name, archivedAt',
      sessions: 'id, date, startedAt',
      sets: 'id, sessionId, exerciseId, [exerciseId+weight], [exerciseId+reps], [sessionId+exerciseId]',
    });
  }
}

export const db = new GymDatabase();
