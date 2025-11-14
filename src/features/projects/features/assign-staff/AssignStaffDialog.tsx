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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Project } from '@/lib/supabase';

type AssignStaffDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  onSuccess?: () => void;
};

// 担当者リスト（モックデータから抽出）
const staffList = [
  '山田 太郎',
  '佐藤 次郎',
  '鈴木 三郎',
  '佐々木次郎',
];

// 案件種別リスト
const projectTypes = [
  '請負契約',
  '即決契約',
  'オンライン契約',
  '小工事',
];

export function AssignStaffDialog({
  open,
  onOpenChange,
  project,
  onSuccess,
}: AssignStaffDialogProps) {
  const [staffName, setStaffName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [andpadId, setAndpadId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: 担当者登録の実装
      console.log('担当者登録:', {
        projectId: project.id,
        staffName,
        projectType,
        andpadId,
      });
      await new Promise((resolve) => setTimeout(resolve, 500)); // モック
      onSuccess?.();
      onOpenChange(false);
      // フォームをリセット
      setStaffName('');
      setProjectType('');
      setAndpadId('');
    } catch (error) {
      console.error('担当者登録エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // ダイアログを閉じる際にフォームをリセット
      setStaffName('');
      setProjectType('');
      setAndpadId('');
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>担当者登録</DialogTitle>
          <DialogDescription>
            案件「{project.project_name}」の担当者を登録します
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="staffName">担当者</Label>
              <Select value={staffName} onValueChange={setStaffName} required>
                <SelectTrigger id="staffName">
                  <SelectValue placeholder="担当者を選択" />
                </SelectTrigger>
                <SelectContent>
                  {staffList.map((staff) => (
                    <SelectItem key={staff} value={staff}>
                      {staff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectType">案件種別</Label>
              <Select value={projectType} onValueChange={setProjectType} required>
                <SelectTrigger id="projectType">
                  <SelectValue placeholder="案件種別を選択" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="andpadId">外部連携ID（ANDPADID）</Label>
              <Input
                id="andpadId"
                value={andpadId}
                onChange={(e) => setAndpadId(e.target.value)}
                placeholder="外部連携IDを入力"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '登録中...' : '登録'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

