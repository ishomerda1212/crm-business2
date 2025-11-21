import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockProjectList } from '@/data/mockData';
import { ProjectListItem } from '@/lib/supabase';
import { format, startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfMonth, endOfYear, isWithinInterval } from 'date-fns';
import { ja } from 'date-fns/locale/ja';
import { Trophy, TrendingUp } from 'lucide-react';

type RankingItem = {
  name: string;
  amount: number;
  count: number;
};

type IzClubMember = {
  id: string;
  customer_id: string;
  customer_name: string;
  membership_type: string;
  join_date: string;
  branch_name: string; // 担当店舗
  sales_person: string; // 担当者
};

// モックデータ: イズクラブ新規加入
const mockIzClubMembers: IzClubMember[] = [
  { id: '1', customer_id: 'C001', customer_name: '田中 太郎', membership_type: 'ゴールド会員', join_date: '2024-01-15', branch_name: '東京本店', sales_person: '山田 太郎' },
  { id: '2', customer_id: 'C002', customer_name: '佐藤 花子', membership_type: 'シルバー会員', join_date: '2024-02-10', branch_name: '大阪支店', sales_person: '佐々木次郎' },
  { id: '3', customer_id: 'C003', customer_name: '鈴木一郎', membership_type: 'ブロンズ会員', join_date: '2024-03-05', branch_name: '東京本店', sales_person: '山田 太郎' },
  { id: '4', customer_id: 'C004', customer_name: '高橋 美咲', membership_type: 'ゴールド会員', join_date: '2024-04-12', branch_name: '東京本店', sales_person: '佐藤 次郎' },
  { id: '5', customer_id: 'C005', customer_name: '伊藤 健', membership_type: 'シルバー会員', join_date: '2024-05-20', branch_name: '大阪支店', sales_person: '佐々木次郎' },
  { id: '6', customer_id: 'C006', customer_name: '中村 花子', membership_type: 'ゴールド会員', join_date: '2024-06-01', branch_name: '大阪支店', sales_person: '鈴木 三郎' },
  { id: '7', customer_id: 'C007', customer_name: '小林 太郎', membership_type: 'ブロンズ会員', join_date: '2024-06-15', branch_name: '東京本店', sales_person: '山田 太郎' },
  { id: '8', customer_id: 'C008', customer_name: '加藤 健', membership_type: 'シルバー会員', join_date: '2024-07-01', branch_name: '大阪支店', sales_person: '佐々木次郎' },
];

