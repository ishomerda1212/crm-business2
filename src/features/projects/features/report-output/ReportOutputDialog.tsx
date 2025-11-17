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
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Project } from '@/lib/supabase';

type ReportOutputDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  onSuccess?: () => void;
};

export function ReportOutputDialog({
  open,
  onOpenChange,
  project,
  onSuccess,
}: ReportOutputDialogProps) {
  const [reportType, setReportType] = useState('');
  const [loading, setLoading] = useState(false);
  const outputFormat = 'pdf';
  const reportOptions = [
    { value: 'contract', label: '契約書' },
    { value: 'quotation', label: '見積書' },
    { value: 'invoice', label: '請求書' },
    { value: 'receipt', label: '領収書' },
    { value: 'summary', label: '案件サマリー' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: 帳票出力の実装
      console.log('帳票出力:', {
        projectId: project.id,
        reportType,
        format: outputFormat,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000)); // モック
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error('帳票出力エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>帳票出力</DialogTitle>
          <DialogDescription>
            案件「{project.project_name}」の帳票を出力します
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">帳票種類</Label>
              <RadioGroup
                value={reportType}
                onValueChange={setReportType}
                className="space-y-2"
              >
                {reportOptions.map((option) => (
                  <Label
                    key={option.value}
                    className="flex w-full items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-base font-medium text-gray-700 transition hover:border-orange-500 focus-within:border-orange-500 cursor-pointer"
                  >
                    <RadioGroupItem
                      id={`report-${option.value}`}
                      value={option.value}
                      className="h-5 w-5 border-2 border-gray-400"
                    />
                    <span>{option.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
            <p className="text-sm text-gray-500">
              出力形式はPDFのみ対応しています。
            </p>
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
            <Button type="submit" disabled={loading || !reportType}>
              {loading ? '出力中...' : '帳票を出力'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

