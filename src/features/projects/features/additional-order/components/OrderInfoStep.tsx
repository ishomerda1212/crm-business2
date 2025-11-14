import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';

type OrderInfoStepProps = {
  orderData: {
    orderAmount: string;
    summary: string;
  };
  onOrderDataChange: (data: {
    orderAmount: string;
    summary: string;
  }) => void;
};

export const OrderInfoStep = ({ orderData, onOrderDataChange }: OrderInfoStepProps) => {
  // localStorageから注文データを読み込む
  useEffect(() => {
    const savedData = localStorage.getItem('additionalOrderData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        onOrderDataChange({
          orderAmount: parsed.orderAmount || '',
          summary: parsed.summary || '',
        });
      } catch (e) {
        console.error('Failed to parse additional order data', e);
      }
    }
  }, [onOrderDataChange]);

  // モックデータ（実際の実装ではプロジェクトデータから取得）
  const orderDate = new Date().toLocaleDateString('ja-JP');
  const projectName = 'リフォーム工事';
  const constructionLocation = '東京都中央区東京3-1-1-1';
  const constructionStartDate = '2024/05/01';
  const constructionEndDate = '2024/07/31';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">追加注文情報のご確認</h1>
        <p className="mt-2 text-gray-600">
          以下の追加注文情報をご確認ください。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>基本情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 text-sm">ご注文日</Label>
              <p className="mt-1 text-gray-900 font-medium">{orderDate}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">工事名称（案件名）</Label>
              <p className="mt-1 text-gray-900 font-medium">{projectName}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">工事場所</Label>
              <p className="mt-1 text-gray-900 font-medium">{constructionLocation}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">工期（契約時着工予定日ー契約時完工予定日）</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {constructionStartDate} ～ {constructionEndDate}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>注文情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-500 text-sm">注文金額（税込）</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {orderData.orderAmount || '-'}
            </p>
          </div>
          <div>
            <Label className="text-gray-500 text-sm">概要</Label>
            <p className="mt-1 text-gray-900 font-medium whitespace-pre-wrap">
              {orderData.summary || '-'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

