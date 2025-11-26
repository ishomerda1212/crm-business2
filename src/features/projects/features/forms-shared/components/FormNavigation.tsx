import { ChevronRight } from 'lucide-react';

type FormNavigationProps = {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onNext: () => void;
  onPrev?: () => void;
  showPrev?: boolean;
  showNext?: boolean;
  prevLabel?: string;
  nextLabel?: string;
  completeLabel?: string;
};

export const FormNavigation = ({
  currentStep,
  totalSteps,
  canProceed,
  onNext,
  onPrev,
  showPrev = true,
  showNext = true,
  prevLabel = '戻る',
  nextLabel = '次へ',
  completeLabel = '完了',
}: FormNavigationProps) => {
  const isLastStep = currentStep === totalSteps;
  const canClickNext = canProceed && !isLastStep;

  if (!showPrev && !showNext) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-4 mt-12">
      {showPrev && onPrev && (
        <button
          onClick={onPrev}
          className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
        >
          {prevLabel}
        </button>
      )}

      {showNext && (
        <button
          onClick={onNext}
          disabled={!canClickNext}
          className={`px-8 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200 ${
            canClickNext
              ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>{isLastStep ? completeLabel : nextLabel}</span>
          {!isLastStep && <ChevronRight className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
};


