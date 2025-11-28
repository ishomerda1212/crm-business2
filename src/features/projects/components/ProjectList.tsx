import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Plus } from 'lucide-react';
import { ProjectListItem } from '@/lib/supabase';
import { mockCustomerList } from '@/data/mockData';
import { CreateProjectDialog } from './CreateProjectDialog';
import type { CustomerSearchCandidate } from '../types/CustomerSearchCandidate';
import type { PropertyInfo } from '@/lib/supabase';
import { RecordFilterToolbar } from '@/features/shared/components/RecordFilterToolbar';
import {
  defaultRecordFilterState,
  type RecordFilterState,
} from '@/features/shared/components/types';
import { getStatusBadgeColor, STATUS_ORDER, normalizeDate } from '../utils/projectUtils';

export type ProjectListFilterMode = 'all' | 'unassigned';

type ProjectListProps = {
  projects: ProjectListItem[];
  filterMode: ProjectListFilterMode;
  title: string;
  description: string;
  listTitle: string;
  emptyMessage?: string;
  showCreateButton?: boolean;
  onSelectProject: (projectId: string) => void;
  onCreateProject?: (candidate?: CustomerSearchCandidate | null, propertyInfo?: PropertyInfo) => void;
};

export function ProjectList({
  projects,
  filterMode,
  title,
  description,
  listTitle,
  emptyMessage,
  showCreateButton = false,
  onSelectProject,
  onCreateProject,
}: ProjectListProps) {
  const [filters, setFilters] = useState<RecordFilterState>(defaultRecordFilterState);
  const [appliedFilters, setAppliedFilters] = useState<RecordFilterState>(defaultRecordFilterState);

  // フィルタリングモードに基づいて初期フィルタリング
  const filteredByMode = useMemo(() => {
    if (filterMode === 'unassigned') {
      return projects.filter((project) => project.status === '担当未決' && !project.sales_person);
    }
    // 'all' モード: 担当未決を除く全て
    return projects.filter((project) => project.status !== '担当未決');
  }, [projects, filterMode]);

  const storeOptions = useMemo(
    () =>
      Array.from(
        new Set(
          filteredByMode
            .map((project) => project.branch_name)
            .filter((branchName): branchName is string => Boolean(branchName)),
        ),
      ),
    [filteredByMode],
  );

  const ownerOptions = useMemo(
    () =>
      Array.from(
        new Set(
          filteredByMode
            .map((project) => project.sales_person)
            .filter((salesPerson): salesPerson is string => Boolean(salesPerson)),
        ),
      ),
    [filteredByMode],
  );

  const customerIdLookup = useMemo(() => {
    const map = new Map<string, string>();
    mockCustomerList.forEach((customer) => {
      map.set(customer.customer_name, customer.customer_id);
    });
    return map;
  }, []);

  const filteredProjects = useMemo(() => {
    const data = filteredByMode.filter((project) => {
      const customerId = project.customer_name
        ? customerIdLookup.get(project.customer_name)
        : undefined;

      if (
        appliedFilters.customerId &&
        (!customerId ||
          !customerId.toLowerCase().includes(appliedFilters.customerId.toLowerCase()))
      ) {
        return false;
      }

      if (
        appliedFilters.projectId &&
        !project.project_number.toLowerCase().includes(appliedFilters.projectId.toLowerCase())
      ) {
        return false;
      }

      if (
        appliedFilters.externalCustomerId &&
        (!project.external_customer_id ||
          !project.external_customer_id
            .toLowerCase()
            .includes(appliedFilters.externalCustomerId.toLowerCase()))
      ) {
        return false;
      }

      if (
        appliedFilters.externalProjectId &&
        (!project.external_project_id ||
          !project.external_project_id
            .toLowerCase()
            .includes(appliedFilters.externalProjectId.toLowerCase()))
      ) {
        return false;
      }

      if (
        appliedFilters.store &&
        (!project.branch_name ||
          !project.branch_name.toLowerCase().includes(appliedFilters.store.toLowerCase()))
      ) {
        return false;
      }

      if (
        appliedFilters.owner &&
        (!project.sales_person ||
          !project.sales_person.toLowerCase().includes(appliedFilters.owner.toLowerCase()))
      ) {
        return false;
      }

      if (appliedFilters.status && project.status !== appliedFilters.status) {
        return false;
      }

      return true;
    });

    const sortByDate = (
      field: RecordFilterState['sortKey'],
      a: ProjectListItem,
      b: ProjectListItem,
    ) => {
      const getTarget = (project: ProjectListItem) => {
        switch (field) {
          case 'registrationDate':
            return project.registration_date;
          case 'contractDate':
            return project.contract_date ?? project.start_date;
          case 'startDate':
            return project.start_date;
          case 'completionDate':
            return project.completion_date;
          default:
            return null;
        }
      };
      const aValue = normalizeDate(getTarget(a));
      const bValue = normalizeDate(getTarget(b));
      if (aValue === bValue) return 0;
      if (aValue === null) return 1;
      if (bValue === null) return -1;
      return aValue - bValue;
    };

    const sorted = data.sort((a, b) => {
      if (appliedFilters.sortKey === 'status') {
        const aIndex = (STATUS_ORDER as readonly string[]).indexOf(a.status);
        const bIndex = (STATUS_ORDER as readonly string[]).indexOf(b.status);
        const safeA = aIndex === -1 ? STATUS_ORDER.length : aIndex;
        const safeB = bIndex === -1 ? STATUS_ORDER.length : bIndex;
        if (safeA === safeB) {
          return a.project_number.localeCompare(b.project_number);
        }
        return safeA - safeB;
      }
      const direction = appliedFilters.sortOrder === 'asc' ? 1 : -1;
      const dateResult = sortByDate(appliedFilters.sortKey, a, b);
      if (dateResult !== 0) {
        return dateResult * direction;
      }
      return a.project_number.localeCompare(b.project_number) * direction;
    });

    if (appliedFilters.sortKey === 'status' && appliedFilters.sortOrder === 'desc') {
      return [...sorted].reverse();
    }

    return sorted;
  }, [filteredByMode, appliedFilters, customerIdLookup]);

  const statusOptions = useMemo(() => {
    const uniqueStatuses = Array.from(new Set(filteredByMode.map((project) => project.status)));
    return uniqueStatuses.length > 0 ? uniqueStatuses : [...STATUS_ORDER];
  }, [filteredByMode]);

  const handleFilterChange = <T extends keyof RecordFilterState>(
    key: T,
    value: RecordFilterState[T],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
  };

  const handleResetFilters = () => {
    setFilters(defaultRecordFilterState);
    setAppliedFilters(defaultRecordFilterState);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 w-full overflow-x-hidden">
      <div className="bg-white dark:bg-white border-b dark:border-gray-200 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-900 mb-2">
                {title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-600">{description}</p>
            </div>
            {showCreateButton && onCreateProject && (
              <CreateProjectDialog
                onProceed={(candidate, propertyInfo) => onCreateProject(candidate, propertyInfo)}
                trigger={
                  <Button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    新規案件追加
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        <div className="bg-white dark:bg-white rounded-lg border dark:border-gray-200 shadow-sm">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-900 mb-4">
              {listTitle}
            </h2>
            <RecordFilterToolbar
              filters={filters}
              onFilterChange={handleFilterChange}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
              statusOptions={statusOptions}
              storeOptions={storeOptions}
              ownerOptions={ownerOptions}
            />
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-500">
                  {emptyMessage || '案件はありません'}
                </p>
              </div>
            ) : (
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
                        担当者
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        ステータス
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        登録日
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        契約実績日
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        着工予定日
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
                    {filteredProjects.map((project) => (
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
                        <TableCell className="text-gray-900 dark:text-gray-900">
                          {project.sales_person || '-'}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${getStatusBadgeColor(project.status)} border-0`}
                          >
                            {project.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-900">
                          {project.registration_date || '-'}
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-900">
                          {project.contract_date || '-'}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

