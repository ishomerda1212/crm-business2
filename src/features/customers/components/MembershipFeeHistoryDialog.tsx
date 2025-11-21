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
import { MembershipFeeHistory } from '@/lib/supabase';
import { DateInput } from './common/DateInput';

type MembershipFeeHistoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId: string;
  editingHistory: MembershipFeeHistory | null;
  onSave: (history: Omit<MembershipFeeHistory, 'id' | 'created_at' | 'updated_at'>) => void;
};

const PAYMENT_METHODS = ['クレジットカード', '銀行振込', 'ポイント', 'その他'];

export function MembershipFeeHistoryDialog({
  open,
  onOpenChange,
  customerId,
  editingHistory,
  onSave,
}: MembershipFeeHistoryDialogProps) {
  const [billingPeriod, setBillingPeriod] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState('クレジットカード');
  const [paymentStatus, setPaymentStatus] = useState<'支払済' | '未払' | 'キャンセル'>('支払済');

  useEffect(() => {
    if (editingHistory) {
      setBillingPeriod(editingHistory.billing_period);
      setFeeAmount(editingHistory.fee_amount.toString());
      setPaymentDate(editingHistory.payment_date || '');
      setPaymentMethod(editingHistory.payment_method);
      setPaymentStatus(editingHistory.payment_status);
    } else {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      setBillingPeriod(`${year}年${month}月`);
      setFeeAmount('5000');
      setPaymentDate('');
      setPaymentMethod('クレジットカード');
      setPaymentStatus('未払');
    }
  }, [editingHistory, open]);

  const handleSave = () => {
    if (!billingPeriod || !feeAmount) {
      return;
    }

    const amount = parseInt(feeAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      return;
    }

    onSave({
      customer_id: customerId,
      fee_amount: amount,
      payment_date: paymentDate || null,
      payment_method: paymentMethod,
      payment_status: paymentStatus,
      billing_period: billingPeriod,
    });

    onOpenChange(false);
  };

  const isValid = billingPeriod && feeAmount && parseInt(feeAmount, 10) > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingHistory ? '会費支払履歴を編集' : '会費支払履歴を追加'}
          </DialogTitle>
          <DialogDescription>
            {editingHistory
              ? '会費支払履歴の情報を編集します'
              : '新しい会費支払履歴を追加します'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>
              請求期間 <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              value={billingPeriod}
              onChange={(e) => setBillingPeriod(e.target.value)}
              placeholder="例: 2024年7月"
            />
          </div>

          <div className="space-y-2">
            <Label>
              金額 <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              value={feeAmount}
              onChange={(e) => setFeeAmount(e.target.value)}
              placeholder="例: 5000"
              min="1"
            />
          </div>

          <DateInput
            id="payment-date"
            label="支払日"
            value={paymentDate}
            onChange={setPaymentDate}
          />

          <div className="space-y-2">
            <Label>
              支払方法 <span className="text-red-500">*</span>
            </Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_METHODS.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              ステータス <span className="text-red-500">*</span>
            </Label>
            <Select
              value={paymentStatus}
              onValueChange={(value: '支払済' | '未払' | 'キャンセル') => setPaymentStatus(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="支払済">支払済</SelectItem>
                <SelectItem value="未払">未払</SelectItem>
                <SelectItem value="キャンセル">キャンセル</SelectItem>
              </SelectContent>
            </Select>
          </div>
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

