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

type ContractProcedureDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  onSuccess?: () => void;
};

export function ContractProcedureDialog({
  open,
  onOpenChange,
  project,
}: ContractProcedureDialogProps) {
  const handleStartProcedure = () => {
    // 契約手続きページを新しいウィンドウで開く
    window.open('/contract-procedure', '_blank');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>契約手続</DialogTitle>
          <DialogDescription>
            案件「{project.project_name}」の契約手続を開始します
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <FileText className="h-8 w-8 text-orange-600 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900">
                契約手続きページを開きます
              </p>
              <p className="text-sm text-gray-600">
                新しいタブで契約手続きの各ステップを進めていただきます。
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
            契約手続を開始
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

