import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { InquiryInfo } from '@/lib/supabase';

type InquiryInfoTabProps = {
  inquiryInfo: InquiryInfo | null;
};

const defaultMessage = '-';

export function InquiryInfoTab({ inquiryInfo }: InquiryInfoTabProps) {
  const infoItems = [
    {
      label: '工事検討箇所',
      value: inquiryInfo?.consideration_area || defaultMessage,
    },
    {
      label: '重視するポイント',
      value: inquiryInfo?.important_points || defaultMessage,
    },
    {
      label: '希望完成時期',
      value: inquiryInfo?.desired_completion_timing || defaultMessage,
    },
    {
      label: '予算',
      value: inquiryInfo?.budget || defaultMessage,
    },
    {
      label: 'ローン',
      value: inquiryInfo?.loan || defaultMessage,
    },
  ];

  const quotationStatus = inquiryInfo?.quotation_status || '未入力';

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">問合情報サマリー</CardTitle>
          <div className="text-sm text-gray-500">
            顧客ヒアリング内容とステータスを一覧で確認できます。
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {infoItems.map((item) => (
              <div key={item.label}>
                <Label className="text-sm text-gray-600 dark:text-gray-600">{item.label}</Label>
                <p className="mt-1 font-medium leading-relaxed whitespace-pre-line">
                  {item.value}
                </p>
              </div>
            ))}
            <div className="lg:col-span-2">
              <Label className="text-sm text-gray-600 dark:text-gray-600">見積状況</Label>
              <div className="mt-2 flex flex-wrap gap-3 items-center">
                <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 text-sm">
                  {quotationStatus}
                </Badge>
                <span className="text-sm text-gray-500">
                  最新の見積提示状況を表示します。
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {!inquiryInfo && (
        <Card className="bg-white dark:bg-white border-dashed border-2 border-gray-200">
          <CardContent className="py-10 text-center text-gray-500">
            現在表示できる問合情報がありません。データ登録後に自動で表示されます。
          </CardContent>
        </Card>
      )}
    </div>
  );
}

