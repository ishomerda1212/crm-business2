import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
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
  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">顧客情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">顧客種別</Label>
                <p className="mt-1 font-medium">
                  {customer?.customer_type || '-'}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">顧客名</Label>
                <p className="mt-1 font-medium text-orange-600">
                  {customer?.customer_name || '-'}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">フリガナ</Label>
                <p className="mt-1 font-medium">
                  {customer?.furigana || 'タナカ タロウ'}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">電話番号１</Label>
                <p className="mt-1 font-medium">{customer?.phone1 || '090-1234-5678'}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">電話番号２</Label>
                <p className="mt-1 font-medium">{customer?.phone2 || '-'}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">メール１</Label>
                <p className="mt-1 font-medium text-blue-600">
                  {customer?.email1 || 'tanaka@example.com'}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">メール２</Label>
                <p className="mt-1 font-medium">{customer?.email2 || '-'}</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-base font-semibold mb-4">現住所情報</h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                <div>
                  <Label className="text-sm text-gray-600 dark:text-gray-600">現住所物件種別</Label>
                  <p className="mt-1 font-medium">
                    {customer?.current_property_type || '-'}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600 dark:text-gray-600">郵便番号</Label>
                  <p className="mt-1 font-medium">
                    {customer?.current_postal_code || '-'}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600 dark:text-gray-600">都道府県</Label>
                  <p className="mt-1 font-medium">
                    {customer?.current_prefecture || '-'}
                  </p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm text-gray-600 dark:text-gray-600">住所</Label>
                  <p className="mt-1 font-medium">
                    {customer?.current_address || '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">法人情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">法人名</Label>
              <p className="mt-1 font-medium">
                {corporateInfo?.corporate_name || '株式会社スプスホーム'}
              </p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">代表者所名</Label>
              <p className="mt-1 font-medium">
                {corporateInfo?.representative_title || '代表取締役'}
              </p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">代表者氏名</Label>
              <p className="mt-1 font-medium">
                {corporateInfo?.representative_name || '佐藤 健'}
              </p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">窓口担当者名名</Label>
              <p className="mt-1 font-medium">
                {corporateInfo?.contact_person_title || '窓口担当者名'}
              </p>
            </div>
            <div className="col-span-2">
              <Label className="text-sm text-gray-600 dark:text-gray-600">担当者</Label>
              <p className="mt-1 font-medium">
                {corporateInfo?.contact_person_name || '鈴木 花子'}
              </p>
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
                <Label className="text-sm text-gray-600 dark:text-gray-600">郵便番号</Label>
                <p className="mt-1 font-medium">
                  {propertyInfo?.construction_postal_code || '-'}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">都道府県</Label>
                <p className="mt-1 font-medium">
                  {propertyInfo?.construction_prefecture || '-'}
                </p>
              </div>
              <div className="col-span-2">
                <Label className="text-sm text-gray-600 dark:text-gray-600">住所</Label>
                <p className="mt-1 font-medium">
                  {propertyInfo?.construction_address || '-'}
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
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">顧客詳細</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
