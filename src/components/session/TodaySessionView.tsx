import { useMemo, useState } from 'react';
import { useTodaySession } from '../../hooks/useTodaySession';
import { useExercises } from '../../hooks/useExercises';
import { addSet, addCardioEntry } from '../../db/sets.repo';
import type { Exercise, WeightMode } from '../../types/models';
import { ExercisePicker } from './ExercisePicker';
import { SetEntryRow } from './SetEntryRow';
import { CardioEntryRow } from './CardioEntryRow';
import { SetList } from './SetList';
import { EmptyState } from '../common/EmptyState';
import { BackupReminder } from '../common/BackupReminder';
import './TodaySessionView.css';

export function TodaySessionView() {
  const { session, sets } = useTodaySession();
  const exercises = useExercises();
  const [activeExerciseIds, setActiveExerciseIds] = useState<string[]>([]);

  const exerciseById = useMemo(() => {
    const map = new Map<string, Exercise>();
    for (const e of exercises ?? []) map.set(e.id, e);
    return map;
  }, [exercises]);

  const setsByExercise = useMemo(() => {
    const map = new Map<string, typeof sets>();
    for (const set of sets) {
      const list = map.get(set.exerciseId);
      if (list) list.push(set);
      else map.set(set.exerciseId, [set]);
    }
    return map;
  }, [sets]);

  const orderedExerciseIds = useMemo(() => {
    const fromSets = [...setsByExercise.keys()];
    const extra = activeExerciseIds.filter((id) => !setsByExercise.has(id));
    return [...fromSets, ...extra];
  }, [setsByExercise, activeExerciseIds]);

  function handlePick(exercise: Exercise) {
    setActiveExerciseIds((ids) => (ids.includes(exercise.id) ? ids : [...ids, exercise.id]));
  }

  async function handleAddSet(exerciseId: string, weight: number, reps: number, weightMode: WeightMode) {
    if (!session) return;
    await addSet(session.id, exerciseId, weight, reps, weightMode);
  }

  async function handleAddCardioEntry(exerciseId: string, durationMinutes: number, distanceKm: number) {
    if (!session) return;
    await addCardioEntry(session.id, exerciseId, durationMinutes, distanceKm);
  }

  if (!session) return null;

  return (
    <div className="today-session">
      <h1>Today</h1>

      <BackupReminder hasData={(exercises?.length ?? 0) > 0} />

      {orderedExerciseIds.length === 0 && (
        <EmptyState>Add an exercise below to start logging today's session.</EmptyState>
      )}

      {orderedExerciseIds.map((exerciseId) => {
        const exercise = exerciseById.get(exerciseId);
        const exerciseSets = setsByExercise.get(exerciseId) ?? [];
        const last = exerciseSets[exerciseSets.length - 1];
        const isCardio = exercise?.type === 'cardio';
        return (
          <section key={exerciseId} className="today-session__exercise">
            <h2>{exercise?.name ?? '...'}</h2>
            <SetList sets={exerciseSets} />
            {isCardio ? (
              <CardioEntryRow
                defaultDurationMinutes={last?.durationMinutes ?? 0}
                defaultDistanceKm={last?.distanceKm ?? 0}
                onAdd={(durationMinutes, distanceKm) =>
                  handleAddCardioEntry(exerciseId, durationMinutes, distanceKm)
                }
              />
            ) : (
              <SetEntryRow
                exerciseId={exerciseId}
                defaultWeight={last?.weight ?? 0}
                defaultReps={last?.reps ?? 0}
                onAdd={(weight, reps, weightMode) => handleAddSet(exerciseId, weight, reps, weightMode)}
              />
            )}
          </section>
        );
      })}

      <ExercisePicker excludeIds={orderedExerciseIds} onPick={handlePick} />
    </div>
  );
}
