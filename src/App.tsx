import { useState, useEffect } from 'react';
import { DashboardPage } from './features/dashboard/pages/DashboardPage';
import { ProjectListPage } from './features/projects/pages/ProjectListPage';
import { ProjectDetailPage } from './features/projects/pages/ProjectDetailPage';
import { UnassignedProjectsPage } from './features/projects/pages/UnassignedProjectsPage';
import { CustomerListPage } from './features/customers/pages/CustomerListPage';
import { CustomerDetailPage } from './features/customers/pages/CustomerDetailPage';
import { CustomerHistoryPage } from './features/customers/pages/CustomerHistoryPage';
import { PropertyDetailPage } from './features/property/pages/PropertyDetailPage';
import { ConstructionAddressFormPage } from './features/property/pages/ConstructionAddressFormPage';
import { ApprovalListPage } from './features/approvals/pages/ApprovalListPage';
import { UnpaidListPage } from './features/unpaid/pages/UnpaidListPage';
import { CompletionSurveyListPage } from './features/completion-survey/pages/CompletionSurveyListPage';
import { ContractRankingPage } from './features/ranking/pages/ContractRankingPage';
import { IzClubMemberListPage } from './features/izclub-members/pages/IzClubMemberListPage';
import { ContractProcedurePage } from './features/projects/features/contract-procedure/ContractProcedurePage';
import { CompletionProcedurePage } from './features/projects/features/completion-procedure/CompletionProcedurePage';
import { RatificationConsentPage } from './features/projects/features/ratification-consent/RatificationConsentPage';
import { ChangeConsentPage } from './features/projects/features/change-consent/ChangeConsentPage';
import { AdditionalOrderPage } from './features/projects/features/additional-order/AdditionalOrderPage';
import { CancellationConsentPage } from './features/projects/features/cancellation-consent/CancellationConsentPage';
import { ConveniencePaymentPage } from './features/projects/features/convenience-payment/ConveniencePaymentPage';
import { ContractApprovalPage } from './features/projects/features/contract-approval/ContractApprovalPage';
import { CompletionSurveyPage } from './features/projects/features/completion-survey/CompletionSurveyPage';
import { HearingFormPage } from './features/projects/features/forms-shared/hearing-form/pages/HearingFormPage';
import { SimpleFormPage } from './features/projects/features/forms-shared/simple-form/pages/SimpleFormPage';
import { Sidebar } from './components/Sidebar';
import { SettingsPage } from './features/settings/pages/SettingsPage';
import { Toaster } from './components/ui/toaster';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [customerSubPage, setCustomerSubPage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [previousPage, setPreviousPage] = useState<string | null>(null);
  const [showConstructionAddressForm, setShowConstructionAddressForm] = useState(false);

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
    } else if (path === '/contract-approval') {
      setCurrentPage('contract-approval');
    } else if (path === '/completion-survey') {
      setCurrentPage('completion-survey');
    } else if (path === '/forms/hearing') {
      setCurrentPage('hearing-form');
    } else if (path === '/forms/simple') {
      setCurrentPage('simple-form');
    } else if (path === '/construction-address-form') {
      setShowConstructionAddressForm(true);
    }
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProjectId(null);
    setSelectedCustomerId(null);
    setSelectedPropertyId(null);
    setCustomerSubPage(null);
  };

  const handleCustomerNavigate = (page: string) => {
    if (page === 'customer-history') {
      setCustomerSubPage(page);
    } else {
      setCustomerSubPage(null);
    }
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
    if (currentPage === 'contract-approval') {
      return <ContractApprovalPage />;
    }
    if (currentPage === 'completion-survey') {
      return <CompletionSurveyPage />;
    }
    if (currentPage === 'hearing-form') {
      return <HearingFormPage />;
    }
    if (currentPage === 'simple-form') {
      return <SimpleFormPage />;
    }
    if (showConstructionAddressForm) {
      return (
        <ConstructionAddressFormPage
          onBack={() => {
            setShowConstructionAddressForm(false);
            // URLから直接アクセスした場合は、履歴を戻るかダッシュボードに遷移
            if (window.location.pathname === '/construction-address-form') {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                setCurrentPage('dashboard');
              }
            }
          }}
          onSubmit={(data) => {
            // TODO: データを保存する処理を実装
            console.log('Construction address form data:', data);
            setShowConstructionAddressForm(false);
            // URLから直接アクセスした場合は、履歴を戻るかダッシュボードに遷移
            if (window.location.pathname === '/construction-address-form') {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                setCurrentPage('dashboard');
              }
            }
          }}
        />
      );
    }

    // 顧客関連のサブページ
    if (selectedCustomerId && customerSubPage === 'customer-history') {
      return (
        <CustomerHistoryPage
          customerId={selectedCustomerId}
          onBack={() => {
            setCustomerSubPage(null);
            setSelectedCustomerId(null);
            if (previousPage) {
              setCurrentPage(previousPage);
              setPreviousPage(null);
            }
          }}
        />
      );
    }

    if (selectedPropertyId) {
      return (
        <PropertyDetailPage
          propertyId={selectedPropertyId}
          onBack={() => setSelectedPropertyId(null)}
        />
      );
    }

    if (selectedCustomerId) {
      return (
        <CustomerDetailPage
          customerId={selectedCustomerId}
          onBack={() => setSelectedCustomerId(null)}
          onNavigate={handleCustomerNavigate}
          onSelectProperty={setSelectedPropertyId}
          onCreateProject={(candidate, propertyInfo) => {
            // TODO: 新規案件を作成する処理を実装
            console.log('新規案件作成:', { candidate, propertyInfo });
            // 将来的には案件を作成して案件詳細ページに遷移する処理を追加
          }}
        />
      );
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
        return <CustomerListPage onSelectCustomer={setSelectedCustomerId} />;
      case 'projects':
        return (
          <ProjectListPage
            onSelectProject={setSelectedProjectId}
            onCreateProject={(candidate, propertyInfo) => {
              // TODO: 新規案件を作成する処理を実装
              console.log('新規案件作成:', { candidate, propertyInfo });
              // 将来的には案件を作成して案件詳細ページに遷移する処理を追加
            }}
          />
        );
      case 'search':
        return (
          <UnassignedProjectsPage
            onSelectProject={setSelectedProjectId}
            onCreateProject={(candidate, propertyInfo) => {
              // TODO: 新規案件を作成する処理を実装
              console.log('新規案件作成:', { candidate, propertyInfo });
              // 将来的には案件を作成して案件詳細ページに遷移する処理を追加
            }}
          />
        );
      case 'approvals':
        return <ApprovalListPage />;
      case 'izclub-members':
        return (
          <IzClubMemberListPage
            onViewDetail={(customerId) => {
              setPreviousPage('izclub-members');
              setSelectedCustomerId(customerId);
              setCustomerSubPage('customer-history');
            }}
          />
        );
      case 'management':
        return <UnpaidListPage />;
      case 'completion-survey-list':
        return <CompletionSurveyListPage />;
      case 'ranking':
        return <ContractRankingPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  // 手続きページの場合はサイドバーを表示しない
  if (
    currentPage === 'contract-procedure' ||
    currentPage === 'completion-procedure' ||
    currentPage === 'ratification-consent' ||
    currentPage === 'change-consent' ||
    currentPage === 'additional-order' ||
    currentPage === 'cancellation-consent' ||
    currentPage === 'convenience-payment' ||
    currentPage === 'contract-approval' ||
    currentPage === 'completion-survey' ||
    currentPage === 'hearing-form' ||
    currentPage === 'simple-form' ||
    showConstructionAddressForm
  ) {
    return renderPage();
  }

  return (
    <>
      <div className="flex h-screen bg-white dark:bg-white overflow-x-hidden">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="flex-1 bg-gray-50 dark:bg-gray-50 min-w-0 w-full overflow-x-hidden overflow-y-auto">
          {renderPage()}
        </main>
      </div>
      <Toaster />
    </>
  );
}

export default App;
