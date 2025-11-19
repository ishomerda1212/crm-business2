import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type RatificationConsentItem = {
  id: number;
  text: string;
  checked: boolean;
};

export function RatificationConsentSettingsPage() {
  const [items, setItems] = useState<RatificationConsentItem[]>([
    {
      id: 1,
      text: '別紙見積が、契約内容に相違無いということを確認しました。',
      checked: true,
    },
    {
      id: 2,
      text: '工事日及び重要項目説明書に関する説明を受けました。',
      checked: true,
    },
    {
      id: 3,
      text: '支払方法についての説明を受けました。',
      checked: true,
    },
  ]);

  const handleToggle = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleSave = () => {
    // TODO: 保存処理を実装
    console.log('保存:', items);
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>追認同意</CardTitle>
          <CardDescription>
            追認同意に含める項目を設定します。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Checkbox
                  id={`item-${item.id}`}
                  checked={item.checked}
                  onCheckedChange={() => handleToggle(item.id)}
                  className="mt-1"
                />
                <Label
                  htmlFor={`item-${item.id}`}
                  className="flex-1 text-sm font-normal cursor-pointer leading-relaxed"
                >
                  {item.id}. {item.text}
                </Label>
              </div>
            ))}
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

