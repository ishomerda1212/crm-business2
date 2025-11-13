import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Project } from '@/lib/supabase';
import { CheckCircle2 } from 'lucide-react';

type CompletionProcedureDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  onSuccess?: () => void;
};

export function CompletionProcedureDialog({
  open,
  onOpenChange,
  project,
}: CompletionProcedureDialogProps) {
  const handleStartProcedure = () => {
    // 完了手続きページを新しいウィンドウで開く
    window.open('/completion-procedure', '_blank');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>完了手続</DialogTitle>
          <DialogDescription>
            案件「{project.project_name}」の完了手続を開始します
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900">
                完了手続きページを開きます
              </p>
              <p className="text-sm text-gray-600">
                新しいタブで完了手続きの各ステップを進めていただきます。
              </p>
            </div>
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
            完了手続を開始
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

