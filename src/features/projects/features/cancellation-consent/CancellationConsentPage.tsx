import { useState } from 'react';
import { ProcedureSidebar } from '@/components/ProcedureSidebar';
import { StepNavigation } from '@/components/StepNavigation';
import { useProcedure } from '@/hooks/useProcedure';
import { cancellationSteps } from './data/cancellationSteps';
import { CancellationInfoStep } from './components/CancellationInfoStep';
import { SignatureStep } from '@/components/SignatureStep';

export const CancellationConsentPage = () => {
  const {
    steps,
    currentStep,
    currentStepIndex,
    goToStep,
    nextStep,
    previousStep,
    canGoNext: baseCanGoNext,
    canGoPrevious,
  } = useProcedure(cancellationSteps);

  const [hasSignature, setHasSignature] = useState(false);

  // バリデーション: 署名ステップでは署名が必要
  const isSignatureValid = hasSignature;

  // 現在のステップに応じてcanGoNextを決定
  const canGoNext = (() => {
    if (!baseCanGoNext) return false;
    if (currentStep.id === 'signature') {
      return isSignatureValid;
    }
    return true;
  })();

  const handleNext = () => {
    if (currentStepIndex === steps.length - 1) {
      // 最後のステップの場合は完了処理
      handleComplete();
    } else {
      nextStep();
    }
  };

  const handleComplete = () => {
    // TODO: 解約合意手続きの完了処理
    console.log('解約合意手続きを完了しました', { hasSignature });
    alert('解約合意手続きが完了しました');
  };

  const renderStep = () => {
    switch (currentStep.id) {
      case 'info':
        return <CancellationInfoStep />;
      case 'signature':
        return (
          <SignatureStep 
            hasSignature={hasSignature} 
            onSignatureChange={setHasSignature}
            title="署名"
            description="解約合意の署名を行います。"
          />
        );
      default:
        return <CancellationInfoStep />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ProcedureSidebar
        steps={steps}
        currentStepIndex={currentStepIndex}
        onStepClick={goToStep}
        title="解約合意手続き"
      />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {renderStep()}
            <StepNavigation
              onPrevious={previousStep}
              onNext={handleNext}
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

