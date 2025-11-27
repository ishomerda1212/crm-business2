import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Customer, CorporateInfo, PropertyInfo } from '@/lib/supabase';

type CustomerInfoTabProps = {
  customer: Customer | null;
  corporateInfo: CorporateInfo | null;
  propertyInfo: PropertyInfo | null;
};

export function CustomerInfoTab({
  customer,
  corporateInfo,
  propertyInfo,
}: CustomerInfoTabProps) {
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [isRenovationHistoryOpen, setIsRenovationHistoryOpen] = useState(false);
  const [isConstructionDetailsOpen, setIsConstructionDetailsOpen] = useState(false);

  // 西暦の選択肢を生成（1950年から現在年まで）
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">顧客情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* 顧客種別：個人 */}
            <div>
              <h3 className="text-base font-semibold mb-4">〈顧客種別：個人〉</h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                <div>
                  <Label className="text-sm text-gray-600 dark:text-gray-600">顧客名</Label>
                  <p className="mt-1 font-medium text-orange-600">
                    {customer?.customer_name || '-'}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600 dark:text-gray-600">フリガナ</Label>
                  <p className="mt-1 font-medium">
                    {customer?.furigana || '-'}
                  </p>
                </div>
              </div>
            </div>

            {/* 顧客種別：法人 */}
            <div>
              <h3 className="text-base font-semibold mb-4">〈顧客種別：法人〉</h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                <div>
                  <Label className="text-sm text-gray-600 dark:text-gray-600">法人名</Label>
                  <p className="mt-1 font-medium">
                    {corporateInfo?.corporate_name || '-'}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600 dark:text-gray-600">代表者名</Label>
                  <p className="mt-1 font-medium">
                    {corporateInfo?.representative_title && corporateInfo?.representative_name
                      ? `${corporateInfo.representative_title} ${corporateInfo.representative_name}`
                      : corporateInfo?.representative_name || '-'}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600 dark:text-gray-600">窓口担当者名</Label>
                  <p className="mt-1 font-medium">
                    {corporateInfo?.contact_person_name || '-'}
                  </p>
                </div>
              </div>
            </div>

            {/* 連絡先 */}
            <div className="border-t pt-6">
              <h3 className="text-base font-semibold mb-4">〈連絡先〉</h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                <div>
                  <Label className="text-sm text-gray-600 dark:text-gray-600">電話番号１</Label>
                  <p className="mt-1 font-medium">{customer?.phone1 || '-'}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600 dark:text-gray-600">電話番号２</Label>
                  <p className="mt-1 font-medium">{customer?.phone2 || '-'}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600 dark:text-gray-600">メールアドレス１</Label>
                  <p className="mt-1 font-medium text-blue-600">
                    {customer?.email1 || '-'}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600 dark:text-gray-600">メールアドレス２</Label>
                  <p className="mt-1 font-medium">{customer?.email2 || '-'}</p>
                </div>
              </div>
            </div>

            {/* 現住所 */}
            <div className="border-t pt-6">
              <h3 className="text-base font-semibold mb-4">〈現住所〉</h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                <div>
                  <Label className="text-sm text-gray-600 dark:text-gray-600">物件種別</Label>
                  <p className="mt-1 font-medium">
                    {customer?.current_property_type || '-'}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600 dark:text-gray-600">住所</Label>
                  <p className="mt-1 font-medium">
                    {(() => {
                      const parts = [];
                      if (customer?.current_postal_code) parts.push(customer.current_postal_code);
                      if (customer?.current_prefecture) parts.push(customer.current_prefecture);
                      if (customer?.current_address) parts.push(customer.current_address);
                      return parts.length > 0 ? parts.join(' ') : '-';
                    })()}
                  </p>
                </div>
              </div>
            </div>

            {/* 顧客詳細（折り畳み） */}
            <div className="border-t pt-6">
              <Collapsible open={isCustomerDetailsOpen} onOpenChange={setIsCustomerDetailsOpen}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-0 h-auto font-semibold text-base hover:bg-transparent"
                  >
                    <span>顧客詳細</span>
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isCustomerDetailsOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-6">
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">職業</Label>
                      <p className="mt-1 font-medium">{customer?.occupation || '-'}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">世帯年収</Label>
                      <p className="mt-1 font-medium">{customer?.household_income || '-'}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">仕事の休み</Label>
                      <p className="mt-1 font-medium">{customer?.work_holiday || '-'}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">大人人数</Label>
                      <p className="mt-1 font-medium">
                        {typeof customer?.adult_count === 'number' ? `${customer.adult_count}人` : '-'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">子供人数</Label>
                      <p className="mt-1 font-medium">
                        {typeof customer?.child_count === 'number' ? `${customer.child_count}人` : '-'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">同居者構成</Label>
                      <p className="mt-1 font-medium">{customer?.cohabitant_structure || '-'}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">ペット</Label>
                      <p className="mt-1 font-medium">{customer?.pets || '-'}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 dark:text-gray-600">来客頻度</Label>
                      <p className="mt-1 font-medium">{customer?.visitor_frequency || '-'}</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">工事住所情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">工事住所物件種別</Label>
                <p className="mt-1 font-medium">
                  {propertyInfo?.construction_property_type || '-'}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">住所</Label>
                <p className="mt-1 font-medium">
                  {(() => {
                    const parts = [];
                    if (propertyInfo?.construction_postal_code) parts.push(propertyInfo.construction_postal_code);
                    if (propertyInfo?.construction_prefecture) parts.push(propertyInfo.construction_prefecture);
                    if (propertyInfo?.construction_address) parts.push(propertyInfo.construction_address);
                    return parts.length > 0 ? parts.join(' ') : '-';
                  })()}
                </p>
              </div>
            </div>

            <div className="border-t pt-6 space-y-6">
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600 mb-3 block">建物所有者</Label>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-6">
                    {['本人', '親族', '賃貸'].map((option) => (
                      <div key={option} className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center">
                          {propertyInfo?.building_owner_type === option && (
                            <div className="h-2 w-2 rounded-full bg-orange-500" />
                          )}
                        </div>
                        <span className="text-sm">{option}</span>
                      </div>
                    ))}
                  </div>
                  {(propertyInfo?.building_owner_type === '親族' || propertyInfo?.building_owner_type === '賃貸') && (
                    <div className="grid grid-cols-2 gap-x-12 gap-y-4 mt-4">
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">所有者名</Label>
                        <p className="mt-1 font-medium">
                          {propertyInfo?.building_owner_name || '-'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">続柄</Label>
                        <p className="mt-1 font-medium">
                          {propertyInfo?.building_owner_relationship || '-'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600 mb-3 block">土地所有者</Label>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-6">
                    {['本人', '親族', '賃貸'].map((option) => (
                      <div key={option} className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center">
                          {propertyInfo?.land_owner_type === option && (
                            <div className="h-2 w-2 rounded-full bg-orange-500" />
                          )}
                        </div>
                        <span className="text-sm">{option}</span>
                      </div>
                    ))}
                  </div>
                  {(propertyInfo?.land_owner_type === '親族' || propertyInfo?.land_owner_type === '賃貸') && (
                    <div className="grid grid-cols-2 gap-x-12 gap-y-4 mt-4">
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">所有者名</Label>
                        <p className="mt-1 font-medium">
                          {propertyInfo?.land_owner_name || '-'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">続柄</Label>
                        <p className="mt-1 font-medium">
                          {propertyInfo?.land_owner_relationship || '-'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">建築年（西暦）</Label>
                <p className="mt-1 font-medium">
                  {propertyInfo?.building_age || '2000'}
                </p>
              </div>

              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">郵送先ご住所</Label>
                <div className="mt-2 flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="construction-mailing-address" className="text-orange-500" />
                    <span className="text-sm">現住所</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="construction-mailing-address" className="text-orange-500" />
                    <span className="text-sm">工事住所</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="construction-mailing-address" className="text-orange-500" />
                    <span className="text-sm">リフォーム前は現住所でリフォーム後は現場住所</span>
                  </label>
                </div>
              </div>

              {/* リフォーム歴（折り畳み） */}
              <div className="border-t pt-6">
                <Collapsible open={isRenovationHistoryOpen} onOpenChange={setIsRenovationHistoryOpen}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-0 h-auto font-semibold text-base hover:bg-transparent"
                    >
                      <span>リフォーム歴</span>
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isRenovationHistoryOpen ? 'transform rotate-180' : ''
                        }`}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-6">
                    <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">キッチン</Label>
                        <Select
                          value={propertyInfo?.renovation_kitchen_year?.toString() || ''}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="西暦を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">ユニットバス</Label>
                        <Select
                          value={propertyInfo?.renovation_unit_bath_year?.toString() || ''}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="西暦を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">洗面</Label>
                        <Select
                          value={propertyInfo?.renovation_washstand_year?.toString() || ''}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="西暦を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">給湯器</Label>
                        <Select
                          value={propertyInfo?.renovation_water_heater_year?.toString() || ''}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="西暦を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">トイレ</Label>
                        <Select
                          value={propertyInfo?.renovation_toilet_year?.toString() || ''}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="西暦を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              {/* 工事住所詳細（折り畳み） */}
              <div className="border-t pt-6">
                <Collapsible open={isConstructionDetailsOpen} onOpenChange={setIsConstructionDetailsOpen}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-0 h-auto font-semibold text-base hover:bg-transparent"
                    >
                      <span>工事住所詳細</span>
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isConstructionDetailsOpen ? 'transform rotate-180' : ''
                        }`}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-6">
                    <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">構造</Label>
                        <p className="mt-1 font-medium">
                          {propertyInfo?.construction_structure || '-'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">間取り</Label>
                        <p className="mt-1 font-medium">
                          {propertyInfo?.construction_layout || '-'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">面積（延床面積/土地面積）</Label>
                        <p className="mt-1 font-medium">
                          {propertyInfo?.construction_floor_area || propertyInfo?.construction_land_area
                            ? `${propertyInfo.construction_floor_area || '-'}㎡ / ${propertyInfo.construction_land_area || '-'}㎡`
                            : '-'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">建物図面有無</Label>
                        <p className="mt-1 font-medium">
                          {propertyInfo?.construction_has_building_plan === true
                            ? '有'
                            : propertyInfo?.construction_has_building_plan === false
                            ? '無'
                            : '-'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">リフォーム歴有無</Label>
                        <p className="mt-1 font-medium">
                          {propertyInfo?.construction_has_renovation_history === true
                            ? '有'
                            : propertyInfo?.construction_has_renovation_history === false
                            ? '無'
                            : '-'}
                        </p>
                      </div>
                      {propertyInfo?.construction_has_renovation_history && (
                        <div className="col-span-2">
                          <Label className="text-sm text-gray-600 dark:text-gray-600">リフォーム歴内容</Label>
                          <p className="mt-1 font-medium">
                            {propertyInfo?.construction_renovation_history_content || '-'}
                          </p>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
