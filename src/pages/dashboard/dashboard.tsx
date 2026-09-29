import { Header } from '../../widgets/header/header';
import styles from './dashboard.module.scss';

export const DashboardPage = () => {
  return (
    <div className={styles.dashboardpage}>
      <Header />
      <main className={styles.dashboardmain}>
        <h1>Overview</h1>
        <p>Welcome to your API Gateway dashboard.</p>
      </main>
    </div>
  );
};
