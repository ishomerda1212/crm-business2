import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DollarSign, Calendar, CreditCard, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SettlementStep = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">精算</h1>
        <p className="mt-2 text-gray-600">
          最終的な工事費用の精算内容をご確認ください。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>契約金額</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">当初契約金額</span>
            <span className="text-lg font-medium">¥3,850,000</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">追加工事</span>
            <span className="text-lg font-medium text-orange-600">+¥150,000</span>
          </div>
          <div className="flex justify-between items-center py-2 border-t pt-3">
            <span className="text-gray-900 font-medium">最終契約金額</span>
            <span className="text-xl font-bold text-gray-900">¥4,000,000</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>お支払い状況</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <Calendar className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">契約金（30%）</p>
                  <p className="text-sm text-gray-600">2024年1月10日 支払済</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">¥1,155,000</p>
                  <Badge className="bg-green-100 text-green-700 border-green-300 mt-1">
                    支払済
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <Calendar className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">中間金（40%）</p>
                  <p className="text-sm text-gray-600">2024年2月15日 支払済</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">¥1,540,000</p>
                  <Badge className="bg-green-100 text-green-700 border-green-300 mt-1">
                    支払済
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <DollarSign className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">完成金（30%）+ 追加工事</p>
                  <p className="text-sm text-gray-600">引き渡し時にお支払いください</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-orange-600">¥1,305,000</p>
                  <Badge className="bg-orange-100 text-orange-700 border-orange-300 mt-1">
                    未払い
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="bg-blue-50 border-blue-200">
        <CreditCard className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          残金は引き渡し時に現金または銀行振込でお支払いください。
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>お支払い方法</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900 mb-3">銀行振込</p>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <Label className="text-gray-500 w-24">銀行名:</Label>
                <span className="text-gray-900">○○銀行</span>
              </div>
              <div className="flex">
                <Label className="text-gray-500 w-24">支店名:</Label>
                <span className="text-gray-900">△△支店</span>
              </div>
              <div className="flex">
                <Label className="text-gray-500 w-24">口座種別:</Label>
                <span className="text-gray-900">普通</span>
              </div>
              <div className="flex">
                <Label className="text-gray-500 w-24">口座番号:</Label>
                <span className="text-gray-900">1234567</span>
              </div>
              <div className="flex">
                <Label className="text-gray-500 w-24">口座名義:</Label>
                <span className="text-gray-900">カ)リノベーション</span>
              </div>
            </div>
          </div>

          <Button className="w-full" size="lg">
            <FileText className="h-4 w-4 mr-2" />
            請求書をダウンロード
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
