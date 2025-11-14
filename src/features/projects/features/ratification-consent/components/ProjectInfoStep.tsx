import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export const ProjectInfoStep = () => {
  // モックデータ（実際の実装ではプロジェクトデータから取得）
  const [contractDate] = useState('2024/04/25');
  const [constructionLocation] = useState('東京都中央区東京3-1-1-1');
  const [projectName] = useState('リフォーム工事');
  const [customerName] = useState('山田 太郎');
  const [contractAmount] = useState('¥ 5,000,000');
  const [constructionStartDate] = useState('2024/05/01');
  const [constructionEndDate] = useState('2024/07/31');
  const [paymentMethod] = useState('現金');
  const [quotationNumber] = useState('EST-2024-001');

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
              <Label className="text-gray-500 text-sm">発注者名（顧客名）</Label>
              <p className="mt-1 text-gray-900 font-medium">{customerName}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">請負金額（契約時請負金額）</Label>
              <p className="mt-1 text-gray-900 font-medium">{contractAmount}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">工期</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {constructionStartDate} ～ {constructionEndDate}
              </p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">お支払方法</Label>
              <p className="mt-1 text-gray-900 font-medium">{paymentMethod}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">見積No</Label>
              <p className="mt-1 text-gray-900 font-medium">{quotationNumber}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

