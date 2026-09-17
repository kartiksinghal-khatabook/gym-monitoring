export type WeightUnit = 'kg' | 'lb';

/**
 * 'bars' is for machines where the real per-plate weight is unknown — `weight`
 * on the set then holds a bar/plate count instead of an actual weight. Absent
 * on a SetEntry means 'weight' (legacy data predates this field).
 */
export type WeightMode = 'weight' | 'bars';

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
  weightMode?: WeightMode;
  reps: number;
  notes?: string;
  createdAt: number;
}
