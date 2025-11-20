import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export const ImpressionsStep = () => {
  const [lifeRating, setLifeRating] = useState<Rating>('');
  const [lifeComments, setLifeComments] = useState('');
  const [satisfactionRating, setSatisfactionRating] = useState<Rating>('');
  const [nextTime, setNextTime] = useState<'yes' | 'no' | ''>('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">実際にお住まいになってのご感想</h1>
      </div>

      {/* リフォーム後の生活 */}
      <Card>
        <CardHeader>
          <CardTitle>リフォーム後の生活</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 1. リフォーム後の生活（実際の使い勝手） */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-gray-900">
              リフォーム後の生活（実際の使い勝手）はいかがですか？
            </Label>
            <RadioGroup
              value={lifeRating}
              onValueChange={(value) => setLifeRating(value as Rating)}
              className="space-y-2"
            >
              {ratingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`life-rating-${option.value}`} />
                  <Label
                    htmlFor={`life-rating-${option.value}`}
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
              ご意見をお聞かせください
            </Label>
            <Textarea
              value={lifeComments}
              onChange={(e) => setLifeComments(e.target.value)}
              placeholder="ご意見・ご感想をご記入ください"
              className="min-h-[100px] resize-y"
            />
          </div>
        </CardContent>
      </Card>

      {/* イズホームのリフォームへの満足度と今後の意向 */}
      <Card>
        <CardHeader>
          <CardTitle>イズホームのリフォームへの満足度と今後の意向</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 1. イズホームのリフォームにご満足いただけましたか */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-gray-900">
              イズホームのリフォームにご満足いただけましたでしょうか？
            </Label>
            <RadioGroup
              value={satisfactionRating}
              onValueChange={(value) => setSatisfactionRating(value as Rating)}
              className="space-y-2"
            >
              {ratingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`satisfaction-rating-${option.value}`} />
                  <Label
                    htmlFor={`satisfaction-rating-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* 2. 次回もイズホームでリフォームをしたいと思いますか */}
          <div className="space-y-3 pt-4 border-t">
            <Label className="text-base font-medium text-gray-900">
              次回もイズホームでリフォームをしたいと思いますか？
            </Label>
            <RadioGroup
              value={nextTime}
              onValueChange={(value) => setNextTime(value as 'yes' | 'no')}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="next-time-yes" />
                <Label htmlFor="next-time-yes" className="text-sm font-normal cursor-pointer">
                  はい
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="next-time-no" />
                <Label htmlFor="next-time-no" className="text-sm font-normal cursor-pointer">
                  いいえ
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
