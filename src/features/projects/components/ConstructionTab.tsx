import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export function ConstructionTab() {
  const equipmentItems = [
    { name: 'システムキチーン式', count: 0, warranty: 0 },
    { name: 'レンジフード建品', count: 0, warranty: 0 },
    { name: '片油器建建品', count: 0, warranty: 0 },
    { name: 'トイレ式', count: 0, warranty: 0 },
    { name: 'ビルトインコンロ（ガス小）単品', count: 0, warranty: 0 },
    { name: 'エコキューまー式', count: 0, warranty: 0 },
    { name: 'エコキュート建品', count: 0, warranty: 0 },
    { name: '混合水浄浄面面', count: 0, warranty: 0 },
  ];

  const equipmentItems2 = [
    { name: '食器洗い破棄機単品', count: 0, warranty: 0 },
    { name: '建常医院常機単品', count: 0, warranty: 0 },
    { name: '洗面化粧低一式', count: 0, warranty: 0 },
    { name: '水舎金具単品', count: 0, warranty: 0 },
    { name: '外装給建一式', count: 0, warranty: 0 },
  ];

  const constructionTypes = [
    { category: '外装工事', items: ['天関り・壁工事', '外療・エクステリア工事', '外々工事', '不工事'] },
    { category: '内装工事', items: ['内装工事', '整選認主工事', '玄関区紫建工事'] },
    {
      category: '生活・サわかル工事',
      items: ['壁体工事', '空間認主工事', 'その他工事（リリーング ,廃平認与続, 吊,上主,造関など）', '建出工事'],
    },
    { category: '', items: ['内壁工事'] },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">設備機器（台数・保証年）</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            {equipmentItems.map((item) => (
              <div key={item.name} className="border rounded-lg p-4">
                <div className="font-medium text-sm mb-3">{item.name}</div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 dark:text-gray-600">台数</span>
                    <Input
                      type="number"
                      value={item.count}
                      className="w-16 h-8 text-center"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 dark:text-gray-600">保証年</span>
                    <Input
                      type="number"
                      value={item.warranty}
                      className="w-16 h-8 text-center"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 mt-6">
            {equipmentItems2.map((item) => (
              <div key={item.name} className="border rounded-lg p-4">
                <div className="font-medium text-sm mb-3">{item.name}</div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 dark:text-gray-600">台数</span>
                    <Input
                      type="number"
                      value={item.count}
                      className="w-16 h-8 text-center"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 dark:text-gray-600">保証年</span>
                    <Input
                      type="number"
                      value={item.warranty}
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
          <div className="grid grid-cols-4 gap-8">
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

          <div className="mt-6 text-xs text-gray-500 dark:text-gray-500">
            ※補助土事側面目面田型側面品,表更定区定区正しく入力してください。
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
            <div className="border-b pb-4">
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                構造部分
              </Label>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-600">
                  壁型・中置・墓等ならびの瑕疵保証(その他等-本等)
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm">工事</span>
                  <div className="flex items-center gap-2">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                    <span className="text-xs">有</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                    <span className="text-xs">無</span>
                  </div>
                  <span className="text-sm">保証</span>
                  <div className="flex items-center gap-2">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                    <span className="text-xs">有</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                    <span className="text-xs">無</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-600">室の任意国壁工事</p>
                <div className="flex items-center gap-4">
                  <span className="text-sm">工事</span>
                  <div className="flex items-center gap-2">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                    <span className="text-xs">有</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                    <span className="text-xs">無</span>
                  </div>
                  <span className="text-sm">保証</span>
                  <div className="flex items-center gap-2">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                    <span className="text-xs">有</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                    <span className="text-xs">無</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b pb-4">
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">雨漏り</Label>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-600">
                  雨漏り,及び屋面にによる漏水文の従漏文,外/コーニ降水工事,川/リフォーム心産漏取り込い
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm">工事</span>
                  <div className="flex items-center gap-2">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                    <span className="text-xs">有</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                    <span className="text-xs">無</span>
                  </div>
                  <span className="text-sm">保証</span>
                  <div className="flex items-center gap-2">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                    <span className="text-xs">有</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                    <span className="text-xs">無</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-600">
                  雨漏り,及び屋面にによる漏水文の従漏文,外/コーニ降水工事,川/リフォーム心産漏取り入り
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm">工事</span>
                  <div className="flex items-center gap-2">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                    <span className="text-xs">有</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                    <span className="text-xs">無</span>
                  </div>
                  <span className="text-sm">保証</span>
                  <div className="flex items-center gap-2">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                    <span className="text-xs">有</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-orange-500" />
                    <span className="text-xs">無</span>
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
