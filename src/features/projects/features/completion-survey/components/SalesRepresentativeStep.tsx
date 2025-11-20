import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

type Rating = 'very-satisfied' | 'satisfied' | 'neutral' | 'slightly-dissatisfied' | 'dissatisfied' | '';

const ratingOptions = [
  { value: 'very-satisfied', label: '大変満足' },
  { value: 'satisfied', label: '満足' },
  { value: 'neutral', label: '普通' },
  { value: 'slightly-dissatisfied', label: 'やや不満' },
  { value: 'dissatisfied', label: '不満' },
];

export const SalesRepresentativeStep = () => {
  const [ratings, setRatings] = useState<Record<string, Rating>>({
    productExplanation: '',
    quotationExplanation: '',
    siteOrganization: '',
    handoverExplanation: '',
    constructionFinish: '',
    overall: '',
  });
  const [comments, setComments] = useState('');

  const handleRatingChange = (questionId: string, value: Rating) => {
    setRatings((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">営業担当者について</h1>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* 1. 商品説明や間取り・デザイン等の提案 */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-gray-900">
              1. 担当者からの商品説明や間取り・デザイン等の提案はいかがでしたか？
            </Label>
            <RadioGroup
              value={ratings.productExplanation}
              onValueChange={(value) => handleRatingChange('productExplanation', value as Rating)}
              className="space-y-2"
            >
              {ratingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`product-explanation-${option.value}`} />
                  <Label
                    htmlFor={`product-explanation-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* 2. 見積書の説明 */}
          <div className="space-y-3 pt-4 border-t">
            <Label className="text-base font-medium text-gray-900">
              2. 見積書の説明はわかりやすかったですか？
            </Label>
            <RadioGroup
              value={ratings.quotationExplanation}
              onValueChange={(value) => handleRatingChange('quotationExplanation', value as Rating)}
              className="space-y-2"
            >
              {ratingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`quotation-explanation-${option.value}`} />
                  <Label
                    htmlFor={`quotation-explanation-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* 3. 現場の整理整頓・掃除・近隣への配慮 */}
          <div className="space-y-3 pt-4 border-t">
            <Label className="text-base font-medium text-gray-900">
              3. 現場の整理整頓・掃除・近隣への配慮はできていましたか？
            </Label>
            <RadioGroup
              value={ratings.siteOrganization}
              onValueChange={(value) => handleRatingChange('siteOrganization', value as Rating)}
              className="space-y-2"
            >
              {ratingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`site-organization-${option.value}`} />
                  <Label
                    htmlFor={`site-organization-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* 4. 引き渡し時の取扱い説明やお手入れ方法の説明 */}
          <div className="space-y-3 pt-4 border-t">
            <Label className="text-base font-medium text-gray-900">
              4. 引き渡し時に取扱い説明やお手入れ方法の説明はありましたか？
            </Label>
            <RadioGroup
              value={ratings.handoverExplanation}
              onValueChange={(value) => handleRatingChange('handoverExplanation', value as Rating)}
              className="space-y-2"
            >
              {ratingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`handover-explanation-${option.value}`} />
                  <Label
                    htmlFor={`handover-explanation-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* 5. 工事の仕上がり具合 */}
          <div className="space-y-3 pt-4 border-t">
            <Label className="text-base font-medium text-gray-900">
              5. 工事の仕上がり具合はいかがでしたか？
            </Label>
            <RadioGroup
              value={ratings.constructionFinish}
              onValueChange={(value) => handleRatingChange('constructionFinish', value as Rating)}
              className="space-y-2"
            >
              {ratingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`construction-finish-${option.value}`} />
                  <Label
                    htmlFor={`construction-finish-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* 6. 営業担当者の総合的な評価 */}
          <div className="space-y-3 pt-4 border-t">
            <Label className="text-base font-medium text-gray-900">
              6. 営業担当者の総合的な評価をください
            </Label>
            <RadioGroup
              value={ratings.overall}
              onValueChange={(value) => handleRatingChange('overall', value as Rating)}
              className="space-y-2"
            >
              {ratingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`overall-${option.value}`} />
                  <Label
                    htmlFor={`overall-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* コメント欄 */}
          <div className="space-y-2 pt-4 border-t">
            <Label className="text-base font-medium text-gray-900">
              ●ご意見をお聞かせください
            </Label>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="ご意見・ご感想をご記入ください"
              className="min-h-[100px] resize-y"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
