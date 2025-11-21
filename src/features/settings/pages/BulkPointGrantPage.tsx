import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

type MembershipTier = 'ブロンズ会員' | 'シルバー会員' | 'ゴールド会員';

type PointGrantConfig = {
  freePoints: number;
  paidPoints: number;
  paymentAmount: number;
};

export function BulkPointGrantPage() {
  const { toast } = useToast();
  const [grantDate, setGrantDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [referenceDate, setReferenceDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  const [pointConfigs, setPointConfigs] = useState<Record<MembershipTier, PointGrantConfig>>({
    'ブロンズ会員': { freePoints: 1000, paidPoints: 3000, paymentAmount: 3000 },
    'シルバー会員': { freePoints: 2000, paidPoints: 5000, paymentAmount: 5000 },
    'ゴールド会員': { freePoints: 5000, paidPoints: 10000, paymentAmount: 10000 },
  });

  const membershipTiers: MembershipTier[] = ['ブロンズ会員', 'シルバー会員', 'ゴールド会員'];

  const handleConfigChange = (
    tier: MembershipTier,
    field: keyof PointGrantConfig,
    value: string
  ) => {
    const numValue = parseInt(value, 10) || 0;
    setPointConfigs((prev) => ({
      ...prev,
      [tier]: {
        ...prev[tier],
        [field]: numValue,
      },
    }));
  };

  const handleGrant = async () => {
    if (!grantDate || !referenceDate) {
      toast({
        title: 'エラー',
        description: '付与日時と基準日を入力してください。',
        variant: 'destructive',
      });
      return;
    }

    // バリデーション
    const hasInvalidConfig = membershipTiers.some((tier) => {
      const config = pointConfigs[tier];
      return config.freePoints < 0 || config.paidPoints < 0 || config.paymentAmount < 0;
    });

    if (hasInvalidConfig) {
      toast({
        title: 'エラー',
        description: 'ポイントや支払金額に無効な値が入力されています。',
        variant: 'destructive',
      });
      return;
    }

    // 合計ポイントが0の場合はスキップ
    const hasAnyPoints = membershipTiers.some((tier) => {
      const config = pointConfigs[tier];
      return config.freePoints + config.paidPoints > 0;
    });

    if (!hasAnyPoints) {
      toast({
        title: 'エラー',
        description: '付与するポイントが設定されていません。',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    // 処理のシミュレーション（実際のデータベース接続なし）
    setTimeout(() => {
      // モックデータでの成功メッセージ
      const mockResults = membershipTiers
        .filter((tier) => {
          const config = pointConfigs[tier];
          return config.freePoints + config.paidPoints > 0;
        })
        .map((tier) => {
          // モックの顧客数を生成
          const mockCount = Math.floor(Math.random() * 50) + 10;
          return {
            tier,
            count: mockCount,
            success: mockCount,
            failed: 0,
          };
        });

      const totalCount = mockResults.reduce((sum, r) => sum + r.count, 0);

      toast({
        title: 'ポイント一括付与が完了しました',
        description: `合計 ${totalCount} 件の顧客に正常にポイントを付与しました。`,
      });

      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-900 mb-2">
          ポイント一括付与
        </h2>
        <p className="text-sm text-gray-500">
          会員ランクごとにポイントを一括で付与します。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>日付設定</CardTitle>
          <CardDescription>
            ポイント付与の日時と基準日を設定してください
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grant-date">付与日時</Label>
              <Input
                id="grant-date"
                type="date"
                value={grantDate}
                onChange={(e) => setGrantDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference-date">基準日</Label>
              <Input
                id="reference-date"
                type="date"
                value={referenceDate}
                onChange={(e) => setReferenceDate(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>会員ランク別ポイント設定</CardTitle>
          <CardDescription>
            各会員ランクごとに付与するポイントと支払金額を設定してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">会員ランク</TableHead>
                  <TableHead>無料ポイント</TableHead>
                  <TableHead>有料ポイント</TableHead>
                  <TableHead>支払金額</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {membershipTiers.map((tier) => {
                  const config = pointConfigs[tier];
                  return (
                    <TableRow key={tier}>
                      <TableCell className="font-medium">{tier}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          value={config.freePoints}
                          onChange={(e) => handleConfigChange(tier, 'freePoints', e.target.value)}
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          value={config.paidPoints}
                          onChange={(e) => handleConfigChange(tier, 'paidPoints', e.target.value)}
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          value={config.paymentAmount}
                          onChange={(e) =>
                            handleConfigChange(tier, 'paymentAmount', e.target.value)
                          }
                          className="w-full"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleGrant}
          disabled={isProcessing}
          className="bg-orange-500 hover:bg-orange-600 text-white min-w-[150px]"
        >
          {isProcessing ? '処理中...' : '付与する'}
        </Button>
      </div>
    </div>
  );
}

