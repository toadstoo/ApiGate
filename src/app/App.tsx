import { DashboardPage } from '../pages/dashboard/dashboard';
import { Sidebar } from '../widgets/sidebar/sidebar';
import { Header } from '../widgets/header/header';
import '../shared/styles/index.scss';

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ 
        flex: 1, 
        marginLeft: '260px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header />
        <main style={{ padding: '2rem', flex: 1 }}>
          <DashboardPage />
        </main>
      </div>
    </div>
  );
}

export default App;



