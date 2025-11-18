import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { mockPaymentRequests, mockProjects, mockProjectList } from '@/data/mockData';
import { PaymentRequest, Project } from '@/lib/supabase';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale/ja';

type UnpaidItem = PaymentRequest & {
  project?: Project;
  project_number?: string;
  project_name?: string;
  customer_name?: string;
};

export function UnpaidListPage() {
  const [paymentRequests] = useState<PaymentRequest[]>(mockPaymentRequests);
  const [projects] = useState<Project[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unpaid' | 'overdue'>('unpaid');
  const [sortBy, setSortBy] = useState<'deadline' | 'amount' | 'project'>('deadline');

  // 請求項目と案件情報を結合
  const unpaidItems: UnpaidItem[] = useMemo(() => {
    return paymentRequests.map((request) => {
      const project = projects.find((p) => p.id === request.project_id);
      const projectListItem = mockProjectList.find((p) => p.id === request.project_id);
      return {
        ...request,
        project,
        project_number: project?.project_number || projectListItem?.project_number,
        project_name: project?.project_name || projectListItem?.project_name,
        customer_name: project?.customer_name || projectListItem?.customer_name || undefined,
      };
    });
  }, [paymentRequests, projects]);

  // フィルターとソート
  const filteredItems = useMemo(() => {
    let filtered = unpaidItems;

    // ステータスフィルター
    if (filterStatus === 'unpaid') {
      filtered = filtered.filter((item) => !item.payment_confirmed);
    } else if (filterStatus === 'overdue') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      filtered = filtered.filter(
        (item) =>
          !item.payment_confirmed &&
          item.payment_deadline &&
          new Date(item.payment_deadline) < today
      );
    }

    // 検索フィルター
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.project_number?.toLowerCase().includes(query) ||
          item.project_name?.toLowerCase().includes(query) ||
          item.customer_name?.toLowerCase().includes(query) ||
          item.request_name.toLowerCase().includes(query)
      );
    }

    // ソート
    filtered.sort((a, b) => {
      if (sortBy === 'deadline') {
        if (!a.payment_deadline && !b.payment_deadline) return 0;
        if (!a.payment_deadline) return 1;
        if (!b.payment_deadline) return -1;
        return new Date(a.payment_deadline).getTime() - new Date(b.payment_deadline).getTime();
      } else if (sortBy === 'amount') {
        return b.payment_amount - a.payment_amount;
      } else {
        // project
        const projectCompare = (a.project_number || '').localeCompare(b.project_number || '');
        if (projectCompare !== 0) return projectCompare;
        return a.request_name.localeCompare(b.request_name);
      }
    });

    return filtered;
  }, [unpaidItems, filterStatus, searchQuery, sortBy]);

  const formatCurrency = (value: number) => {
    return `¥ ${value.toLocaleString()}`;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    try {
      return format(new Date(dateString), 'yyyy/MM/dd', { locale: ja });
    } catch {
      return dateString;
    }
  };

  const getPaymentTiming = (requestName: string): string => {
    const timingMap: Record<string, string> = {
      '契約金': 'ご契約後3営業日以内',
      '着手金': '着工2週間前',
      '中間金 1': '工事中間時期',
      '中間金 2': '工事中間時期',
      '完工金': '完工後3営業日以内',
      '最終金': '完工後3営業日以内',
      '最終金ローン': '完工後3営業日以内',
    };
    return timingMap[requestName] || '-';
  };

  const isOverdue = (deadline: string | null, confirmed: boolean) => {
    if (confirmed || !deadline) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(deadline) < today;
  };

  const handlePaymentConfirm = (requestId: string, confirmed: boolean) => {
    // TODO: 実際のAPI呼び出しに置き換える
    console.log('入金確認更新:', requestId, confirmed);
  };

  const handleInspectionRequest = (requestId: string) => {
    // TODO: 請求点検書の処理を実装
    console.log('請求点検書:', requestId);
  };

  const totalUnpaidAmount = useMemo(() => {
    return filteredItems
      .filter((item) => !item.payment_confirmed)
      .reduce((sum, item) => sum + item.payment_amount, 0);
  }, [filteredItems]);

  const overdueCount = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return filteredItems.filter(
      (item) =>
        !item.payment_confirmed &&
        item.payment_deadline &&
        new Date(item.payment_deadline) < today
    ).length;
  }, [filteredItems]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 w-full overflow-x-hidden">
      <div className="bg-white dark:bg-white border-b dark:border-gray-200 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-900">未入金管理</h1>
              <p className="text-sm text-gray-600 dark:text-gray-600 mt-1">
                複数案件の入金状況を確認・管理できます
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-600 dark:text-gray-600">未入金合計</p>
                <p className="text-lg font-bold text-orange-600">
                  {formatCurrency(totalUnpaidAmount)}
                </p>
              </div>
              {overdueCount > 0 && (
                <Badge variant="destructive" className="text-sm">
                  期限超過: {overdueCount}件
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200 mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="案件番号、案件名、顧客名、項目名で検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Select 
                  value={filterStatus} 
                  onValueChange={(value: string) => {
                    if (value === 'all' || value === 'unpaid' || value === 'overdue') {
                      setFilterStatus(value as 'all' | 'unpaid' | 'overdue');
                    }
                  }}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    <SelectItem value="unpaid">未入金のみ</SelectItem>
                    <SelectItem value="overdue">期限超過</SelectItem>
                  </SelectContent>
                </Select>
                <Select 
                  value={sortBy} 
                  onValueChange={(value: string) => {
                    if (value === 'deadline' || value === 'amount' || value === 'project') {
                      setSortBy(value as 'deadline' | 'amount' | 'project');
                    }
                  }}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deadline">入金期限順</SelectItem>
                    <SelectItem value="amount">金額順</SelectItem>
                    <SelectItem value="project">案件順</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">請求一覧</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                      案件番号
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                      案件名
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                      顧客名
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                      項目
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                      ご入金時期
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                      契約時請負金額予定額
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                      請求額
                    </th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                      入金確認
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                      入金日
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                      摘作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-gray-500">
                        該当する請求項目がありません
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item) => {
                      const overdue = isOverdue(item.payment_deadline, item.payment_confirmed);
                      return (
                        <tr
                          key={item.id}
                          className={`border-b hover:bg-gray-50 ${
                            overdue ? 'bg-red-50' : ''
                          }`}
                        >
                          <td className="py-3 px-4 text-sm">{item.project_number || '-'}</td>
                          <td className="py-3 px-4 text-sm">{item.project_name || '-'}</td>
                          <td className="py-3 px-4 text-sm">{item.customer_name || '-'}</td>
                          <td className="py-3 px-4 text-sm">{item.request_name}</td>
                          <td className="py-3 px-4 text-sm">{getPaymentTiming(item.request_name)}</td>
                          <td className="py-3 px-4 text-sm text-right">
                            {formatCurrency(item.contract_amount)}
                          </td>
                          <td className="py-3 px-4 text-sm text-right">
                            {formatCurrency(item.payment_amount)}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Checkbox
                              checked={item.payment_confirmed}
                              onCheckedChange={(checked) =>
                                handlePaymentConfirm(item.id, checked as boolean)
                              }
                              className="border-gray-300 data-[state=checked]:bg-orange-500"
                            />
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {item.payment_date ? formatDate(item.payment_date) : '-'}
                          </td>
                          <td className="py-3 px-4">
                            <Button
                              size="sm"
                              className="bg-orange-500 hover:bg-orange-600 text-xs"
                              onClick={() => handleInspectionRequest(item.id)}
                            >
                              請求点検書
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

