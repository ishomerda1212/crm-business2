import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { mockCompletionSurveyResponses } from '@/data/mockData';
import { CompletionSurveyResponse } from '@/lib/supabase';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale/ja';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

type AggregationResult = {
  name: string;
  count: number;
  averageScore: number;
  totalScore: number;
};

export function CompletionSurveyListPage() {
  const [responses] = useState<CompletionSurveyResponse[]>(mockCompletionSurveyResponses);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'with-supervisor' | 'without-supervisor'>('all');
  const [filterBranch, setFilterBranch] = useState<string>('all');
  const [filterSalesPerson, setFilterSalesPerson] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'customer'>('date');
  const [selectedResponse, setSelectedResponse] = useState<CompletionSurveyResponse | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 利用可能な店舗と担当者のリスト
  const availableBranches = useMemo(() => {
    const branches = new Set(responses.map((r) => r.branch_name));
    return Array.from(branches).sort();
  }, [responses]);

  const availableSalesPersons = useMemo(() => {
    const persons = new Set(responses.map((r) => r.sales_person));
    return Array.from(persons).sort();
  }, [responses]);

  // フィルターとソート
  const filteredResponses = useMemo(() => {
    let filtered = responses;

    // 期間フィルター
    if (startDate) {
      filtered = filtered.filter((item) => item.response_date >= startDate);
    }
    if (endDate) {
      filtered = filtered.filter((item) => item.response_date <= endDate);
    }

    // タイプフィルター
    if (filterType !== 'all') {
      filtered = filtered.filter((item) => item.survey_type === filterType);
    }

    // 店舗フィルター
    if (filterBranch !== 'all') {
      filtered = filtered.filter((item) => item.branch_name === filterBranch);
    }

    // 担当者フィルター
    if (filterSalesPerson !== 'all') {
      filtered = filtered.filter((item) => item.sales_person === filterSalesPerson);
    }

    // 検索フィルター
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.project_number?.toLowerCase().includes(query) ||
          item.project_name?.toLowerCase().includes(query) ||
          item.customer_name?.toLowerCase().includes(query) ||
          item.sales_person?.toLowerCase().includes(query) ||
          item.branch_name?.toLowerCase().includes(query)
      );
    }

    // ソート
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.response_date).getTime() - new Date(a.response_date).getTime();
      } else if (sortBy === 'score') {
        return b.score - a.score;
      } else {
        // customer
        return a.customer_name.localeCompare(b.customer_name);
      }
    });

    return filtered;
  }, [responses, filterType, filterBranch, filterSalesPerson, searchQuery, sortBy, startDate, endDate]);

  // 店舗別集計
  const branchAggregation = useMemo(() => {
    const branchMap = new Map<string, { count: number; totalScore: number }>();

    filteredResponses.forEach((response) => {
      const branch = response.branch_name;
      if (!branchMap.has(branch)) {
        branchMap.set(branch, { count: 0, totalScore: 0 });
      }
      const data = branchMap.get(branch)!;
      data.count += 1;
      data.totalScore += response.score;
    });

    const results: AggregationResult[] = Array.from(branchMap.entries()).map(([name, data]) => ({
      name,
      count: data.count,
      averageScore: data.totalScore / data.count,
      totalScore: data.totalScore,
    }));

    return results.sort((a, b) => b.averageScore - a.averageScore);
  }, [filteredResponses]);

  // 担当者別集計
  const salesPersonAggregation = useMemo(() => {
    const personMap = new Map<string, { count: number; totalScore: number }>();

    filteredResponses.forEach((response) => {
      const person = response.sales_person;
      if (!personMap.has(person)) {
        personMap.set(person, { count: 0, totalScore: 0 });
      }
      const data = personMap.get(person)!;
      data.count += 1;
      data.totalScore += response.score;
    });

    const results: AggregationResult[] = Array.from(personMap.entries()).map(([name, data]) => ({
      name,
      count: data.count,
      averageScore: data.totalScore / data.count,
      totalScore: data.totalScore,
    }));

    return results.sort((a, b) => b.averageScore - a.averageScore);
  }, [filteredResponses]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'yyyy年MM月dd日', { locale: ja });
    } catch {
      return dateString;
    }
  };

  const formatScore = (score: number) => {
    return score.toFixed(1);
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600 bg-green-50';
    if (score >= 4.0) return 'text-blue-600 bg-blue-50';
    if (score >= 3.5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const handleViewDetails = (response: CompletionSurveyResponse) => {
    setSelectedResponse(response);
    setIsDetailDialogOpen(true);
  };

  const averageScore = useMemo(() => {
    if (filteredResponses.length === 0) return 0;
    const sum = filteredResponses.reduce((acc, item) => acc + item.score, 0);
    return sum / filteredResponses.length;
  }, [filteredResponses]);

  const handleResetFilters = () => {
    setStartDate('');
    setEndDate('');
    setFilterBranch('all');
    setFilterSalesPerson('all');
    setFilterType('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 w-full overflow-x-hidden">
      <div className="bg-white dark:bg-white border-b dark:border-gray-200 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-900">完工アンケート</h1>
              <p className="text-sm text-gray-600 dark:text-gray-600 mt-1">
                完工アンケートの回答一覧を確認できます
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-600 dark:text-gray-600">平均スコア</p>
                <p className="text-lg font-bold text-orange-600">
                  {formatScore(averageScore)}
                </p>
              </div>
              <Badge variant="outline" className="text-sm">
                回答数: {filteredResponses.length}件
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">回答一覧</TabsTrigger>
            <TabsTrigger value="aggregation">集計</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* 期間選択 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">開始日</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">終了日</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* 検索とフィルター */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="案件番号、案件名、顧客名、担当者、店舗で検索..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Select
                        value={filterBranch}
                        onValueChange={setFilterBranch}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="店舗" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">すべての店舗</SelectItem>
                          {availableBranches.map((branch) => (
                            <SelectItem key={branch} value={branch}>
                              {branch}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={filterSalesPerson}
                        onValueChange={setFilterSalesPerson}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="担当者" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">すべての担当者</SelectItem>
                          {availableSalesPersons.map((person) => (
                            <SelectItem key={person} value={person}>
                              {person}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={filterType}
                        onValueChange={(value: string) => {
                          if (value === 'all' || value === 'with-supervisor' || value === 'without-supervisor') {
                            setFilterType(value as 'all' | 'with-supervisor' | 'without-supervisor');
                          }
                        }}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">すべて</SelectItem>
                          <SelectItem value="with-supervisor">現場監督有</SelectItem>
                          <SelectItem value="without-supervisor">現場監督無</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={sortBy}
                        onValueChange={(value: string) => {
                          if (value === 'date' || value === 'score' || value === 'customer') {
                            setSortBy(value as 'date' | 'score' | 'customer');
                          }
                        }}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="date">回答日順</SelectItem>
                          <SelectItem value="score">スコア順</SelectItem>
                          <SelectItem value="customer">顧客名順</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleResetFilters}
                        className="text-xs"
                      >
                        リセット
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">回答一覧</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                          回答日
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                          顧客名
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                          案件名
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                          担当者
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                          担当店舗
                        </th>
                        <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                          スコア
                        </th>
                        <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                          詳細
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResponses.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-gray-500">
                            該当する回答がありません
                          </td>
                        </tr>
                      ) : (
                        filteredResponses.map((response) => (
                          <tr
                            key={response.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="py-3 px-4 text-sm">{formatDate(response.response_date)}</td>
                            <td className="py-3 px-4 text-sm">{response.customer_name}</td>
                            <td className="py-3 px-4 text-sm">
                              <div>
                                <div className="font-medium">{response.project_name}</div>
                                <div className="text-xs text-gray-500">{response.project_number}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm">{response.sales_person}</td>
                            <td className="py-3 px-4 text-sm">{response.branch_name}</td>
                            <td className="py-3 px-4 text-center">
                              <Badge className={getScoreColor(response.score)}>
                                {formatScore(response.score)}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                                onClick={() => handleViewDetails(response)}
                              >
                                詳細を見る
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aggregation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 店舗別集計 */}
              <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">店舗別集計</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                            店舗名
                          </th>
                          <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                            回答数
                          </th>
                          <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                            平均スコア
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {branchAggregation.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="py-8 text-center text-gray-500">
                              データがありません
                            </td>
                          </tr>
                        ) : (
                          branchAggregation.map((result) => (
                            <tr key={result.name} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4 text-sm font-medium">{result.name}</td>
                              <td className="py-3 px-4 text-sm text-center">{result.count}件</td>
                              <td className="py-3 px-4 text-center">
                                <Badge className={getScoreColor(result.averageScore)}>
                                  {formatScore(result.averageScore)}
                                </Badge>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* 担当者別集計 */}
              <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">担当者別集計</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                            担当者名
                          </th>
                          <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                            回答数
                          </th>
                          <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                            平均スコア
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesPersonAggregation.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="py-8 text-center text-gray-500">
                              データがありません
                            </td>
                          </tr>
                        ) : (
                          salesPersonAggregation.map((result) => (
                            <tr key={result.name} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4 text-sm font-medium">{result.name}</td>
                              <td className="py-3 px-4 text-sm text-center">{result.count}件</td>
                              <td className="py-3 px-4 text-center">
                                <Badge className={getScoreColor(result.averageScore)}>
                                  {formatScore(result.averageScore)}
                                </Badge>
                              </td>
                            </tr>
                          ))
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

      {/* 詳細ダイアログ */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>完工アンケート詳細</DialogTitle>
            <DialogDescription>
              {selectedResponse?.project_name} - {selectedResponse?.customer_name}
            </DialogDescription>
          </DialogHeader>
          {selectedResponse && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">回答日</p>
                  <p className="text-sm text-gray-900">{formatDate(selectedResponse.response_date)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">案件番号</p>
                  <p className="text-sm text-gray-900">{selectedResponse.project_number}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">顧客名</p>
                  <p className="text-sm text-gray-900">{selectedResponse.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">担当者</p>
                  <p className="text-sm text-gray-900">{selectedResponse.sales_person}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">担当店舗</p>
                  <p className="text-sm text-gray-900">{selectedResponse.branch_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">総合スコア</p>
                  <Badge className={getScoreColor(selectedResponse.score)}>
                    {formatScore(selectedResponse.score)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">アンケート種別</p>
                  <p className="text-sm text-gray-900">
                    {selectedResponse.survey_type === 'with-supervisor' ? '現場監督有' : '現場監督無'}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                {selectedResponse.details.sales_representative && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">営業担当者について</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">スコア:</span>
                        <Badge className={getScoreColor(selectedResponse.details.sales_representative.score)}>
                          {formatScore(selectedResponse.details.sales_representative.score)}
                        </Badge>
                      </div>
                      {selectedResponse.details.sales_representative.comments && (
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                          {selectedResponse.details.sales_representative.comments}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {selectedResponse.details.supervisor_craftsmen && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">現場監督・職人について</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">スコア:</span>
                        <Badge className={getScoreColor(selectedResponse.details.supervisor_craftsmen.score)}>
                          {formatScore(selectedResponse.details.supervisor_craftsmen.score)}
                        </Badge>
                      </div>
                      {selectedResponse.details.supervisor_craftsmen.comments && (
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                          {selectedResponse.details.supervisor_craftsmen.comments}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {selectedResponse.details.impressions && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">実際にお住まいになってのご感想</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">スコア:</span>
                        <Badge className={getScoreColor(selectedResponse.details.impressions.score)}>
                          {formatScore(selectedResponse.details.impressions.score)}
                        </Badge>
                      </div>
                      {selectedResponse.details.impressions.comments && (
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                          {selectedResponse.details.impressions.comments}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
