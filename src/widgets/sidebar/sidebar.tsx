import styles from './sidebar.module.scss';

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.block}>
        <h1>ApiGate</h1>
        <nav className={styles.nav}>
          <a href="#" className={styles.navItem}> Overview</a>
          <a href="#" className={styles.navItem}> Services</a>
          <a href="#" className={styles.navItem}> Logs</a>
          <a href="#" className={styles.navItem}> Settings</a>
        </nav>
      </div>
    </aside>
  );
};
