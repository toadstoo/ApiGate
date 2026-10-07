import React, { useState } from 'react';
import { X, Plus, Save } from 'lucide-react';
import { Button } from '../../../shared/ui/button/button';
import type { GatewayService } from '../../../entities/service/types';
import styles from './AddServiceModal.module.scss';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (service: Omit<GatewayService, 'id' | 'uptime' | 'latency'>) => void;
  onEdit?: (id: number, service: Omit<GatewayService, 'id' | 'uptime' | 'latency'>) => void;
  editingService?: GatewayService | null;
}

export const AddServiceModal: React.FC<AddServiceModalProps> = ({ 
  isOpen, 
  onClose, 
  onAdd, 
  onEdit, 
  editingService 
}) => {
  const [name, setName] = useState(editingService ? editingService.name : '');
  const [path, setPath] = useState(editingService ? editingService.path : '');
  const [targetUrl, setTargetUrl] = useState(editingService ? editingService.targetUrl : '');
  const [rateLimit, setRateLimit] = useState(editingService ? editingService.rateLimit : 3000);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !path || !targetUrl) return;

    const formattedPath = path.startsWith('/') ? path : `/${path}`;
    const payload = {
      name,
      path: formattedPath,
      targetUrl,
      status: editingService ? editingService.status : 'success' as const,
      rateLimit: Number(rateLimit) || 3000,
    };

    if (editingService && onEdit) {
      onEdit(editingService.id, payload);
    } else {
      onAdd(payload);
    }

    setName('');
    setPath('');
    setTargetUrl('');
    setRateLimit(3000);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{editingService ? 'Edit Gateway Route' : 'Register New Gateway Service'}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Service Name</label>
            <input
              type="text"
              placeholder="e.g. Orders Service"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Gateway Route Path</label>
            <input
              type="text"
              placeholder="e.g. /api/v1/orders"
              required
              value={path}
              onChange={(e) => setPath(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Upstream Target URL</label>
            <input
              type="url"
              placeholder="e.g. http://orders-service.internal:8080"
              required
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Rate Limit (requests / min)</label>
            <input
              type="number"
              min="100"
              step="100"
              value={rateLimit}
              onChange={(e) => setRateLimit(Number(e.target.value))}
            />
          </div>

          <div className={styles.actions}>
            <Button variant="ghost" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingService ? (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Register Route
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

