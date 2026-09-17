import { ProgressDashboard } from '../components/progress/ProgressDashboard';
import { BackupSection } from '../components/progress/BackupSection';

export function Progress() {
  return (
    <div>
      <h1>Progress</h1>
      <ProgressDashboard />
      <BackupSection />
    </div>
  );
}
