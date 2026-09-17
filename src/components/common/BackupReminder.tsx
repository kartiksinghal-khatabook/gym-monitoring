import { useState } from 'react';
import { downloadBackup } from '../../db/backup';
import { daysSinceLastBackup, markBackedUpNow } from '../../utils/backupStatus';
import './BackupReminder.css';

/** Nudges an export when it's been a day or more (or never) since the last one. Hidden once dismissed for this session. */
export function BackupReminder({ hasData }: { hasData: boolean }) {
  const [dismissed, setDismissed] = useState(false);
  const [days, setDays] = useState(daysSinceLastBackup);

  if (dismissed || !hasData || (days !== null && days < 1)) return null;

  async function handleExport() {
    await downloadBackup();
    markBackedUpNow();
    setDays(daysSinceLastBackup());
  }

  return (
    <div className="backup-reminder">
      <span>
        {days === null ? "You haven't backed up yet." : `It's been ${days} day${days === 1 ? '' : 's'} since your last backup.`}
      </span>
      <div className="backup-reminder__actions">
        <button type="button" onClick={handleExport}>
          Export now
        </button>
        <button type="button" className="backup-reminder__dismiss" onClick={() => setDismissed(true)}>
          Not now
        </button>
      </div>
    </div>
  );
}
