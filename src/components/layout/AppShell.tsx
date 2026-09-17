import { NavLink, Outlet } from 'react-router-dom';
import './AppShell.css';

const TABS = [
  { to: '/', label: 'Today', end: true },
  { to: '/exercises', label: 'Exercises', end: false },
  { to: '/progress', label: 'Progress', end: false },
];

export function AppShell() {
  return (
    <div className="app-shell">
      <main className="app-shell__content">
        <Outlet />
      </main>
      <nav className="app-shell__tabbar">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) => `tab${isActive ? ' tab--active' : ''}`}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
