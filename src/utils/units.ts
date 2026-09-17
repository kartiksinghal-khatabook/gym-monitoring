import type { WeightUnit } from '../types/models';

const UNIT_STORAGE_KEY = 'gym-monitoring:unit';

export function getUnit(): WeightUnit {
  try {
    const stored = localStorage.getItem(UNIT_STORAGE_KEY);
    return stored === 'lb' ? 'lb' : 'kg';
  } catch {
    return 'kg';
  }
}

export function setUnit(unit: WeightUnit): void {
  try {
    localStorage.setItem(UNIT_STORAGE_KEY, unit);
  } catch {
    // localStorage unavailable (e.g. private mode) — unit preference just won't persist.
  }
}
