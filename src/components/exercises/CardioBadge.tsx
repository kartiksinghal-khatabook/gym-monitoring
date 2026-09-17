import type { CardioRecords } from '../../db/derived';
import { formatDistance, formatDuration } from '../../utils/cardio';
import './PRBadge.css';

export function CardioBadge({ records }: { records: CardioRecords | null | undefined }) {
  if (!records || (!records.longestDistanceEntry && !records.longestDurationEntry)) {
    return null;
  }

  return (
    <div className="pr-badge">
      <div className="pr-badge__stat">
        <span className="pr-badge__label">Longest distance</span>
        <span className="pr-badge__value">
          {records.longestDistanceEntry
            ? formatDistance(records.longestDistanceEntry.distanceKm ?? 0)
            : '—'}
        </span>
      </div>
      <div className="pr-badge__stat">
        <span className="pr-badge__label">Longest duration</span>
        <span className="pr-badge__value">
          {records.longestDurationEntry
            ? formatDuration(records.longestDurationEntry.durationMinutes ?? 0)
            : '—'}
        </span>
      </div>
    </div>
  );
}
