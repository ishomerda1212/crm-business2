import { useState, useEffect } from 'react';
import { ProcedureSidebar } from '@/components/ProcedureSidebar';
import { StepNavigation } from '@/components/StepNavigation';
import { useProcedure } from '@/hooks/useProcedure';
import { changeSteps } from './data/changeSteps';
import { ProjectInfoStep } from './components/ProjectInfoStep';
import { ChangeInfoStep } from './components/ChangeInfoStep';
import { ConsentStep } from './components/ConsentStep';
import { SignatureStep } from '@/components/SignatureStep';

export const ChangeConsentPage = () => {
  const {
    steps,
    currentStep,
    currentStepIndex,
    goToStep,
    nextStep,
    previousStep,
    canGoNext: baseCanGoNext,
    canGoPrevious,
  } = useProcedure(changeSteps);

  const [changeData, setChangeData] = useState({
    newContractAmount: '',
    amountChangeReason: '',
    newStartDate: '',
    newEndDate: '',
    scheduleChangeReason: '',
  });
  const [consentState, setConsentState] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // localStorageから変更データを読み込む
  useEffect(() => {
    const savedData = localStorage.getItem('changeConsentData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setChangeData({
          newContractAmount: parsed.newContractAmount || '',
          amountChangeReason: parsed.amountChangeReason || '',
          newStartDate: parsed.newStartDate || '',
          newEndDate: parsed.newEndDate || '',
          scheduleChangeReason: parsed.scheduleChangeReason || '',
        });
      } catch (e) {
        console.error('Failed to parse change consent data', e);
      }
    }
  }, []);

  // バリデーション: 同意ステップではチェックボックスがチェックされている必要がある
  const isConsentValid = consentState;
  
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
      case 'change-info':
        return <ChangeInfoStep changeData={changeData} onChangeDataChange={setChangeData} />;
      case 'consent':
        return <ConsentStep consentState={consentState} onConsentChange={setConsentState} />;
      case 'signature':
        return (
          <SignatureStep 
            hasSignature={hasSignature} 
            onSignatureChange={setHasSignature}
            title="署名"
            description="変更合意の署名を行います。"
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
        title="変更合意手続き"
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

