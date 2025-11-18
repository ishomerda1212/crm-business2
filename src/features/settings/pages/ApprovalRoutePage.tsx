import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ChevronUp, ChevronDown, Plus, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type ApprovalFeature =
  | 'contract-approval'
  | 'ratification-consent'
  | 'change-consent'
  | 'additional-order'
  | 'cancellation-consent'
  | 'completion-procedure'
  | 'convenience-payment';

type ApproverType =
  | { type: 'role'; value: 'admin' | 'manager' | 'staff' }
  | { type: 'branch-manager' }
  | { type: 'department'; value: string }
  | { type: 'any-in-department'; value: string };

type ApprovalStep = {
  id: string;
  order: number;
  approverType: ApproverType;
};

type ApprovalRoute = {
  feature: ApprovalFeature;
  steps: ApprovalStep[];
};

const featureLabels: Record<ApprovalFeature, string> = {
  'contract-approval': '契約承認依頼',
  'ratification-consent': '追認同意手続',
  'change-consent': '変更合意手続',
  'additional-order': '追加注文手続',
  'cancellation-consent': '解約合意手続',
  'completion-procedure': '完了手続',
  'convenience-payment': 'コンビニ支払手続',
};

// 承認者タイプのオプション
const approverTypeOptions = [
  { type: 'role' as const, value: 'admin', label: '管理者権限を持つ人' },
  { type: 'role' as const, value: 'manager', label: 'マネージャー権限を持つ人' },
  { type: 'role' as const, value: 'staff', label: 'スタッフ権限を持つ人' },
  { type: 'branch-manager' as const, value: '', label: '申請者所属店舗の店舗責任者' },
  { type: 'department' as const, value: 'accounting', label: '経理担当者' },
  { type: 'department' as const, value: 'sales', label: '営業担当者' },
  { type: 'department' as const, value: 'construction', label: '工事担当者' },
  { type: 'any-in-department' as const, value: 'accounting', label: '経理の誰か（いずれか1名）' },
  { type: 'any-in-department' as const, value: 'sales', label: '営業の誰か（いずれか1名）' },
  { type: 'any-in-department' as const, value: 'construction', label: '工事の誰か（いずれか1名）' },
];


