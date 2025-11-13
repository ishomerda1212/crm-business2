import { useState } from 'react';

export interface Step {
  id: string;
  title: string;
}

interface UseProcedureReturn {
  steps: Step[];
  currentStep: Step;
  currentStepIndex: number;
  goToStep: (index: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const useProcedure = (initialSteps: Step[]): UseProcedureReturn => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = initialSteps[currentStepIndex] || initialSteps[0];
  const canGoNext = currentStepIndex < initialSteps.length - 1;
  const canGoPrevious = currentStepIndex > 0;

  const goToStep = (index: number) => {
    if (index >= 0 && index < initialSteps.length) {
      setCurrentStepIndex(index);
    }
  };

  const nextStep = () => {
    if (canGoNext) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (canGoPrevious) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return {
    steps: initialSteps,
    currentStep,
    currentStepIndex,
    goToStep,
    nextStep,
    previousStep,
    canGoNext,
    canGoPrevious,
  };
};
