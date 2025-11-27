import { useMemo, useState } from 'react';
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
import { mockCustomerList, mockProjectList } from '@/data/mockData';
import {
  RecordFilterToolbar,
  defaultRecordFilterState,
  type RecordFilterState,
} from '@/features/shared/components/RecordFilterToolbar';

type UnassignedProjectsPageProps = {
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

const STATUS_ORDER = [
  '担当未決',
  '契約準備',
  '契約承認待',
  '契約可',
  '契約確認',
  '着工準備',
  '完了済',
];

export function UnassignedProjectsPage({ onSelectProject }: UnassignedProjectsPageProps) {
  const [filters, setFilters] = useState<RecordFilterState>(defaultRecordFilterState);
  const [appliedFilters, setAppliedFilters] = useState<RecordFilterState>(defaultRecordFilterState);

  const customerIdLookup = useMemo(() => {
    const map = new Map<string, string>();
    mockCustomerList.forEach((customer) => {
      map.set(customer.customer_name, customer.customer_id);
    });
    return map;
  }, []);

  const unassignedProjects = useMemo(() => {
    return mockProjectList.filter(
      (project) => project.status === '担当未決' && !project.sales_person
    );
  }, []);

  const statusOptions = useMemo(
    () => Array.from(new Set(unassignedProjects.map((project) => project.status))),
    [unassignedProjects],
  );

  const storeOptions = useMemo(
    () =>
      Array.from(
        new Set(
          unassignedProjects
            .map((project) => project.branch_name)
            .filter((branchName): branchName is string => Boolean(branchName)),
        ),
      ),
    [unassignedProjects],
  );

  const ownerOptions = useMemo(
    () =>
      Array.from(
        new Set(
          unassignedProjects
            .map((project) => project.sales_person)
            .filter((salesPerson): salesPerson is string => Boolean(salesPerson)),
        ),
      ),
    [unassignedProjects],
  );

  const normalizeDate = (value: string | null | undefined) => {
    if (!value) return null;
    const normalized = value.replace(/\//g, '-');
    const parsed = new Date(normalized);
    return Number.isNaN(parsed.getTime()) ? null : parsed.getTime();
  };

  const filteredProjects = useMemo(() => {
    const data = unassignedProjects.filter((project) => {
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
      a: typeof unassignedProjects[number],
      b: typeof unassignedProjects[number],
    ) => {
      const getTarget = (project: typeof unassignedProjects[number]) => {
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
        const aIndex = STATUS_ORDER.indexOf(a.status);
        const bIndex = STATUS_ORDER.indexOf(b.status);
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
  }, [unassignedProjects, appliedFilters, customerIdLookup]);

  const handleFilterChange = <T extends keyof RecordFilterState>(key: T, value: RecordFilterState[T]) => {
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
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-900 mb-2">
              担当未決案件
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-600">
              担当者が未決定の案件一覧
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        <div className="bg-white dark:bg-white rounded-lg border dark:border-gray-200 shadow-sm">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-900 mb-4">
              担当未決案件リスト
            </h2>
            <RecordFilterToolbar
              filters={filters}
              onFilterChange={handleFilterChange}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
              statusOptions={statusOptions.length > 0 ? statusOptions : STATUS_ORDER}
              storeOptions={storeOptions}
              ownerOptions={ownerOptions}
            />
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-500">
                  担当未決案件はありません
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

