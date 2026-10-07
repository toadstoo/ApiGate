import React, { useState } from 'react';
import { Search, Filter, Trash2, Clock } from 'lucide-react';
import { Badge } from '../../shared/ui/badge/badge';
import { Button } from '../../shared/ui/button/button';
import type { GatewayLog } from '../../entities/service/types';
import styles from './logs.module.scss';

interface LogsPageProps {
  logs: GatewayLog[];
  onClearLogs: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const LogsPage: React.FC<LogsPageProps> = ({ logs, onClearLogs, searchQuery, onSearchChange }) => {
  const [filter, setFilter] = useState('all');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.path.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         log.method.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filter === 'all' || 
                        (filter === 'error' && log.status >= 500) ||
                        (filter === 'warn' && log.status >= 400 && log.status < 500) ||
                        (filter === 'info' && log.status < 400);
    return matchesSearch && matchesLevel;
  });

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <div>
          <h1>Traffic Logs</h1>
          <p>Real-time gateway request and response telemetry.</p>
        </div>
        <Button variant="ghost" onClick={onClearLogs} style={{ color: '#ef4444' }}>
          <Trash2 size={16} />
          Clear History
        </Button>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by path or method..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className={styles.filters}>
          <Filter size={18} color="#64748b" />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="info">Success (2xx)</option>
            <option value="warn">Warnings (4xx)</option>
            <option value="error">Errors (5xx)</option>
          </select>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Method</th>
              <th>Endpoint Path</th>
              <th>Status</th>
              <th>Latency</th>
              <th>Client IP</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td className={styles.time}><Clock size={12} /> {log.timestamp}</td>
                <td>
                  <Badge variant={log.method === 'GET' ? 'info' : log.method === 'POST' ? 'success' : 'neutral'}>
                    {log.method}
                  </Badge>
                </td>
                <td className={styles.path}><code>{log.path}</code></td>
                <td>
                  <span className={`${styles.status} ${log.status >= 500 ? styles.error : log.status >= 400 ? styles.warn : styles.success}`}>
                    {log.status}
                  </span>
                </td>
                <td>{log.latency}</td>
                <td className={styles.ip}>{log.clientIp}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLogs.length === 0 && (
          <div className={styles.empty}>No logs found.</div>
        )}
      </div>
    </div>
  );
};
