import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const WarrantyStep = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">保証内容のご確認</h1>
        <p className="mt-2 text-gray-600">
          工事完了後の保証内容をご確認ください。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>基本保証</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="font-medium text-gray-900">施工保証</p>
              <p className="text-sm text-gray-600">
                施工部分の瑕疵に対する保証
              </p>
            </div>
            <Badge>2年間</Badge>
          </div>

          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="font-medium text-gray-900">防水保証</p>
              <p className="text-sm text-gray-600">
                浴室・洗面所などの防水工事
              </p>
            </div>
            <Badge>5年間</Badge>
          </div>

          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="font-medium text-gray-900">構造保証</p>
              <p className="text-sm text-gray-600">
                主要構造部の瑕疵に対する保証
              </p>
            </div>
            <Badge>10年間</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>設備機器保証</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            設備機器については、各メーカーの保証規定に準じます。
          </p>

          <div className="space-y-3">
            <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
              <div className="space-y-1">
                <p className="font-medium text-gray-900">システムキッチン</p>
                <p className="text-sm text-gray-600">メーカー: ○○製作所</p>
              </div>
              <Badge variant="outline">2年間</Badge>
            </div>

            <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
              <div className="space-y-1">
                <p className="font-medium text-gray-900">給湯器</p>
                <p className="text-sm text-gray-600">メーカー: △△工業</p>
              </div>
              <Badge variant="outline">1年間</Badge>
            </div>

            <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
              <div className="space-y-1">
                <p className="font-medium text-gray-900">換気扇</p>
                <p className="text-sm text-gray-600">メーカー: □□電機</p>
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
        <CardContent className="space-y-3">
          <div>
            <p className="font-medium text-gray-900 mb-2">保証の対象となる場合</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>通常の使用において発生した不具合</li>
              <li>施工上の瑕疵に起因する不具合</li>
              <li>材料の品質に起因する不具合</li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 mb-2">保証の対象外となる場合</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>お客様の故意または過失による損傷</li>
              <li>経年劣化による変色や摩耗</li>
              <li>天災地変による損傷</li>
              <li>弊社以外の業者による修理や改造</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
