import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Project } from '@/lib/supabase';

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
  const [method, setMethod] = useState<'pc' | 'mail' | 'sms' | 'url'>('pc');
  const [recipient, setRecipient] = useState('');
  const requiresRecipient = method === 'mail' || method === 'sms';
  const canStart = !requiresRecipient || recipient.trim().length > 0;
  const recipientLabel =
    method === 'mail' ? '送付先メールアドレス' : '送付先電話番号';
  const recipientPlaceholder =
    method === 'mail' ? 'example@company.jp' : '080-1234-5678';

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

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">
              契約手続きする方法を選択してください。
            </p>
            <RadioGroup
              value={method}
              onValueChange={(value) =>
                setMethod(value as 'pc' | 'mail' | 'sms' | 'url')
              }
              className="grid grid-cols-2 gap-3"
            >
              {[
                { value: 'pc', label: 'PC' },
                { value: 'mail', label: 'メール' },
                { value: 'sms', label: 'SMS' },
                { value: 'url', label: 'URL' },
              ].map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`contract-method-${option.value}`}
                  className={`flex w-full cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm font-medium transition hover:border-orange-500 ${method === option.value ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-700'}`}
                >
                  <RadioGroupItem
                    id={`contract-method-${option.value}`}
                    value={option.value}
                    className="text-orange-600"
                  />
                  {option.label}
                </Label>
              ))}
            </RadioGroup>
          </div>
          {requiresRecipient && (
            <div className="space-y-2">
              <Label htmlFor="contract-procedure-recipient">
                送付先を入力してください
              </Label>
              <Input
                id="contract-procedure-recipient"
                type="text"
                value={recipient}
                onChange={(event) => setRecipient(event.target.value)}
                placeholder={`${recipientLabel}（例：${recipientPlaceholder}）`}
              />
            </div>
          )}
          <p className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-3">
            注意：メール、SMS、URLなどオンラインで手続きする必要がある場合は申請が必要となります。
          </p>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            キャンセル
          </Button>
          <Button onClick={handleStartProcedure} disabled={!canStart}>
            契約手続を開始
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

