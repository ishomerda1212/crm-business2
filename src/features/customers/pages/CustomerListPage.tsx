import { useState, useMemo } from 'react';
import { Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CustomerListItem } from '@/lib/supabase';
import { mockCustomerList } from '@/data/mockData';
import { CustomerFilterToolbar } from '../components/CustomerFilterToolbar';
import { CustomerFilterState, defaultCustomerFilterState } from '../components/types';

type CustomerListPageProps = {
  onSelectCustomer?: (customerId: string) => void;
};

export function CustomerListPage({ onSelectCustomer }: CustomerListPageProps) {
  const [allCustomers] = useState<CustomerListItem[]>(mockCustomerList);
  const [filters, setFilters] = useState<CustomerFilterState>(defaultCustomerFilterState);

  const handleFilterChange = <T extends keyof CustomerFilterState>(
    key: T,
    value: CustomerFilterState[T]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    // フィルタリングとソートは useMemo で自動的に実行される
  };

  const handleReset = () => {
    setFilters(defaultCustomerFilterState);
  };

  const filteredAndSortedCustomers = useMemo(() => {
    let result = [...allCustomers];

    // フィルタリング
    if (filters.customerId) {
      result = result.filter((customer) =>
        customer.customer_id.toLowerCase().includes(filters.customerId.toLowerCase())
      );
    }
    if (filters.externalCustomerId) {
      result = result.filter((customer) =>
        customer.external_customer_id
          ?.toLowerCase()
          .includes(filters.externalCustomerId.toLowerCase())
      );
    }
    if (filters.currentAddress) {
      result = result.filter((customer) =>
        customer.current_address.toLowerCase().includes(filters.currentAddress.toLowerCase())
      );
    }
    if (filters.phone) {
      result = result.filter((customer) =>
        customer.phone.replace(/-/g, '').includes(filters.phone.replace(/-/g, ''))
      );
    }

    // ソート
    result.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortKey) {
        case 'customerId':
          comparison = a.customer_id.localeCompare(b.customer_id);
          break;
        case 'customerName':
          comparison = a.customer_name.localeCompare(b.customer_name);
          break;
        case 'registrationDate': {
          const dateA = new Date(a.registration_date.replace(/\//g, '-'));
          const dateB = new Date(b.registration_date.replace(/\//g, '-'));
          comparison = dateA.getTime() - dateB.getTime();
          break;
        }
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [allCustomers, filters]);

  const handleViewDetail = (customerId: string) => {
    if (onSelectCustomer) {
      onSelectCustomer(customerId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 w-full overflow-x-hidden">
      <div className="bg-white dark:bg-white border-b dark:border-gray-200 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-900 mb-2">
              顧客一覧
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-600">全ての顧客情報を管理</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        <div className="space-y-4">
          <CustomerFilterToolbar
            filters={filters}
            onFilterChange={handleFilterChange}
            onApply={handleApply}
            onReset={handleReset}
          />

          <div className="bg-white dark:bg-white rounded-lg border dark:border-gray-200 shadow-sm">
            <div className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-900 mb-4">
                顧客リスト
              </h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        顧客ID
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        氏名
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        フリガナ
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        現住所
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        電話番号
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        登録日
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        操作
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedCustomers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                          該当する顧客が見つかりませんでした
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAndSortedCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {customer.customer_id}
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {customer.customer_name}
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {customer.furigana}
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {customer.current_address}
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {customer.phone}
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {customer.registration_date}
                          </TableCell>
                          <TableCell>
                            <button
                              onClick={() => handleViewDetail(customer.id)}
                              className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium"
                            >
                              <Eye className="w-4 h-4" />
                              <span>詳細</span>
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

