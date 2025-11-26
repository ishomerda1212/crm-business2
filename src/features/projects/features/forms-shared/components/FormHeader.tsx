import type { ReactNode } from 'react';

type FormHeaderProps = {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  steps: { id: number; label: string }[];
  currentStep: number;
  /**
   * ステップナビゲーションを表示し始めるステップ番号（デフォルト: 1）
   */
  hideNavigationBeforeStep?: number;
};

export const FormHeader = ({
  title,
  subtitle,
  icon,
  steps,
  currentStep,
  hideNavigationBeforeStep = 1,
}: FormHeaderProps) => {
  const showNavigation = currentStep >= hideNavigationBeforeStep;
  const activeStepIndex = Math.min(currentStep, steps.length);

  return (
    <header className="bg-white border-b-4 border-orange-500 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-500 text-white p-2 rounded-lg transform -skew-x-12">
              <div className="transform skew-x-12">{icon}</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
          </div>

          {showNavigation && (
            <nav className="hidden md:flex items-center space-x-2">
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === activeStepIndex;
                const isPast = stepNumber < activeStepIndex;

                return (
                  <div
                    key={step.id}
                    className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : isPast
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {step.label}
                  </div>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};


