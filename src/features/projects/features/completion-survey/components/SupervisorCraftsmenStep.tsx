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

export const SupervisorCraftsmenStep = () => {
  const [supervisorRatings, setSupervisorRatings] = useState<Record<string, Rating>>({
    constructionManagement: '',
    siteOrganization: '',
    constructionFinish: '',
    overall: '',
  });
  const [supervisorComments, setSupervisorComments] = useState('');

  const [craftsmenRatings, setCraftsmenRatings] = useState<Record<string, Rating>>({
    greetingsManners: '',
    overall: '',
  });
  const [craftsmenComments, setCraftsmenComments] = useState('');

  const handleSupervisorRatingChange = (questionId: string, value: Rating) => {
    setSupervisorRatings((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCraftsmenRatingChange = (questionId: string, value: Rating) => {
    setCraftsmenRatings((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">現場監督・職人の対応について</h1>
      </div>

      {/* 現場監督・職人の対応について */}
      <Card>
        <CardHeader>
          <CardTitle>現場監督・職人の対応について</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 1. 現場監督の施工管理 */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-gray-900">
              1. 現場監督の施工管理は安心できましたか？
            </Label>
            <RadioGroup
              value={supervisorRatings.constructionManagement}
              onValueChange={(value) => handleSupervisorRatingChange('constructionManagement', value as Rating)}
              className="space-y-2"
            >
              {ratingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`construction-management-${option.value}`} />
                  <Label
                    htmlFor={`construction-management-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* 2. 現場の整理整頓・掃除・近隣への配慮 */}
          <div className="space-y-3 pt-4 border-t">
            <Label className="text-base font-medium text-gray-900">
              2. 現場の整理整頓・掃除・近隣への配慮はできていましたか？
            </Label>
            <RadioGroup
              value={supervisorRatings.siteOrganization}
              onValueChange={(value) => handleSupervisorRatingChange('siteOrganization', value as Rating)}
              className="space-y-2"
            >
              {ratingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`supervisor-site-organization-${option.value}`} />
                  <Label
                    htmlFor={`supervisor-site-organization-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* 3. 工事の仕上がり具合 */}
          <div className="space-y-3 pt-4 border-t">
            <Label className="text-base font-medium text-gray-900">
              3. 工事の仕上がり具合はいかがでしたか？
            </Label>
            <RadioGroup
              value={supervisorRatings.constructionFinish}
              onValueChange={(value) => handleSupervisorRatingChange('constructionFinish', value as Rating)}
              className="space-y-2"
            >
              {ratingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`supervisor-construction-finish-${option.value}`} />
                  <Label
                    htmlFor={`supervisor-construction-finish-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* 4. 現場監督の総合的な評価 */}
          <div className="space-y-3 pt-4 border-t">
            <Label className="text-base font-medium text-gray-900">
              4. 現場監督の総合的な評価をください
            </Label>
            <RadioGroup
              value={supervisorRatings.overall}
              onValueChange={(value) => handleSupervisorRatingChange('overall', value as Rating)}
              className="space-y-2"
            >
              {ratingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`supervisor-overall-${option.value}`} />
                  <Label
                    htmlFor={`supervisor-overall-${option.value}`}
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
              value={supervisorComments}
              onChange={(e) => setSupervisorComments(e.target.value)}
              placeholder="ご意見・ご感想をご記入ください"
              className="min-h-[100px] resize-y"
            />
          </div>
        </CardContent>
      </Card>

      {/* 職人の挨拶・マナーについて */}
      <Card>
        <CardHeader>
          <CardTitle>職人の挨拶・マナーについて</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 1. 職人の挨拶・マナー */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-gray-900">
              1. 職人の挨拶・マナーはいかがでしたか？
            </Label>
            <RadioGroup
              value={craftsmenRatings.greetingsManners}
              onValueChange={(value) => handleCraftsmenRatingChange('greetingsManners', value as Rating)}
              className="space-y-2"
            >
              {ratingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`greetings-manners-${option.value}`} />
                  <Label
                    htmlFor={`greetings-manners-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* 2. 職人の総合的な評価 */}
          <div className="space-y-3 pt-4 border-t">
            <Label className="text-base font-medium text-gray-900">
              2. 職人の総合的な評価をください
            </Label>
            <RadioGroup
              value={craftsmenRatings.overall}
              onValueChange={(value) => handleCraftsmenRatingChange('overall', value as Rating)}
              className="space-y-2"
            >
              {ratingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`craftsmen-overall-${option.value}`} />
                  <Label
                    htmlFor={`craftsmen-overall-${option.value}`}
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
              value={craftsmenComments}
              onChange={(e) => setCraftsmenComments(e.target.value)}
              placeholder="ご意見・ご感想をご記入ください"
              className="min-h-[100px] resize-y"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
