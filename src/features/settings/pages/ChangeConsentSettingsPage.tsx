import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type ChangeConsentSettings = {
  amountThreshold: number; // 金額変更の基準（円）
  durationThreshold: number; // 工期変更の基準（日）
};

export function ChangeConsentSettingsPage() {
  const [settings, setSettings] = useState<ChangeConsentSettings>({
    amountThreshold: 100000, // 10万円
    durationThreshold: 14, // 14日
  });

  const handleChange = (field: keyof ChangeConsentSettings, value: number) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // TODO: 保存処理を実装
    console.log('保存:', settings);
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>変更合意が必要な基準</CardTitle>
          <CardDescription>
            契約内容の変更時に合意が必要となる基準を設定します。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amountThreshold">金額変更の基準</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="amountThreshold"
                  type="number"
                  value={settings.amountThreshold}
                  onChange={(e) =>
                    handleChange('amountThreshold', Number(e.target.value))
                  }
                  placeholder="100000"
                  className="flex-1"
                />
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  円以上
                </span>
              </div>
              <p className="text-xs text-gray-500">
                契約時からこの金額以上の差異がある場合、変更合意が必要です。
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="durationThreshold">工期変更の基準</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="durationThreshold"
                  type="number"
                  value={settings.durationThreshold}
                  onChange={(e) =>
                    handleChange('durationThreshold', Number(e.target.value))
                  }
                  placeholder="14"
                  className="flex-1"
                />
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  日以上
                </span>
              </div>
              <p className="text-xs text-gray-500">
                契約時からこの日数以上の差異がある場合、変更合意が必要です。
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
              保存
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

