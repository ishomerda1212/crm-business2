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

type ContractApprovalDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  onSuccess?: () => void;
};

export function ContractApprovalDialog({
  open,
  onOpenChange,
  project,
  onSuccess,
}: ContractApprovalDialogProps) {
  const [requestNotes, setRequestNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: 契約承認依頼の実装
      console.log('契約承認依頼:', { projectId: project.id, requestNotes });
      await new Promise((resolve) => setTimeout(resolve, 500)); // モック
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error('契約承認依頼エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>契約承認依頼</DialogTitle>
          <DialogDescription>
            案件「{project.name}」の契約承認を依頼します
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="requestNotes">依頼内容</Label>
              <Textarea
                id="requestNotes"
                value={requestNotes}
                onChange={(e) => setRequestNotes(e.target.value)}
                placeholder="承認依頼の内容を入力"
                rows={4}
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
              {loading ? '依頼中...' : '承認依頼を送信'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

