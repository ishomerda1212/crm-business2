import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Phone, Mail, Clock } from 'lucide-react';

export const CompanyNoticeStep = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">会社からのご案内</h1>
        <p className="mt-2 text-gray-600">
          工事開始までの流れと、その他のご案内事項をご確認ください。
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
          <CardTitle>今後の流れ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">着工前打ち合わせ</p>
                <p className="text-sm text-gray-600 mt-1">
                  工事開始の約1週間前に、担当者より詳細な工程についてご説明いたします。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">近隣挨拶</p>
                <p className="text-sm text-gray-600 mt-1">
                  工事開始前に、弊社スタッフが近隣の方々へご挨拶に伺います。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">工事着工</p>
                <p className="text-sm text-gray-600 mt-1">
                  予定日より工事を開始いたします。工程に応じて随時ご報告いたします。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <p className="font-medium text-gray-900">完成・引き渡し</p>
                <p className="text-sm text-gray-600 mt-1">
                  工事完了後、お客様立ち会いのもと完成検査を実施し、お引き渡しいたします。
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>お問い合わせ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">電話でのお問い合わせ</p>
              <p className="text-gray-600 mt-1">0120-XXX-XXX</p>
              <p className="text-sm text-gray-500">受付時間: 平日 9:00〜18:00</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">メールでのお問い合わせ</p>
              <p className="text-gray-600 mt-1">info@example.com</p>
              <p className="text-sm text-gray-500">24時間受付（返信は営業時間内）</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">営業時間</p>
              <p className="text-gray-600 mt-1">平日 9:00〜18:00</p>
              <p className="text-sm text-gray-500">土日祝日は休業日となります</p>
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
