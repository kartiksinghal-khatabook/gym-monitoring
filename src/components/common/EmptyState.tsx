import type { ReactNode } from 'react';
import './EmptyState.css';

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="empty-state">{children}</div>;
}
