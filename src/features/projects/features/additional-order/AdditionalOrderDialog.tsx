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
  onSuccess,
}: AdditionalOrderDialogProps) {
  const [orderName, setOrderName] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: 追加注文手続の実装
      console.log('追加注文手続:', {
        projectId: project.id,
        orderName,
        amount,
        notes,
      });
      await new Promise((resolve) => setTimeout(resolve, 500)); // モック
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error('追加注文手続エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>追加注文手続</DialogTitle>
          <DialogDescription>
            案件「{project.name}」の追加注文手続を行います
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="orderName">注文名</Label>
              <Input
                id="orderName"
                value={orderName}
                onChange={(e) => setOrderName(e.target.value)}
                placeholder="追加注文の名称を入力"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">金額</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="金額を入力"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">備考</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="備考を入力"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '処理中...' : '追加注文手続を実行'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

