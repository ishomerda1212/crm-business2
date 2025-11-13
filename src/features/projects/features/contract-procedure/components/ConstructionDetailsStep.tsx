import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export const ConstructionDetailsStep = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">工事内容のご確認</h1>
        <p className="mt-2 text-gray-600">
          工事内容と費用の詳細をご確認ください。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>工事概要</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-500 text-sm">工事名称</Label>
            <p className="mt-1 text-gray-900 font-medium">キッチンリノベーション工事</p>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">工事場所</Label>
            <p className="mt-1 text-gray-900 font-medium">
              東京都千代田区千代田1-1-1
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 text-sm">工事期間</Label>
              <p className="mt-1 text-gray-900 font-medium">2024年1月15日 〜 2024年3月31日</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">工期</Label>
              <p className="mt-1 text-gray-900 font-medium">約75日</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>費用詳細</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">工事費用</span>
              <span className="font-medium">¥3,500,000</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">消費税(10%)</span>
              <span className="font-medium">¥350,000</span>
            </div>
            <div className="flex justify-between py-3 text-lg font-bold">
              <span>合計金額</span>
              <span className="text-orange-600">¥3,850,000</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
