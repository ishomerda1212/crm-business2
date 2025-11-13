import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const WarrantyConfirmStep = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">保証内容確認</h1>
        <p className="mt-2 text-gray-600">
          工事完了後の保証内容を再度ご確認ください。
        </p>
      </div>

      <Alert className="bg-blue-50 border-blue-200">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          保証書は引き渡し時にお渡しいたします。大切に保管してください。
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>基本保証</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
            <div className="space-y-1 flex-1">
              <p className="font-medium text-gray-900">施工保証</p>
              <p className="text-sm text-gray-600">
                施工部分の瑕疵に対する保証
              </p>
              <p className="text-xs text-gray-500 mt-2">
                通常の使用において発生した施工上の不具合について無償で修理いたします。
              </p>
            </div>
            <Badge className="ml-4">2年間</Badge>
          </div>

          <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
            <div className="space-y-1 flex-1">
              <p className="font-medium text-gray-900">防水保証</p>
              <p className="text-sm text-gray-600">
                浴室・洗面所などの防水工事
              </p>
              <p className="text-xs text-gray-500 mt-2">
                防水工事箇所の漏水について保証いたします。
              </p>
            </div>
            <Badge className="ml-4">5年間</Badge>
          </div>

          <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
            <div className="space-y-1 flex-1">
              <p className="font-medium text-gray-900">構造保証</p>
              <p className="text-sm text-gray-600">
                主要構造部の瑕疵に対する保証
              </p>
              <p className="text-xs text-gray-500 mt-2">
                建物の主要構造部に関わる瑕疵について保証いたします。
              </p>
            </div>
            <Badge className="ml-4">10年間</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>設備機器保証</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-700 text-sm mb-4">
            設備機器については、各メーカーの保証規定に準じます。
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">システムキッチン</p>
                <p className="text-sm text-gray-500">メーカー: ○○製作所</p>
              </div>
              <Badge variant="outline">2年間</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">IHクッキングヒーター</p>
                <p className="text-sm text-gray-500">メーカー: △△電機</p>
              </div>
              <Badge variant="outline">1年間</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">レンジフード</p>
                <p className="text-sm text-gray-500">メーカー: □□工業</p>
              </div>
              <Badge variant="outline">1年間</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>保証の適用範囲</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium text-gray-900 mb-3">保証の対象となる場合</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-600 mt-1">✓</span>
                <span>通常の使用において発生した不具合</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-600 mt-1">✓</span>
                <span>施工上の瑕疵に起因する不具合</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-600 mt-1">✓</span>
                <span>材料の品質に起因する不具合</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 mb-3">保証の対象外となる場合</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-red-600 mt-1">×</span>
                <span>お客様の故意または過失による損傷</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-red-600 mt-1">×</span>
                <span>経年劣化による変色や摩耗</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-red-600 mt-1">×</span>
                <span>天災地変による損傷</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-red-600 mt-1">×</span>
                <span>弊社以外の業者による修理や改造</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>保証書類</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">工事保証書</p>
                <p className="text-sm text-gray-500">引き渡し時に原本をお渡しします</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              プレビュー
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">設備機器保証書</p>
                <p className="text-sm text-gray-500">各メーカー発行の保証書を添付</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              プレビュー
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
