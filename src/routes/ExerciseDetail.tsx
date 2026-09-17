import { useParams, Link } from 'react-router-dom';
import { useExercise } from '../hooks/useExercises';
import { usePRs } from '../hooks/usePRs';
import { useCardioRecords } from '../hooks/useCardioRecords';
import { useExerciseHistory } from '../hooks/useExerciseHistory';
import { PRBadge } from '../components/exercises/PRBadge';
import { CardioBadge } from '../components/exercises/CardioBadge';
import { WeightTrendChart } from '../components/charts/WeightTrendChart';
import { RepsTrendChart } from '../components/charts/RepsTrendChart';
import { VolumeTrendChart } from '../components/charts/VolumeTrendChart';
import { DistanceTrendChart } from '../components/charts/DistanceTrendChart';
import { DurationTrendChart } from '../components/charts/DurationTrendChart';
import { EmptyState } from '../components/common/EmptyState';
import { formatDateKey } from '../utils/date';
import { getUnit, formatWeightValue } from '../utils/units';
import { formatDistance, formatDuration } from '../utils/cardio';

export function ExerciseDetail() {
  const { id } = useParams<{ id: string }>();
  const exercise = useExercise(id);
  const records = usePRs(id);
  const cardioRecords = useCardioRecords(id);
  const history = useExerciseHistory(id);
  const unit = getUnit();

  if (!exercise) return null;

  const isCardio = exercise.type === 'cardio';

  return (
    <div>
      <Link to="/exercises">&larr; Exercises</Link>
      <h1>{exercise.name}</h1>

      {isCardio ? <CardioBadge records={cardioRecords} /> : <PRBadge records={records} />}

      {history.length === 0 ? (
        <EmptyState>
          {isCardio ? 'No walks logged yet for this exercise.' : 'No sets logged yet for this exercise.'}
        </EmptyState>
      ) : (
        <>
          {isCardio ? (
            <>
              <DistanceTrendChart history={history} />
              <DurationTrendChart history={history} />
            </>
          ) : (
            <>
              <WeightTrendChart history={history} />
              <RepsTrendChart history={history} />
              <VolumeTrendChart history={history} />
            </>
          )}

          <h2>History</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[...history].reverse().map((point) => (
              <li key={point.session.id} style={{ marginBottom: 12 }}>
                <strong>{formatDateKey(point.session.date)}</strong>
                <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                  {isCardio
                    ? point.sets
                        .map(
                          (s) =>
                            `${formatDistance(s.distanceKm ?? 0)} in ${formatDuration(s.durationMinutes ?? 0)}`,
                        )
                        .join(', ')
                    : point.sets
                        .map((s) => `${formatWeightValue(s.weight, s.weightMode, unit)}×${s.reps}`)
                        .join(', ')}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
