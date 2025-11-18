import { ProcedureSidebar } from '@/components/ProcedureSidebar';
import { StepNavigation } from '@/components/StepNavigation';
import { useProcedure } from '@/hooks/useProcedure';
import { contractSteps } from './data/contractSteps';
import { CoolingOffAndTermsStep } from './components/CoolingOffAndTermsStep';
import { ConsentStep } from './components/ConsentStep';
import { CustomerInfoStep } from './components/CustomerInfoStep';
import { ConstructionDetailsStep } from './components/ConstructionDetailsStep';
import { ImportantItemsStep } from './components/ImportantItemsStep';
import { WarrantyStep } from './components/WarrantyStep';
import { ContractProcedureStep } from './components/ContractProcedureStep';
import { FutureFlowStep } from './components/FutureFlowStep';
import { CompanyNoticeStep } from './components/CompanyNoticeStep';
import { useState } from 'react';

export const ContractProcedurePage = () => {
  const {
    steps,
    currentStep,
    currentStepIndex,
    goToStep,
    nextStep,
    previousStep,
    canGoNext: baseCanGoNext,
    canGoPrevious,
  } = useProcedure(contractSteps);
  const [coolingOffAgreed, setCoolingOffAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [importantItemsAgreed, setImportantItemsAgreed] = useState(false);

  const renderStep = () => {
    switch (currentStep.id) {
      case 'cooling-off-and-terms':
        return (
          <CoolingOffAndTermsStep
            coolingOffAgreed={coolingOffAgreed}
            termsAgreed={termsAgreed}
            onCoolingOffAgreementChange={setCoolingOffAgreed}
            onTermsAgreementChange={setTermsAgreed}
          />
        );
      case 'consent':
        return <ConsentStep />;
      case 'customer-info':
        return <CustomerInfoStep />;
      case 'construction-details':
        return <ConstructionDetailsStep />;
      case 'important-items':
        return <ImportantItemsStep onAgreementChange={setImportantItemsAgreed} />;
      case 'warranty':
        return <WarrantyStep />;
      case 'contract-procedure':
        return <ContractProcedureStep />;
      case 'future-flow':
        return <FutureFlowStep />;
      case 'company-notice':
        return <CompanyNoticeStep />;
      default:
        return (
          <CoolingOffAndTermsStep
            coolingOffAgreed={coolingOffAgreed}
            termsAgreed={termsAgreed}
            onCoolingOffAgreementChange={setCoolingOffAgreed}
            onTermsAgreementChange={setTermsAgreed}
          />
        );
    }
  };

  // クーリングオフと契約約款ステップでは、両方の同意チェックボックスがチェックされている場合のみ次へ進める
  // 重要項目説明ステップでは、同意チェックボックスがチェックされている場合のみ次へ進める
  const canGoNext = (() => {
    if (!baseCanGoNext) return false;
    if (currentStep.id === 'cooling-off-and-terms') {
      return coolingOffAgreed && termsAgreed;
    }
    if (currentStep.id === 'important-items') {
      return importantItemsAgreed;
    }
    return true;
  })();

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
