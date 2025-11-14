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
}: ChangeConsentDialogProps) {
  const [newContractAmount, setNewContractAmount] = useState('');
  const [amountChangeReason, setAmountChangeReason] = useState('');
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [scheduleChangeReason, setScheduleChangeReason] = useState('');

  const handleStartProcedure = () => {
    // 変更合意ページを新しいウィンドウで開く
    // 入力された変更情報をURLパラメータまたはlocalStorageに保存
    const changeData = {
      newContractAmount,
      amountChangeReason,
      newStartDate,
      newEndDate,
      scheduleChangeReason,
    };
    localStorage.setItem('changeConsentData', JSON.stringify(changeData));
    window.open('/change-consent', '_blank');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>変更合意手続</DialogTitle>
          <DialogDescription>
            案件「{project.project_name}」の変更合意手続を開始します
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="newContractAmount">変更後請負金額</Label>
            <Input
              id="newContractAmount"
              type="text"
              value={newContractAmount}
              onChange={(e) => setNewContractAmount(e.target.value)}
              placeholder="¥ 5,500,000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amountChangeReason">変更理由</Label>
            <Textarea
              id="amountChangeReason"
              value={amountChangeReason}
              onChange={(e) => setAmountChangeReason(e.target.value)}
              placeholder="請負金額の変更理由を入力"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>変更後工期</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newStartDate" className="text-sm text-gray-600">着工日</Label>
                <Input
                  id="newStartDate"
                  type="date"
                  value={newStartDate}
                  onChange={(e) => setNewStartDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="newEndDate" className="text-sm text-gray-600">完工日</Label>
                <Input
                  id="newEndDate"
                  type="date"
                  value={newEndDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="scheduleChangeReason">変更理由</Label>
            <Textarea
              id="scheduleChangeReason"
              value={scheduleChangeReason}
              onChange={(e) => setScheduleChangeReason(e.target.value)}
              placeholder="工期の変更理由を入力"
              rows={3}
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
            変更合意手続を開始
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

