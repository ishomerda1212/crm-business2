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
import { Project } from '@/lib/supabase';

type AssignStaffDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  onSuccess?: () => void;
};

export function AssignStaffDialog({
  open,
  onOpenChange,
  project,
  onSuccess,
}: AssignStaffDialogProps) {
  const [staffId, setStaffId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: 担当者登録の実装
      console.log('担当者登録:', { projectId: project.id, staffId });
      await new Promise((resolve) => setTimeout(resolve, 500)); // モック
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error('担当者登録エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>担当者登録</DialogTitle>
          <DialogDescription>
            案件「{project.name}」の担当者を登録します
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="staffId">担当者ID</Label>
              <Input
                id="staffId"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                placeholder="担当者IDを入力"
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
              {loading ? '登録中...' : '登録'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

