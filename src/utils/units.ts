import type { WeightMode, WeightUnit } from '../types/models';

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

/** Formats a set's weight/bar-count value with the right label — "12.5 kg" or "3 bars". */
export function formatWeightValue(weight: number, weightMode: WeightMode | undefined, unit: WeightUnit): string {
  if (weightMode === 'bars') return `${weight} ${weight === 1 ? 'bar' : 'bars'}`;
  return `${weight} ${unit}`;
}
