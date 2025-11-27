import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { PropertyInfo } from '@/lib/supabase';
import { mockPropertyInfo } from '@/data/mockData';

type PropertyDetailPageProps = {
  propertyId: string;
  onBack: () => void;
};

export function PropertyDetailPage({ propertyId, onBack }: PropertyDetailPageProps) {
  const [property] = useState<PropertyInfo | null>(mockPropertyInfo);
  const [isRenovationHistoryOpen, setIsRenovationHistoryOpen] = useState(false);
  const [isConstructionDetailOpen, setIsConstructionDetailOpen] = useState(false);

  // TODO: propertyIdに基づいて実際のデータを取得
  useEffect(() => {
    // 将来的にAPIからデータを取得する処理を追加
  }, [propertyId]);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-600">物件が見つかりません</div>
      </div>
    );
  }

  const formatAddress = () => {
    if (property.construction_postal_code && property.construction_prefecture && property.construction_address) {
      return `${property.construction_postal_code} ${property.construction_prefecture} ${property.construction_address}`;
    }
    return property.construction_address || '-';
  };

  const formatArea = () => {
    const floorArea = property.construction_floor_area ? `${property.construction_floor_area}㎡` : '-';
    const landArea = property.construction_land_area ? `${property.construction_land_area}㎡` : '-';
    return `${floorArea} / ${landArea}`;
  };

  const formatYear = (year: number | null) => {
    if (year === null) return '西暦を選択';
    return `${year}年`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 w-full overflow-x-hidden">
      {/* ヘッダー */}
      <div className="bg-white dark:bg-white border-b dark:border-gray-200 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-gray-600 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              戻る
            </Button>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-900 mb-2">
              物件詳細
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-600">物件情報の詳細を表示</p>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        <div className="space-y-6">
          {/* 工事住所情報 */}
          <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">工事住所情報</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                  <div>
                    <Label className="text-sm text-gray-600 dark:text-gray-600">工事住所物件種別</Label>
                    <p className="mt-1 text-base">
                      {property.construction_property_type || '-'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 dark:text-gray-600">住所</Label>
                    <p className="mt-1 text-base">
                      {formatAddress()}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <Label className="text-sm text-gray-600 dark:text-gray-600 mb-3 block">建物所有者</Label>
                  <RadioGroup value={property.building_owner_type || undefined} disabled>
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="本人" id="building-owner-self" />
                        <Label htmlFor="building-owner-self" className="font-normal cursor-pointer">
                          本人
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="親族" id="building-owner-relative" />
                        <Label htmlFor="building-owner-relative" className="font-normal cursor-pointer">
                          親族
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="賃貸" id="building-owner-rental" />
                        <Label htmlFor="building-owner-rental" className="font-normal cursor-pointer">
                          賃貸
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <Label className="text-sm text-gray-600 dark:text-gray-600 mb-3 block">土地所有者</Label>
                  <RadioGroup value={property.land_owner_type || undefined} disabled>
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="本人" id="land-owner-self" />
                        <Label htmlFor="land-owner-self" className="font-normal cursor-pointer">
                          本人
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="親族" id="land-owner-relative" />
                        <Label htmlFor="land-owner-relative" className="font-normal cursor-pointer">
                          親族
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="賃貸" id="land-owner-rental" />
                        <Label htmlFor="land-owner-rental" className="font-normal cursor-pointer">
                          賃貸
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 border-t border-gray-200 pt-6">
                  <div>
                    <Label className="text-sm text-gray-600 dark:text-gray-600">所有者名</Label>
                    <p className="mt-1 text-base">
                      {property.building_owner_name || property.land_owner_name || '-'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 dark:text-gray-600">続柄</Label>
                    <p className="mt-1 text-base">
                      {property.building_owner_relationship || property.land_owner_relationship || '-'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 dark:text-gray-600">建築年(西暦)</Label>
                    <p className="mt-1 text-base">
                      {property.building_age ? `${property.building_age}年` : '-'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 dark:text-gray-600">郵送先ご住所</Label>
                    <RadioGroup value="現住所" disabled>
                      <div className="flex gap-6 mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="現住所" id="mailing-current" />
                          <Label htmlFor="mailing-current" className="font-normal cursor-pointer">
                            現住所
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="工事住所" id="mailing-construction" />
                          <Label htmlFor="mailing-construction" className="font-normal cursor-pointer">
                            工事住所
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="リフォーム前は現住所でリフォーム後は現場住所" id="mailing-both" />
                          <Label htmlFor="mailing-both" className="font-normal cursor-pointer text-xs">
                            リフォーム前は現住所でリフォーム後は現場住所
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* リフォーム歴（折りたたみ可能） */}
          <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
            <Collapsible open={isRenovationHistoryOpen} onOpenChange={setIsRenovationHistoryOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">リフォーム歴</CardTitle>
                    {isRenovationHistoryOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">キッチン</Label>
                      <p className="mt-1 text-base">
                        {formatYear(property.renovation_kitchen_year)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">ユニットバス</Label>
                      <p className="mt-1 text-base">
                        {formatYear(property.renovation_unit_bath_year)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">洗面</Label>
                      <p className="mt-1 text-base">
                        {formatYear(property.renovation_washstand_year)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">給湯器</Label>
                      <p className="mt-1 text-base">
                        {formatYear(property.renovation_water_heater_year)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">トイレ</Label>
                      <p className="mt-1 text-base">
                        {formatYear(property.renovation_toilet_year)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* 工事住所詳細（折りたたみ可能） */}
          <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
            <Collapsible open={isConstructionDetailOpen} onOpenChange={setIsConstructionDetailOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">工事住所詳細</CardTitle>
                    {isConstructionDetailOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">構造</Label>
                      <p className="mt-1 text-base">
                        {property.construction_structure || '-'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">間取り</Label>
                      <p className="mt-1 text-base">
                        {property.construction_layout || '-'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">面積(延床面積/土地面積)</Label>
                      <p className="mt-1 text-base">
                        {formatArea()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">建物図面有無</Label>
                      <p className="mt-1 text-base">
                        {property.construction_has_building_plan === true ? '有' : property.construction_has_building_plan === false ? '無' : '-'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">リフォーム歴有無</Label>
                      <p className="mt-1 text-base">
                        {property.construction_has_renovation_history === true ? '有' : property.construction_has_renovation_history === false ? '無' : '-'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>
      </div>
    </div>
  );
}

