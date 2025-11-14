import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type ConsentStepProps = {
  consentState: boolean;
  onConsentChange: (consent: boolean) => void;
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
              id="change-consent"
              checked={consentState}
              onCheckedChange={(checked) =>
                onConsentChange(checked as boolean)
              }
            />
            <div className="space-y-1">
              <Label
                htmlFor="change-consent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                上記の変更に関する説明を受け、請負契約内容の変更に同意します。
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

