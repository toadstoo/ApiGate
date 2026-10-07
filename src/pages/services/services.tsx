import React, { useState } from 'react';
import { Plus, Play, Pause, RotateCw, Trash2, Globe, Edit2 } from 'lucide-react';
import { Badge } from '../../shared/ui/badge/badge';
import { Button } from '../../shared/ui/button/button';
import { AddServiceModal } from './components/AddServiceModal';
import type { GatewayService } from '../../entities/service/types';
import styles from './services.module.scss';

interface ServicesPageProps {
  services: GatewayService[];
  searchQuery: string;
  onToggleStatus: (id: number) => void;
  onRestartService: (id: number) => void;
  onDeleteService: (id: number) => void;
  onAddService: (service: Omit<GatewayService, 'id' | 'uptime' | 'latency'>) => void;
  onEditService: (id: number, service: Omit<GatewayService, 'id' | 'uptime' | 'latency'>) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  searchQuery,
  onToggleStatus,
  onRestartService,
  onDeleteService,
  onAddService,
  onEditService,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<GatewayService | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'warning' | 'error'>('all');

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.targetUrl.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <div>
          <h1>Gateway Services</h1>
          <p>Register, monitor, and configure active microservices proxy routes.</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => {
            setEditingService(null);
            setIsModalOpen(true);
          }}
        >
          <Plus size={16} />
          Add Service
        </Button>
      </header>

      <div className={styles.filterBar}>
        <div className={styles.tabs}>
          {(['all', 'success', 'warning', 'error'] as const).map((filter) => (
            <button
              key={filter}
              className={`${styles.tab} ${statusFilter === filter ? styles.activeTab : ''}`}
              onClick={() => setStatusFilter(filter)}
            >
              {filter === 'all' ? 'All' : filter === 'success' ? 'Active' : filter === 'warning' ? 'Degraded' : 'Down'}
              {' '}({filter === 'all' ? services.length : services.filter(s => s.status === filter).length})
            </button>
          ))}
        </div>
      </div>

      <div className={styles.servicesGrid}>
        {filteredServices.map((service) => (
          <div key={service.id} className={styles.serviceCard}>
            <div className={styles.cardHeader}>
              <div className={styles.serviceTitle}>
                <Globe size={18} className={styles.titleIcon} />
                <h3>{service.name}</h3>
              </div>
              <Badge variant={service.status}>
                {service.status === 'success' ? 'Active' : service.status === 'warning' ? 'Degraded' : 'Down'}
              </Badge>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.detailRow}>
                <span className={styles.label}>Route Path:</span>
                <code>{service.path}</code>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Target:</span>
                <span className={styles.target}>{service.targetUrl}</span>
              </div>
              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Uptime</span>
                  <span className={styles.statVal}>{service.uptime}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Latency</span>
                  <span className={styles.statVal}>{service.latency}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Rate Limit</span>
                  <span className={styles.statVal}>{service.rateLimit}/m</span>
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.actions}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleStatus(service.id)}
                  title={service.status === 'error' ? 'Resume Service' : 'Pause Service'}
                >
                  {service.status === 'error' ? <Play size={14} color="#10b981" /> : <Pause size={14} color="#f59e0b" />}
                  {service.status === 'error' ? 'Resume' : 'Pause'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRestartService(service.id)}
                  title="Restart Service"
                >
                  <RotateCw size={14} />
                  Restart
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditingService(service);
                    setIsModalOpen(true);
                  }}
                  title="Edit Service Route"
                >
                  <Edit2 size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteService(service.id)}
                  style={{ color: '#ef4444' }}
                  title="Delete Service"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className={styles.emptyState}>
          <p>No services match the current filter or search criteria.</p>
        </div>
      )}

      <AddServiceModal
        key={editingService ? `edit-${editingService.id}` : 'add'}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingService(null);
        }}
        onAdd={onAddService}
        onEdit={onEditService}
        editingService={editingService}
      />

    </div>
  );
};
