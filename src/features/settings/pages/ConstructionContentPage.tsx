import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Save } from 'lucide-react';

// 設備機器のリスト（ImportantItemDescriptionPage.tsxと同じ）
const equipmentList = [
  { id: 'system-kitchen', name: 'システムキッチン一式' },
  { id: 'built-in-stove', name: 'ビルトインコンロ (ガス・IH) 単品' },
  { id: 'dishwasher', name: '食器洗い乾燥機単品' },
  { id: 'range-hood', name: 'レンジフード単品' },
  { id: 'unit-bath', name: 'ユニットバス一式' },
  { id: 'bathroom-heater', name: '浴室暖房乾燥機単品' },
  { id: 'gas-water-heater', name: 'ガス給湯器単品' },
  { id: 'ecocute', name: 'エコキュート単品' },
  { id: 'vanity', name: '洗面化粧台一式' },
  { id: 'toilet', name: 'トイレ一式' },
  { id: 'washlet', name: '温水洗浄便座' },
  { id: 'faucet', name: '水栓金具単品' },
];

// 工事のリスト（ImportantItemDescriptionPage.tsxと同じ）
const constructionList = [
  { id: 'exterior-wall', name: '外壁工事' },
  { id: 'entrance-door-window', name: '玄関ドア・窓工事' },
  { id: 'exterior-exterior', name: '外構・エクステリア工事' },
  { id: 'waterproofing', name: '防水工事' },
  { id: 'woodwork', name: '木工事' },
  { id: 'insulation', name: '断熱工事' },
  { id: 'termite-control', name: '防蟻工事' },
  { id: 'roof-painting', name: '屋根塗装工事' },
  { id: 'ventilation', name: '換気設備工事' },
  { id: 'interior', name: '内装工事' },
  { id: 'plastering-tile', name: '左官・タイル工事' },
  { id: 'roof', name: '屋根工事' },
  { id: 'air-conditioning', name: '空調設備工事' },
  { id: 'seismic', name: '耐震工事' },
  { id: 'exterior-wall-painting', name: '外壁塗装工事' },
  { id: 'interior-joinery', name: '室内建具工事' },
  { id: 'other', name: 'その他工事(クリーニング、網戸張り替え、取っ手、鍵交換など)' },
  { id: 'foundation', name: '基礎工事' },
];

type EquipmentItem = {
  id: string;
  name: string;
  visible: boolean;
};

type ConstructionItem = {
  id: string;
  name: string;
  visible: boolean;
};

export function ConstructionContentPage() {
  const [equipmentItems, setEquipmentItems] = useState<EquipmentItem[]>(
    equipmentList.map((item) => ({
      id: item.id,
      name: item.name,
      visible: true,
    }))
  );

  const [constructionItems, setConstructionItems] = useState<ConstructionItem[]>(
    constructionList.map((item) => ({
      id: item.id,
      name: item.name,
      visible: true,
    }))
  );

  const toggleEquipmentVisibility = (id: string) => {
    setEquipmentItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const toggleConstructionVisibility = (id: string) => {
    setConstructionItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const handleSave = () => {
    // TODO: 工事内容設定保存の実装
    console.log('工事内容設定を保存:', {
      equipment: equipmentItems,
      construction: constructionItems,
    });
    // 実際の実装では、ここでAPIを呼び出す
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">工事内容設定</h2>
          <p className="text-sm text-gray-500 mt-1">
            設備機器と工事内容の表示非表示を設定します。
          </p>
        </div>
        <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
          <Save className="h-4 w-4 mr-2" />
          保存
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>設備機器（チェック）</CardTitle>
          <CardDescription>
            設備機器の表示非表示を設定します。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipmentItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-50 rounded-lg border border-gray-200"
              >
                <Checkbox
                  id={`equipment-visible-${item.id}`}
                  checked={item.visible}
                  onCheckedChange={() => toggleEquipmentVisibility(item.id)}
                  className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <label
                  htmlFor={`equipment-visible-${item.id}`}
                  className="text-sm font-normal text-gray-900 cursor-pointer flex-1"
                >
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>工事（チェック）</CardTitle>
          <CardDescription>
            工事内容の表示非表示を設定します。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {constructionItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-50 rounded-lg border border-gray-200"
              >
                <Checkbox
                  id={`construction-visible-${item.id}`}
                  checked={item.visible}
                  onCheckedChange={() => toggleConstructionVisibility(item.id)}
                  className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <label
                  htmlFor={`construction-visible-${item.id}`}
                  className="text-sm font-normal text-gray-900 cursor-pointer flex-1"
                >
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

