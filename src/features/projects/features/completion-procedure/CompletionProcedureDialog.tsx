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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
  const [remainingWorkStatus, setRemainingWorkStatus] = useState<'yes' | 'no'>('no');
  const [remainingWorkDetails, setRemainingWorkDetails] = useState('');
  const [consumerProductSafetyAct, setConsumerProductSafetyAct] = useState<
    'applicable' | 'not_applicable'
  >('applicable');

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
        <div className="py-6 space-y-6">
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

          <div className="space-y-4">
            <div>
              <Label className="text-sm text-gray-700">残工事の有無</Label>
              <RadioGroup
                value={remainingWorkStatus}
                onValueChange={(value: 'yes' | 'no') => setRemainingWorkStatus(value)}
                className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="remaining-work-yes" />
                  <Label htmlFor="remaining-work-yes" className="text-sm cursor-pointer">
                    あり
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="remaining-work-no" />
                  <Label htmlFor="remaining-work-no" className="text-sm cursor-pointer">
                    なし
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label className="text-sm text-gray-700">残工事の内容</Label>
              <Textarea
                placeholder="残工事の内容を入力してください"
                className="mt-2"
                value={remainingWorkDetails}
                onChange={(event) => setRemainingWorkDetails(event.target.value)}
                disabled={remainingWorkStatus === 'no'}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm text-gray-700">消費生活用製品安全法</Label>
            <RadioGroup
              value={consumerProductSafetyAct}
              onValueChange={(value: 'applicable' | 'not_applicable') => setConsumerProductSafetyAct(value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="applicable" id="consumer-product-applicable" />
                <Label htmlFor="consumer-product-applicable" className="text-sm cursor-pointer">
                  対象
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not_applicable" id="consumer-product-not-applicable" />
                <Label htmlFor="consumer-product-not-applicable" className="text-sm cursor-pointer">
                  対象外
                </Label>
              </div>
            </RadioGroup>
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-xs text-red-800 leading-relaxed">
                <span className="font-semibold">注意事項:</span>
                消費生活用製品安全法は、消費者の生命や身体の安全を保護するため、特定の製品について安全性を確保する法律です。
                対象製品には、ガス器具（ガスコンロ、給湯器、ガスファンヒーターなど）、特定の電気製品（特定電気用品）、その他経済産業省が指定する特定製品が含まれます。
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

