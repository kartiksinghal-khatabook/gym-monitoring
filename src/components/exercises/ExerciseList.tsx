import { Link } from 'react-router-dom';
import { useExercises } from '../../hooks/useExercises';
import { EmptyState } from '../common/EmptyState';
import { ExerciseForm } from './ExerciseForm';
import './ExerciseList.css';

export function ExerciseList() {
  const exercises = useExercises();

  return (
    <div className="exercise-list">
      <h1>Exercises</h1>
      <ExerciseForm />
      {exercises?.length === 0 && (
        <EmptyState>No exercises yet — add your first one above.</EmptyState>
      )}
      <ul className="exercise-list__items">
        {exercises?.map((exercise) => (
          <li key={exercise.id}>
            <Link to={`/exercises/${exercise.id}`} className="exercise-list__item">
              <span>{exercise.name}</span>
              {(exercise.category || exercise.type === 'cardio') && (
                <span className="exercise-list__category">
                  {exercise.category || 'Cardio'}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
