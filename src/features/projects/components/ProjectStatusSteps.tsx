import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const PROJECT_STATUSES = [
  {
    id: 'unassigned',
    label: '担当未決',
    color: 'bg-gray-400',
    description: '担当者をアサインします。',
  },
  {
    id: 'contract-prep',
    label: '契約準備',
    color: 'bg-blue-400',
    description: '書類と見積を整えます。',
  },
  {
    id: 'contract-approval',
    label: '契約承認待',
    color: 'bg-cyan-500',
    description: '社内承認の完了を待ちます。',
  },
  {
    id: 'contract-ready',
    label: '契約可',
    color: 'bg-green-500',
    description: '契約締結の準備完了です。',
  },
  {
    id: 'contract-check',
    label: '契約確認',
    color: 'bg-emerald-500',
    description: '締結内容を最終確認します。',
  },
  {
    id: 'construction-prep',
    label: '着工準備',
    color: 'bg-orange-500',
    description: '着工計画と手配を進めます。',
  },
  {
    id: 'completed',
    label: '完了済',
    color: 'bg-purple-500',
    description: '工事完了・フォロー段階です。',
  },
];

type ProjectStatusStepsProps = {
  currentStatus: string;
  onAdvance?: (nextStatus: string | null) => void;
};

export function ProjectStatusSteps({ currentStatus, onAdvance }: ProjectStatusStepsProps) {
  const currentIndex = PROJECT_STATUSES.findIndex((s) => s.label === currentStatus);
  const effectiveIndex = currentIndex >= 0 ? currentIndex : 0;
  const currentStep = PROJECT_STATUSES[currentIndex] ?? null;
  const nextStep = PROJECT_STATUSES[currentIndex + 1] ?? null;
  const progressRate =
    PROJECT_STATUSES.length > 1
      ? (effectiveIndex / (PROJECT_STATUSES.length - 1)) * 100
      : 0;

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-white border-b dark:border-gray-200 overflow-x-auto">
      <div className="w-full max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between relative min-w-[800px] sm:min-w-0">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-200 -z-10 hidden sm:block">
            <div
              className="h-full bg-orange-500 transition-all duration-500"
              style={{
                width: `${progressRate}%`,
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
                  isCompleted ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-gray-300 text-gray-400'
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

        <div className="mt-6 bg-white dark:bg-white border dark:border-gray-200 rounded-lg p-4 sm:p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-500 tracking-wide">現在のステップ</p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-900 mt-1">
              {currentStep ? currentStep.label : 'ステータス未設定'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-600 mt-2">
              {currentStep?.description ?? 'ステータス情報がありません。'}
            </p>
          </div>
          <Button
            variant="outline"
            className="self-stretch sm:self-auto sm:ml-auto min-w-[220px] justify-center border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-600"
            disabled={!nextStep}
            onClick={() => onAdvance?.(nextStep?.label ?? null)}
          >
            {nextStep ? (
              <>
                次のステップ「{nextStep.label}」へ進む
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              'これ以上進むステップはありません'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
