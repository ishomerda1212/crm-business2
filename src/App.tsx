import { useState } from 'react';
import { ProjectListPage } from './features/projects/pages/ProjectListPage';
import { ProjectDetailPage } from './features/projects/pages/ProjectDetailPage';
import { CustomerListPage } from './features/customers/pages/CustomerListPage';
import { Sidebar } from './components/Sidebar';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('projects');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProjectId(null);
  };

  const renderPage = () => {
    if (selectedProjectId) {
      return (
        <ProjectDetailPage
          projectId={selectedProjectId}
          onBack={() => setSelectedProjectId(null)}
        />
      );
    }

    switch (currentPage) {
      case 'customers':
        return <CustomerListPage />;
      case 'projects':
        return <ProjectListPage onSelectProject={setSelectedProjectId} />;
      default:
        return <ProjectListPage onSelectProject={setSelectedProjectId} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-white overflow-x-hidden">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1 bg-gray-50 dark:bg-gray-50 min-w-0 w-full overflow-x-hidden">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
