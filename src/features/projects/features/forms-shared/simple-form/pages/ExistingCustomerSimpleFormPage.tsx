import { useEffect } from 'react';
import { UsersRound } from 'lucide-react';
import { CustomerFormProvider, useCustomerFormContext } from '../context/FormContext';
import { FormHeader, FormNavigation } from '../../components';
import { PropertySelectStep, AddressStep } from '../../steps';

const ExistingCustomerSimpleFormContent = () => {
  const { currentStep, prevStep, nextStep, canProceed, getTotalSteps, setSelectedCustomerId, setCustomerStatus } = useCustomerFormContext();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const customerId = params.get('customerId');
    if (customerId) {
      setSelectedCustomerId(customerId);
      setCustomerStatus('existing');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 初回マウント時のみ実行

  const steps = [
    { id: 1, label: '物件選択' },
    { id: 2, label: 'ご住所情報' },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PropertySelectStep />;
      case 2:
        return <AddressStep />;
      default:
        return <PropertySelectStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <FormHeader
        title="顧客フォーム"
        subtitle="イズホームのお問い合わせ"
        icon={<UsersRound className="w-8 h-8" />}
        steps={steps}
        currentStep={currentStep}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderStep()}
        <FormNavigation
          currentStep={currentStep}
          totalSteps={getTotalSteps()}
          canProceed={canProceed()}
          onPrev={prevStep}
          onNext={nextStep}
          showPrev={currentStep > 1}
        />
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">
        <p>&copy; 2024 イズホーム. All rights reserved.</p>
      </footer>
    </div>
  );
};

export const ExistingCustomerSimpleForm = () => {
  return (
    <CustomerFormProvider>
      <ExistingCustomerSimpleFormContent />
    </CustomerFormProvider>
  );
};

