import React, { useState } from 'react';
import { Save, RefreshCw, Shield, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '../../shared/ui/button/button';
import type { GatewaySettings } from '../../entities/service/types';
import styles from './settings.module.scss';

interface SettingsPageProps {
  settings: GatewaySettings;
  onSaveSettings: (settings: GatewaySettings) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ settings, onSaveSettings }) => {
  const [rateLimit, setRateLimit] = useState(settings.rateLimitPerMin);
  const [timeout, setTimeoutVal] = useState(settings.requestTimeoutMs);
  const [cors, setCors] = useState(settings.corsAllowedOrigins);
  const [cacheTtl, setCacheTtl] = useState(settings.cacheTtlSeconds);
  const [circuitBreaker, setCircuitBreaker] = useState(settings.enableCircuitBreaker);
  const [debugLogs, setDebugLogs] = useState(settings.enableDebugLogs);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings({
      rateLimitPerMin: rateLimit,
      requestTimeoutMs: timeout,
      corsAllowedOrigins: cors,
      cacheTtlSeconds: cacheTtl,
      enableCircuitBreaker: circuitBreaker,
      enableDebugLogs: debugLogs,
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <div>
          <h1>Gateway Settings</h1>
          <p>Global API Gateway routing, rate-limiting, and resilience parameters.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.card}>
          <div className={styles.sectionHeader}>
            <Shield size={20} className={styles.secIcon} />
            <h2>Security & Routing Configuration</h2>
          </div>
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label>Global Rate Limit (Requests/Min)</label>
              <input
                type="number"
                value={rateLimit}
                onChange={(e) => setRateLimit(Number(e.target.value))}
              />
              <span className={styles.hint}>Applies to all anonymous downstream request sources globally.</span>
            </div>
            <div className={styles.formGroup}>
              <label>Global Request Timeout (ms)</label>
              <input
                type="number"
                value={timeout}
                onChange={(e) => setTimeoutVal(Number(e.target.value))}
              />
              <span className={styles.hint}>Gateway terminates backend connection after this duration.</span>
            </div>
            <div className={styles.formGroup}>
              <label>Allowed CORS Origins</label>
              <input
                type="text"
                value={cors}
                onChange={(e) => setCors(e.target.value)}
              />
              <span className={styles.hint}>Comma separated domain origins allowed or '*' for all.</span>
            </div>
            <div className={styles.formGroup}>
              <label>Cache TTL (Seconds)</label>
              <input
                type="number"
                value={cacheTtl}
                onChange={(e) => setCacheTtl(Number(e.target.value))}
              />
              <span className={styles.hint}>Response caching TTL for GET requests proxying headers.</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.sectionHeader}>
            <RefreshCw size={20} className={styles.secIcon} />
            <h2>System Fault Tolerance & Logging</h2>
          </div>
          <div className={styles.toggles}>
            <div className={styles.toggleRow} onClick={() => setCircuitBreaker(!circuitBreaker)}>
              <div className={styles.toggleInfo}>
                <span className={styles.toggleLabel}>Enable Circuit Breaker Protection</span>
                <p>Ejects degraded or failing microservice upstream endpoints dynamically.</p>
              </div>
              <button type="button" className={styles.toggleBtn}>
                {circuitBreaker ? <ToggleRight size={40} color="#3b82f6" /> : <ToggleLeft size={40} color="#94a3b8" />}
              </button>
            </div>

            <div className={styles.toggleRow} onClick={() => setDebugLogs(!debugLogs)}>
              <div className={styles.toggleInfo}>
                <span className={styles.toggleLabel}>Verbose Debug Mode Logging</span>
                <p>Streams extensive metadata of proxy headers into system traffic logs.</p>
              </div>
              <button type="button" className={styles.toggleBtn}>
                {debugLogs ? <ToggleRight size={40} color="#3b82f6" /> : <ToggleLeft size={40} color="#94a3b8" />}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="primary" type="submit">
            <Save size={16} />
            Save Gateway Configuration
          </Button>
        </div>
      </form>
    </div>
  );
};
