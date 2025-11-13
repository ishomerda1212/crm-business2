import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export const CustomerInfoStep = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">お客様情報のご確認</h1>
        <p className="mt-2 text-gray-600">
          ご登録いただいたお客様情報に誤りがないかご確認ください。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>基本情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 text-sm">お名前</Label>
              <p className="mt-1 text-gray-900 font-medium">山田 太郎</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">フリガナ</Label>
              <p className="mt-1 text-gray-900 font-medium">ヤマダ タロウ</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 text-sm">電話番号</Label>
              <p className="mt-1 text-gray-900 font-medium">03-1234-5678</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">メールアドレス</Label>
              <p className="mt-1 text-gray-900 font-medium">yamada@example.com</p>
            </div>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">ご住所</Label>
            <p className="mt-1 text-gray-900 font-medium">
              〒100-0001<br />
              東京都千代田区千代田1-1-1
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
