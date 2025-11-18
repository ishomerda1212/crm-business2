import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';

interface ImportantItemsStepProps {
  onAgreementChange?: (agreed: boolean) => void;
}

export const ImportantItemsStep = ({ onAgreementChange }: ImportantItemsStepProps) => {
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    onAgreementChange?.(agreed);
  }, [agreed, onAgreementChange]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">重要項目説明</h1>
        <p className="mt-2 text-gray-600">
          工事をご検討いただく皆様に、最低限知っていただきたい項目を記載しております。
          契約の判断に影響する重要な事項ですので、説明をよく聞き、十分にご理解いただいた上でご判断ください。
          重要事項の説明を受けた後、ご署名をお願いいたします。
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
          <CardTitle className="bg-gray-100 px-4 py-2 rounded-md inline-block">
            共通項目
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">1. 保証期間</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                工事の保証期間および住宅設備の保証期間は、別途保証規定に準じます。
              </p>
              <p>
                住宅用途以外が明確な目的（店舗・事務所・工場など）の場合は、メーカー保証となります。
              </p>
              <p>
                工事保証とは、保証対象部位の不具合について、無償で修理・補修を行うことをいいます。
              </p>
              <p>
                その不具合により他の家財や製品に損害が生じた場合は、当社の保険で対応いたします。
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">2. お客様支給商品の取扱について</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                お客様がご用意された商品の取り付けについては、工事保証の対象外となります。
              </p>
              <p>
                商品の保証については、ご購入先にご確認ください。
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">3. 工事期間中の開始・終了について</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                工事期間中、現場監督または作業員が、作業開始時および作業終了時にご連絡いたします。
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">4. お客様家財の取扱について</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                工事箇所にある家財は、工事開始前日までにご移動をお願いいたします。
              </p>
              <p>
                タンスや収納など、大型の家財の移動については、ご相談の上、ご協力をお願いいたします。
              </p>
              <p>
                階段の上り下りでの移動はできません。
              </p>
              <p>
                当社の社員や作業員が無償で移動させていただいた場合、家財の損傷については当社では責任を負いかねますので、ご了承ください。
              </p>
              <p className="font-semibold text-orange-600 flex items-start gap-2">
                <span>★</span>
                <span>家具や家財は保護いたしますが、ホコリなどが入り込んだり、付着したりする場合があります。</span>
              </p>
              <p>
                家財の量が多い場合、コンテナが必要な場合は、提携の引越し業者から見積もりを取ることができます。
              </p>
              <p>
                工事中に使用していた電気製品を一時的に外した際に、不具合やエラー、エラーコードが表示された場合、当社では責任を負いかねますので、ご了承ください。
              </p>
              <p>
                家具や家電、その付属品の移動や一時的な外しにより、部品交換や修理が必要になった場合は、別途費用がかかります。
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">5. 工事範囲以外の立ち入りについて</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                工事現場以外の場所への立ち入りは、現場監督や作業員も含め、基本的に「立ち入り禁止」となります。
              </p>
              <p>
                立ち入りが必要な場合は、ご協力をお願いいたします。その際は、事前にご連絡いたします。
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">6. 工事前の現地確認について</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                工事前に、各部屋や箇所の写真を撮影し、床や壁などの既存の傷などを記録いたします。
              </p>
              <p>
                資材の搬入時には、室内の保護に十分注意を払います。
              </p>
              <p>
                工事中に傷が発生した場合、工事によるものか判断が難しいため、工事前の既存の傷の確認をお願いしております。
              </p>
              <p>
                搬入経路や工事現場についても、当社で確認いたします。
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">7. 工事中のゴミ処分について</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                工事範囲外で発生した家財やその他の処分をご希望の場合は、別紙に基づき、当社にご連絡いただければ処分いたします。
              </p>
              <p>
                蛍光灯など、水銀を含む製品は、産業廃棄物として処分が困難です。
              </p>
              <p>
                お客様の各自治体のルールに従って、お客様にて処分をお願いいたします。
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">8. 工事中に発生した諸問題について</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                工事中、建物の劣化により電気、ガス、水道などの既存の配管が劣化しているなどの不具合を発見した場合、お声掛けの上、対策を検討させて頂きます。
              </p>
              <p>
                補修には別途費用が発生する場合があります。
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">9. キズ・汚れの補修について</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                仕上げ材にキズ、汚れを発見した場合は補修いたします。
              </p>
              <p>
                対処方法により補修工事日程の調整が必要な場合がございますので問題箇所をご確認いただいた後に原因を明確にし、対処法をご相談させて頂きます。
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">10. 雨天時などの工事について</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                悪天候により、工期に遅れが生じる場合があります。
              </p>
              <p>
                作業内容により、天気予報で午後から雨の場合に、午前中も工事をお休みさせていただく場合がございます。(外部塗装工事など、施工箇所が濡れていると作業ができない場合)。
              </p>
              <p>
                工事中止の旨は事前にご連絡させていただきます。
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">11. 強風時の対策について</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                仮設足場を組んでいる場合、台風などにより足場倒壊の危険があるとこちらで判断した際は、足場のシート養生を搾らせて頂く場合があります。
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">12. 共同住宅(マンションなど)の工事申請について</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                工事にあたって、管理組合に工事申請及び隣接住民の方の同意が必要な場合がございます。
              </p>
              <p>
                留守が多い隣接住民の方で、弊社従業員が会えない場合はご協力ください。
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">13. 作業中のスマートフォン使用について</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                弊社では、工事中の情報共有に「アンドパッド」というスマートフォンアプリを採用しております。
              </p>
              <p>
                弊社従業員及び各職方が作業中にスマートフォンを使用する場合があります。予めご了承ください。
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">14. 工事証明書について</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                断熱リフォームやバリアフリーリフォームの所得税控除・固定資産税の減額の申請をされる場合で証明書等の発行をご希望の場合は、発行費用として、1件につき1,210円 (消費税込)を頂戴いたします。
              </p>
              <p>
                簡易耐震工事や一部断熱工事の場合は工事証明書及び工事写真、竣工図面の発行は出来かねます。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-start space-x-3 bg-orange-50 p-4 rounded-lg border border-orange-200">
        <Checkbox
          id="important-items-consent"
          checked={agreed}
          onCheckedChange={(checked) => setAgreed(checked as boolean)}
        />
        <Label
          htmlFor="important-items-consent"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          上記内容に同意しました。
        </Label>
      </div>
    </div>
  );
};
