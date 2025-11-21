import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PointHistory } from '@/lib/supabase';
import { DateInput } from './common/DateInput';

type PointHistoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId: string;
  editingHistory: PointHistory | null;
  onSave: (history: Omit<PointHistory, 'id' | 'created_at' | 'updated_at'>) => void;
};

const GRANT_REASONS: PointHistory['reason'][] = [
  'ゴールド会員',
  'シルバー会員',
  'ブロンズ会員',
  '工事完了',
  'アンケート回答',
  '紹介キャンペーン',
];

const USE_REASONS: PointHistory['reason'][] = [
  'お助けサービス利用',
  'お助けポイント利用',
  'ポイント利用',
];

export function PointHistoryDialog({
  open,
  onOpenChange,
  customerId,
  editingHistory,
  onSave,
}: PointHistoryDialogProps) {
  const [transactionType, setTransactionType] = useState<'付与' | '使用'>('付与');
  const [points, setPoints] = useState('');
  const [reason, setReason] = useState<PointHistory['reason']>('工事完了');
  const [transactionDate, setTransactionDate] = useState('');

  useEffect(() => {
    if (editingHistory) {
      setTransactionType(editingHistory.transaction_type);
      setPoints(Math.abs(editingHistory.points).toString());
      setReason(editingHistory.reason);
      setTransactionDate(editingHistory.transaction_date);
    } else {
      setTransactionType('付与');
      setPoints('');
      setReason('工事完了');
      const today = new Date().toISOString().split('T')[0];
      setTransactionDate(today);
    }
  }, [editingHistory, open]);

  const handleSave = () => {
    if (!points || !reason || !transactionDate) {
      return;
    }

    const pointsValue = parseInt(points, 10);
    if (isNaN(pointsValue) || pointsValue <= 0) {
      return;
    }

    onSave({
      customer_id: customerId,
      transaction_type: transactionType,
      points: transactionType === '付与' ? pointsValue : -pointsValue,
      reason,
      related_project_id: null,
      transaction_date: transactionDate,
    });

    onOpenChange(false);
  };

  const availableReasons = transactionType === '付与' ? GRANT_REASONS : USE_REASONS;
  const isValid = points && reason && transactionDate && parseInt(points, 10) > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingHistory ? 'ポイント履歴を編集' : 'ポイント履歴を追加'}
          </DialogTitle>
          <DialogDescription>
            {editingHistory
              ? 'ポイント履歴の情報を編集します'
              : '新しいポイント履歴を追加します'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>
              種別 <span className="text-red-500">*</span>
            </Label>
            <Select value={transactionType} onValueChange={(value: '付与' | '使用') => {
              setTransactionType(value);
              setReason(value === '付与' ? '工事完了' : 'ポイント利用');
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="付与">付与</SelectItem>
                <SelectItem value="使用">使用</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              ポイント <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="例: 1000"
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label>
              区分 <span className="text-red-500">*</span>
            </Label>
            <Select value={reason} onValueChange={(value) => setReason(value as PointHistory['reason'])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableReasons.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DateInput
            id="transaction-date"
            label="日付"
            value={transactionDate}
            onChange={setTransactionDate}
            required
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            キャンセル
          </Button>
          <Button type="button" onClick={handleSave} disabled={!isValid}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

