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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Project } from '@/lib/supabase';

type ChangeConsentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  onSuccess?: () => void;
};

export function ChangeConsentDialog({
  open,
  onOpenChange,
  project,
  onSuccess,
}: ChangeConsentDialogProps) {
  const [changeDetails, setChangeDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: 変更合意手続の実装
      console.log('変更合意手続:', { projectId: project.id, changeDetails });
      await new Promise((resolve) => setTimeout(resolve, 500)); // モック
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error('変更合意手続エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>変更合意手続</DialogTitle>
          <DialogDescription>
            案件「{project.name}」の変更合意手続を行います
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="changeDetails">変更内容</Label>
              <Textarea
                id="changeDetails"
                value={changeDetails}
                onChange={(e) => setChangeDetails(e.target.value)}
                placeholder="変更内容の詳細を入力"
                rows={4}
                required
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
              {loading ? '処理中...' : '変更合意手続を実行'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

