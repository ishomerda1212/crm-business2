import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

type EquipmentItem = {
  id: string;
  label: string;
  checked: boolean;
};

type ConstructionItem = {
  id: string;
  label: string;
  checked: boolean;
};

export const ConstructionConfirmStep = () => {
  const [equipmentItems, setEquipmentItems] = useState<EquipmentItem[]>([
    { id: 'system-kitchen', label: 'システムキッチン一式', checked: false },
    { id: 'built-in-stove', label: 'ビルトインコンロ (ガス・IH) 単品', checked: false },
    { id: 'dishwasher', label: '食器洗い乾燥機単品', checked: false },
    { id: 'range-hood', label: 'レンジフード単品', checked: false },
    { id: 'unit-bath', label: 'ユニットバス一式', checked: false },
    { id: 'bath-heater', label: '浴室暖房乾燥機単品', checked: false },
    { id: 'gas-water-heater', label: 'ガス給湯器単品', checked: false },
    { id: 'ecoCute', label: 'エコキュート単品', checked: false },
    { id: 'vanity', label: '洗面化粧台一式', checked: false },
    { id: 'toilet', label: 'トイレ一式', checked: false },
    { id: 'washlet', label: '温水洗浄便座', checked: false },
    { id: 'faucet', label: '水栓金具単品', checked: false },
  ]);

  const [constructionItems, setConstructionItems] = useState<ConstructionItem[]>([
    { id: 'exterior-wall', label: '外壁工事', checked: false },
    { id: 'entrance-door-window', label: '玄関ドア・窓工事', checked: false },
    { id: 'exterior-exterior', label: '外構・エクステリア工事', checked: false },
    { id: 'waterproofing', label: '防水工事', checked: false },
    { id: 'woodwork', label: '木工事', checked: false },
    { id: 'insulation', label: '断熱工事', checked: false },
    { id: 'termite-control', label: '防蟻工事', checked: false },
    { id: 'roof-painting', label: '屋根塗装工事', checked: false },
    { id: 'ventilation', label: '換気設備工事', checked: false },
    { id: 'interior', label: '内装工事', checked: false },
    { id: 'plastering-tile', label: '左官・タイル工事', checked: false },
    { id: 'roof', label: '屋根工事', checked: false },
    { id: 'air-conditioning', label: '空調設備工事', checked: false },
    { id: 'seismic', label: '耐震工事', checked: false },
    { id: 'exterior-wall-painting', label: '外壁塗装工事', checked: false },
    { id: 'interior-joinery', label: '室内建具工事', checked: false },
    {
      id: 'other',
      label: 'その他工事(クリーニング、網戸張り替え、取っ手、鍵交換など)',
      checked: false,
    },
    { id: 'foundation', label: '基礎工事', checked: false },
  ]);

  const [hasRemainingWork, setHasRemainingWork] = useState<string>('なし');
  const [remainingWorkContent, setRemainingWorkContent] = useState<string>('');
  const [agreed, setAgreed] = useState<boolean>(false);

  const toggleEquipmentItem = (id: string) => {
    setEquipmentItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const toggleConstructionItem = (id: string) => {
    setConstructionItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">工事完了確認</h1>
        <p className="mt-2 text-gray-600">
          工事が完了いたしました。施工内容をご確認ください。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>設備機器 (チェック)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipmentItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <Checkbox
                  id={item.id}
                  checked={item.checked}
                  onCheckedChange={() => toggleEquipmentItem(item.id)}
                  className="border-gray-400 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <Label
                  htmlFor={item.id}
                  className="text-sm font-normal text-gray-900 cursor-pointer flex-1"
                >
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>工事 (チェック)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {constructionItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <Checkbox
                  id={item.id}
                  checked={item.checked}
                  onCheckedChange={() => toggleConstructionItem(item.id)}
                  className="border-gray-400 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <Label
                  htmlFor={item.id}
                  className="text-sm font-normal text-gray-900 cursor-pointer flex-1"
                >
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>残工事</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-900">残工事の有無</Label>
            <RadioGroup
              value={hasRemainingWork}
              onValueChange={setHasRemainingWork}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="あり"
                  id="remaining-work-yes"
                  className="border-orange-500 text-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <Label
                  htmlFor="remaining-work-yes"
                  className="text-sm font-normal cursor-pointer"
                >
                  あり
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="なし"
                  id="remaining-work-no"
                  className="border-orange-500 text-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <Label
                  htmlFor="remaining-work-no"
                  className="text-sm font-normal cursor-pointer"
                >
                  なし
                </Label>
              </div>
            </RadioGroup>
          </div>

          {hasRemainingWork === 'あり' && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">残工事の内容</Label>
              <Textarea
                placeholder="残工事の内容を入力してください"
                value={remainingWorkContent}
                onChange={(e) => setRemainingWorkContent(e.target.value)}
                className="min-h-[100px] resize-y"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Checkbox
              id="agreement"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              className="border-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
            />
            <Label
              htmlFor="agreement"
              className="text-sm font-normal text-gray-900 cursor-pointer"
            >
              工事の内容及び商品の取扱い説明を受けました
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
