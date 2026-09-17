import type { WeightMode } from '../types/models';

function key(exerciseId: string): string {
  return `gym-monitoring:weightMode:${exerciseId}`;
}

export function getLastWeightMode(exerciseId: string): WeightMode {
  try {
    return localStorage.getItem(key(exerciseId)) === 'bars' ? 'bars' : 'weight';
  } catch {
    return 'weight';
  }
}

export function setLastWeightMode(exerciseId: string, mode: WeightMode): void {
  try {
    localStorage.setItem(key(exerciseId), mode);
  } catch {
    // localStorage unavailable — just won't be remembered next time.
  }
}
