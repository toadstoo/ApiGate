import { Activity, Server, Zap, AlertTriangle, Play, Pause, RotateCw } from 'lucide-react';
import { Badge } from '../../shared/ui/badge/badge';
import { Button } from '../../shared/ui/button/button';
import styles from './dashboard.module.scss';

const STATS = [
  { label: 'Total Requests', value: '1.2M', icon: <Activity size={24} />, color: '#3b82f6' },
  { label: 'Active Services', value: '12', icon: <Server size={24} />, color: '#10b981' },
  { label: 'Avg Latency', value: '45ms', icon: <Zap size={24} />, color: '#f59e0b' },
  { label: 'Error Rate', value: '0.02%', icon: <AlertTriangle size={24} />, color: '#ef4444' },
];

const SERVICES = [
  { id: 1, name: 'Auth Service', path: '/api/v1/auth', status: 'success', uptime: '99.9%', latency: '12ms' },
  { id: 2, name: 'Payment Gateway', path: '/api/v1/payments', status: 'success', uptime: '99.5%', latency: '85ms' },
  { id: 3, name: 'User Management', status: 'warning', path: '/api/v1/users', uptime: '98.2%', latency: '32ms' },
  { id: 4, name: 'Inventory API', status: 'error', path: '/api/v1/stock', uptime: '45.0%', latency: '-' },
];

export const DashboardPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <div>
          <h1>Overview</h1>
          <p>System performance and service status across all regions.</p>
        </div>
        <Button variant="primary">
          <RotateCw size={16} />
          Refresh Data
        </Button>
      </header>

      <section className={styles.statsGrid}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <div className={styles.statIcon} style={{ color: stat.color, backgroundColor: `${stat.color}15` }}>
              {stat.icon}
            </div>
            <div className={styles.statContent}>
              <span className={stat.label}>{stat.label}</span>
              <h3>{stat.value}</h3>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.tableSection}>
        <div className={styles.sectionHeader}>
          <h2>Active Services</h2>
          <Button variant="ghost" size="sm">View all</Button>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Endpoint</th>
                <th>Status</th>
                <th>Uptime</th>
                <th>Latency</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {SERVICES.map((service) => (
                <tr key={service.id}>
                  <td className={styles.serviceName}>{service.name}</td>
                  <td className={styles.servicePath}><code>{service.path}</code></td>
                  <td>
                    <Badge variant={service.status as any}>
                      {service.status === 'success' ? 'Active' : service.status === 'warning' ? 'Degraded' : 'Down'}
                    </Badge>
                  </td>
                  <td>{service.uptime}</td>
                  <td>{service.latency}</td>
                  <td>
                    <div className={styles.actions}>
                      <Button variant="ghost" size="sm">
                        {service.status === 'error' ? <Play size={14} /> : <Pause size={14} />}
                      </Button>
                      <Button variant="ghost" size="sm"><RotateCw size={14} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

