import React, { useState } from 'react';
import { Search, Bell, User, X } from 'lucide-react';
import styles from './header.module.scss';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Inventory API (Route /api/v1/stock) is currently DOWN (Status 503).', type: 'error', time: '2m ago' },
    { id: 2, text: 'Payment Gateway high latency alert: 85ms avg latency detected.', type: 'warning', time: '10m ago' },
    { id: 3, text: 'Auth Service successfully scaled up to 3 instances.', type: 'success', time: '1h ago' }
  ]);

  const handleDismissNotification = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <header className={styles.header}>
      <div className={styles.search}>
        <Search size={18} />
        <input 
          type="text" 
          placeholder="Search services, paths or targets..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button 
            onClick={() => onSearchChange('')} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#94a3b8' }}
          >
            <X size={14} />
          </button>
        )}
      </div>
      <div className={styles.actions}>
        <div style={{ position: 'relative' }}>
          <button 
            className={`${styles.iconBtn} ${isNotificationsOpen ? styles.active : ''}`}
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          >
            <Bell size={20} />
            {notifications.length > 0 && <span className={styles.badge} />}
          </button>

          {isNotificationsOpen && (
            <div 
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: '320px',
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                zIndex: 1000,
                padding: '1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                <h4 style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>System Alerts ({notifications.length})</h4>
                {notifications.length > 0 && (
                  <button 
                    onClick={() => setNotifications([])}
                    style={{ background: 'none', border: 'none', fontSize: '0.75rem', color: '#3b82f6', cursor: 'pointer', fontWeight: 500 }}
                  >
                    Clear All
                  </button>
                )}
              </div>
              {notifications.length === 0 ? (
                <div style={{ padding: '1rem 0', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
                  No active system alerts.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '250px', overflowY: 'auto' }}>
                  {notifications.map(item => (
                    <div 
                      key={item.id} 
                      style={{
                        display: 'flex',
                        gap: '0.50rem',
                        padding: '0.5rem',
                        borderRadius: '0.375rem',
                        backgroundColor: item.type === 'error' ? '#fef2f2' : item.type === 'warning' ? '#fffbeb' : '#f0fdf4',
                        borderLeft: `3px solid ${item.type === 'error' ? '#ef4444' : item.type === 'warning' ? '#f59e0b' : '#22c55e'}`,
                        fontSize: '0.8125rem'
                      }}
                    >
                      <div style={{ flex: 1, color: '#334155' }}>
                        <div>{item.text}</div>
                        <span style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem', display: 'inline-block' }}>{item.time}</span>
                      </div>
                      <button 
                        onClick={(e) => handleDismissNotification(item.id, e)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', height: 'fit-content' }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.user}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Admin User</span>
            <span className={styles.userRole}>System Administrator</span>
          </div>
          <div className={styles.avatar}>
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};


