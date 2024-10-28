import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mt-6">
      <button
        onClick={onPrevious}
        disabled={currentStep === 0}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
        Previous
      </button>
      <div className="text-gray-600">
        Step {currentStep + 1} of {totalSteps}
      </div>
      <button
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};