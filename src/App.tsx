import { useState, useEffect } from 'react';
import { ProjectListPage } from './features/projects/pages/ProjectListPage';
import { ProjectDetailPage } from './features/projects/pages/ProjectDetailPage';
import { CustomerListPage } from './features/customers/pages/CustomerListPage';
import { ContractProcedurePage } from './features/projects/features/contract-procedure/ContractProcedurePage';
import { CompletionProcedurePage } from './features/projects/features/completion-procedure/CompletionProcedurePage';
import { Sidebar } from './components/Sidebar';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('projects');

  // URLパスに基づいてページを設定
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/contract-procedure') {
      setCurrentPage('contract-procedure');
    } else if (path === '/completion-procedure') {
      setCurrentPage('completion-procedure');
    }
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProjectId(null);
  };

  const renderPage = () => {
    // 手続きページは特別扱い（サイドバーなし）
    if (currentPage === 'contract-procedure') {
      return <ContractProcedurePage />;
    }
    if (currentPage === 'completion-procedure') {
      return <CompletionProcedurePage />;
    }

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

  // 手続きページの場合はサイドバーを表示しない
  if (currentPage === 'contract-procedure' || currentPage === 'completion-procedure') {
    return renderPage();
  }

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
