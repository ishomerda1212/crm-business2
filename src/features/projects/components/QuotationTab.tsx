import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Quotation, PaymentMethod, PaymentRequest, LoanInfo } from '@/lib/supabase';

type QuotationTabProps = {
  quotation: Quotation | null;
  paymentMethod: PaymentMethod | null;
  paymentRequests: PaymentRequest[];
  loanInfo?: LoanInfo | null;
};

export function QuotationTab({
  quotation,
  paymentMethod,
  loanInfo,
}: QuotationTabProps) {
  const [invoiceTimestamps, setInvoiceTimestamps] = useState<Record<string, string>>({});

  const formatCurrency = (value: number) => {
    return `¥ ${value.toLocaleString()}`;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const handleInvoiceOutput = (itemName: string) => {
    const timestamp = new Date().toISOString();
    setInvoiceTimestamps((prev) => ({
      ...prev,
      [itemName]: timestamp,
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">請負金額</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <Label className="text-sm text-gray-600 dark:text-gray-600">契約時請負金額</Label>
              <div className="text-right">
                <span className="text-lg font-semibold">
                  {formatCurrency(quotation?.contract_amount || 5200000)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-t">
              <Label className="text-sm text-gray-600 dark:text-gray-600">ポイント割引</Label>
              <div className="text-right">
                <span className="text-red-600">- ¥ 0</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label className="text-sm text-gray-600 dark:text-gray-600">追加工事</Label>
              <div className="text-right">
                <span className="text-green-600">+ ¥ 0</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label className="text-sm text-gray-600 dark:text-gray-600">減額</Label>
              <div className="text-right">
                <span className="text-red-600">- ¥ 0</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-3 border-t-2 border-gray-800">
              <Label className="text-base font-bold">最終請負金額</Label>
              <div className="text-right">
                <span className="text-2xl font-bold text-orange-600">
                  {formatCurrency(quotation?.total_amount || 5720000)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label className="text-sm text-gray-600 dark:text-gray-600">
                内消費税（{quotation?.consumption_tax_rate || 10}%）
              </Label>
              <div className="text-right">
                <span className="font-semibold">
                  {formatCurrency(quotation?.consumption_tax || 520000)}
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
              注意事項：最終請負金額が契約時請負金額と10万円以上の差異がある場合、変更合意手続が必要となります。
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">支払方法</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <Label className="text-sm">着付金込</Label>
              <span className="font-semibold">
                {formatCurrency(paymentMethod?.deposit || 3120000)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <Label className="text-sm">ローン</Label>
              <span className="font-semibold">
                {formatCurrency(paymentMethod?.loan || 2600000)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <Label className="text-sm">コンビニ払い（30万円まで）</Label>
              <span className="font-semibold">
                {formatCurrency(paymentMethod?.convenience_store || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <Label className="text-sm">クレジットカード</Label>
              <span className="font-semibold">
                {formatCurrency(paymentMethod?.credit_card || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <Label className="text-sm">補助金等（税金込みめ）</Label>
              <span className="font-semibold">
                {formatCurrency(paymentMethod?.subsidy || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-t-2">
              <Label className="text-base font-bold">支払方法合計</Label>
              <span className="text-xl font-bold text-orange-600">
                {formatCurrency(paymentMethod?.total_payment || 5720000)}
              </span>
            </div>

            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
              注意事項：コンビニ払いが30万円までで、クレジットカードは10万円までで利用可能です。コンビニ払いの場合経理への依頼書が必要です。
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">請求</CardTitle>
            <HoverCard>
              <HoverCardTrigger asChild>
                <button
                  type="button"
                  className="rounded-full w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors"
                  aria-label="注意事項を表示"
                >
                  <span className="text-sm font-semibold">?</span>
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-[600px] max-h-[600px] overflow-y-auto" side="left" align="end">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded text-sm text-gray-700">
                    <h4 className="font-semibold mb-2">お支払いについて</h4>
                    <p className="mb-2">
                      お支払いはセキュリティ上の理由で銀行振込でお願いしております。スタッフが直接訪問して集金することはありません。入金確認後、確認通知を送信いたします。
                    </p>
                    <p>
                      銀行振込手数料は当社負担のため、お支払い時に振込手数料額を差し引いてお支払いください。
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded text-sm text-gray-700">
                    <h4 className="font-semibold mb-2">領収書の発行について</h4>
                    <p className="mb-2">
                      当社では原則として領収書の発行はいたしません。契約書の控えと銀行振込の控えをご利用ください。
                    </p>
                    <p>
                      法人様で会計処理上領収書が必要な場合は、お問い合わせください。
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded text-sm text-gray-700">
                    <h4 className="font-semibold mb-2">着手金について</h4>
                    <p className="mb-2">
                      着手金の確認後、資材発注と工事手配を開始いたします。
                    </p>
                    <p>
                      75歳以上の方については、第一親等の保証人の収入証明または一括払いの確認後、工事準備を開始いたします。
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded text-sm text-gray-700">
                    <h4 className="font-semibold mb-2">中間金のお支払いについて</h4>
                    <p>
                      中間金のお支払い時期は、予定工事期間の50%が完了した時点となります。具体的には、建具工事またはユニットバス組立が完了した時点を想定しております。
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded text-sm text-gray-700">
                    <h4 className="font-semibold mb-2">追加ご注文金のお支払いについて</h4>
                    <p className="mb-2">
                      工事期間中に追加ご注文が発生した場合、原則として完成金に加算し、引渡し後に振り込みいただきます。
                    </p>
                    <p>
                      ただし、契約金額が500万円を超え、追加ご注文金額が100万円を超える場合は、最新のお支払い時に追加ご注文金額の50%をお支払いください。
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                    項目
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                    ご入金時期
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                    契約時請負金額予定額
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                    請求額
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                    入金確認
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                    入金日
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                    摘作
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                    出力日時
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">契約金</td>
                  <td className="py-3 px-4 text-sm">ご契約後3営業日以内</td>
                  <td className="py-3 px-4 text-sm text-right">¥520,000</td>
                  <td className="py-3 px-4 text-sm text-right">¥520,000</td>
                  <td className="py-3 px-4 text-center">
                    <Checkbox
                      checked={true}
                      className="border-gray-300 data-[state=checked]:bg-orange-500"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm">2024/04/10</td>
                  <td className="py-3 px-4">
                    <Button 
                      size="sm" 
                      className="bg-orange-500 hover:bg-orange-600 text-xs"
                      onClick={() => handleInvoiceOutput('契約金')}
                    >
                      請求書出力
                    </Button>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {invoiceTimestamps['契約金'] && formatTimestamp(invoiceTimestamps['契約金'])}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">着手金</td>
                  <td className="py-3 px-4 text-sm">着工2週間前</td>
                  <td className="py-3 px-4 text-sm text-right">¥2,600,000</td>
                  <td className="py-3 px-4 text-sm text-right">¥2,600,000</td>
                  <td className="py-3 px-4 text-center">
                    <Checkbox
                      checked={true}
                      className="border-gray-300 data-[state=checked]:bg-orange-500"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm">2024/05/08</td>
                  <td className="py-3 px-4">
                    <Button 
                      size="sm" 
                      className="bg-orange-500 hover:bg-orange-600 text-xs"
                      onClick={() => handleInvoiceOutput('着手金')}
                    >
                      請求書出力
                    </Button>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {invoiceTimestamps['着手金'] && formatTimestamp(invoiceTimestamps['着手金'])}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">中間金 1</td>
                  <td className="py-3 px-4 text-sm">工事中間時期</td>
                  <td className="py-3 px-4 text-sm text-right">¥0</td>
                  <td className="py-3 px-4 text-sm text-right">¥0</td>
                  <td className="py-3 px-4 text-center">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                  </td>
                  <td className="py-3 px-4 text-sm">-</td>
                  <td className="py-3 px-4">
                    <Button 
                      size="sm" 
                      className="bg-orange-500 hover:bg-orange-600 text-xs"
                      onClick={() => handleInvoiceOutput('中間金 1')}
                    >
                      請求書出力
                    </Button>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {invoiceTimestamps['中間金 1'] && formatTimestamp(invoiceTimestamps['中間金 1'])}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">中間金 2</td>
                  <td className="py-3 px-4 text-sm">工事中間時期</td>
                  <td className="py-3 px-4 text-sm text-right">¥0</td>
                  <td className="py-3 px-4 text-sm text-right">¥0</td>
                  <td className="py-3 px-4 text-center">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                  </td>
                  <td className="py-3 px-4 text-sm">-</td>
                  <td className="py-3 px-4">
                    <Button 
                      size="sm" 
                      className="bg-orange-500 hover:bg-orange-600 text-xs"
                      onClick={() => handleInvoiceOutput('中間金 2')}
                    >
                      請求書出力
                    </Button>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {invoiceTimestamps['中間金 2'] && formatTimestamp(invoiceTimestamps['中間金 2'])}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">完工金</td>
                  <td className="py-3 px-4 text-sm">完工後3営業日以内</td>
                  <td className="py-3 px-4 text-sm text-right">¥2,080,000</td>
                  <td className="py-3 px-4 text-sm text-right">¥2,080,000</td>
                  <td className="py-3 px-4 text-center">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                  </td>
                  <td className="py-3 px-4 text-sm">-</td>
                  <td className="py-3 px-4">
                    <Button 
                      size="sm" 
                      className="bg-orange-500 hover:bg-orange-600 text-xs"
                      onClick={() => handleInvoiceOutput('完工金')}
                    >
                      請求書出力
                    </Button>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {invoiceTimestamps['完工金'] && formatTimestamp(invoiceTimestamps['完工金'])}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">最終金ローン</td>
                  <td className="py-3 px-4 text-sm">完工後3営業日以内</td>
                  <td className="py-3 px-4 text-sm text-right">¥0</td>
                  <td className="py-3 px-4 text-sm text-right">¥0</td>
                  <td className="py-3 px-4 text-center">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                  </td>
                  <td className="py-3 px-4 text-sm">-</td>
                  <td className="py-3 px-4">
                    <Button 
                      size="sm" 
                      className="bg-orange-500 hover:bg-orange-600 text-xs"
                      onClick={() => handleInvoiceOutput('最終金ローン')}
                    >
                      請求書出力
                    </Button>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {invoiceTimestamps['最終金ローン'] && formatTimestamp(invoiceTimestamps['最終金ローン'])}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">ローン情報</CardTitle>
            <HoverCard>
              <HoverCardTrigger asChild>
                <button
                  type="button"
                  className="rounded-full w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors"
                  aria-label="ローンに関する条項を表示"
                >
                  <span className="text-sm font-semibold">?</span>
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-[600px] max-h-[600px] overflow-y-auto" side="left" align="end">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded text-sm text-gray-700">
                    <h4 className="font-semibold mb-2">1. ローン内定書について</h4>
                    <p>
                      金融機関からの内定書（ローン金額明記）を着工30日前に提出してください。金融機関の担当者との確認も必要です。
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded text-sm text-gray-700">
                    <h4 className="font-semibold mb-2">2. 工事の引渡しについて</h4>
                    <p>
                      工事の引渡しは、ローン決済完了後、予定額全額が当社に振り込まれた時点をもって行います。
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded text-sm text-gray-700">
                    <h4 className="font-semibold mb-2">3. 支払い責任について</h4>
                    <p>
                      ローンが決済されない場合、注文者と下記に記載の同居親族（成人のみ）が、当該住居の所有者および共有者と連帯して支払いの責任を負います。
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded text-sm text-gray-700">
                    <h4 className="font-semibold mb-2">4. 建物売却による支払いについて</h4>
                    <p>
                      支払期日になっても注文者が当社に支払えない場合、注文者および下記に記載の権利者は、当該建物を売却し、その売却代金をもって当社への支払いに充てることに同意します。
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded text-sm text-gray-700">
                    <h4 className="font-semibold mb-2">5. 権利の不行使について</h4>
                    <p>
                      当該建物が売却される場合、注文者および下記に記載の同居親族、所有者、共有者は、所有権、先取特権その他の権利を行使して、当該建物の売却を妨げないことに同意します。
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <Label className="text-sm text-gray-600 dark:text-gray-600">会社</Label>
              <div className="text-right">
                <span className="text-sm">
                  {loanInfo?.company || '-'}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-t">
              <Label className="text-sm text-gray-600 dark:text-gray-600">支店</Label>
              <div className="text-right">
                <span className="text-sm">
                  {loanInfo?.branch || '-'}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-t">
              <Label className="text-sm text-gray-600 dark:text-gray-600">担当者</Label>
              <div className="text-right">
                <span className="text-sm">
                  {loanInfo?.contact_person || '-'}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-t">
              <Label className="text-sm text-gray-600 dark:text-gray-600">担当者電話番号</Label>
              <div className="text-right">
                <span className="text-sm">
                  {loanInfo?.contact_phone || '-'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
