import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Phone, Mail } from 'lucide-react';

export const CompanyNoticeStep = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">会社からのご案内</h1>
        <p className="mt-2 text-gray-600">
          お客さま専用窓口 イズコールセンターについてご案内いたします。
        </p>
      </div>

      <Alert className="bg-green-50 border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          契約手続きが完了しました。ご契約ありがとうございます。
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>お客さま専用窓口 イズコールセンターについて</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-gray-700 leading-relaxed">
              株式会社イズでは、お客様を個別の担当者だけでなく、会社全体でサポートさせていただくため、イズコールセンターを設置しております。
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              担当者に連絡が取れない場合や、ご不明な点・ご心配な点がございましたら、お気軽にイズコールセンターまでお問い合わせください。
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">以下のような場合にご連絡ください</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-900 mb-2">ご契約後/工事着工前</p>
                <ul className="space-y-1 text-sm text-gray-700 ml-4">
                  <li className="list-disc">契約内容に関して不明な点がある</li>
                  <li className="list-disc">工事着工までに聞きたいことがある</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-2">工事着工中</p>
                <ul className="space-y-1 text-sm text-gray-700 ml-4">
                  <li className="list-disc">工事の進捗状況のことで聞きたいことがある</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-2">工事完了後</p>
                <ul className="space-y-1 text-sm text-gray-700 ml-4">
                  <li className="list-disc">工事中、気になることがあった</li>
                  <li className="list-disc">保証のことで聞きたいことがある</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-700 mb-3">
              以下の内容でイズコールセンターよりご指定の方法でご連絡させていただく場合がございます。
            </p>
            <ul className="space-y-1 text-sm text-gray-700 ml-4">
              <li className="list-disc">ご入金確認後（ローンの場合は除く）</li>
              <li className="list-disc">ご契約後</li>
              <li className="list-disc">工事完了後</li>
            </ul>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-900">イズコールセンター</h3>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">直通電話</p>
                <p className="font-medium text-gray-900 mt-1">0120-12-9156</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">直通アドレス</p>
                <p className="font-medium text-gray-900 mt-1">is-support@is-cross.co.jp</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>その他のご案内</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-700">
            工事期間中、何かご不明な点やご心配な点がございましたら、お気軽に担当者までお問い合わせください。
          </p>
          <p className="text-gray-700">
            また、工事の進捗状況については、定期的にメールやお電話でご報告させていただきます。
          </p>
          <p className="text-gray-700">
            引き続きどうぞよろしくお願いいたします。
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
