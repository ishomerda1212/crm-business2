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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Project } from '@/lib/supabase';
import { ClipboardList } from 'lucide-react';

type CompletionSurveyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  onSuccess?: () => void;
};

export function CompletionSurveyDialog({
  open,
  onOpenChange,
  project,
}: CompletionSurveyDialogProps) {
  const [surveyType, setSurveyType] = useState<'with-supervisor' | 'without-supervisor' | ''>('');

  const handleStartSurvey = () => {
    if (!surveyType) return;
    
    // 完工アンケートページを新しいタブで開く（現場監督の有無をパラメータで渡す）
    const url = `/completion-survey?projectId=${project.id}&type=${surveyType}`;
    window.open(url, '_blank');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>完工アンケート</DialogTitle>
          <DialogDescription>
            案件「{project.project_name}」の完工アンケートを開始します
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-medium">アンケートタイプを選択してください</Label>
            <RadioGroup
              value={surveyType}
              onValueChange={(value) => setSurveyType(value as 'with-supervisor' | 'without-supervisor')}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="with-supervisor" id="with-supervisor" />
                <Label
                  htmlFor="with-supervisor"
                  className="font-normal cursor-pointer flex-1"
                >
                  現場監督有
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="without-supervisor" id="without-supervisor" />
                <Label
                  htmlFor="without-supervisor"
                  className="font-normal cursor-pointer flex-1"
                >
                  現場監督無
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <ClipboardList className="h-8 w-8 text-orange-600 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900">
                完工アンケートページを開きます
              </p>
              <p className="text-sm text-gray-600">
                新しいタブで完工アンケートの各項目を進めていただきます。
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
          <Button
            onClick={handleStartSurvey}
            disabled={!surveyType}
          >
            アンケートを開始
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
