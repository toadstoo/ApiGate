import styles from './header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div>Dashboard</div>
      <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Admin</div>
    </header>
  );
};
