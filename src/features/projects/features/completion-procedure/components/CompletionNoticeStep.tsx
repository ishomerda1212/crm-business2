import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CompletionNoticeStep = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">会社からのご案内</h1>
        <p className="mt-2 text-gray-600">
          工事完了後のご案内とアフターサポートについてご確認ください。
        </p>
      </div>

      <Alert className="bg-green-50 border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          工事が無事完了いたしました。この度はご契約いただき、誠にありがとうございました。
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>アフターサポート</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            工事完了後も、お客様に安心してお過ごしいただけるよう、充実したアフターサポート体制を整えております。
          </p>

          <div className="space-y-3">
            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">定期点検サービス</p>
                <p className="text-sm text-gray-600 mt-1">
                  工事完了後、3ヶ月、6ヶ月、1年後に無料の定期点検を実施いたします。
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">24時間緊急対応</p>
                <p className="text-sm text-gray-600 mt-1">
                  水漏れなどの緊急トラブルには、24時間対応のサポートデスクをご用意しております。
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">メンテナンスサポート</p>
                <p className="text-sm text-gray-600 mt-1">
                  日常的なメンテナンス方法のご相談や、消耗品の交換など、お気軽にご相談ください。
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div>
                <p className="font-medium text-gray-900">リフォーム相談</p>
                <p className="text-sm text-gray-600 mt-1">
                  将来的な追加リフォームのご相談も承ります。既存顧客様特別価格でご提供いたします。
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>お問い合わせ窓口</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">電話でのお問い合わせ</p>
              <p className="text-lg text-orange-600 font-medium mt-1">0120-XXX-XXX</p>
              <p className="text-sm text-gray-500 mt-1">受付時間: 平日 9:00〜18:00</p>
            </div>
            <Button variant="outline" size="sm">
              電話する
            </Button>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">メールでのお問い合わせ</p>
              <p className="text-gray-600 mt-1">support@example.com</p>
              <p className="text-sm text-gray-500 mt-1">24時間受付（返信は営業時間内）</p>
            </div>
            <Button variant="outline" size="sm">
              メール
            </Button>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <MessageCircle className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">LINEでのお問い合わせ</p>
              <p className="text-gray-600 mt-1">公式LINEアカウント</p>
              <p className="text-sm text-gray-500 mt-1">お気軽にメッセージをお送りください</p>
            </div>
            <Button variant="outline" size="sm">
              LINE
            </Button>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">緊急対応ダイヤル（24時間）</p>
              <p className="text-lg text-red-600 font-medium mt-1">0120-YYY-YYY</p>
              <p className="text-sm text-gray-500 mt-1">水漏れなどの緊急時専用</p>
            </div>
            <Button variant="destructive" size="sm">
              緊急電話
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>定期点検スケジュール</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">3ヶ月点検</p>
                <p className="text-sm text-gray-600 mt-1">
                  予定日: 2024年7月上旬
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  初期不具合の確認、設備の動作確認を実施します。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">6ヶ月点検</p>
                <p className="text-sm text-gray-600 mt-1">
                  予定日: 2024年10月上旬
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  半年間の使用状況確認、メンテナンスのアドバイスを行います。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">1年点検</p>
                <p className="text-sm text-gray-600 mt-1">
                  予定日: 2025年4月上旬
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  1年間の総合点検、今後のメンテナンス計画のご提案を行います。
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>お客様アンケートのお願い</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            今後のサービス向上のため、お客様のご意見をお聞かせください。
            アンケートにご協力いただいた方には、特典をご用意しております。
          </p>
          <Button className="w-full" size="lg">
            アンケートに回答する
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>お知らせ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-700">
            この度は弊社をご利用いただき、誠にありがとうございました。
          </p>
          <p className="text-gray-700">
            今後も末永くお付き合いいただけますよう、スタッフ一同心よりお待ちしております。
          </p>
          <p className="text-gray-700 font-medium">
            何かご不明な点やご要望がございましたら、いつでもお気軽にご連絡ください。
          </p>
          <div className="pt-4 mt-4 border-t">
            <p className="text-sm text-gray-500 text-center">
              株式会社リノベーション / TEL: 0120-XXX-XXX
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
