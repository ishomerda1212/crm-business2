import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, UserPlus, Save, FileText } from 'lucide-react';
import { Project } from '@/lib/supabase';

type ProjectHeaderProps = {
  project: Project;
  onBack: () => void;
  onEdit: () => void;
};

export function ProjectHeader({ project, onBack, onEdit }: ProjectHeaderProps) {
  return (
    <div className="bg-white dark:bg-white border-b dark:border-gray-200 px-8 py-4">
      <div className="max-w-[1800px] mx-auto">
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

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-900 mb-2">
              {project.project_name}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-600">案件番号: {project.project_number}</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              担当者登録
            </Button>
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              編集
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              帳票
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              <Save className="w-4 h-4 mr-2" />
              保存
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