export function ContractRankingPage() {
  const [projects] = useState<ProjectListItem[]>(mockProjectList);
  const [izClubMembers] = useState<IzClubMember[]>(mockIzClubMembers);
  const [contractPeriod, setContractPeriod] = useState<'year' | 'month' | 'week' | 'custom'>('month');
  const [contractStartDate, setContractStartDate] = useState('');
  const [contractEndDate, setContractEndDate] = useState('');
  const [izClubPeriod, setIzClubPeriod] = useState<'year' | 'month' | 'week' | 'custom'>('month');
  const [izClubStartDate, setIzClubStartDate] = useState('');
  const [izClubEndDate, setIzClubEndDate] = useState('');

  // 期間の開始日と終了日を取得
  const getPeriodDates = (period: 'year' | 'month' | 'week', baseDate: Date = new Date()) => {
    let start: Date;
    let end: Date;

    switch (period) {
      case 'year':
        start = startOfYear(baseDate);
        end = endOfYear(baseDate);
        break;
      case 'month':
        start = startOfMonth(baseDate);
        end = endOfMonth(baseDate);
        break;
      case 'week':
        start = startOfWeek(baseDate, { weekStartsOn: 1 });
        end = endOfWeek(baseDate, { weekStartsOn: 1 });
        break;
    }

    return { start, end };
  };

  // 契約ランキング用のフィルタリング
  const filteredContractProjects = useMemo(() => {
    let filtered = projects.filter((p) => p.contract_amount !== null && p.contract_amount > 0);

    if (contractPeriod === 'custom') {
      if (contractStartDate && contractEndDate) {
        filtered = filtered.filter((p) => {
          if (!p.start_date) return false;
          const projectDate = new Date(p.start_date.replace(/\//g, '-'));
          const start = new Date(contractStartDate);
          const end = new Date(contractEndDate);
          return isWithinInterval(projectDate, { start, end });
        });
      }
    } else {
      const { start, end } = getPeriodDates(contractPeriod);
      filtered = filtered.filter((p) => {
        if (!p.start_date) return false;
        const projectDate = new Date(p.start_date.replace(/\//g, '-'));
        return isWithinInterval(projectDate, { start, end });
      });
    }

    return filtered;
  }, [projects, contractPeriod, contractStartDate, contractEndDate]);

  // 契約ランキング（店舗別）
  const branchRanking = useMemo(() => {
    const map = new Map<string, { amount: number; count: number }>();

    filteredContractProjects.forEach((project) => {
      if (!project.branch_name || !project.contract_amount) return;
      const branch = project.branch_name;
      if (!map.has(branch)) {
        map.set(branch, { amount: 0, count: 0 });
      }
      const data = map.get(branch)!;
      data.amount += project.contract_amount;
      data.count += 1;
    });

    const ranking: RankingItem[] = Array.from(map.entries())
      .map(([name, data]) => ({
        name,
        amount: data.amount,
        count: data.count,
      }))
      .sort((a, b) => b.amount - a.amount);

    return ranking;
  }, [filteredContractProjects]);

  // 契約ランキング（担当者別）
  const salesPersonRanking = useMemo(() => {
    const map = new Map<string, { amount: number; count: number }>();

    filteredContractProjects.forEach((project) => {
      if (!project.sales_person || !project.contract_amount) return;
      const person = project.sales_person;
      if (!map.has(person)) {
        map.set(person, { amount: 0, count: 0 });
      }
      const data = map.get(person)!;
      data.amount += project.contract_amount;
      data.count += 1;
    });

    const ranking: RankingItem[] = Array.from(map.entries())
      .map(([name, data]) => ({
        name,
        amount: data.amount,
        count: data.count,
      }))
      .sort((a, b) => b.amount - a.amount);

    return ranking;
  }, [filteredContractProjects]);

  // イズクラブ新規加入ランキング用のフィルタリング
  const filteredIzClubMembers = useMemo(() => {
    let filtered = izClubMembers;

    if (izClubPeriod === 'custom') {
      if (izClubStartDate && izClubEndDate) {
        filtered = filtered.filter((m) => {
          const joinDate = new Date(m.join_date);
          const start = new Date(izClubStartDate);
          const end = new Date(izClubEndDate);
          return isWithinInterval(joinDate, { start, end });
        });
      }
    } else {
      const { start, end } = getPeriodDates(izClubPeriod);
      filtered = filtered.filter((m) => {
        const joinDate = new Date(m.join_date);
        return isWithinInterval(joinDate, { start, end });
      });
    }

    return filtered;
  }, [izClubMembers, izClubPeriod, izClubStartDate, izClubEndDate]);

  // イズクラブ新規加入ランキング（店舗別）
  const izClubBranchRanking = useMemo(() => {
    const map = new Map<string, number>();

    filteredIzClubMembers.forEach((member) => {
      if (!member.branch_name) return;
      const branch = member.branch_name;
      map.set(branch, (map.get(branch) || 0) + 1);
    });

    const ranking: { name: string; count: number }[] = Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return ranking;
  }, [filteredIzClubMembers]);

  // イズクラブ新規加入ランキング（担当者別）
  const izClubSalesPersonRanking = useMemo(() => {
    const map = new Map<string, number>();

    filteredIzClubMembers.forEach((member) => {
      if (!member.sales_person) return;
      const person = member.sales_person;
      map.set(person, (map.get(person) || 0) + 1);
    });

    const ranking: { name: string; count: number }[] = Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return ranking;
  }, [filteredIzClubMembers]);

  const formatCurrency = (value: number) => {
    return `¥ ${value.toLocaleString()}`;
  };

  const formatPeriodLabel = (period: 'year' | 'month' | 'week' | 'custom') => {
    if (period === 'custom') return 'カスタム期間';
    const now = new Date();
    const { start } = getPeriodDates(period, now);
    switch (period) {
      case 'year':
        return format(start, 'yyyy年', { locale: ja });
      case 'month':
        return format(start, 'yyyy年MM月', { locale: ja });
      case 'week':
        return format(start, 'yyyy年MM月dd日', { locale: ja }) + '週';
      default:
        return '';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `${rank}`;
  };

  const getMaxAmount = (ranking: RankingItem[]) => {
    if (ranking.length === 0) return 1;
    return Math.max(...ranking.map((r) => r.amount));
  };

  const totalContractAmount = useMemo(() => {
    return filteredContractProjects.reduce((sum, p) => sum + (p.contract_amount || 0), 0);
  }, [filteredContractProjects]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 w-full overflow-x-hidden">
      <div className="bg-white dark:bg-white border-b dark:border-gray-200 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-900">ランキング</h1>
              <p className="text-sm text-gray-600 dark:text-gray-600 mt-1">
                契約ランキングとイズクラブ新規加入ランキングを確認できます
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        <Tabs defaultValue="contract" className="space-y-6">
          <TabsList>
            <TabsTrigger value="contract">契約ランキング</TabsTrigger>
            <TabsTrigger value="izclub">イズクラブ新規加入ランキング</TabsTrigger>
          </TabsList>

          <TabsContent value="contract" className="space-y-6">
            {/* サマリー（期間設定を含む） */}
            <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  サマリー
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* 期間設定 */}
                  <div className="space-y-2">
                    <Label>期間</Label>
                    <Select
                      value={contractPeriod}
                      onValueChange={(value: string) => {
                        if (value === 'year' || value === 'month' || value === 'week' || value === 'custom') {
                          setContractPeriod(value as 'year' | 'month' | 'week' | 'custom');
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="year">年</SelectItem>
                        <SelectItem value="month">月</SelectItem>
                        <SelectItem value="week">週</SelectItem>
                        <SelectItem value="custom">カスタム期間</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {contractPeriod === 'custom' && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>開始日</Label>
                        <Input
                          type="date"
                          value={contractStartDate}
                          onChange={(e) => setContractStartDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>終了日</Label>
                        <Input
                          type="date"
                          value={contractEndDate}
                          onChange={(e) => setContractEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  <div className="text-sm text-gray-600">
                    対象期間: {formatPeriodLabel(contractPeriod)}
                    {contractPeriod !== 'custom' && ` (${filteredContractProjects.length}件の契約)`}
                  </div>

                  {/* サマリー数値 */}
                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="text-sm text-gray-600">総契約金額</div>
                        <div className="text-2xl font-bold text-orange-600">
                          {formatCurrency(totalContractAmount)}
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-sm text-gray-600">総契約件数</div>
                        <div className="text-2xl font-bold text-blue-600">
                          {filteredContractProjects.length}件
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 店舗別・担当者別ランキング */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 店舗別ランキング（左側） */}
              <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-orange-500" />
                    店舗別ランキング
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700 w-16">
                            順位
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                            店舗名
                          </th>
                          <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                            契約金額
                          </th>
                          <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                            件数
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {branchRanking.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-8 text-center text-gray-500">
                              データがありません
                            </td>
                          </tr>
                        ) : (
                          branchRanking.map((item, index) => {
                            const rank = index + 1;
                            const maxAmount = getMaxAmount(branchRanking);
                            const percentage = (item.amount / maxAmount) * 100;

                            return (
                              <tr key={item.name} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 text-center">
                                  <span className="text-lg font-bold">{getRankIcon(rank)}</span>
                                </td>
                                <td className="py-3 px-4 text-sm font-medium">{item.name}</td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <div className="flex-1 max-w-[200px] bg-gray-200 rounded-full h-2">
                                      <div
                                        className="bg-orange-500 h-2 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                      />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900 min-w-[100px] text-right">
                                      {formatCurrency(item.amount)}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <Badge variant="outline">{item.count}件</Badge>
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

              {/* 担当者別ランキング（右側） */}
              <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-orange-500" />
                    担当者別ランキング
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700 w-16">
                            順位
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                            担当者名
                          </th>
                          <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                            契約金額
                          </th>
                          <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                            件数
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesPersonRanking.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-8 text-center text-gray-500">
                              データがありません
                            </td>
                          </tr>
                        ) : (
                          salesPersonRanking.map((item, index) => {
                            const rank = index + 1;
                            const maxAmount = getMaxAmount(salesPersonRanking);
                            const percentage = (item.amount / maxAmount) * 100;

                            return (
                              <tr key={item.name} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 text-center">
                                  <span className="text-lg font-bold">{getRankIcon(rank)}</span>
                                </td>
                                <td className="py-3 px-4 text-sm font-medium">{item.name}</td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <div className="flex-1 max-w-[200px] bg-gray-200 rounded-full h-2">
                                      <div
                                        className="bg-orange-500 h-2 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                      />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900 min-w-[100px] text-right">
                                      {formatCurrency(item.amount)}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <Badge variant="outline">{item.count}件</Badge>
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
          </TabsContent>

          <TabsContent value="izclub" className="space-y-6">
            {/* サマリー（期間設定を含む） */}
            <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  サマリー
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* 期間設定 */}
                  <div className="space-y-2">
                    <Label>期間</Label>
                    <Select
                      value={izClubPeriod}
                      onValueChange={(value: string) => {
                        if (value === 'year' || value === 'month' || value === 'week' || value === 'custom') {
                          setIzClubPeriod(value as 'year' | 'month' | 'week' | 'custom');
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="year">年</SelectItem>
                        <SelectItem value="month">月</SelectItem>
                        <SelectItem value="week">週</SelectItem>
                        <SelectItem value="custom">カスタム期間</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {izClubPeriod === 'custom' && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>開始日</Label>
                        <Input
                          type="date"
                          value={izClubStartDate}
                          onChange={(e) => setIzClubStartDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>終了日</Label>
                        <Input
                          type="date"
                          value={izClubEndDate}
                          onChange={(e) => setIzClubEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  <div className="text-sm text-gray-600">
                    対象期間: {formatPeriodLabel(izClubPeriod)}
                    {izClubPeriod !== 'custom' && ` (${filteredIzClubMembers.length}名の新規加入)`}
                  </div>

                  {/* サマリー数値 */}
                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="text-sm text-gray-600">総新規加入数</div>
                        <div className="text-2xl font-bold text-orange-600">
                          {filteredIzClubMembers.length}名
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-sm text-gray-600">内訳</div>
                        <div className="space-y-1 mt-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">ゴールド会員:</span>
                            <span className="font-semibold text-blue-600">
                              {filteredIzClubMembers.filter((m) => m.membership_type === 'ゴールド会員').length}名
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">シルバー会員:</span>
                            <span className="font-semibold text-blue-600">
                              {filteredIzClubMembers.filter((m) => m.membership_type === 'シルバー会員').length}名
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">ブロンズ会員:</span>
                            <span className="font-semibold text-blue-600">
                              {filteredIzClubMembers.filter((m) => m.membership_type === 'ブロンズ会員').length}名
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 店舗別・担当者別ランキング */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 店舗別ランキング（左側） */}
              <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-orange-500" />
                    店舗別ランキング
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700 w-16">
                            順位
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                            店舗名
                          </th>
                          <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                            新規加入数
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {izClubBranchRanking.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="py-8 text-center text-gray-500">
                              データがありません
                            </td>
                          </tr>
                        ) : (
                          izClubBranchRanking.map((item, index) => {
                            const rank = index + 1;
                            const maxCount = Math.max(...izClubBranchRanking.map((r) => r.count));
                            const percentage = maxCount > 0 ? (item.count / maxCount) * 100 : 0;

                            return (
                              <tr key={item.name} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 text-center">
                                  <span className="text-lg font-bold">{getRankIcon(rank)}</span>
                                </td>
                                <td className="py-3 px-4 text-sm font-medium">{item.name}</td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 max-w-[200px] bg-gray-200 rounded-full h-2">
                                      <div
                                        className="bg-orange-500 h-2 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                      />
                                    </div>
                                    <Badge variant="outline" className="min-w-[60px] text-center">
                                      {item.count}名
                                    </Badge>
                                  </div>
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

              {/* 担当者別ランキング（右側） */}
              <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-orange-500" />
                    担当者別ランキング
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700 w-16">
                            順位
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                            担当者名
                          </th>
                          <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                            新規加入数
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {izClubSalesPersonRanking.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="py-8 text-center text-gray-500">
                              データがありません
                            </td>
                          </tr>
                        ) : (
                          izClubSalesPersonRanking.map((item, index) => {
                            const rank = index + 1;
                            const maxCount = Math.max(...izClubSalesPersonRanking.map((r) => r.count));
                            const percentage = maxCount > 0 ? (item.count / maxCount) * 100 : 0;

                            return (
                              <tr key={item.name} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 text-center">
                                  <span className="text-lg font-bold">{getRankIcon(rank)}</span>
                                </td>
                                <td className="py-3 px-4 text-sm font-medium">{item.name}</td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 max-w-[200px] bg-gray-200 rounded-full h-2">
                                      <div
                                        className="bg-orange-500 h-2 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                      />
                                    </div>
                                    <Badge variant="outline" className="min-w-[60px] text-center">
                                      {item.count}名
                                    </Badge>
                                  </div>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
