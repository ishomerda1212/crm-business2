import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Edit } from 'lucide-react';
import { PointHistory, MembershipFeeHistory, CustomerMembership } from '@/lib/supabase';
import { mockPointHistories, mockMembershipFeeHistories, mockCustomerMembership } from '@/data/mockData';
import { PointHistoryDialog } from '../components/PointHistoryDialog';
import { MembershipFeeHistoryDialog } from '../components/MembershipFeeHistoryDialog';

type CustomerHistoryPageProps = {
  customerId: string;
  onBack: () => void;
};

export function CustomerHistoryPage({ customerId, onBack }: CustomerHistoryPageProps) {
  const [pointHistories, setPointHistories] = useState<PointHistory[]>(mockPointHistories);
  const [feeHistories, setFeeHistories] = useState<MembershipFeeHistory[]>(mockMembershipFeeHistories);
  const [membership, setMembership] = useState<CustomerMembership | null>(mockCustomerMembership);
  
  // ダイアログの状態管理
  const [pointDialogOpen, setPointDialogOpen] = useState(false);
  const [editingPointHistory, setEditingPointHistory] = useState<PointHistory | null>(null);
  const [feeDialogOpen, setFeeDialogOpen] = useState(false);
  const [editingFeeHistory, setEditingFeeHistory] = useState<MembershipFeeHistory | null>(null);

  // TODO: customerIdに基づいて実際のデータを取得
  useEffect(() => {
    // 将来的にAPIからデータを取得する処理を追加
  }, [customerId]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return `¥${amount.toLocaleString()}`;
  };

  const totalPaid = feeHistories
    .filter((h) => h.payment_status === '支払済')
    .reduce((sum, h) => sum + h.fee_amount, 0);
  const totalUnpaid = feeHistories
    .filter((h) => h.payment_status === '未払')
    .reduce((sum, h) => sum + h.fee_amount, 0);

  // ポイント履歴の追加・編集
  const handleAddPointHistory = () => {
    setEditingPointHistory(null);
    setPointDialogOpen(true);
  };

  const handleEditPointHistory = (history: PointHistory) => {
    setEditingPointHistory(history);
    setPointDialogOpen(true);
  };

  const handleSavePointHistory = (historyData: Omit<PointHistory, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingPointHistory) {
      // 編集
      setPointHistories((prev) =>
        prev.map((h) =>
          h.id === editingPointHistory.id
            ? {
                ...h,
                ...historyData,
                id: editingPointHistory.id,
                updated_at: new Date().toISOString(),
              }
            : h
        )
      );
    } else {
      // 追加
      const newHistory: PointHistory = {
        ...historyData,
        id: `point-${Date.now()}-${Math.random()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setPointHistories((prev) => [newHistory, ...prev]);
    }
    // メンバーシップのポイントを更新（簡易版）
    if (membership) {
      const pointsChange = historyData.points;
      setMembership({
        ...membership,
        current_points: membership.current_points + (editingPointHistory ? 0 : pointsChange),
        total_earned_points:
          historyData.transaction_type === '付与'
            ? membership.total_earned_points + (editingPointHistory ? 0 : historyData.points)
            : membership.total_earned_points,
        total_used_points:
          historyData.transaction_type === '使用'
            ? membership.total_used_points + (editingPointHistory ? 0 : Math.abs(historyData.points))
            : membership.total_used_points,
      });
    }
    setEditingPointHistory(null);
  };

  // 会費支払履歴の追加・編集
  const handleAddFeeHistory = () => {
    setEditingFeeHistory(null);
    setFeeDialogOpen(true);
  };

  const handleEditFeeHistory = (history: MembershipFeeHistory) => {
    setEditingFeeHistory(history);
    setFeeDialogOpen(true);
  };

  const handleSaveFeeHistory = (historyData: Omit<MembershipFeeHistory, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingFeeHistory) {
      // 編集
      setFeeHistories((prev) =>
        prev.map((h) =>
          h.id === editingFeeHistory.id
            ? {
                ...h,
                ...historyData,
                id: editingFeeHistory.id,
                updated_at: new Date().toISOString(),
              }
            : h
        )
      );
    } else {
      // 追加
      const newHistory: MembershipFeeHistory = {
        ...historyData,
        id: `fee-${Date.now()}-${Math.random()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setFeeHistories((prev) => [newHistory, ...prev]);
    }
    setEditingFeeHistory(null);
  };

  // イズクラブ備考の更新
  const handleUpdateRemarks = (remarks: string) => {
    if (membership) {
      setMembership({
        ...membership,
        izclub_remarks: remarks,
        updated_at: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 w-full overflow-x-hidden">
      {/* ヘッダー */}
      <div className="bg-white dark:bg-white border-b dark:border-gray-200 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
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
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-900 mb-2">
              ポイント・会費履歴
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-600">
              ポイントと会費の履歴を表示
            </p>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        {/* イズクラブ備考 */}
        <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200 mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">イズクラブ備考</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>備考</Label>
              <Textarea
                value={membership?.izclub_remarks || ''}
                onChange={(e) => handleUpdateRemarks(e.target.value)}
                placeholder="イズクラブに関する備考を入力"
                rows={3}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="point" className="space-y-6">
          <TabsList className="bg-white dark:bg-white border dark:border-gray-200 rounded-lg p-2 inline-flex gap-2 w-full sm:w-auto overflow-x-auto h-auto">
            <TabsTrigger
              value="point"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white px-6 py-3 text-base font-medium"
            >
              ポイント履歴
            </TabsTrigger>
            <TabsTrigger
              value="fee"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white px-6 py-3 text-base font-medium"
            >
              会費支払履歴
            </TabsTrigger>
          </TabsList>

          {/* ポイント履歴タブ */}
          <TabsContent value="point" className="mt-6">
            {/* ポイントサマリー */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
                <CardContent className="p-6">
                  <Label className="text-sm text-gray-600 dark:text-gray-600">現在のポイント</Label>
                  <p className="text-2xl font-bold text-blue-600 mt-2">
                    {membership?.current_points.toLocaleString() || '0'} pt
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
                <CardContent className="p-6">
                  <Label className="text-sm text-gray-600 dark:text-gray-600">累計獲得ポイント</Label>
                  <p className="text-2xl font-bold text-green-600 mt-2">
                    {membership?.total_earned_points.toLocaleString() || '0'} pt
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
                <CardContent className="p-6">
                  <Label className="text-sm text-gray-600 dark:text-gray-600">累計使用ポイント</Label>
                  <p className="text-2xl font-bold text-orange-600 mt-2">
                    {membership?.total_used_points.toLocaleString() || '0'} pt
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* ポイント履歴テーブル */}
            <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">ポイント履歴一覧</CardTitle>
                  <Button onClick={handleAddPointHistory} size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    追加
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                          日付
                        </TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                          種別
                        </TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                          ポイント
                        </TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                          区分
                        </TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                          操作
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pointHistories.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-gray-600 dark:text-gray-600 py-8">
                            履歴がありません
                          </TableCell>
                        </TableRow>
                      ) : (
                        pointHistories.map((history) => (
                          <TableRow key={history.id}>
                            <TableCell className="text-gray-900 dark:text-gray-900">
                              {formatDate(history.transaction_date)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  history.transaction_type === '付与'
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200 border-0'
                                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-0'
                                }
                              >
                                {history.transaction_type}
                              </Badge>
                            </TableCell>
                            <TableCell
                              className={`font-semibold ${
                                history.transaction_type === '付与'
                                  ? 'text-green-600'
                                  : 'text-orange-600'
                              }`}
                            >
                              {history.transaction_type === '付与' ? '+' : ''}
                              {history.points.toLocaleString()} pt
                            </TableCell>
                            <TableCell className="text-gray-900 dark:text-gray-900">
                              {history.reason}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditPointHistory(history)}
                                className="gap-1"
                              >
                                <Edit className="w-3 h-3" />
                                編集
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 会費支払履歴タブ */}
          <TabsContent value="fee" className="mt-6">
            {/* 会費サマリー */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
                <CardContent className="p-6">
                  <Label className="text-sm text-gray-600 dark:text-gray-600">総支払額</Label>
                  <p className="text-2xl font-bold text-blue-600 mt-2">
                    {formatCurrency(totalPaid)}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
                <CardContent className="p-6">
                  <Label className="text-sm text-gray-600 dark:text-gray-600">未払額</Label>
                  <p className="text-2xl font-bold text-red-600 mt-2">
                    {formatCurrency(totalUnpaid)}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
                <CardContent className="p-6">
                  <Label className="text-sm text-gray-600 dark:text-gray-600">総請求額</Label>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-900 mt-2">
                    {formatCurrency(totalPaid + totalUnpaid)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 会費履歴テーブル */}
            <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">会費支払履歴一覧</CardTitle>
                  <Button onClick={handleAddFeeHistory} size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    追加
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                          請求期間
                        </TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                          金額
                        </TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                          支払日
                        </TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                          支払方法
                        </TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                          ステータス
                        </TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                          操作
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feeHistories.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-gray-600 dark:text-gray-600 py-8">
                            履歴がありません
                          </TableCell>
                        </TableRow>
                      ) : (
                        feeHistories
                          .sort((a, b) => {
                            // 請求期間でソート（新しい順）
                            return b.billing_period.localeCompare(a.billing_period);
                          })
                          .map((history) => (
                            <TableRow key={history.id}>
                              <TableCell className="text-gray-900 dark:text-gray-900">
                                {history.billing_period}
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-900 font-semibold">
                                {formatCurrency(history.fee_amount)}
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-900">
                                {formatDate(history.payment_date)}
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-900">
                                {history.payment_method}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    history.payment_status === '支払済'
                                      ? 'bg-green-100 text-green-700 hover:bg-green-200 border-0'
                                      : history.payment_status === '未払'
                                      ? 'bg-red-100 text-red-700 hover:bg-red-200 border-0'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-0'
                                  }
                                >
                                  {history.payment_status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditFeeHistory(history)}
                                  className="gap-1"
                                >
                                  <Edit className="w-3 h-3" />
                                  編集
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ポイント履歴ダイアログ */}
      <PointHistoryDialog
        open={pointDialogOpen}
        onOpenChange={setPointDialogOpen}
        customerId={customerId}
        editingHistory={editingPointHistory}
        onSave={handleSavePointHistory}
      />

      {/* 会費支払履歴ダイアログ */}
      <MembershipFeeHistoryDialog
        open={feeDialogOpen}
        onOpenChange={setFeeDialogOpen}
        customerId={customerId}
        editingHistory={editingFeeHistory}
        onSave={handleSaveFeeHistory}
      />
    </div>
  );
}

