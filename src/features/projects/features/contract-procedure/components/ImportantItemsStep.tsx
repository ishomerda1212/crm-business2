import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export const ImportantItemsStep = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">重要項目説明</h1>
        <p className="mt-2 text-gray-600">
          工事契約に関する重要な項目をご確認ください。
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          以下の項目は契約上重要な内容となります。必ずご確認ください。
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>契約の解除について</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-700">
            契約締結後8日以内であれば、クーリング・オフ制度により契約を解除することができます。
          </p>
          <p className="text-gray-700">
            ただし、お客様の都合による工事着工後の解除については、着手金や実施済み工事費用をご負担いただく場合があります。
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>支払条件</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-700">
            工事代金のお支払いは、以下のスケジュールで行っていただきます。
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>契約時: 契約金額の30%</li>
            <li>着工時: 契約金額の40%</li>
            <li>完成時: 契約金額の30%</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>工事の保証</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-700">
            工事完了後、施工部分について2年間の瑕疵担保責任を負います。
          </p>
          <p className="text-gray-700">
            設備機器については、メーカー保証に準じます。
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>その他の重要事項</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-700">
            工事期間中は、騒音や粉塵が発生する場合があります。
          </p>
          <p className="text-gray-700">
            近隣住民の方への事前のご挨拶については、弊社が責任を持って対応いたします。
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
