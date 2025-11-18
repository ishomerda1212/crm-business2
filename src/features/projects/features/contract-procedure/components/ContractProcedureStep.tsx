import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { mockProjects } from '@/data/mockData';
import { mockCustomer } from '@/data/mockData';
import { mockPropertyInfo } from '@/data/mockData';
import { mockQuotation } from '@/data/mockData';
import { mockPaymentMethod } from '@/data/mockData';
import { mockCorporateInfo } from '@/data/mockData';

export const ContractProcedureStep = () => {
  // モックデータから値を取得（実際の実装では、プロジェクトIDから取得）
  const project = mockProjects[0];
  const customer = mockCustomer;
  const propertyInfo = mockPropertyInfo;
  const quotation = mockQuotation;
  const paymentMethod = mockPaymentMethod;
  const corporateInfo = mockCorporateInfo;

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

  // 現住所のフォーマット
  const currentAddress = customer.current_postal_code && customer.current_prefecture && customer.current_address
    ? `〒${customer.current_postal_code} ${customer.current_prefecture}${customer.current_address}`
    : '-';

  // 工事場所のフォーマット
  const constructionLocation = propertyInfo.construction_postal_code && propertyInfo.construction_prefecture && propertyInfo.construction_address
    ? `〒${propertyInfo.construction_postal_code} ${propertyInfo.construction_prefecture}${propertyInfo.construction_address}`
    : '-';

  // 本社所在地（モックデータにないため仮の値）
  const headOfficeLocation = '〒100-0001 東京都中央区東京1-1-1';
  const officeLocation = headOfficeLocation;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">契約手続き</h1>
        <p className="mt-2 text-gray-600">
          契約書への署名・捺印を行います。
        </p>
      </div>

      {/* 基本情報 */}
      <Card>
        <CardHeader>
          <CardTitle>契約情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-500 text-sm">契約日</Label>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 text-sm">契約時着工日</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {formatDate(project.created_date)}
              </p>
            </div>

            <div>
              <Label className="text-gray-500 text-sm">契約時完工日</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {formatDate(project.updated_date)}
              </p>
            </div>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">発注者名（顧客名）</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {customer.customer_name || '-'}
            </p>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">発注者住所（現住所）</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {currentAddress}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 受注者情報 */}
      <Card>
        <CardHeader>
          <CardTitle>〈受注者〉</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-500 text-sm">会社名</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {corporateInfo.corporate_name || '株式会社イズ'}
            </p>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">代表取締役</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {corporateInfo.representative_name || '-'}
            </p>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">本社所在地</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {headOfficeLocation}
            </p>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">営業所名</Label>
            <p className="mt-1 text-gray-900 font-medium">
              東京営業所
            </p>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">拠点所在地</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {officeLocation}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 text-sm">責任者</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {project.construction_manager || '-'}
              </p>
            </div>

            <div>
              <Label className="text-gray-500 text-sm">担当者</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {project.sales_person || '-'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 請負金額 */}
      <Card>
        <CardHeader>
          <CardTitle>〈請負金額〉</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-500 text-sm">契約時請負金額</Label>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 text-sm">契約金</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {formatAmount(paymentMethod.deposit ? paymentMethod.deposit * 0.1 : null)}
              </p>
            </div>

            <div>
              <Label className="text-gray-500 text-sm">着手金</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {formatAmount(paymentMethod.deposit ? paymentMethod.deposit * 0.2 : null)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 text-sm">中間金１</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {formatAmount(paymentMethod.deposit ? paymentMethod.deposit * 0.2 : null)}
              </p>
            </div>

            <div>
              <Label className="text-gray-500 text-sm">中間金２</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {formatAmount(paymentMethod.deposit ? paymentMethod.deposit * 0.2 : null)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 text-sm">完工金</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {formatAmount(paymentMethod.deposit ? paymentMethod.deposit * 0.2 : null)}
              </p>
            </div>

            <div>
              <Label className="text-gray-500 text-sm">最終金ローン</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {formatAmount(paymentMethod.loan)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 支払方法 */}
      <Card>
        <CardHeader>
          <CardTitle>〈支払方法〉</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(paymentMethod.own_funds > 0 || paymentMethod.deposit > 0) && (
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-orange-500" />
              <Label className="text-sm font-medium text-gray-900">
                銀行振込
              </Label>
            </div>
          )}

          {paymentMethod.loan > 0 && (
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-orange-500" />
              <Label className="text-sm font-medium text-gray-900">
                リフォームローン
              </Label>
            </div>
          )}

          {paymentMethod.convenience_store > 0 && (
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-orange-500" />
              <Label className="text-sm font-medium text-gray-900">
                コンビニ払い
              </Label>
            </div>
          )}

          {paymentMethod.credit_card > 0 && (
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-orange-500" />
              <Label className="text-sm font-medium text-gray-900">
                クレジットカード
              </Label>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 電子署名 */}
      <Card>
        <CardHeader>
          <CardTitle>電子署名</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