export function ApprovalRoutePage() {
  const [approvalRoutes, setApprovalRoutes] = useState<ApprovalRoute[]>([
    {
      feature: 'contract-approval',
      steps: [],
    },
    {
      feature: 'ratification-consent',
      steps: [],
    },
    {
      feature: 'change-consent',
      steps: [],
    },
    {
      feature: 'additional-order',
      steps: [],
    },
    {
      feature: 'cancellation-consent',
      steps: [],
    },
    {
      feature: 'completion-procedure',
      steps: [],
    },
    {
      feature: 'convenience-payment',
      steps: [],
    },
  ]);

  const addApprovalStep = (feature: ApprovalFeature) => {
    setApprovalRoutes((prev) =>
      prev.map((route) => {
        if (route.feature === feature) {
          const newStep: ApprovalStep = {
            id: `step-${Date.now()}-${Math.random()}`,
            order: route.steps.length + 1,
            approverType: { type: 'role', value: 'admin' },
          };
          return {
            ...route,
            steps: [...route.steps, newStep],
          };
        }
        return route;
      })
    );
  };

  const removeApprovalStep = (feature: ApprovalFeature, stepId: string) => {
    setApprovalRoutes((prev) =>
      prev.map((route) => {
        if (route.feature === feature) {
          const filteredSteps = route.steps.filter((step) => step.id !== stepId);
          // 順序を再計算
          const reorderedSteps = filteredSteps.map((step, index) => ({
            ...step,
            order: index + 1,
          }));
          return {
            ...route,
            steps: reorderedSteps,
          };
        }
        return route;
      })
    );
  };

  const updateApproverType = (
    feature: ApprovalFeature,
    stepId: string,
    optionKey: string
  ) => {
    const option = approverTypeOptions.find((opt) => {
      const key = `${opt.type}:${opt.value}`;
      return key === optionKey;
    });
    if (!option) return;

    let approverType: ApproverType;
    if (option.type === 'role') {
      approverType = { type: 'role', value: option.value as 'admin' | 'manager' | 'staff' };
    } else if (option.type === 'branch-manager') {
      approverType = { type: 'branch-manager' };
    } else if (option.type === 'department') {
      approverType = { type: 'department', value: option.value };
    } else {
      approverType = { type: 'any-in-department', value: option.value };
    }

    setApprovalRoutes((prev) =>
      prev.map((route) => {
        if (route.feature === feature) {
          return {
            ...route,
            steps: route.steps.map((step) =>
              step.id === stepId
                ? {
                    ...step,
                    approverType,
                  }
                : step
            ),
          };
        }
        return route;
      })
    );
  };

  const moveStep = (feature: ApprovalFeature, stepId: string, direction: 'up' | 'down') => {
    setApprovalRoutes((prev) =>
      prev.map((route) => {
        if (route.feature === feature) {
          const steps = [...route.steps];
          const currentIndex = steps.findIndex((step) => step.id === stepId);
          if (currentIndex === -1) return route;

          const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
          if (newIndex < 0 || newIndex >= steps.length) return route;

          // 順序を入れ替え
          [steps[currentIndex], steps[newIndex]] = [steps[newIndex], steps[currentIndex]];
          // 順序を再計算
          const reorderedSteps = steps.map((step, index) => ({
            ...step,
            order: index + 1,
          }));

          return {
            ...route,
            steps: reorderedSteps,
          };
        }
        return route;
      })
    );
  };

  const handleSave = () => {
    // TODO: 承認ルート保存の実装
    console.log('承認ルートを保存:', approvalRoutes);
    // 実際の実装では、ここでAPIを呼び出す
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">承認ルート設定</h2>
          <p className="text-sm text-gray-500 mt-1">
            各機能の承認ルートを設定します。承認者は順番に承認を行います。
          </p>
        </div>
        <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
          保存
        </Button>
      </div>

      <div className="space-y-6">
        {approvalRoutes.map((route) => (
          <Card key={route.feature}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{featureLabels[route.feature]}</CardTitle>
                  <CardDescription>
                    承認ステップを追加して、承認者を設定してください
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addApprovalStep(route.feature)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  承認ステップを追加
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {route.steps.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">承認ステップが設定されていません</p>
                  <p className="text-xs mt-1">
                    承認ステップを追加して、承認者を設定してください
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">順序</TableHead>
                        <TableHead>承認ステップ</TableHead>
                        <TableHead>承認者</TableHead>
                        <TableHead className="w-32">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {route.steps.map((step, index) => (
                        <TableRow key={step.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900 min-w-[2rem]">
                                {step.order}
                              </span>
                              <div className="flex flex-col gap-0.5">
                                {index > 0 && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => moveStep(route.feature, step.id, 'up')}
                                    title="上に移動"
                                  >
                                    <ChevronUp className="h-4 w-4" />
                                  </Button>
                                )}
                                {index < route.steps.length - 1 && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => moveStep(route.feature, step.id, 'down')}
                                    title="下に移動"
                                  >
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {step.order}段階目
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={`${step.approverType.type}:${step.approverType.type === 'role' ? step.approverType.value : step.approverType.type === 'branch-manager' ? '' : step.approverType.value}`}
                              onValueChange={(value) =>
                                updateApproverType(route.feature, step.id, value)
                              }
                            >
                              <SelectTrigger className="w-full max-w-md">
                                <SelectValue placeholder="承認者を選択" />
                              </SelectTrigger>
                              <SelectContent>
                                <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">
                                  役割
                                </div>
                                {approverTypeOptions
                                  .filter((opt) => opt.type === 'role')
                                  .map((opt) => (
                                    <SelectItem
                                      key={`${opt.type}:${opt.value}`}
                                      value={`${opt.type}:${opt.value}`}
                                    >
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 mt-2">
                                  店舗・拠点
                                </div>
                                {approverTypeOptions
                                  .filter((opt) => opt.type === 'branch-manager')
                                  .map((opt) => (
                                    <SelectItem
                                      key={`${opt.type}:${opt.value}`}
                                      value={`${opt.type}:${opt.value}`}
                                    >
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 mt-2">
                                  部門（特定の担当者）
                                </div>
                                {approverTypeOptions
                                  .filter((opt) => opt.type === 'department')
                                  .map((opt) => (
                                    <SelectItem
                                      key={`${opt.type}:${opt.value}`}
                                      value={`${opt.type}:${opt.value}`}
                                    >
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 mt-2">
                                  部門（いずれか1名）
                                </div>
                                {approverTypeOptions
                                  .filter((opt) => opt.type === 'any-in-department')
                                  .map((opt) => (
                                    <SelectItem
                                      key={`${opt.type}:${opt.value}`}
                                      value={`${opt.type}:${opt.value}`}
                                    >
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeApprovalStep(route.feature, step.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

