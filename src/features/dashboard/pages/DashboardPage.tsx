import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FolderOpen,
  Clock,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  Users,
  FileText,
} from 'lucide-react';
import { mockProjectList } from '@/data/mockData';
import { ProjectListItem } from '@/lib/supabase';

// 承認待ちのステータス（実際のデータに合わせて調整）
const PENDING_APPROVAL_STATUSES = ['提案', '契約'];

// 進行中のステータス
const IN_PROGRESS_STATUSES = ['工事中', '契約'];

// 完了ステータス
const COMPLETED_STATUSES = ['完工'];

export function DashboardPage() {
  const [projects] = useState<ProjectListItem[]>(mockProjectList);

  // KPI計算
  const kpis = useMemo(() => {
    const totalProjects = projects.length;
    const inProgressCount = projects.filter((p) =>
      IN_PROGRESS_STATUSES.includes(p.status)
    ).length;
    const pendingApprovalCount = projects.filter((p) =>
      PENDING_APPROVAL_STATUSES.includes(p.status)
    ).length;
    const completedCount = projects.filter((p) =>
      COMPLETED_STATUSES.includes(p.status)
    ).length;

    // 今月の売上（契約済み案件の契約金額の合計）
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyRevenue = projects
      .filter((p) => {
        if (!p.start_date || !p.contract_amount) return false;
        const [year, month] = p.start_date.split('/').map(Number);
        return year === currentYear && month === currentMonth + 1;
      })
      .reduce((sum, p) => sum + (p.contract_amount || 0), 0);

    // 未入金額（モックデータから計算 - 実際にはPaymentRequestから計算）
    const unpaidAmount = projects
      .filter((p) => p.contract_amount && !COMPLETED_STATUSES.includes(p.status))
      .reduce((sum, p) => {
        // 簡易計算：契約金額の30%を未入金として仮定
        return sum + (p.contract_amount || 0) * 0.3;
      }, 0);

    // 今月の新規顧客数（モックデータから計算）
    const newCustomersThisMonth = projects.filter(() => {
      // 簡易計算：今月作成された案件を新規顧客として仮定
      return true; // 実際にはcreated_dateで判定
    }).length;

    return {
      totalProjects,
      inProgressCount,
      pendingApprovalCount,
      completedCount,
      monthlyRevenue,
      unpaidAmount,
      newCustomersThisMonth,
    };
  }, [projects]);

  // 最近のアクティビティ（最近更新された案件）
  const recentActivities = useMemo(() => {
    return projects
      .slice()
      .sort(() => {
        // 簡易ソート（実際にはupdated_atでソート）
        return 0;
      })
      .slice(0, 5);
  }, [projects]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 w-full overflow-x-hidden">
      <div className="bg-white dark:bg-white border-b dark:border-gray-200 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-900 mb-2">
              ダッシュボード
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-600">
              システム全体の状況を一目で確認
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        {/* KPIカード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-600">
                総案件数
              </CardTitle>
              <FolderOpen className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-900">
                {kpis.totalProjects}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">全案件</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-600">
                進行中案件
              </CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-600">
                {kpis.inProgressCount}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                工事中・契約済み
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-600">
                承認待ち
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-600">
                {kpis.pendingApprovalCount}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                承認待ち案件
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-600">
                今月の売上
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-600">
                ¥{kpis.monthlyRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                当月契約金額
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-600">
                未入金額
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-600">
                ¥{Math.round(kpis.unpaidAmount).toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                未入金合計
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-600">
                新規顧客
              </CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-600">
                {kpis.newCustomersThisMonth}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                今月の新規
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 最近のアクティビティ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-900">
                最近のアクティビティ
              </CardTitle>
              <CardDescription>最近更新された案件</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-900">
                        {project.project_name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {project.customer_name || '顧客名なし'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${
                          project.status === '工事中'
                            ? 'bg-orange-100 text-orange-700'
                            : project.status === '契約'
                            ? 'bg-green-100 text-green-700'
                            : project.status === '完工'
                            ? 'bg-green-50 text-green-600'
                            : 'bg-gray-100 text-gray-700'
                        } border-0`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* クイックアクション */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-900">
                クイックアクション
              </CardTitle>
              <CardDescription>よく使う機能へのショートカット</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-50 transition-colors">
                  <FileText className="h-6 w-6 text-orange-500 mb-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-900">
                    新規案件
                  </span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-50 transition-colors">
                  <Users className="h-6 w-6 text-blue-500 mb-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-900">
                    新規顧客
                  </span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-50 transition-colors">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mb-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-900">
                    承認待ち
                  </span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-50 transition-colors">
                  <DollarSign className="h-6 w-6 text-yellow-500 mb-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-900">
                    未入金管理
                  </span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

