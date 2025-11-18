import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export const ConstructionDetailsStep = () => {
  const [equipmentItems, setEquipmentItems] = useState([
    { name: 'システムキッチン一式', checked: false },
    { name: 'ビルトインコンロ (ガス・IH) 単品', checked: false },
    { name: '食器洗い乾燥機単品', checked: false },
    { name: 'レンジフード単品', checked: false },
    { name: 'ユニットバス一式', checked: false },
    { name: '浴室暖房乾燥機単品', checked: false },
    { name: 'ガス給湯器単品', checked: false },
    { name: 'エコキュート単品', checked: false },
    { name: '洗面化粧台一式', checked: false },
    { name: 'トイレ一式', checked: false },
    { name: '温水洗浄便座', checked: false },
    { name: '水栓金具単品', checked: false },
  ]);

  const handleEquipmentCheck = (index: number, checked: boolean) => {
    const updated = [...equipmentItems];
    updated[index].checked = checked;
    setEquipmentItems(updated);
  };

  // 画像の順序に合わせて3列に配置（各列6項目ずつ）
  const constructionTypes = [
    // 1列目
    '外壁工事',
    '玄関ドア・窓工事',
    '外構・エクステリア工事',
    '防水工事',
    '木工事',
    '断熱工事',
    // 2列目
    '防蟻工事',
    '屋根塗装工事',
    '換気設備工事',
    '内装工事',
    '左官・タイル工事',
    '屋根工事',
    // 3列目
    '空調設備工事',
    '耐震工事',
    '外壁塗装工事',
    '室内建具工事',
    'その他工事 (クリーニング、網戸張り替え、取っ手、鍵交換など)',
    '基礎工事',
  ];

  const [constructionItems, setConstructionItems] = useState(
    constructionTypes.map((name) => ({ name, checked: false }))
  );

  const handleConstructionCheck = (index: number, checked: boolean) => {
    const updated = [...constructionItems];
    updated[index].checked = checked;
    setConstructionItems(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">工事内容のご確認</h1>
        <p className="mt-2 text-gray-600">
          工事内容と費用の詳細をご確認ください。
        </p>
      </div>

      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">設備機器（チェック）</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            {equipmentItems.map((item, index) => (
              <div key={item.name} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={item.checked}
                    onCheckedChange={(checked) =>
                      handleEquipmentCheck(index, checked === true)
                    }
                    className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <span className="text-sm text-gray-700 font-medium">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">工事（チェック）</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-8">
            {[0, 1, 2].map((colIndex) => (
              <div key={colIndex}>
                <div className="space-y-2">
                  {constructionItems
                    .filter((_, idx) => Math.floor(idx / 6) === colIndex)
                    .map((item, relativeIndex) => {
                      const absoluteIndex = colIndex * 6 + relativeIndex;
                      return (
                        <label
                          key={item.name}
                          className="flex items-start gap-2 cursor-pointer"
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={(checked) =>
                              handleConstructionCheck(absoluteIndex, checked === true)
                            }
                            className="mt-0.5 border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                          />
                          <span className="text-sm text-gray-700 leading-tight">
                            {item.name}
                          </span>
                        </label>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
