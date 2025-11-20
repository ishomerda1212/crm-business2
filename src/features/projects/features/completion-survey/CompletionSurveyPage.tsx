import { useEffect, useState } from 'react';
import { ProcedureSidebar } from '@/components/ProcedureSidebar';
import { StepNavigation } from '@/components/StepNavigation';
import { useProcedure } from '@/hooks/useProcedure';
import { completionSurveySteps } from './data/completionSurveySteps';
import { SalesRepresentativeStep } from './components/SalesRepresentativeStep';
import { SupervisorCraftsmenStep } from './components/SupervisorCraftsmenStep';
import { ImpressionsStep } from './components/ImpressionsStep';

export const CompletionSurveyPage = () => {
  const {
    steps,
    currentStep,
    currentStepIndex,
    goToStep,
    nextStep,
    previousStep,
    canGoNext,
    canGoPrevious,
  } = useProcedure(completionSurveySteps);

  const [surveyType, setSurveyType] = useState<'with-supervisor' | 'without-supervisor' | null>(null);

  useEffect(() => {
    // URLパラメータから現場監督の有無を取得
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type') as 'with-supervisor' | 'without-supervisor' | null;
    setSurveyType(type);
  }, []);

  const renderStep = () => {
    switch (currentStep.id) {
      case 'sales-representative':
        return <SalesRepresentativeStep />;
      case 'supervisor-craftsmen':
        return <SupervisorCraftsmenStep />;
      case 'impressions':
        return <ImpressionsStep />;
      default:
        return <SalesRepresentativeStep />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ProcedureSidebar
        steps={steps}
        currentStepIndex={currentStepIndex}
        onStepClick={goToStep}
        title={surveyType === 'with-supervisor' ? '完工アンケート（現場監督有）' : '完工アンケート（現場監督無）'}
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
