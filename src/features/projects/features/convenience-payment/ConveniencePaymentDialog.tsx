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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Project } from '@/lib/supabase';

type ConveniencePaymentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  onSuccess?: () => void;
};

export function ConveniencePaymentDialog({
  open,
  onOpenChange,
  project,
  onSuccess,
}: ConveniencePaymentDialogProps) {
  const [amount, setAmount] = useState('');
  const [convenienceStore, setConvenienceStore] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: コンビニ支払依頼の実装
      console.log('コンビニ支払依頼:', {
        projectId: project.id,
        amount,
        convenienceStore,
      });
      await new Promise((resolve) => setTimeout(resolve, 500)); // モック
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error('コンビニ支払依頼エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>コンビニ支払依頼</DialogTitle>
          <DialogDescription>
            案件「{project.name}」のコンビニ支払を依頼します
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">支払金額</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="支払金額を入力"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="convenienceStore">コンビニエンスストア</Label>
              <Select value={convenienceStore} onValueChange={setConvenienceStore}>
                <SelectTrigger>
                  <SelectValue placeholder="コンビニを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seven-eleven">セブン-イレブン</SelectItem>
                  <SelectItem value="lawson">ローソン</SelectItem>
                  <SelectItem value="family-mart">ファミリーマート</SelectItem>
                  <SelectItem value="ministop">ミニストップ</SelectItem>
                  <SelectItem value="daily-yamazaki">デイリーヤマザキ</SelectItem>
                </SelectContent>
              </Select>
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
              {loading ? '依頼中...' : '支払依頼を送信'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

