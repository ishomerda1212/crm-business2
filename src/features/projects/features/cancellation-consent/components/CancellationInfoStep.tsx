import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export const CancellationInfoStep = () => {
  // モックデータ（実際の実装ではプロジェクトデータから取得）
  const customerName = '山田 太郎';
  const customerAddress = '東京都中央区東京3-1-1-1';
  const contractAmount = '¥ 5,000,000';
  const contractorName = '株式会社リフォーム';
  const companyName = '株式会社リフォーム';
  const representativeName = '代表取締役 田中 一郎';
  const companyAddress = '東京都港区港南1-2-3';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">解約情報のご確認</h1>
        <p className="mt-2 text-gray-600">
          以下の解約情報をご確認ください。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>注文者情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-500 text-sm">注文者（顧客名）</Label>
            <p className="mt-1 text-gray-900 font-medium">{customerName}</p>
          </div>
          <div>
            <Label className="text-gray-500 text-sm">現住所</Label>
            <p className="mt-1 text-gray-900 font-medium">{customerAddress}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>請負情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-500 text-sm">請負金額</Label>
            <p className="mt-1 text-gray-900 font-medium">{contractAmount}</p>
          </div>
          <div>
            <Label className="text-gray-500 text-sm">請負者</Label>
            <p className="mt-1 text-gray-900 font-medium">{contractorName}</p>
          </div>
          <div>
            <Label className="text-gray-500 text-sm">会社名</Label>
            <p className="mt-1 text-gray-900 font-medium">{companyName}</p>
          </div>
          <div>
            <Label className="text-gray-500 text-sm">代表者</Label>
            <p className="mt-1 text-gray-900 font-medium">{representativeName}</p>
          </div>
          <div>
            <Label className="text-gray-500 text-sm">住所</Label>
            <p className="mt-1 text-gray-900 font-medium">{companyAddress}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

