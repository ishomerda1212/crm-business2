import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Project } from '@/lib/supabase';

type AdditionalOrderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  onSuccess?: () => void;
};

export function AdditionalOrderDialog({
  open,
  onOpenChange,
  project,
}: AdditionalOrderDialogProps) {
  const [orderAmount, setOrderAmount] = useState('');
  const [summary, setSummary] = useState('');

  const handleStartProcedure = () => {
    // 追加注文ページを新しいウィンドウで開く
    // 入力された注文情報をlocalStorageに保存
    const orderData = {
      orderAmount,
      summary,
    };
    localStorage.setItem('additionalOrderData', JSON.stringify(orderData));
    window.open('/additional-order', '_blank');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>追加注文手続</DialogTitle>
          <DialogDescription>
            案件「{project.project_name}」の追加注文手続を開始します
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="orderAmount">注文金額（税込）</Label>
            <Input
              id="orderAmount"
              type="text"
              value={orderAmount}
              onChange={(e) => setOrderAmount(e.target.value)}
              placeholder="¥ 500,000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">概要</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="追加注文の概要を入力"
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            キャンセル
          </Button>
          <Button onClick={handleStartProcedure}>
            追加注文手続を開始
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

