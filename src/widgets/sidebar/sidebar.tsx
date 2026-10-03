import { LayoutDashboard, Server, FileText, Settings, ShieldCheck } from 'lucide-react';
import styles from './sidebar.module.scss';

const NAV_ITEMS = [
  { icon: <LayoutDashboard size={20} />, label: 'Overview', active: true },
  { icon: <Server size={20} />, label: 'Services', active: false },
  { icon: <FileText size={20} />, label: 'Logs', active: false },
  { icon: <Settings size={20} />, label: 'Settings', active: false },
];

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <ShieldCheck size={28} color="#3b82f6" />
          <h1>ApiGate</h1>
        </div>
      </div>
      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`${styles.navItem} ${item.active ? styles.active : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className={styles.footer}>
        <div className={styles.status}>
          <div className={styles.indicator} />
          <span>System Online</span>
        </div>
      </div>
    </aside>
  );
};

