import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

type WarrantyItem = {
  id: string;
  label: string;
  work: '有' | '無';
  warranty: '有' | '無';
  warrantyPeriod: string;
  warrantyDetails: string;
};

type WarrantyCategory = {
  title: string;
  items: WarrantyItem[];
};

export const WarrantyStep = () => {
  const [warrantyData, setWarrantyData] = useState<WarrantyCategory[]>([
    {
      title: '構造躯体',
      items: [
        {
          id: 'structural-frame-damage',
          label: '基礎・床・壁・屋根などの構造躯体の破損・変形',
          work: '無',
          warranty: '無',
          warrantyPeriod: '5年',
          warrantyDetails:
            '(1) 基礎・床・壁・屋根の著しい構造上の亀裂・破損、たわみ\n(2) 建物全体もしくは床・壁における各部位の著しい傾き\n(3) 柱・梁の著しい破損・たわみ・ねじれ\n(4) 屋内の給排水機能に著しい支障を生じさせる建物の破損・変形\n(5) 建具の開開が困難で調整不能を伴う建具の変形',
        },
        {
          id: 'seismic-reinforcement',
          label: '壁の耐震補強工事',
          work: '無',
          warranty: '無',
          warrantyPeriod: '10年',
          warrantyDetails: '著しい構造破損・折れ・傾き',
        },
      ],
    },
    {
      title: '雨漏り',
      items: [
        {
          id: 'rain-leakage-no-insurance',
          label: '雨漏り、及び雨漏りによる損傷及び陸屋根・バルコニー防水工事 (JIOリフォームかし保険加入なし)',
          work: '無',
          warranty: '無',
          warrantyPeriod: '2年',
          warrantyDetails:
            '(1) 屋根・外壁・外壁開口部の取合部よりの屋内への雨漏り及び雨漏りによる室内仕上面の汚損',
        },
        {
          id: 'rain-leakage-with-insurance',
          label: '雨漏り、及び雨漏りによる損傷及び陸屋根・バルコニー防水工事 (JIOリフォームかし保険加入あり)',
          work: '無',
          warranty: '無',
          warrantyPeriod: '5年',
          warrantyDetails: '(2) 雨漏りによる構造体の著しい損傷',
        },
      ],
    },
    {
      title: '外部仕上',
      items: [
        {
          id: 'foundation-finish',
          label: '基礎仕上げ・土間仕上材の損傷',
          work: '無',
          warranty: '無',
          warrantyPeriod: '2年',
          warrantyDetails:
            '(1) 基礎仕上げの著しい損傷・剥れ\n(2) ポーチ・テラスなどの土間仕上材の著しい割れ・肌分れ・沈下',
        },
        {
          id: 'exterior-wall-finish',
          label: '外壁仕上材・外部吹付・塗装の損傷',
          work: '無',
          warranty: '無',
          warrantyPeriod: '5年',
          warrantyDetails:
            '外壁仕上材・吹付部・塗装面の著しい割れ・落下・変形・剥れ',
        },
        {
          id: 'soffit-finish',
          label: '軒裏仕上材の損傷',
          work: '無',
          warranty: '無',
          warrantyPeriod: '2年',
          warrantyDetails:
            '軒裏仕上材の著しい剥れ・下がり・落下・変形・割れ',
        },
        {
          id: 'roofing-materials',
          label: '屋根材・庇の損傷',
          work: '無',
          warranty: '無',
          warrantyPeriod: '5年',
          warrantyDetails:
            '(1) 屋根葺材・屋根役物・水切などの著しい割れ・ずれ・剥れ\n(2) 庇の著しい変形・破損',
        },
      ],
    },
    {
      title: '内部仕上',
      items: [
        {
          id: 'interior-floor-finish',
          label: '内部床仕上材・階段仕上材の損傷',
          work: '無',
          warranty: '無',
          warrantyPeriod: '2年',
          warrantyDetails:
            '(1) 床仕上材の著しい反り・破傷・浮き・剥れ・きしみ\n(2) 階段仕上材の著しい反り・破損・浮き・剥れ・割れ・きしみ',
        },
        {
          id: 'interior-wall-ceiling',
          label: '内壁仕上材・内部天井材の損傷',
          work: '無',
          warranty: '無',
          warrantyPeriod: '2年',
          warrantyDetails:
            '(1) 内部仕上材の著しい変形・剥れ・割れ\n(2) 天井材の著しい変形・下がり・剥れ・割れ',
        },
        {
          id: 'interior-coating',
          label: '内部吹付・塗装の損傷',
          work: '無',
          warranty: '無',
          warrantyPeriod: '2年',
          warrantyDetails:
            '(1) 内部吹付部の著しい自華・剥れ・割れ\n(2) 塗装面の著しい白華・剥れ・割れ',
        },
      ],
    },
    {
      title: '外部付属部品',
      items: [
        {
          id: 'gutter-damage',
          label: '樋・破風・鼻かくしの損傷',
          work: '無',
          warranty: '無',
          warrantyPeriod: '2年',
          warrantyDetails:
            '(1) 樋及び金物の著しい変形・破損・はずれ\n(2) 破風・鼻かくしの著しい変形・破損・はずれ',
        },
        {
          id: 'exterior-fittings',
          label: '外部建具の故障・損傷',
          work: '無',
          warranty: '無',
          warrantyPeriod: '2年',
          warrantyDetails:
            '(1) サッシ・嵌殺し窓・ガラスルーバー・玄関ドア・勝手口ドア・シャッター・雨戸など建具の著しい反り・建付不良・開閉不良・施錠不良及び部品類の故障\n(2) 複層ガラスの層内のくもり',
        },
        {
          id: 'exterior-joinery',
          label: '外部造作材・取付部品類の損傷',
          work: '無',
          warranty: '無',
          warrantyPeriod: '2年',
          warrantyDetails:
            'フラワーボックス・バルコニー・サンデッキ・面格子・シャッターボックス・換気口などの著しい変形・反り・破傷・取付ゆるみ・割れ',
        },
      ],
    },
    {
      title: '内部付属部品',
      items: [
        {
          id: 'interior-fittings',
          label: '内部建具の故障・損傷',
          work: '無',
          warranty: '無',
          warrantyPeriod: '2年',
          warrantyDetails:
            '室内ドア・襖・障子・戸襖・吊戸・折戸・などの建具の著しい反り・建付不良・開閉不良・施錠不良、部品類の故障',
        },
        {
          id: 'interior-joinery',
          label: '内部造作材の損傷',
          work: '無',
          warranty: '無',
          warrantyPeriod: '2年',
          warrantyDetails:
            '階段・開口部枠・巾木・廻り縁・長押・上り框・床の間などの造作材の著しい変形・剥れ・割れ及びラワン虫 (ヒラタキクイムシ)の蝕害',
        },
        {
          id: 'storage-furniture',
          label: '収納家具・戸棚などの故障・損傷',
          work: '無',
          warranty: '無',
          warrantyPeriod: '2年',
          warrantyDetails:
            '下駄箱・吊戸棚・収納家具・アンダーキャビネット(洗面・厨房セットなど)・床下収納庫・カーテンレールの著しい反り・変形・割れ・開閉不良及びラワン虫(ヒラタキクイムシ)の蝕害',
        },
      ],
    },
    {
      title: '設備',
      items: [
        {
          id: 'electrical-wiring',
          label: '電気配線工事',
          work: '無',
          warranty: '無',
          warrantyPeriod: '2年',
          warrantyDetails:
            '室内電気配線など各種配線・配管・断線・接続不良・破損・分電盤・スイッチ・コンセント・照明器具・換気扇など電気器具・機器の取付不良・作動不良・破損',
        },
        {
          id: 'gas-work',
          label: 'ガス工事',
          work: '無',
          warranty: '無',
          warrantyPeriod: '2年',
          warrantyDetails:
            'ガス風呂釜・組入式ガスコンロなどの、取付不良・作動不良・破損',
        },
        {
          id: 'plumbing',
          label: '給排水衛生設備工事',
          work: '無',
          warranty: '無',
          warrantyPeriod: '2年',
          warrantyDetails:
            '(1) 給排水管・バルブ類・水栓金具・排水金物の接続不良・取付不良・作動不良・破損\n(2) 排気、換気ダクトの、接続不良・取付不良・破損\n(3) 浴室からの一時的な漏水による室内仕上面の著しい汚損\n(4) 給排水管からの一時的な漏水による室内仕上面の著しい汚損\n(5) システムキッチン・洗面化粧合・浴槽・防水パン・便器・ロータンク・温水洗浄便座など厨房・衛生器具の取付不良・作動不良・破損',
        },
      ],
    },
  ]);

  const updateWarrantyItem = (
    categoryIndex: number,
    itemIndex: number,
    field: 'work' | 'warranty',
    value: '有' | '無'
  ) => {
    setWarrantyData((prev) => {
      const updated = [...prev];
      updated[categoryIndex] = {
        ...updated[categoryIndex],
        items: [...updated[categoryIndex].items],
      };
      updated[categoryIndex].items[itemIndex] = {
        ...updated[categoryIndex].items[itemIndex],
        [field]: value,
      };
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">保証内容</h1>
      </div>

      <div className="space-y-6">
        {warrantyData.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <CardHeader>
              <CardTitle className="text-lg">{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {category.items.map((item, itemIndex) => (
                  <div key={item.id} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-medium text-gray-900 flex-1">
                        {item.label}
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">
                          保証期間: {item.warrantyPeriod}
                        </span>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              type="button"
                            >
                              <HelpCircle className="h-4 w-4 text-gray-500" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>保証事項</DialogTitle>
                              <DialogDescription className="text-base text-gray-900 mt-2">
                                <div className="space-y-2">
                                  <p className="font-medium">{item.label}</p>
                                  <div className="whitespace-pre-line text-sm text-gray-700">
                                    {item.warrantyDetails}
                                  </div>
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs text-gray-600">工事</Label>
                        <RadioGroup
                          value={item.work}
                          onValueChange={(value) =>
                            updateWarrantyItem(
                              categoryIndex,
                              itemIndex,
                              'work',
                              value as '有' | '無'
                            )
                          }
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="有"
                              id={`${item.id}-work-有`}
                              className="border-orange-500 text-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                            />
                            <Label
                              htmlFor={`${item.id}-work-有`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              有
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="無"
                              id={`${item.id}-work-無`}
                              className="border-orange-500 text-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                            />
                            <Label
                              htmlFor={`${item.id}-work-無`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              無
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-gray-600">保証</Label>
                        <RadioGroup
                          value={item.warranty}
                          onValueChange={(value) =>
                            updateWarrantyItem(
                              categoryIndex,
                              itemIndex,
                              'warranty',
                              value as '有' | '無'
                            )
                          }
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="有"
                              id={`${item.id}-warranty-有`}
                              className="border-orange-500 text-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                            />
                            <Label
                              htmlFor={`${item.id}-warranty-有`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              有
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="無"
                              id={`${item.id}-warranty-無`}
                              className="border-orange-500 text-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                            />
                            <Label
                              htmlFor={`${item.id}-warranty-無`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              無
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">注意事項</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-medium">注1.</span>{' '}
              本保証書における「構造躯体」とは、建物本体を構成する基礎・床・壁・屋根から、仕上げ材(下地材を含む)・付属部品・設備を除いた部分をいいます。
            </p>
            <p>
              <span className="font-medium">注2.</span>{' '}
              本証書における「著しい」とは、本来持つべき機能・性能を有しない場合であって、通常修理が必要と思われる程度をいいます。
            </p>
            <p>
              <span className="font-medium">注3.</span>{' '}
              素材本来の特性に起因するもので、使用上特に障害のないものは除きます。
            </p>
            <p>
              <span className="font-medium">注4.</span>{' '}
              併用住宅の店舗部分、住宅以外の用途に用いる部分に起因する瑕疵は保証対象外となります。
            </p>
            <p>
              <span className="font-medium">注5.</span>{' '}
              住宅及び賃貸住宅に用いる部分に関しては、保証対象となります。
            </p>
            <p>
              <span className="font-medium">注6.</span>{' '}
              建具・収納家具・戸棚などの取付金具の調整は、通常の場合注文者が行う維持管理とします。
            </p>
            <p>
              <span className="font-medium">注7.</span>{' '}
              電気・ガス・水道についての保証は供給体の定めによる。又ガス配管についてはガス事業法によります。
            </p>
            <p>
              <span className="font-medium">注8.</span>{' '}
              設備機器において保証事項に明記されていないもの及び別途製造メーカーの保証書が発行されているものは、製造メーカーの定めによる保証期間とします。(メーカー商品の特性によるもの、もしくはリコール対象商品はメーカーの対処・対応マニュアルに準じます。)
            </p>
            <p>
              <span className="font-medium">注9.</span>{' '}
              マンション等、施工区域内で解決出来ないウォーターハンマーは無くす事が出来ない場合があります。
            </p>
            <p>
              <span className="font-medium">注10.</span>{' '}
              設備機器においてリレー回路を有する電装部品(リモコン・ホームコンピュータの子機・マグネットリレーなど)及び付帯部品(五徳・ツマミ・汁受けなど)の保証期間は1年とします。
            </p>
            <p>
              <span className="font-medium">注11.</span>{' '}
              屋根・防水・塗装工事について、別途メーカーの保証がつくものは、その期間の保証とします。(5年・10年等)
            </p>
            <p>
              <span className="font-medium">注12.</span>{' '}
              保証対象は、その項目に。印が書き加えられている工事のみとなります。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
