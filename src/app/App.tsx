import { DashboardPage } from '../pages/dashboard/dashboard';
import { Sidebar } from '../widgets/sidebar/sidebar';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <DashboardPage />
      </div>
    </div>
  )
}

export default App

