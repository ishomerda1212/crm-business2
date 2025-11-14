import { useState } from 'react';
import { CheckCircle2, XCircle, Handshake, CreditCard } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ApprovalRequest } from '@/lib/supabase';
import { mockApprovalRequests } from '@/data/mockData';

const getApprovalTypeLabel = (type: ApprovalRequest['approval_type']) => {
  switch (type) {
    case 'contract-approval':
      return '契約承認依頼';
    case 'convenience-payment':
      return 'コンビニ支払依頼';
    default:
      return type;
  }
};

const getApprovalTypeIcon = (type: ApprovalRequest['approval_type']) => {
  switch (type) {
    case 'contract-approval':
      return Handshake;
    case 'convenience-payment':
      return CreditCard;
    default:
      return CheckCircle2;
  }
};

export function ApprovalListPage() {
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(
    mockApprovalRequests.filter((a) => a.status === 'pending')
  );
  const [selectedApproval, setSelectedApproval] = useState<ApprovalRequest | null>(null);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApprove = async (approval: ApprovalRequest) => {
    setLoading(true);
    try {
      // TODO: 承認APIの実装
      console.log('承認:', approval.id);
      await new Promise((resolve) => setTimeout(resolve, 500)); // モック
      
      setApprovals((prev) => prev.filter((a) => a.id !== approval.id));
      setApprovalDialogOpen(false);
      setSelectedApproval(null);
    } catch (error) {
      console.error('承認エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (approval: ApprovalRequest) => {
    setLoading(true);
    try {
      // TODO: 却下APIの実装
      console.log('却下:', approval.id);
      await new Promise((resolve) => setTimeout(resolve, 500)); // モック
      
      setApprovals((prev) => prev.filter((a) => a.id !== approval.id));
      setRejectDialogOpen(false);
      setSelectedApproval(null);
    } catch (error) {
      console.error('却下エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '-';
    return `¥${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 w-full overflow-x-hidden">
      <div className="bg-white dark:bg-white border-b dark:border-gray-200 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-900 mb-2">
              承認待ち一覧
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-600">
              承認が必要な申請を確認・承認できます
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        <div className="bg-white dark:bg-white rounded-lg border dark:border-gray-200 shadow-sm">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-900">
                承認待ちリスト
              </h2>
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-0">
                {approvals.length}件
              </Badge>
            </div>
            {approvals.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-500">
                承認待ちの申請はありません
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        承認種別
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        案件番号
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        案件名
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        顧客名
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        申請者
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        申請日時
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        金額
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        備考
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        操作
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvals.map((approval) => {
                      const Icon = getApprovalTypeIcon(approval.approval_type);
                      return (
                        <TableRow key={approval.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4 text-orange-600" />
                              <span className="text-gray-900 dark:text-gray-900">
                                {getApprovalTypeLabel(approval.approval_type)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {approval.project_number}
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {approval.project_name}
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {approval.customer_name}
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {approval.applicant_name}
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {formatDate(approval.requested_at)}
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900 font-medium">
                            {formatCurrency(approval.amount)}
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900 text-sm">
                            {approval.notes || '-'}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => {
                                  setSelectedApproval(approval);
                                  setApprovalDialogOpen(true);
                                }}
                              >
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                承認
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-300 text-red-600 hover:bg-red-50"
                                onClick={() => {
                                  setSelectedApproval(approval);
                                  setRejectDialogOpen(true);
                                }}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                却下
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 承認確認ダイアログ */}
      <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>承認確認</DialogTitle>
            <DialogDescription>
              この申請を承認しますか？
            </DialogDescription>
          </DialogHeader>
          {selectedApproval && (
            <div className="space-y-2 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">承認種別:</span>
                  <p className="font-medium">{getApprovalTypeLabel(selectedApproval.approval_type)}</p>
                </div>
                <div>
                  <span className="text-gray-600">案件番号:</span>
                  <p className="font-medium">{selectedApproval.project_number}</p>
                </div>
                <div>
                  <span className="text-gray-600">案件名:</span>
                  <p className="font-medium">{selectedApproval.project_name}</p>
                </div>
                <div>
                  <span className="text-gray-600">顧客名:</span>
                  <p className="font-medium">{selectedApproval.customer_name}</p>
                </div>
                <div>
                  <span className="text-gray-600">申請者:</span>
                  <p className="font-medium">{selectedApproval.applicant_name}</p>
                </div>
                <div>
                  <span className="text-gray-600">金額:</span>
                  <p className="font-medium">{formatCurrency(selectedApproval.amount)}</p>
                </div>
              </div>
              {selectedApproval.notes && (
                <div>
                  <span className="text-gray-600 text-sm">備考:</span>
                  <p className="text-sm mt-1">{selectedApproval.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setApprovalDialogOpen(false);
                setSelectedApproval(null);
              }}
            >
              キャンセル
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => selectedApproval && handleApprove(selectedApproval)}
              disabled={loading}
            >
              {loading ? '処理中...' : '承認する'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 却下確認ダイアログ */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>却下確認</DialogTitle>
            <DialogDescription>
              この申請を却下しますか？この操作は取り消せません。
            </DialogDescription>
          </DialogHeader>
          {selectedApproval && (
            <div className="space-y-2 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">承認種別:</span>
                  <p className="font-medium">{getApprovalTypeLabel(selectedApproval.approval_type)}</p>
                </div>
                <div>
                  <span className="text-gray-600">案件番号:</span>
                  <p className="font-medium">{selectedApproval.project_number}</p>
                </div>
                <div>
                  <span className="text-gray-600">案件名:</span>
                  <p className="font-medium">{selectedApproval.project_name}</p>
                </div>
                <div>
                  <span className="text-gray-600">顧客名:</span>
                  <p className="font-medium">{selectedApproval.customer_name}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRejectDialogOpen(false);
                setSelectedApproval(null);
              }}
            >
              キャンセル
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedApproval && handleReject(selectedApproval)}
              disabled={loading}
            >
              {loading ? '処理中...' : '却下する'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

