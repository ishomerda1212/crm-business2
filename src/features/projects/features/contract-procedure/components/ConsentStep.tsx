import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export const ConsentStep = () => {
  const [consents, setConsents] = useState({
    terms: false,
    privacy: false,
    explanation: false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">契約手続きの同意</h1>
        <p className="mt-2 text-gray-600">
          契約手続きを開始するにあたり、以下の内容にご同意いただく必要があります。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>同意事項</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={consents.terms}
              onCheckedChange={(checked) =>
                setConsents({ ...consents, terms: checked as boolean })
              }
            />
            <div className="space-y-1">
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                契約約款に同意します
              </Label>
              <p className="text-sm text-gray-500">
                工事請負契約約款の内容を確認し、同意します。
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="privacy"
              checked={consents.privacy}
              onCheckedChange={(checked) =>
                setConsents({ ...consents, privacy: checked as boolean })
              }
            />
            <div className="space-y-1">
              <Label
                htmlFor="privacy"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                個人情報の取り扱いに同意します
              </Label>
              <p className="text-sm text-gray-500">
                個人情報保護方針の内容を確認し、個人情報の取り扱いに同意します。
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="explanation"
              checked={consents.explanation}
              onCheckedChange={(checked) =>
                setConsents({ ...consents, explanation: checked as boolean })
              }
            />
            <div className="space-y-1">
              <Label
                htmlFor="explanation"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                重要事項の説明を受けました
              </Label>
              <p className="text-sm text-gray-500">
                工事に関する重要事項の説明を受け、内容を理解しました。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
