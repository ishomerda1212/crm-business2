import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Camera, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ConstructionConfirmStep = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">工事完了確認</h1>
        <p className="mt-2 text-gray-600">
          工事が完了いたしました。施工内容をご確認ください。
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 text-sm">工事期間</Label>
              <p className="mt-1 text-gray-900 font-medium">2024年1月15日 〜 2024年3月31日</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">実工期</Label>
              <p className="mt-1 text-gray-900 font-medium">75日間</p>
            </div>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">工事場所</Label>
            <p className="mt-1 text-gray-900 font-medium">
              東京都千代田区千代田1-1-1
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>施工内容</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">キッチン設備の撤去・新設</p>
                <p className="text-sm text-gray-600 mt-1">
                  既存キッチンの撤去、新規システムキッチンの設置完了
                </p>
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-300">完了</Badge>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">給排水設備工事</p>
                <p className="text-sm text-gray-600 mt-1">
                  給水管・排水管の配管工事完了、動作確認済み
                </p>
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-300">完了</Badge>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">電気設備工事</p>
                <p className="text-sm text-gray-600 mt-1">
                  照明・コンセント配線工事完了、安全確認済み
                </p>
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-300">完了</Badge>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">内装仕上げ工事</p>
                <p className="text-sm text-gray-600 mt-1">
                  壁・天井・床の仕上げ工事完了、清掃実施済み
                </p>
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-300">完了</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>完成写真</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300"
              >
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            <FileText className="h-4 w-4 mr-2" />
            完成写真一覧をダウンロード
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>確認事項</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
            <p className="text-gray-700">仕様書通りに施工されていることを確認しました</p>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
            <p className="text-gray-700">各設備の動作確認を実施し、正常に動作することを確認しました</p>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
            <p className="text-gray-700">施工箇所の清掃が完了していることを確認しました</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
