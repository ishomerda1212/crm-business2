import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type ConsentStepProps = {
  consentState: {
    quotation: boolean;
    constructionDate: boolean;
    paymentMethod: boolean;
  };
  onConsentChange: (state: {
    quotation: boolean;
    constructionDate: boolean;
    paymentMethod: boolean;
  }) => void;
};

export const ConsentStep = ({ consentState, onConsentChange }: ConsentStepProps) => {

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">同意事項</h1>
        <p className="mt-2 text-gray-600">
          以下の内容にご同意いただく必要があります。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>同意事項</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="quotation"
              checked={consentState.quotation}
              onCheckedChange={(checked) =>
                onConsentChange({ ...consentState, quotation: checked as boolean })
              }
            />
            <div className="space-y-1">
              <Label
                htmlFor="quotation"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                上記の見積Noに準ずる見積書の説明を受け、契約内容に相違がないことを確認しました。
              </Label>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="constructionDate"
              checked={consentState.constructionDate}
              onCheckedChange={(checked) =>
                onConsentChange({ ...consentState, constructionDate: checked as boolean })
              }
            />
            <div className="space-y-1">
              <Label
                htmlFor="constructionDate"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                工事日及び重要事項説明書に関する説明を受けました。
              </Label>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="paymentMethod"
              checked={consentState.paymentMethod}
              onCheckedChange={(checked) =>
                onConsentChange({ ...consentState, paymentMethod: checked as boolean })
              }
            />
            <div className="space-y-1">
              <Label
                htmlFor="paymentMethod"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                支払方法についての説明を受けました。
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

