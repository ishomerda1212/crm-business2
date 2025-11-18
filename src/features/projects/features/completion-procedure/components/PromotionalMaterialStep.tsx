import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

export const PromotionalMaterialStep = () => {
  const [consentType, setConsentType] = useState<string>('all');
  const [partialOptions, setPartialOptions] = useState({
    comments: false,
    indoorOnly: false,
    includingOutdoor: false,
    selfPortraitAndVideo: false,
  });

  const handlePartialOptionChange = (key: keyof typeof partialOptions, checked: boolean) => {
    setPartialOptions((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">販促物のお願い</h1>
        <p className="mt-2 text-gray-600">
          弊社の販促物への写真掲載について、ご協力いただける範囲をご選択ください。
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold">
                弊社の販促物(展示会場・冊子・ホームページ・セミナーなど)への写真の掲載について、ご協力いただける範囲をご選択ください。
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={consentType}
            onValueChange={setConsentType}
            className="space-y-4"
          >
            <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <RadioGroupItem
                value="all"
                id="all"
                className="mt-0.5"
              />
              <Label
                htmlFor="all"
                className="flex-1 cursor-pointer font-medium text-gray-900"
              >
                全て可
              </Label>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem
                  value="partial"
                  id="partial"
                  className="mt-0.5"
                />
                <Label
                  htmlFor="partial"
                  className="flex-1 cursor-pointer font-medium text-gray-900"
                >
                  一部可
                </Label>
              </div>

              {consentType === 'partial' && (
                <div className="ml-8 space-y-3 pl-4 border-l-2 border-gray-200">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="comments"
                      checked={partialOptions.comments}
                      onCheckedChange={(checked) =>
                        handlePartialOptionChange('comments', checked === true)
                      }
                      className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                    />
                    <Label
                      htmlFor="comments"
                      className="cursor-pointer text-gray-700"
                    >
                      コメント
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="indoor-only"
                      checked={partialOptions.indoorOnly}
                      onCheckedChange={(checked) =>
                        handlePartialOptionChange('indoorOnly', checked === true)
                      }
                      className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                    />
                    <Label
                      htmlFor="indoor-only"
                      className="cursor-pointer text-gray-700"
                    >
                      室内写真のみ
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="including-outdoor"
                      checked={partialOptions.includingOutdoor}
                      onCheckedChange={(checked) =>
                        handlePartialOptionChange('includingOutdoor', checked === true)
                      }
                      className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                    />
                    <Label
                      htmlFor="including-outdoor"
                      className="cursor-pointer text-gray-700"
                    >
                      屋外含む写真
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="self-portrait-video"
                      checked={partialOptions.selfPortraitAndVideo}
                      onCheckedChange={(checked) =>
                        handlePartialOptionChange('selfPortraitAndVideo', checked === true)
                      }
                      className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                    />
                    <Label
                      htmlFor="self-portrait-video"
                      className="cursor-pointer text-gray-700"
                    >
                      自画像及び動画
                    </Label>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <RadioGroupItem
                value="none"
                id="none"
                className="mt-0.5"
              />
              <Label
                htmlFor="none"
                className="flex-1 cursor-pointer font-medium text-gray-900"
              >
                全て不可
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};

