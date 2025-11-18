import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { mockProjects } from '@/data/mockData';
import { mockPropertyInfo } from '@/data/mockData';
import { mockQuotation } from '@/data/mockData';

export const HandoverStep = () => {

  // モックデータから値を取得（実際の実装では、プロジェクトIDから取得）
  const project = mockProjects[0];
  const propertyInfo = mockPropertyInfo;
  const quotation = mockQuotation;

  // 日付フォーマット関数
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // 金額フォーマット関数
  const formatAmount = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) return '-';
    return `¥${amount.toLocaleString()}`;
  };

  // 工事場所のフォーマット
  const constructionLocation = propertyInfo.construction_postal_code && propertyInfo.construction_prefecture && propertyInfo.construction_address
    ? `〒${propertyInfo.construction_postal_code} ${propertyInfo.construction_prefecture}${propertyInfo.construction_address}`
    : '-';

  // 工期のフォーマット
  const constructionPeriod = project.created_date && project.updated_date
    ? `${formatDate(project.created_date)} - ${formatDate(project.updated_date)}`
    : '-';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">引き渡し</h1>
        <p className="mt-2 text-gray-600">
          完成した物件をお引き渡しいたします。
        </p>
      </div>

      {/* 工事内容 */}
      <Card>
        <CardHeader>
          <CardTitle>〈工事内容〉</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-500 text-sm">ご契約日</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {formatDate(project.created_date)}
            </p>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">工事名称（案件名）</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {project.project_name || '-'}
            </p>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">工事場所</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {constructionLocation}
            </p>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">工事内容</Label>
            <p className="mt-1 text-gray-900 font-medium">
              外壁工事、内装工事、キッチン・浴室リフォーム
            </p>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">工期：着工日‐完工日</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {constructionPeriod}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 精算内容 */}
      <Card>
        <CardHeader>
          <CardTitle>〈精算内容〉</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-500 text-sm">最終請負金額</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {formatAmount(quotation.total_contract_amount)}
            </p>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">内消費税</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {formatAmount(quotation.consumption_tax)}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>電子署名</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            引き渡しを確認し、上記の書類・鍵等を受領したことを確認します。
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">
              こちらに署名をご記入ください
            </p>
            <div className="h-40 bg-gray-50 rounded border border-gray-200 flex items-center justify-center">
              <p className="text-gray-400">署名エリア</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              クリア
            </Button>
            <Button className="flex-1">
              署名を確定
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
