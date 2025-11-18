import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

type CoolingOffAndTermsStepProps = {
  coolingOffAgreed: boolean;
  termsAgreed: boolean;
  onCoolingOffAgreementChange: (agreed: boolean) => void;
  onTermsAgreementChange: (agreed: boolean) => void;
};

export const CoolingOffAndTermsStep = ({
  coolingOffAgreed,
  termsAgreed,
  onCoolingOffAgreementChange,
  onTermsAgreementChange,
}: CoolingOffAndTermsStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">クーリングオフと契約約款について</h1>
        <p className="mt-2 text-gray-600">
          クーリングオフと契約約款の内容をご確認いただき、同意をお願いいたします。
        </p>
      </div>

      {/* クーリングオフ */}
      <Card>
        <CardHeader>
          <CardTitle>クーリングオフについて</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">クーリングオフ制度とは</h3>
                <p className="text-sm leading-relaxed">
                  クーリングオフとは、訪問販売や電話勧誘販売など、特定商取引法に基づく取引において、お客様が契約を締結した後でも、一定の期間内であれば、書面により契約を解除できる制度です。
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">クーリングオフができる期間</h3>
                <p className="text-sm leading-relaxed">
                  契約書面を受領した日、または契約の申込みをした日のいずれか遅い日から起算して8日間（法定）以内であれば、書面により契約を解除することができます。
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">クーリングオフの方法</h3>
                <p className="text-sm leading-relaxed">
                  クーリングオフを希望される場合は、以下の方法でご連絡ください：
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>書面（郵送、FAX、電子メール等）により、当社宛てに契約解除の意思表示を行ってください</li>
                  <li>契約解除の意思表示は、書面を発信した時に効力を生じます</li>
                  <li>契約解除により、お客様は契約の解除に伴う損害賠償または違約金の支払義務を負いません</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">返金について</h3>
                <p className="text-sm leading-relaxed">
                  契約解除後、当社は速やかに、お客様が既に支払った代金を返金いたします。ただし、商品の返還が必要な場合は、商品の返還を受けた後に返金いたします。
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">クーリングオフができない場合</h3>
                <p className="text-sm leading-relaxed">
                  以下の場合は、クーリングオフができません：
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>契約書面を受領した日、または契約の申込みをした日のいずれか遅い日から起算して8日を経過した場合</li>
                  <li>工事が完了し、かつお客様がその工事の結果について満足している旨を書面で確認した場合</li>
                  <li>お客様の責めに帰すべき事由により、商品が損傷した場合</li>
                </ul>
              </div>
            </div>
          </ScrollArea>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-start space-x-3 bg-orange-50 p-4 rounded">
              <Checkbox
                id="cooling-off-consent"
                checked={coolingOffAgreed}
                onCheckedChange={(checked) =>
                  onCoolingOffAgreementChange(checked as boolean)
                }
              />
              <Label
                htmlFor="cooling-off-consent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                クーリングオフについて理解し、同意します。
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 契約約款 */}
      <Card>
        <CardHeader>
          <CardTitle>契約約款</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">第1条（適用範囲）</h3>
                <p className="text-sm leading-relaxed">
                  本約款は、株式会社イズ（以下「当社」といいます。）とお客様との間で締結される工事請負契約（以下「本契約」といいます。）に適用されます。
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">第2条（契約の成立）</h3>
                <p className="text-sm leading-relaxed">
                  本契約は、当社が提示した見積書の内容に基づき、お客様が契約の申込みをし、当社がこれを承諾した時に成立します。
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">第3条（工事の内容）</h3>
                <p className="text-sm leading-relaxed">
                  当社は、契約書に記載された工事内容に従い、善良なる管理者の注意をもって工事を施工します。
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">第4条（請負代金）</h3>
                <p className="text-sm leading-relaxed">
                  請負代金は、契約書に記載された金額とし、お客様は当社が指定する方法により、指定する期日までに支払うものとします。
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">第5条（工事の着手及び完了）</h3>
                <p className="text-sm leading-relaxed">
                  工事の着手日及び完了予定日は、契約書に記載された日とします。ただし、天災地変その他不可抗力により工事の着手又は完了が遅延する場合は、この限りではありません。
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">第6条（瑕疵担保責任）</h3>
                <p className="text-sm leading-relaxed">
                  当社は、工事の目的物に瑕疵がある場合、お客様の請求により、無償で補修、交換その他必要な措置を講じます。ただし、瑕疵が当社の責めに帰すべき事由によるものである場合に限ります。
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">第7条（契約の解除）</h3>
                <p className="text-sm leading-relaxed">
                  お客様又は当社は、相手方が次の各号のいずれかに該当する場合、催告なくして直ちに本契約を解除することができます。
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>支払を遅滞したとき</li>
                  <li>破産手続開始、民事再生手続開始その他これらに類する手続の申立てがあったとき</li>
                  <li>その他、本契約に違反し、相当期間を定めて催告しても改善されないとき</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">第8条（損害賠償）</h3>
                <p className="text-sm leading-relaxed">
                  当社又はお客様が本契約に違反した場合、相手方に対し、これにより生じた損害を賠償する責任を負います。
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">第9条（その他）</h3>
                <p className="text-sm leading-relaxed">
                  本約款に定めのない事項については、工事請負に関する法令及び一般慣習に従います。
                </p>
              </div>
            </div>
          </ScrollArea>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-start space-x-3 bg-orange-50 p-4 rounded">
              <Checkbox
                id="terms-consent"
                checked={termsAgreed}
                onCheckedChange={(checked) =>
                  onTermsAgreementChange(checked as boolean)
                }
              />
              <Label
                htmlFor="terms-consent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                契約約款の内容を確認し、同意します。
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

