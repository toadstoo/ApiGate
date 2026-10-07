import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import styles from './toast.module.scss';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.type === 'success' && <CheckCircle2 size={18} className={styles.icon} />}
          {toast.type === 'error' && <AlertCircle size={18} className={styles.icon} />}
          {toast.type === 'info' && <Info size={18} className={styles.icon} />}
          <span className={styles.text}>{toast.text}</span>
          <button className={styles.closeBtn} onClick={() => onDismiss(toast.id)}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
