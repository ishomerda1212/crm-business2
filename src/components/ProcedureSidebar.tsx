import type { Step } from '@/hooks/useProcedure';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ProcedureSidebarProps {
  steps: Step[];
  currentStepIndex: number;
  onStepClick: (index: number) => void;
  title: string;
}

export const ProcedureSidebar = ({ steps, currentStepIndex, onStepClick, title }: ProcedureSidebarProps) => {
  return (
    <aside className="w-80 bg-white border-r min-h-screen flex-shrink-0">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        <nav>
          <ul className="space-y-2">
            {steps.map((step, index) => {
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;

              return (
                <li key={step.id}>
                  <button
                    type="button"
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
                      isActive
                        ? 'bg-orange-50 text-orange-600 border border-orange-200'
                        : isCompleted
                        ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        : 'text-gray-500 hover:bg-gray-50'
                    )}
                    onClick={() => onStepClick(index)}
                  >
                    <div
                      className={cn(
                        'flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 font-medium',
                        isActive
                          ? 'bg-orange-500 text-white'
                          : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      )}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                    </div>
                    <span className="text-sm font-medium">{step.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
