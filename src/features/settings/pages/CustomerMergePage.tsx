import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { CustomerListItem } from '@/lib/supabase';
import { mockCustomerList } from '@/data/mockData';
import { Search, Merge, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function CustomerMergePage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [customers] = useState<CustomerListItem[]>(mockCustomerList);
  const [selectedSourceCustomer, setSelectedSourceCustomer] = useState<CustomerListItem | null>(null);
  const [selectedTargetCustomer, setSelectedTargetCustomer] = useState<CustomerListItem | null>(null);
  const [isMergeDialogOpen, setIsMergeDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 検索フィルター
  const filteredCustomers = customers.filter((customer) => {
    const query = searchQuery.toLowerCase();
    return (
      customer.customer_name.toLowerCase().includes(query) ||
      customer.customer_id.toLowerCase().includes(query) ||
      customer.furigana.toLowerCase().includes(query) ||
      customer.phone.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query)
    );
  });

  const handleSelectSource = (customer: CustomerListItem) => {
    if (selectedTargetCustomer?.id === customer.id) {
      toast({
        title: 'エラー',
        description: '統合先と統合元に同じ顧客を選択することはできません。',
        variant: 'destructive',
      });
      return;
    }
    setSelectedSourceCustomer(customer);
  };

  const handleSelectTarget = (customer: CustomerListItem) => {
    if (selectedSourceCustomer?.id === customer.id) {
      toast({
        title: 'エラー',
        description: '統合先と統合元に同じ顧客を選択することはできません。',
        variant: 'destructive',
      });
      return;
    }
    setSelectedTargetCustomer(customer);
  };

  const handleMerge = async () => {
    if (!selectedSourceCustomer || !selectedTargetCustomer) {
      toast({
        title: 'エラー',
        description: '統合先と統合元の両方を選択してください。',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    // 統合処理のシミュレーション
    setTimeout(() => {
      toast({
        title: '顧客統合が完了しました',
        description: `${selectedSourceCustomer.customer_name} を ${selectedTargetCustomer.customer_name} に統合しました。`,
      });

      // リセット
      setSelectedSourceCustomer(null);
      setSelectedTargetCustomer(null);
      setIsMergeDialogOpen(false);
      setIsProcessing(false);
    }, 1500);
  };

  const handleOpenMergeDialog = () => {
    if (!selectedSourceCustomer || !selectedTargetCustomer) {
      toast({
        title: 'エラー',
        description: '統合先と統合元の両方を選択してください。',
        variant: 'destructive',
      });
      return;
    }
    setIsMergeDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-900 mb-2">
          顧客統合
        </h2>
        <p className="text-sm text-gray-500">
          同一顧客が重複登録されている場合、顧客情報を統合できます。
        </p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          顧客統合は元に戻せない操作です。統合前に必ず統合先と統合元の顧客情報を確認してください。
          統合元の顧客に関連する案件、ポイント履歴、会員情報などは統合先の顧客に移行されます。
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>顧客検索</CardTitle>
          <CardDescription>
            統合したい顧客を検索して選択してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="顧客名、顧客ID、フリガナ、電話番号、メールアドレスで検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">選択</TableHead>
                  <TableHead>顧客ID</TableHead>
                  <TableHead>氏名</TableHead>
                  <TableHead>フリガナ</TableHead>
                  <TableHead>電話番号</TableHead>
                  <TableHead>メール</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>登録日</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-gray-600 dark:text-gray-600 py-8">
                      顧客が見つかりません
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => {
                    const isSource = selectedSourceCustomer?.id === customer.id;
                    const isTarget = selectedTargetCustomer?.id === customer.id;
                    return (
                      <TableRow
                        key={customer.id}
                        className={`cursor-pointer hover:bg-gray-50 ${
                          isSource || isTarget ? 'bg-orange-50' : ''
                        }`}
                      >
                        <TableCell>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSelectSource(customer)}
                              className={`px-2 py-1 text-xs rounded ${
                                isSource
                                  ? 'bg-red-500 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              統合元
                            </button>
                            <button
                              onClick={() => handleSelectTarget(customer)}
                              className={`px-2 py-1 text-xs rounded ${
                                isTarget
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              統合先
                            </button>
                          </div>
                        </TableCell>
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
                          {customer.phone}
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-900">
                          {customer.email}
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-900">
                          {customer.status}
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-900">
                          {customer.registration_date}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {(selectedSourceCustomer || selectedTargetCustomer) && (
        <Card>
          <CardHeader>
            <CardTitle>統合設定</CardTitle>
            <CardDescription>
              統合先と統合元の顧客を確認してください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>統合先（残す顧客）</Label>
                {selectedTargetCustomer ? (
                  <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-900">
                      {selectedTargetCustomer.customer_name}
                    </div>
                    <div className="text-sm text-blue-700 mt-1">
                      {selectedTargetCustomer.customer_id} | {selectedTargetCustomer.phone}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 text-sm">
                    統合先の顧客を選択してください
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>統合元（削除する顧客）</Label>
                {selectedSourceCustomer ? (
                  <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <div className="font-semibold text-red-900">
                      {selectedSourceCustomer.customer_name}
                    </div>
                    <div className="text-sm text-red-700 mt-1">
                      {selectedSourceCustomer.customer_id} | {selectedSourceCustomer.phone}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 text-sm">
                    統合元の顧客を選択してください
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={handleOpenMergeDialog}
                disabled={!selectedSourceCustomer || !selectedTargetCustomer || isProcessing}
                className="bg-orange-500 hover:bg-orange-600 text-white min-w-[150px]"
              >
                <Merge className="w-4 h-4 mr-2" />
                統合を実行
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={isMergeDialogOpen} onOpenChange={setIsMergeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>顧客統合の確認</DialogTitle>
            <DialogDescription>
              以下の顧客を統合します。この操作は元に戻せません。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-sm font-semibold text-blue-900">統合先（残す顧客）</Label>
              <div className="mt-2 p-3 border border-blue-200 bg-blue-50 rounded-lg">
                <div className="font-semibold">{selectedTargetCustomer?.customer_name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {selectedTargetCustomer?.customer_id} | {selectedTargetCustomer?.phone} |{' '}
                  {selectedTargetCustomer?.email}
                </div>
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold text-red-900">統合元（削除する顧客）</Label>
              <div className="mt-2 p-3 border border-red-200 bg-red-50 rounded-lg">
                <div className="font-semibold">{selectedSourceCustomer?.customer_name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {selectedSourceCustomer?.customer_id} | {selectedSourceCustomer?.phone} |{' '}
                  {selectedSourceCustomer?.email}
                </div>
              </div>
            </div>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                統合元の顧客に関連する以下のデータが統合先に移行されます：
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>案件情報</li>
                  <li>ポイント履歴</li>
                  <li>会員情報</li>
                  <li>会費履歴</li>
                  <li>その他の関連データ</li>
                </ul>
                統合元の顧客は削除されます。
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsMergeDialogOpen(false)}
              disabled={isProcessing}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleMerge}
              disabled={isProcessing}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isProcessing ? '処理中...' : '統合を実行'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

