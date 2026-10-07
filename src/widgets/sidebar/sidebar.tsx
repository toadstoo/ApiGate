import React from 'react';
import { LayoutDashboard, Server, FileText, Settings, ShieldCheck } from 'lucide-react';
import styles from './sidebar.module.scss';

const NAV_ITEMS = [
  { icon: <LayoutDashboard size={20} />, label: 'Overview' },
  { icon: <Server size={20} />, label: 'Services' },
  { icon: <FileText size={20} />, label: 'Logs' },
  { icon: <Settings size={20} />, label: 'Settings' },
];

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
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
            className={`${styles.navItem} ${item.label === activeTab ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onSelectTab(item.label);
            }}
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


