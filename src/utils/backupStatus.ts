const LAST_BACKUP_KEY = 'gym-monitoring:lastBackupAt';

export function getLastBackupAt(): number | null {
  try {
    const stored = localStorage.getItem(LAST_BACKUP_KEY);
    return stored ? Number(stored) : null;
  } catch {
    return null;
  }
}

export function markBackedUpNow(): void {
  try {
    localStorage.setItem(LAST_BACKUP_KEY, String(Date.now()));
  } catch {
    // localStorage unavailable — reminder just won't clear until it is.
  }
}

export function daysSinceLastBackup(): number | null {
  const last = getLastBackupAt();
  if (last === null) return null;
  return Math.floor((Date.now() - last) / (24 * 60 * 60 * 1000));
}
