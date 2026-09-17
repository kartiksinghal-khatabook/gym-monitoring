import { Link } from 'react-router-dom';
import { useExerciseOverviews } from '../../hooks/useExerciseOverviews';
import { EmptyState } from '../common/EmptyState';
import { formatDateKey } from '../../utils/date';
import { getUnit, formatWeightValue } from '../../utils/units';
import './ProgressDashboard.css';

export function ProgressDashboard() {
  const overviews = useExerciseOverviews();
  const unit = getUnit();

  if (overviews === undefined) return null;

  if (overviews.length === 0) {
    return <EmptyState>Add exercises and log sessions to see progress here.</EmptyState>;
  }

  return (
    <ul className="progress-dashboard">
      {overviews.map((o) => (
        <li key={o.exerciseId}>
          <Link to={`/exercises/${o.exerciseId}`} className="progress-dashboard__row">
            <div className="progress-dashboard__main">
              <span className="progress-dashboard__name">{o.name}</span>
              <span className="progress-dashboard__last">
                {o.lastTrainedDate
                  ? `Last trained ${formatDateKey(o.lastTrainedDate)}`
                  : 'Not logged yet'}
              </span>
            </div>
            {o.records.maxWeightSet && (
              <span className="progress-dashboard__pr">
                {formatWeightValue(o.records.maxWeightSet.weight, o.records.maxWeightSet.weightMode, unit)} ×{' '}
                {o.records.maxWeightSet.reps}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
