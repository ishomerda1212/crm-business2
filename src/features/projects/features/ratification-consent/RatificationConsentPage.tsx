import { useState } from 'react';
import { ProcedureSidebar } from '@/components/ProcedureSidebar';
import { StepNavigation } from '@/components/StepNavigation';
import { useProcedure } from '@/hooks/useProcedure';
import { ratificationSteps } from './data/ratificationSteps';
import { ProjectInfoStep } from './components/ProjectInfoStep';
import { ConsentStep } from './components/ConsentStep';
import { SignatureStep } from '@/components/SignatureStep';

export const RatificationConsentPage = () => {
  const {
    steps,
    currentStep,
    currentStepIndex,
    goToStep,
    nextStep,
    previousStep,
    canGoNext: baseCanGoNext,
    canGoPrevious,
  } = useProcedure(ratificationSteps);

  const [consentState, setConsentState] = useState({
    quotation: false,
    constructionDate: false,
    paymentMethod: false,
  });
  const [hasSignature, setHasSignature] = useState(false);

  // バリデーション: 同意ステップではすべてのチェックボックスがチェックされている必要がある
  const isConsentValid = consentState.quotation && consentState.constructionDate && consentState.paymentMethod;
  
  // バリデーション: 署名ステップでは署名が必要
  const isSignatureValid = hasSignature;

  // 現在のステップに応じてcanGoNextを決定
  const canGoNext = (() => {
    if (!baseCanGoNext) return false;
    if (currentStep.id === 'consent') {
      return isConsentValid;
    }
    if (currentStep.id === 'signature') {
      return isSignatureValid;
    }
    return true;
  })();

  const renderStep = () => {
    switch (currentStep.id) {
      case 'project-info':
        return <ProjectInfoStep />;
      case 'consent':
        return <ConsentStep consentState={consentState} onConsentChange={setConsentState} />;
      case 'signature':
        return (
          <SignatureStep 
            hasSignature={hasSignature} 
            onSignatureChange={setHasSignature}
            title="署名"
            description="追認同意の署名を行います。"
          />
        );
      default:
        return <ProjectInfoStep />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ProcedureSidebar
        steps={steps}
        currentStepIndex={currentStepIndex}
        onStepClick={goToStep}
        title="追認同意手続き"
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

