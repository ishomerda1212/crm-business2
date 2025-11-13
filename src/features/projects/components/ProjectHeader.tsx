import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Project } from '@/lib/supabase';

type ProjectHeaderProps = {
  project: Project;
  onBack: () => void;
};

export function ProjectHeader({ project, onBack }: ProjectHeaderProps) {
  return (
    <div className="bg-white dark:bg-white border-b dark:border-gray-200 px-4 sm:px-6 lg:px-8 py-4 w-full overflow-x-hidden">
      <div className="w-full max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-600 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            戻る
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-900 mb-2 break-words">
              {project.project_name}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-600">案件番号: {project.project_number}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
