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
import { FileText } from 'lucide-react';

type CancellationConsentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  onSuccess?: () => void;
};

export function CancellationConsentDialog({
  open,
  onOpenChange,
  project,
}: CancellationConsentDialogProps) {
  const handleStartProcedure = () => {
    // 解約合意ページを新しいウィンドウで開く
    window.open('/cancellation-consent', '_blank');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>解約合意手続</DialogTitle>
          <DialogDescription>
            案件「{project.project_name}」の解約合意手続を開始します
            <br />
            <br />
            <span className="text-sm text-gray-600">
              解約合意手続は、即決契約など契約を結んだ後に解約が必要な場合に必要です。
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <FileText className="h-8 w-8 text-orange-600 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900">
                解約合意ページを開きます
              </p>
              <p className="text-sm text-gray-600">
                新しいタブで解約合意手続きを進めていただきます。
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
            解約合意手続を開始
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

