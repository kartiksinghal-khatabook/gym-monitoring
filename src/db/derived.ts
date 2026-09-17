import { db } from './schema';
import { listExercises } from './exercises.repo';
import type { SetEntry, WorkoutSession } from '../types/models';

export interface PersonalRecords {
  maxWeightSet: SetEntry | null;
  maxRepsSet: SetEntry | null;
}

export async function getPersonalRecords(exerciseId: string): Promise<PersonalRecords> {
  const sets = await db.sets.where('exerciseId').equals(exerciseId).toArray();
  if (sets.length === 0) return { maxWeightSet: null, maxRepsSet: null };

  const maxWeightSet = sets.reduce((best, s) =>
    s.weight > best.weight || (s.weight === best.weight && s.reps > best.reps) ? s : best,
  );
  const maxRepsSet = sets.reduce((best, s) =>
    s.reps > best.reps || (s.reps === best.reps && s.weight > best.weight) ? s : best,
  );

  return { maxWeightSet, maxRepsSet };
}

export interface SessionDataPoint {
  session: WorkoutSession;
  sets: SetEntry[];
  topWeight: number;
  topReps: number;
  volume: number;
}

/** Sessions containing this exercise, sorted oldest -> newest, each aggregated for charting/history. */
export async function getExerciseHistory(exerciseId: string): Promise<SessionDataPoint[]> {
  const sets = await db.sets.where('exerciseId').equals(exerciseId).toArray();
  if (sets.length === 0) return [];

  const setsBySession = new Map<string, SetEntry[]>();
  for (const set of sets) {
    const list = setsBySession.get(set.sessionId);
    if (list) list.push(set);
    else setsBySession.set(set.sessionId, [set]);
  }

  const sessionIds = [...setsBySession.keys()];
  const sessions = await db.sessions.bulkGet(sessionIds);

  const points: SessionDataPoint[] = [];
  sessions.forEach((session, i) => {
    if (!session) return;
    const sessionSets = setsBySession.get(sessionIds[i])!;
    points.push({
      session,
      sets: sessionSets.sort((a, b) => a.setNumber - b.setNumber),
      topWeight: Math.max(...sessionSets.map((s) => s.weight)),
      topReps: Math.max(...sessionSets.map((s) => s.reps)),
      volume: sessionSets.reduce((sum, s) => sum + s.weight * s.reps, 0),
    });
  });

  return points.sort((a, b) => a.session.date.localeCompare(b.session.date));
}

export interface ExerciseOverview {
  exerciseId: string;
  name: string;
  category?: string;
  lastTrainedDate: string | null;
  records: PersonalRecords;
}

/** One summary row per exercise, for the cross-exercise progress dashboard. */
export async function getExerciseOverviews(): Promise<ExerciseOverview[]> {
  const exercises = await listExercises();

  const overviews = await Promise.all(
    exercises.map(async (exercise) => {
      const sets = await db.sets.where('exerciseId').equals(exercise.id).toArray();
      const records = await getPersonalRecords(exercise.id);

      let lastTrainedDate: string | null = null;
      if (sets.length > 0) {
        const sessionIds = [...new Set(sets.map((s) => s.sessionId))];
        const sessions = await db.sessions.bulkGet(sessionIds);
        const dates = sessions.filter((s): s is WorkoutSession => !!s).map((s) => s.date);
        lastTrainedDate = dates.sort().at(-1) ?? null;
      }

      return {
        exerciseId: exercise.id,
        name: exercise.name,
        category: exercise.category,
        lastTrainedDate,
        records,
      };
    }),
  );

  return overviews.sort((a, b) => {
    if (!a.lastTrainedDate && !b.lastTrainedDate) return a.name.localeCompare(b.name);
    if (!a.lastTrainedDate) return 1;
    if (!b.lastTrainedDate) return -1;
    return b.lastTrainedDate.localeCompare(a.lastTrainedDate);
  });
}
