import { useRef, useState } from 'react';
import { downloadBackup, restoreBackup } from '../../db/backup';
import { getLastBackupAt, markBackedUpNow } from '../../utils/backupStatus';
import './BackupSection.css';

function formatLastBackup(ts: number | null): string {
  if (ts === null) return 'Never backed up';
  const days = Math.floor((Date.now() - ts) / (24 * 60 * 60 * 1000));
  if (days === 0) return 'Backed up today';
  if (days === 1) return 'Backed up 1 day ago';
  return `Backed up ${days} days ago`;
}

export function BackupSection() {
  const [lastBackupAt, setLastBackupAt] = useState(getLastBackupAt);
  const [status, setStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleExport() {
    await downloadBackup();
    markBackedUpNow();
    setLastBackupAt(getLastBackupAt());
    setStatus('Backup downloaded.');
  }

  async function handleImportFile(file: File) {
    try {
      const result = await restoreBackup(file);
      setStatus(
        `Restored ${result.exercises} exercises, ${result.sessions} sessions, ${result.sets} sets.`,
      );
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Could not read that file.');
    }
  }

  return (
    <div className="backup-section">
      <h2>Backup</h2>
      <p className="backup-section__status">{formatLastBackup(lastBackupAt)}</p>
      <div className="backup-section__actions">
        <button type="button" className="primary" onClick={handleExport}>
          Export backup
        </button>
        <button type="button" onClick={() => fileInputRef.current?.click()}>
          Restore from file
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImportFile(file);
            e.target.value = '';
          }}
        />
      </div>
      {status && <p className="backup-section__message">{status}</p>}
    </div>
  );
}
