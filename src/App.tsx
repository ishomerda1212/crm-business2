import { useState, useEffect } from 'react';
import { DashboardPage } from './features/dashboard/pages/DashboardPage';
import { ProjectListPage } from './features/projects/pages/ProjectListPage';
import { ProjectDetailPage } from './features/projects/pages/ProjectDetailPage';
import { CustomerListPage } from './features/customers/pages/CustomerListPage';
import { ApprovalListPage } from './features/approvals/pages/ApprovalListPage';
import { ContractProcedurePage } from './features/projects/features/contract-procedure/ContractProcedurePage';
import { CompletionProcedurePage } from './features/projects/features/completion-procedure/CompletionProcedurePage';
import { RatificationConsentPage } from './features/projects/features/ratification-consent/RatificationConsentPage';
import { ChangeConsentPage } from './features/projects/features/change-consent/ChangeConsentPage';
import { AdditionalOrderPage } from './features/projects/features/additional-order/AdditionalOrderPage';
import { CancellationConsentPage } from './features/projects/features/cancellation-consent/CancellationConsentPage';
import { ConveniencePaymentPage } from './features/projects/features/convenience-payment/ConveniencePaymentPage';
import { Sidebar } from './components/Sidebar';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // URLパスに基づいてページを設定
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/contract-procedure') {
      setCurrentPage('contract-procedure');
    } else if (path === '/completion-procedure') {
      setCurrentPage('completion-procedure');
    } else if (path === '/ratification-consent') {
      setCurrentPage('ratification-consent');
    } else if (path === '/change-consent') {
      setCurrentPage('change-consent');
    } else if (path === '/additional-order') {
      setCurrentPage('additional-order');
    } else if (path === '/cancellation-consent') {
      setCurrentPage('cancellation-consent');
    } else if (path === '/convenience-payment') {
      setCurrentPage('convenience-payment');
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
    if (currentPage === 'ratification-consent') {
      return <RatificationConsentPage />;
    }
    if (currentPage === 'change-consent') {
      return <ChangeConsentPage />;
    }
    if (currentPage === 'additional-order') {
      return <AdditionalOrderPage />;
    }
    if (currentPage === 'cancellation-consent') {
      return <CancellationConsentPage />;
    }
    if (currentPage === 'convenience-payment') {
      return <ConveniencePaymentPage />;
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
      case 'dashboard':
        return <DashboardPage />;
      case 'customers':
        return <CustomerListPage />;
      case 'projects':
        return <ProjectListPage onSelectProject={setSelectedProjectId} />;
      case 'approvals':
        return <ApprovalListPage />;
      default:
        return <DashboardPage />;
    }
  };

  // 手続きページの場合はサイドバーを表示しない
  if (currentPage === 'contract-procedure' || currentPage === 'completion-procedure' || currentPage === 'ratification-consent' || currentPage === 'change-consent' || currentPage === 'additional-order' || currentPage === 'cancellation-consent' || currentPage === 'convenience-payment') {
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
