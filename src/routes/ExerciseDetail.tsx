import { useParams, Link } from 'react-router-dom';
import { useExercise } from '../hooks/useExercises';
import { usePRs } from '../hooks/usePRs';
import { useExerciseHistory } from '../hooks/useExerciseHistory';
import { PRBadge } from '../components/exercises/PRBadge';
import { WeightTrendChart } from '../components/charts/WeightTrendChart';
import { RepsTrendChart } from '../components/charts/RepsTrendChart';
import { VolumeTrendChart } from '../components/charts/VolumeTrendChart';
import { EmptyState } from '../components/common/EmptyState';
import { formatDateKey } from '../utils/date';
import { getUnit, formatWeightValue } from '../utils/units';

export function ExerciseDetail() {
  const { id } = useParams<{ id: string }>();
  const exercise = useExercise(id);
  const records = usePRs(id);
  const history = useExerciseHistory(id);
  const unit = getUnit();

  if (!exercise) return null;

  return (
    <div>
      <Link to="/exercises">&larr; Exercises</Link>
      <h1>{exercise.name}</h1>

      <PRBadge records={records} />

      {history.length === 0 ? (
        <EmptyState>No sets logged yet for this exercise.</EmptyState>
      ) : (
        <>
          <WeightTrendChart history={history} />
          <RepsTrendChart history={history} />
          <VolumeTrendChart history={history} />

          <h2>History</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[...history].reverse().map((point) => (
              <li key={point.session.id} style={{ marginBottom: 12 }}>
                <strong>{formatDateKey(point.session.date)}</strong>
                <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                  {point.sets
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
