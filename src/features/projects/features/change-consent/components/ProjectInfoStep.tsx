import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export const ProjectInfoStep = () => {
  // モックデータ（実際の実装ではプロジェクトデータから取得）
  const contractDate = '2024/04/25';
  const constructionLocation = '東京都中央区東京3-1-1-1';
  const projectName = 'リフォーム工事';
  const customerName = '山田 太郎';
  const contractAmount = '¥ 5,000,000';
  const constructionStartDate = '2024/05/01';
  const constructionEndDate = '2024/07/31';
  const paymentMethod = '現金';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">案件情報のご確認</h1>
        <p className="mt-2 text-gray-600">
          以下の案件情報をご確認ください。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>案件情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 text-sm">契約日</Label>
              <p className="mt-1 text-gray-900 font-medium">{contractDate}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">工事場所</Label>
              <p className="mt-1 text-gray-900 font-medium">{constructionLocation}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">工事名称（案件名）</Label>
              <p className="mt-1 text-gray-900 font-medium">{projectName}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">発注者氏名（顧客名）</Label>
              <p className="mt-1 text-gray-900 font-medium">{customerName}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">請負金額（契約時請負金額）</Label>
              <p className="mt-1 text-gray-900 font-medium">{contractAmount}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">工期（契約時着工予定日ー契約時完工予定日）</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {constructionStartDate} ～ {constructionEndDate}
              </p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">お支払方法</Label>
              <p className="mt-1 text-gray-900 font-medium">{paymentMethod}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

