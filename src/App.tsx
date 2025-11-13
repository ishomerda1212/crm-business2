import { useState } from 'react';
import { ProjectListPage } from './features/projects/pages/ProjectListPage';
import { ProjectDetailPage } from './features/projects/pages/ProjectDetailPage';
import { Sidebar } from './components/Sidebar';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('projects');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProjectId(null);
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-white">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1 bg-gray-50 dark:bg-gray-50">
        {selectedProjectId ? (
          <ProjectDetailPage
            projectId={selectedProjectId}
            onBack={() => setSelectedProjectId(null)}
          />
        ) : (
          <ProjectListPage onSelectProject={setSelectedProjectId} />
        )}
      </main>
    </div>
  );
}

export default App;
