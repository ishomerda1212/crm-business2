import { ProcedureSidebar } from '@/components/ProcedureSidebar';
import { StepNavigation } from '@/components/StepNavigation';
import { useProcedure } from '@/hooks/useProcedure';
import { contractSteps } from './data/contractSteps';
import { ConsentStep } from './components/ConsentStep';
import { CustomerInfoStep } from './components/CustomerInfoStep';
import { ConstructionDetailsStep } from './components/ConstructionDetailsStep';
import { ImportantItemsStep } from './components/ImportantItemsStep';
import { WarrantyStep } from './components/WarrantyStep';
import { ContractProcedureStep } from './components/ContractProcedureStep';
import { CompanyNoticeStep } from './components/CompanyNoticeStep';

export const ContractProcedurePage = () => {
  const {
    steps,
    currentStep,
    currentStepIndex,
    goToStep,
    nextStep,
    previousStep,
    canGoNext,
    canGoPrevious,
  } = useProcedure(contractSteps);

  const renderStep = () => {
    switch (currentStep.id) {
      case 'consent':
        return <ConsentStep />;
      case 'customer-info':
        return <CustomerInfoStep />;
      case 'construction-details':
        return <ConstructionDetailsStep />;
      case 'important-items':
        return <ImportantItemsStep />;
      case 'warranty':
        return <WarrantyStep />;
      case 'contract-procedure':
        return <ContractProcedureStep />;
      case 'company-notice':
        return <CompanyNoticeStep />;
      default:
        return <ConsentStep />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ProcedureSidebar
        steps={steps}
        currentStepIndex={currentStepIndex}
        onStepClick={goToStep}
        title="契約手続き"
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
