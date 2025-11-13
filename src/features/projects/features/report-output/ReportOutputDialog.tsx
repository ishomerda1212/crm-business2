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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
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
  const [format, setFormat] = useState('pdf');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: 帳票出力の実装
      console.log('帳票出力:', {
        projectId: project.id,
        reportType,
        format,
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
            案件「{project.name}」の帳票を出力します
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">帳票種類</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="帳票種類を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contract">契約書</SelectItem>
                  <SelectItem value="quotation">見積書</SelectItem>
                  <SelectItem value="invoice">請求書</SelectItem>
                  <SelectItem value="receipt">領収書</SelectItem>
                  <SelectItem value="summary">案件サマリー</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="format">出力形式</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
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
            <Button type="submit" disabled={loading || !reportType}>
              {loading ? '出力中...' : '帳票を出力'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

