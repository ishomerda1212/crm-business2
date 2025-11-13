import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const PROJECT_STATUSES = [
  { id: 'consultation', label: '相談受付', color: 'bg-blue-500' },
  { id: 'survey', label: '現地調査日程', color: 'bg-cyan-500' },
  { id: 'contract', label: '契約済成約済', color: 'bg-green-500' },
  { id: 'contractProc', label: '契約手続き', color: 'bg-purple-500' },
  { id: 'completion', label: '完了手続', color: 'bg-orange-500' },
  { id: 'completionSurvey', label: '完成調査', color: 'bg-teal-500' },
  { id: 'record', label: '実施台帳', color: 'bg-violet-500' },
  { id: 'additional', label: '追加注文', color: 'bg-pink-500' },
];

type ProjectStatusStepsProps = {
  currentStatus: string;
};

export function ProjectStatusSteps({ currentStatus }: ProjectStatusStepsProps) {
  const currentIndex = PROJECT_STATUSES.findIndex(
    (s) => s.label === currentStatus
  );

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-white border-b dark:border-gray-200 overflow-x-auto">
      <div className="w-full max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between relative min-w-[800px] sm:min-w-0">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-200 -z-10 hidden sm:block">
            <div
              className="h-full bg-orange-500 transition-all duration-500"
              style={{
                width: `${(currentIndex / (PROJECT_STATUSES.length - 1)) * 100}%`,
              }}
            />
          </div>

          {PROJECT_STATUSES.map((status, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={status.id} className="flex flex-col items-center flex-shrink-0">
                <div
                  className={cn(
                    'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                    isCompleted
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <span className="text-xs sm:text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    'mt-2 text-[10px] sm:text-xs font-medium text-center whitespace-nowrap max-w-[60px] sm:max-w-none',
                    isCurrent ? 'text-orange-600 dark:text-orange-600' : 'text-gray-600 dark:text-gray-600'
                  )}
                >
                  {status.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
