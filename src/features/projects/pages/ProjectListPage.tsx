import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye } from 'lucide-react';
import { ProjectListItem } from '@/lib/supabase';
import { mockProjectList } from '@/data/mockData';

type ProjectListPageProps = {
  onSelectProject: (projectId: string) => void;
};

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case '担当未決':
      return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
    case '契約準備':
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
    case '契約承認待':
      return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
    case '契約可':
      return 'bg-green-100 text-green-700 hover:bg-green-200';
    case '契約確認':
      return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200';
    case '着工準備':
      return 'bg-orange-100 text-orange-700 hover:bg-orange-200';
    case '完了済':
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  }
};

const formatCurrency = (amount: number | null) => {
  if (amount === null) return '-';
  return `¥${amount.toLocaleString()}`;
};

export function ProjectListPage({ onSelectProject }: ProjectListPageProps) {
  const [projects] = useState<ProjectListItem[]>(mockProjectList);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 w-full overflow-x-hidden">
      <div className="bg-white dark:bg-white border-b dark:border-gray-200 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-900 mb-2">
              案件一覧
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-600">全ての案件情報を管理</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        <div className="bg-white dark:bg-white rounded-lg border dark:border-gray-200 shadow-sm">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-900 mb-4">
              案件リスト
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                      案件ID
                    </TableHead>
                    <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                      案件名
                    </TableHead>
                    <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                      顧客名
                    </TableHead>
                    <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                      ステータス
                    </TableHead>
                    <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                      契約金額
                    </TableHead>
                    <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                      担当者
                    </TableHead>
                    <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                      開始日
                    </TableHead>
                    <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                      完工予定日
                    </TableHead>
                    <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                      操作
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="text-gray-900 dark:text-gray-900">
                        {project.project_number}
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-900">
                        {project.project_name}
                      </TableCell>
                      <TableCell>
                        {project.customer_name ? (
                          <span className="text-orange-600 font-medium">
                            {project.customer_name}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusBadgeColor(project.status)} border-0`}
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-900">
                        {formatCurrency(project.contract_amount)}
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-900">
                        {project.sales_person || '-'}
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-900">
                        {project.start_date || '-'}
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-900">
                        {project.completion_date || '-'}
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => onSelectProject(project.id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          <span>詳細</span>
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
