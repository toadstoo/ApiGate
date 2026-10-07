import { useState } from 'react';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ServicesPage } from '../pages/services/services';
import { LogsPage } from '../pages/logs/logs';
import { SettingsPage } from '../pages/settings/settings';
import { Sidebar } from '../widgets/sidebar/sidebar';
import { Header } from '../widgets/header/header';
import { INITIAL_SERVICES, INITIAL_LOGS, INITIAL_SETTINGS } from '../entities/service/mockData';
import { Toast } from '../shared/ui/toast/toast';
import type { ToastMessage } from '../shared/ui/toast/toast';
import '../shared/styles/index.scss';

function App() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, text }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'Overview': return (
        <DashboardPage 
          services={services} 
          logs={logs}
          onToggleStatus={(id) => {
            setServices(s => s.map(serv => serv.id === id ? { ...serv, status: serv.status === 'success' ? 'error' : 'success' } : serv));
            addToast(`Service status updated`, 'success');
          }}
          onRestartService={(id) => addToast(`Service ${id} restart signal sent`, 'info')}
          onNavigateToTab={setActiveTab}
          onRefresh={() => addToast('System status refreshed', 'success')}
        />
      );
      case 'Services': return (
        <ServicesPage
          services={services}
          searchQuery={searchQuery}
          onToggleStatus={(id) => {
            setServices(s => s.map(serv => serv.id === id ? { ...serv, status: serv.status === 'success' ? 'error' : 'success' } : serv));
            addToast(`Status changed for service ${id}`, 'info');
          }}
          onRestartService={(id) => addToast(`Restarting service ${id}...`, 'info')}
          onDeleteService={(id) => {
            setServices(s => s.filter(serv => serv.id !== id));
            addToast('Service deleted from registry', 'error');
          }}
          onAddService={(service) => {
            setServices(s => [...s, { ...service, id: Date.now(), uptime: '100%', latency: '24ms' }]);
            addToast('New route registered successfully', 'success');
          }}
          onEditService={(id, updated) => {
            setServices(s => s.map(serv => serv.id === id ? { ...serv, ...updated } : serv));
            addToast('Service configuration updated', 'success');
          }}
        />
      );
      case 'Logs': return <LogsPage logs={logs} onClearLogs={() => { setLogs([]); addToast('Log history cleared', 'info'); }} searchQuery={searchQuery} onSearchChange={setSearchQuery} />;
      case 'Settings': return <SettingsPage settings={settings} onSaveSettings={(s) => { setSettings(s); addToast('Global settings updated', 'success'); }} />;
      default: return <DashboardPage services={services} logs={logs} onToggleStatus={()=>{}} onRestartService={()=>{}} onNavigateToTab={setActiveTab} onRefresh={()=>{}} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <main style={{ padding: '2rem', flex: 1 }}>
          {renderPage()}
        </main>
      </div>
      <Toast toasts={toasts} onDismiss={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />
    </div>
  );
}

export default App;




