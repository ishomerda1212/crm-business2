import { Button } from './ui/button';

interface StepNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  nextLabel?: string;
}

export const StepNavigation = ({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  nextLabel = '次へ',
}: StepNavigationProps) => {
  return (
    <div className="flex justify-between mt-8 pt-6 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={!canGoPrevious}
      >
        前へ
      </Button>
      <Button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
      >
        {nextLabel}
      </Button>
    </div>
  );
};
