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

type RatificationConsentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  onSuccess?: () => void;
};

export function RatificationConsentDialog({
  open,
  onOpenChange,
  project,
}: RatificationConsentDialogProps) {
  const handleStartProcedure = () => {
    // 追認同意ページを新しいウィンドウで開く
    window.open('/ratification-consent', '_blank');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>追認同意手続</DialogTitle>
          <DialogDescription>
            案件「{project.project_name}」の追認同意手続を開始します
            <br />
            <br />
            <span className="text-sm text-gray-600">
              追認同意手続は、即決契約で仮契約を結んだ場合に必要な手続きです。
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <FileText className="h-8 w-8 text-orange-600 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900">
                追認同意ページを開きます
              </p>
              <p className="text-sm text-gray-600">
                新しいタブで追認同意手続きを進めていただきます。
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
            追認同意手続を開始
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

