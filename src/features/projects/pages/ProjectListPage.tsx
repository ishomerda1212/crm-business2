import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter } from 'lucide-react';
import { Project } from '@/lib/supabase';
import { mockProjects } from '@/data/mockData';

type ProjectListPageProps = {
  onSelectProject: (projectId: string) => void;
};

export function ProjectListPage({ onSelectProject }: ProjectListPageProps) {
  const [projects] = useState<Project[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(
    (project) =>
      project.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.project_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.customer_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50">
      <div className="bg-white dark:bg-white border-b dark:border-gray-200">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-900">案件一覧</h1>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              新規案件
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="案件名、案件番号、顧客名で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              フィルター
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">案件が見つかりませんでした</p>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              新規案件を作成
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white dark:bg-white border-gray-200 dark:border-gray-200"
                onClick={() => onSelectProject(project.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-900">
                        {project.project_name}
                      </h3>
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-600">案件番号:</span>
                        <span className="text-sm font-medium dark:text-gray-900">{project.project_number}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-600">顧客名:</span>
                        <span className="text-sm font-medium text-orange-600">
                          {project.customer_name || '-'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-600">物件名:</span>
                        <span className="text-sm font-medium dark:text-gray-900">
                          {project.property_name || '-'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-600">担当者:</span>
                        <span className="text-sm font-medium dark:text-gray-900">
                          {project.sales_person || '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-500">
                    <div>
                      {project.updated_date
                        ? new Date(project.updated_date).toLocaleDateString('ja-JP')
                        : new Date(project.created_date || project.created_at).toLocaleDateString(
                            'ja-JP'
                          )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
