import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Quotation, PaymentMethod, PaymentRequest } from '@/lib/supabase';

type QuotationTabProps = {
  quotation: Quotation | null;
  paymentMethod: PaymentMethod | null;
  paymentRequests: PaymentRequest[];
};

export function QuotationTab({
  quotation,
  paymentMethod,
}: QuotationTabProps) {
  const formatCurrency = (value: number) => {
    return `¥ ${value.toLocaleString()}`;
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

            <div className="flex justify-between items-center py-3 border-t border-b">
              <Label className="text-sm font-semibold">資材請負金額（合計）</Label>
              <div className="text-right">
                <span className="text-lg font-semibold">
                  {formatCurrency(quotation?.total_contract_amount || 5200000)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label className="text-sm text-gray-600 dark:text-gray-600">
                消費税率（{quotation?.consumption_tax_rate || 10}%）
              </Label>
              <div className="text-right">
                <span className="font-semibold">
                  {formatCurrency(quotation?.consumption_tax || 520000)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center py-3 border-t-2 border-gray-800">
              <Label className="text-base font-bold">合計金額</Label>
              <div className="text-right">
                <span className="text-2xl font-bold text-orange-600">
                  {formatCurrency(quotation?.total_amount || 5720000)}
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
              注意事項：契約時の請負金額が10万円未満を含む場合は、正雪を否認が必要です。
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
              <span className="text-xs text-gray-500 ml-2">
                ローン対象：工式判断分割 利用企業実不
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <Label className="text-sm">コンビニ払い（30万元て）</Label>
              <span className="font-semibold">
                {formatCurrency(paymentMethod?.convenience_store || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <Label className="text-sm">各種納入金</Label>
              <span className="font-semibold">
                {formatCurrency(paymentMethod?.own_funds || 0)}
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
              注意事項：コンビニ払いが30万円以て、クレジットカード接全主金上出以17万の利用可能です、コンビニ払いの場合、種類・作制が必要です。
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">請求</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                    請求受処日
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                    契約時請負金額請求日
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                    契約時請負金額予定額
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700">
                    入金期限日
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
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 dark:text-gray-700"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">契約金</td>
                  <td className="py-3 px-4 text-sm">2024/04/01</td>
                  <td className="py-3 px-4 text-sm text-right">¥520,000</td>
                  <td className="py-3 px-4 text-sm">2024/04/15</td>
                  <td className="py-3 px-4 text-sm text-right">¥520,000</td>
                  <td className="py-3 px-4 text-center">
                    <Checkbox
                      checked={true}
                      className="border-gray-300 data-[state=checked]:bg-orange-500"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm">2024/04/10</td>
                  <td className="py-3 px-4 text-sm"></td>
                  <td className="py-3 px-4">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-xs">
                      請求点検書
                    </Button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">音手金</td>
                  <td className="py-3 px-4 text-sm">2024/04/15</td>
                  <td className="py-3 px-4 text-sm text-right">¥2,600,000</td>
                  <td className="py-3 px-4 text-sm">2024/05/10</td>
                  <td className="py-3 px-4 text-sm text-right">¥2,600,000</td>
                  <td className="py-3 px-4 text-center">
                    <Checkbox
                      checked={true}
                      className="border-gray-300 data-[state=checked]:bg-orange-500"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm">2024/05/08</td>
                  <td className="py-3 px-4 text-sm"></td>
                  <td className="py-3 px-4">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-xs">
                      請求点検書
                    </Button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">中間金 1</td>
                  <td className="py-3 px-4 text-sm">2024/05/15</td>
                  <td className="py-3 px-4 text-sm text-right">¥0</td>
                  <td className="py-3 px-4 text-sm">2024/07/15</td>
                  <td className="py-3 px-4 text-sm text-right">¥0</td>
                  <td className="py-3 px-4 text-center">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                  </td>
                  <td className="py-3 px-4 text-sm">-</td>
                  <td className="py-3 px-4 text-sm"></td>
                  <td className="py-3 px-4">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-xs">
                      請求点検書
                    </Button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">中間金 2</td>
                  <td className="py-3 px-4 text-sm">2024/06/15</td>
                  <td className="py-3 px-4 text-sm text-right">¥0</td>
                  <td className="py-3 px-4 text-sm">2024/09/15</td>
                  <td className="py-3 px-4 text-sm text-right">¥0</td>
                  <td className="py-3 px-4 text-center">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                  </td>
                  <td className="py-3 px-4 text-sm">-</td>
                  <td className="py-3 px-4 text-sm"></td>
                  <td className="py-3 px-4">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-xs">
                      請求点検書
                    </Button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">最終金</td>
                  <td className="py-3 px-4 text-sm">2024/10/15</td>
                  <td className="py-3 px-4 text-sm text-right">¥2,080,000</td>
                  <td className="py-3 px-4 text-sm">2024/11/15</td>
                  <td className="py-3 px-4 text-sm text-right">¥2,080,000</td>
                  <td className="py-3 px-4 text-center">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                  </td>
                  <td className="py-3 px-4 text-sm">-</td>
                  <td className="py-3 px-4 text-sm"></td>
                  <td className="py-3 px-4">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-xs">
                      請求点検書
                    </Button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">最終金ローン</td>
                  <td className="py-3 px-4 text-sm">2024/12/15</td>
                  <td className="py-3 px-4 text-sm text-right">¥0</td>
                  <td className="py-3 px-4 text-sm">2025/01/15</td>
                  <td className="py-3 px-4 text-sm text-right">¥0</td>
                  <td className="py-3 px-4 text-center">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                  </td>
                  <td className="py-3 px-4 text-sm">-</td>
                  <td className="py-3 px-4 text-sm"></td>
                  <td className="py-3 px-4">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-xs">
                      請求点検書
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
