export type WeightUnit = 'kg' | 'lb';

export interface Exercise {
  id: string;
  name: string;
  category?: string;
  createdAt: number;
  archivedAt?: number;
}

export interface WorkoutSession {
  id: string;
  /** 'YYYY-MM-DD', local date of the gym day */
  date: string;
  startedAt: number;
  notes?: string;
}

export interface SetEntry {
  id: string;
  sessionId: string;
  exerciseId: string;
  setNumber: number;
  weight: number;
  reps: number;
  notes?: string;
  createdAt: number;
}
