import { useEffect } from 'react';
import { Home } from 'lucide-react';
import { FormProvider, useFormContext } from '../context/FormContext';
import { FormHeader, FormNavigation } from '../../components';
import {
  PropertySelectStep,
  ReformAreaStep,
  PriorityPointsStep,
  DesiredCompletionStep,
  BudgetLoanStep,
  EstimateStatusStep,
  ExistingCustomerGreetingStep,
} from '../../steps';

const ExistingCustomerHearingFormContent = () => {
  const { currentStep, prevStep, nextStep, canProceed, getTotalSteps, setSelectedCustomerId, setCustomerType } = useFormContext();

  useEffect(() => {
    setCustomerType('existing');
    const params = new URLSearchParams(window.location.search);
    const customerId = params.get('customerId');
    if (customerId) {
      setSelectedCustomerId(customerId);
    }
  }, [setCustomerType, setSelectedCustomerId]);

  const steps = [
    { id: 1, label: 'ご案内' },
    { id: 2, label: '物件選択' },
    { id: 3, label: '検討箇所' },
    { id: 4, label: '重視ポイント' },
    { id: 5, label: '完成時期' },
    { id: 6, label: '予算・ローン' },
    { id: 7, label: '見積状況' },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ExistingCustomerGreetingStep />;
      case 2:
        return <PropertySelectStep />;
      case 3:
        return <ReformAreaStep />;
      case 4:
        return <PriorityPointsStep />;
      case 5:
        return <DesiredCompletionStep />;
      case 6:
        return <BudgetLoanStep />;
      case 7:
        return <EstimateStatusStep />;
      default:
        return <ExistingCustomerGreetingStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <FormHeader
        title="イズホーム"
        icon={<Home className="w-8 h-8" />}
        steps={steps}
        currentStep={currentStep}
        hideNavigationBeforeStep={1}
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

export const ExistingCustomerHearingForm = () => {
  return (
    <FormProvider>
      <ExistingCustomerHearingFormContent />
    </FormProvider>
  );
};

