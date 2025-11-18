import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export const ConsentStep = () => {
  const [consent, setConsent] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ペーパーレス手続きについて</h1>
        <p className="mt-4 text-gray-700">
          ペーパーレス手続きとは、株式会社イズとお客様との契約手続きをタブレット型端末やパソコンの画面上で行って頂くペーパーレス・印鑑レスのお手続きです。
        </p>
        <p className="mt-4 text-gray-700">
          下記の内容を必ずご確認ください。
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>ご署名はご契約者様ご自身で行う必要があります。</li>
            <li>ご自身以外の方がご署名された場合、ご注文は無効となります。</li>
            <li>ご契約内容をデータでご希望の場合、PDFデータにて送付するため有効なメールアドレスが必ず必要になります。</li>
          </ul>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-start space-x-3 bg-orange-50 p-4 rounded">
              <Checkbox
                id="paperless-consent"
                checked={consent}
                onCheckedChange={(checked) =>
                  setConsent(checked as boolean)
                }
              />
              <Label
                htmlFor="paperless-consent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                ペーパーレス手続きに同意します。
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">個人情報保護方針</h2>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>弊社は、個人の人格尊重の理念のもとに、関係法令等を遵守し、実施するあらゆる事業において、個人情報を慎重に取り扱います。</li>
            <li>弊社は、個人情報を適法かつ適正な方法で取得します。</li>
            <li>弊社は、個人情報の利用目的をできる限り特定するとともに、その利用目的の範囲でのみ個人情報を利用します。</li>
            <li>弊社は、あらかじめ明示した範囲及び法令等の規定に基づく場合を除いて、個人情報を事前に本人の同意を得ることなく外部に提供しません。</li>
            <li>弊社は、個人情報を正確な状態に保つとともに、漏えい、滅失、き損などを防止するため、適切な措置を講じます。</li>
            <li>弊社は、本人が自己の個人情報について、開示・訂正・追加・削除・利用停止を求める権利を有していることを確認し、これらの申出があった場合には速やかに対応します。</li>
            <li>弊社は、個人情報の取扱いに関する苦情があったときは、適切かつ速やかに対応します。</li>
            <li>弊社は、個人情報を保護するために適切な管理体制を講じるとともに、社員の個人情報保護に関する意識啓発に努めます。</li>
            <li>弊社は、この方針を実行するため、個人情報保護規程を定め、これを弊社社員に周知徹底し、確実に実施します。</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
