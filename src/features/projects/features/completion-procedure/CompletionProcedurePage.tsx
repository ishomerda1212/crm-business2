import { ProcedureSidebar } from '@/components/ProcedureSidebar';
import { StepNavigation } from '@/components/StepNavigation';
import { useProcedure } from '@/hooks/useProcedure';
import { completionSteps } from './data/completionSteps';
import { ConstructionConfirmStep } from './components/ConstructionConfirmStep';
import { WarrantyConfirmStep } from './components/WarrantyConfirmStep';
import { SettlementStep } from './components/SettlementStep';
import { HandoverStep } from './components/HandoverStep';
import { PromotionalMaterialStep } from './components/PromotionalMaterialStep';
import { CompletionNoticeStep } from './components/CompletionNoticeStep';

export const CompletionProcedurePage = () => {
  const {
    steps,
    currentStep,
    currentStepIndex,
    goToStep,
    nextStep,
    previousStep,
    canGoNext,
    canGoPrevious,
  } = useProcedure(completionSteps);

  const renderStep = () => {
    switch (currentStep.id) {
      case 'construction-confirm':
        return <ConstructionConfirmStep />;
      case 'warranty-confirm':
        return <WarrantyConfirmStep />;
      case 'settlement':
        return <SettlementStep />;
      case 'handover':
        return <HandoverStep />;
      case 'promotional-material':
        return <PromotionalMaterialStep />;
      case 'company-notice':
        return <CompletionNoticeStep />;
      default:
        return <ConstructionConfirmStep />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ProcedureSidebar
        steps={steps}
        currentStepIndex={currentStepIndex}
        onStepClick={goToStep}
        title="完了手続き"
      />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {renderStep()}
            <StepNavigation
              onPrevious={previousStep}
              onNext={nextStep}
              canGoPrevious={canGoPrevious}
              canGoNext={canGoNext}
              nextLabel={currentStepIndex === steps.length - 1 ? '完了' : '次へ'}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
