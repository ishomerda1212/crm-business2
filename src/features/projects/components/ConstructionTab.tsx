import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function ConstructionTab() {
  const [equipmentItems, setEquipmentItems] = useState([
    { name: 'システムキッチンー式', checked: false, warranty: 0 },
    { name: 'ビルトインコンロ (ガス・IH) 単品', checked: false, warranty: 0 },
    { name: '食器洗い乾燥機単品', checked: false, warranty: 0 },
    { name: 'レンジフード単品', checked: false, warranty: 0 },
    { name: 'ユニットバスー式', checked: false, warranty: 0 },
    { name: '浴室暖房乾燥機単品', checked: false, warranty: 0 },
    { name: 'ガス給湯器単品', checked: false, warranty: 0 },
    { name: 'エコキュート単品', checked: false, warranty: 0 },
    { name: '洗面化粧台一式', checked: false, warranty: 0 },
    { name: 'トイレー式', checked: false, warranty: 0 },
    { name: '温水洗浄便座', checked: false, warranty: 0 },
    { name: '水栓金具単品', checked: false, warranty: 0 },
  ]);

  const handleEquipmentCheck = (index: number, checked: boolean) => {
    const updated = [...equipmentItems];
    updated[index].checked = checked;
    setEquipmentItems(updated);
  };

  const handleWarrantyChange = (index: number, value: string) => {
    const updated = [...equipmentItems];
    updated[index].warranty = parseInt(value) || 0;
    setEquipmentItems(updated);
  };

  const constructionTypes = [
    {
      category: '',
      items: [
        '外壁工事',
        '玄関ドア・窓工事',
        '外構・エクステリア工事',
        '防水工事',
        '木工事',
      ],
    },
    {
      category: '',
      items: [
        '断熱工事',
        '防蟻工事',
        '屋根塗装工事',
        '換気設備工事',
        '内装工事',
      ],
    },
    {
      category: '',
      items: [
        '左官・タイル工事',
        '屋根工事',
        '空調設備工事',
        '耐震工事',
        '外壁塗装工事',
        '室内建具工事',
        'その他工事 (クリーニング、網戸張り替え、取っ手、鍵交換など)',
        '基礎工事',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">設備機器（チェック・保証年）</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            {equipmentItems.map((item, index) => (
              <div key={item.name} className="border rounded-lg p-4">
                <div className="font-medium text-sm mb-3">{item.name}</div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={(checked) =>
                        handleEquipmentCheck(index, checked === true)
                      }
                      className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 dark:text-gray-600">保証年</span>
                    <Input
                      type="number"
                      value={item.warranty}
                      onChange={(e) => handleWarrantyChange(index, e.target.value)}
                      className="w-16 h-8 text-center"
                    />
                  </div>
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
            {constructionTypes.map((type, idx) => (
              <div key={idx}>
                {type.category && (
                  <div className="font-semibold text-sm mb-3 text-gray-700 dark:text-gray-700">
                    {type.category}
                  </div>
                )}
                <div className="space-y-2">
                  {type.items.map((item) => (
                    <label key={item} className="flex items-start gap-2 cursor-pointer">
                      <Checkbox className="mt-0.5 border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" />
                      <span className="text-sm text-gray-700 leading-tight">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">その他の保証</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" />
              <span className="text-sm">JIOリフォーム瑕疵保険</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" />
              <span className="text-sm">解体工事</span>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">保証内容</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 構造躯体 */}
            <div className="border-b pb-4">
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                構造躯体
              </Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    基礎・床・壁・屋根などの構造躯体の破損・変形
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="structural-work-yes-1" className="border-gray-300" />
                          <Label htmlFor="structural-work-yes-1" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="structural-work-no-1" className="border-gray-300" />
                          <Label htmlFor="structural-work-no-1" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="structural-warranty-yes-1" className="border-gray-300" />
                          <Label htmlFor="structural-warranty-yes-1" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="structural-warranty-no-1" className="border-gray-300" />
                          <Label htmlFor="structural-warranty-no-1" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    壁の耐震補強工事
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="structural-work-yes-2" className="border-gray-300" />
                          <Label htmlFor="structural-work-yes-2" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="structural-work-no-2" className="border-gray-300" />
                          <Label htmlFor="structural-work-no-2" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="structural-warranty-yes-2" className="border-gray-300" />
                          <Label htmlFor="structural-warranty-yes-2" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="structural-warranty-no-2" className="border-gray-300" />
                          <Label htmlFor="structural-warranty-no-2" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 雨漏り */}
            <div className="border-b pb-4">
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">雨漏り</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    雨漏り、及び雨漏りによる損傷及び陸屋根・バルコニー防水工事（JIOリフォームかし保険加入なし）
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="rain-work-yes-1" className="border-gray-300" />
                          <Label htmlFor="rain-work-yes-1" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="rain-work-no-1" className="border-gray-300" />
                          <Label htmlFor="rain-work-no-1" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="rain-warranty-yes-1" className="border-gray-300" />
                          <Label htmlFor="rain-warranty-yes-1" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="rain-warranty-no-1" className="border-gray-300" />
                          <Label htmlFor="rain-warranty-no-1" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    雨漏り、及び雨漏りによる損傷及び陸屋根・バルコニー防水工事（JIOリフォームかし保険加入あり）
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="rain-work-yes-2" className="border-gray-300" />
                          <Label htmlFor="rain-work-yes-2" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="rain-work-no-2" className="border-gray-300" />
                          <Label htmlFor="rain-work-no-2" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="rain-warranty-yes-2" className="border-gray-300" />
                          <Label htmlFor="rain-warranty-yes-2" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="rain-warranty-no-2" className="border-gray-300" />
                          <Label htmlFor="rain-warranty-no-2" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 外部仕上 */}
            <div className="border-b pb-4">
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">外部仕上</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    基礎仕上げ・土間仕上材の損傷
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="exterior-work-yes-1" className="border-gray-300" />
                          <Label htmlFor="exterior-work-yes-1" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="exterior-work-no-1" className="border-gray-300" />
                          <Label htmlFor="exterior-work-no-1" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="exterior-warranty-yes-1" className="border-gray-300" />
                          <Label htmlFor="exterior-warranty-yes-1" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="exterior-warranty-no-1" className="border-gray-300" />
                          <Label htmlFor="exterior-warranty-no-1" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    外壁仕上材・外部吹付・塗装の損傷
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="exterior-work-yes-2" className="border-gray-300" />
                          <Label htmlFor="exterior-work-yes-2" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="exterior-work-no-2" className="border-gray-300" />
                          <Label htmlFor="exterior-work-no-2" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="exterior-warranty-yes-2" className="border-gray-300" />
                          <Label htmlFor="exterior-warranty-yes-2" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="exterior-warranty-no-2" className="border-gray-300" />
                          <Label htmlFor="exterior-warranty-no-2" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    軒裏仕上材の損傷
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="exterior-work-yes-3" className="border-gray-300" />
                          <Label htmlFor="exterior-work-yes-3" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="exterior-work-no-3" className="border-gray-300" />
                          <Label htmlFor="exterior-work-no-3" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="exterior-warranty-yes-3" className="border-gray-300" />
                          <Label htmlFor="exterior-warranty-yes-3" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="exterior-warranty-no-3" className="border-gray-300" />
                          <Label htmlFor="exterior-warranty-no-3" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    屋根材・庇の損傷
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="exterior-work-yes-4" className="border-gray-300" />
                          <Label htmlFor="exterior-work-yes-4" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="exterior-work-no-4" className="border-gray-300" />
                          <Label htmlFor="exterior-work-no-4" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="exterior-warranty-yes-4" className="border-gray-300" />
                          <Label htmlFor="exterior-warranty-yes-4" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="exterior-warranty-no-4" className="border-gray-300" />
                          <Label htmlFor="exterior-warranty-no-4" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 内部仕上 */}
            <div className="border-b pb-4">
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">内部仕上</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    内部床仕上材・階段仕上材の損傷
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="interior-work-yes-1" className="border-gray-300" />
                          <Label htmlFor="interior-work-yes-1" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="interior-work-no-1" className="border-gray-300" />
                          <Label htmlFor="interior-work-no-1" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="interior-warranty-yes-1" className="border-gray-300" />
                          <Label htmlFor="interior-warranty-yes-1" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="interior-warranty-no-1" className="border-gray-300" />
                          <Label htmlFor="interior-warranty-no-1" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    内壁仕上材・内部天井材の損傷
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="interior-work-yes-2" className="border-gray-300" />
                          <Label htmlFor="interior-work-yes-2" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="interior-work-no-2" className="border-gray-300" />
                          <Label htmlFor="interior-work-no-2" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="interior-warranty-yes-2" className="border-gray-300" />
                          <Label htmlFor="interior-warranty-yes-2" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="interior-warranty-no-2" className="border-gray-300" />
                          <Label htmlFor="interior-warranty-no-2" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    内部吹付・塗装の損傷
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="interior-work-yes-3" className="border-gray-300" />
                          <Label htmlFor="interior-work-yes-3" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="interior-work-no-3" className="border-gray-300" />
                          <Label htmlFor="interior-work-no-3" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="interior-warranty-yes-3" className="border-gray-300" />
                          <Label htmlFor="interior-warranty-yes-3" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="interior-warranty-no-3" className="border-gray-300" />
                          <Label htmlFor="interior-warranty-no-3" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 外部付属部品 */}
            <div className="border-b pb-4">
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">外部付属部品</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    樋・破風・鼻かくしの損傷
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="exterior-parts-work-yes-1" className="border-gray-300" />
                          <Label htmlFor="exterior-parts-work-yes-1" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="exterior-parts-work-no-1" className="border-gray-300" />
                          <Label htmlFor="exterior-parts-work-no-1" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="exterior-parts-warranty-yes-1" className="border-gray-300" />
                          <Label htmlFor="exterior-parts-warranty-yes-1" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="exterior-parts-warranty-no-1" className="border-gray-300" />
                          <Label htmlFor="exterior-parts-warranty-no-1" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    外部建具の故障・損傷
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="exterior-parts-work-yes-2" className="border-gray-300" />
                          <Label htmlFor="exterior-parts-work-yes-2" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="exterior-parts-work-no-2" className="border-gray-300" />
                          <Label htmlFor="exterior-parts-work-no-2" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="exterior-parts-warranty-yes-2" className="border-gray-300" />
                          <Label htmlFor="exterior-parts-warranty-yes-2" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="exterior-parts-warranty-no-2" className="border-gray-300" />
                          <Label htmlFor="exterior-parts-warranty-no-2" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    外部造作材・取付部品類の損傷
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="exterior-parts-work-yes-3" className="border-gray-300" />
                          <Label htmlFor="exterior-parts-work-yes-3" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="exterior-parts-work-no-3" className="border-gray-300" />
                          <Label htmlFor="exterior-parts-work-no-3" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="exterior-parts-warranty-yes-3" className="border-gray-300" />
                          <Label htmlFor="exterior-parts-warranty-yes-3" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="exterior-parts-warranty-no-3" className="border-gray-300" />
                          <Label htmlFor="exterior-parts-warranty-no-3" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 内部付属部品 */}
            <div className="border-b pb-4">
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">内部付属部品</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    内部建具の故障・損傷
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="interior-parts-work-yes-1" className="border-gray-300" />
                          <Label htmlFor="interior-parts-work-yes-1" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="interior-parts-work-no-1" className="border-gray-300" />
                          <Label htmlFor="interior-parts-work-no-1" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="interior-parts-warranty-yes-1" className="border-gray-300" />
                          <Label htmlFor="interior-parts-warranty-yes-1" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="interior-parts-warranty-no-1" className="border-gray-300" />
                          <Label htmlFor="interior-parts-warranty-no-1" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    内部造作材の損傷
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="interior-parts-work-yes-2" className="border-gray-300" />
                          <Label htmlFor="interior-parts-work-yes-2" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="interior-parts-work-no-2" className="border-gray-300" />
                          <Label htmlFor="interior-parts-work-no-2" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="interior-parts-warranty-yes-2" className="border-gray-300" />
                          <Label htmlFor="interior-parts-warranty-yes-2" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="interior-parts-warranty-no-2" className="border-gray-300" />
                          <Label htmlFor="interior-parts-warranty-no-2" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    収納家具・戸棚などの故障・損傷
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="interior-parts-work-yes-3" className="border-gray-300" />
                          <Label htmlFor="interior-parts-work-yes-3" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="interior-parts-work-no-3" className="border-gray-300" />
                          <Label htmlFor="interior-parts-work-no-3" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="interior-parts-warranty-yes-3" className="border-gray-300" />
                          <Label htmlFor="interior-parts-warranty-yes-3" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="interior-parts-warranty-no-3" className="border-gray-300" />
                          <Label htmlFor="interior-parts-warranty-no-3" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 設備 */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">設備</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    電気配線工事
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="equipment-work-yes-1" className="border-gray-300" />
                          <Label htmlFor="equipment-work-yes-1" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="equipment-work-no-1" className="border-gray-300" />
                          <Label htmlFor="equipment-work-no-1" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="equipment-warranty-yes-1" className="border-gray-300" />
                          <Label htmlFor="equipment-warranty-yes-1" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="equipment-warranty-no-1" className="border-gray-300" />
                          <Label htmlFor="equipment-warranty-no-1" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    ガス工事
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="equipment-work-yes-2" className="border-gray-300" />
                          <Label htmlFor="equipment-work-yes-2" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="equipment-work-no-2" className="border-gray-300" />
                          <Label htmlFor="equipment-work-no-2" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="equipment-warranty-yes-2" className="border-gray-300" />
                          <Label htmlFor="equipment-warranty-yes-2" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="equipment-warranty-no-2" className="border-gray-300" />
                          <Label htmlFor="equipment-warranty-no-2" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-600 flex-1">
                    給排水衛生設備工事
                  </p>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">工事</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="equipment-work-yes-3" className="border-gray-300" />
                          <Label htmlFor="equipment-work-yes-3" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="equipment-work-no-3" className="border-gray-300" />
                          <Label htmlFor="equipment-work-no-3" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">保証</span>
                      <RadioGroup defaultValue="無" className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="有" id="equipment-warranty-yes-3" className="border-gray-300" />
                          <Label htmlFor="equipment-warranty-yes-3" className="text-xs cursor-pointer">有</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="無" id="equipment-warranty-no-3" className="border-gray-300" />
                          <Label htmlFor="equipment-warranty-no-3" className="text-xs cursor-pointer">無</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
