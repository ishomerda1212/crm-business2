import { Home } from 'lucide-react';
import { FormProvider, useFormContext } from '../../hearing-form/context/FormContext';
import { FormHeader, FormNavigation } from '..';
import { ReformAreaStep } from './ReformAreaStep';
import { PriorityPointsStep } from './PriorityPointsStep';
import { DesiredCompletionStep } from './DesiredCompletionStep';
import { BudgetLoanStep } from './BudgetLoanStep';
import { EstimateStatusStep } from './EstimateStatusStep';
import { AccountStep } from './AccountStep';

const HearingFormContent = () => {
  const { currentStep, prevStep, nextStep, canProceed } = useFormContext();

  const steps = [
    { id: 1, label: '検討箇所' },
    { id: 2, label: '重視ポイント' },
    { id: 3, label: '完成時期' },
    { id: 4, label: '予算・ローン' },
    { id: 5, label: '見積状況' },
    { id: 6, label: '会員情報' },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ReformAreaStep />;
      case 2:
        return <PriorityPointsStep />;
      case 3:
        return <DesiredCompletionStep />;
      case 4:
        return <BudgetLoanStep />;
      case 5:
        return <EstimateStatusStep />;
      case 6:
        return <AccountStep />;
      default:
        return <ReformAreaStep />;
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
          totalSteps={6}
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

export const HearingForm = () => {
  return (
    <FormProvider>
      <HearingFormContent />
    </FormProvider>
  );
};

