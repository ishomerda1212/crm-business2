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
                {customer?.furigana || 'タナカ タロウ'}
              </p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">物件番号</Label>
              <p className="mt-1 font-medium">{customer?.property_number || 'mansion'}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">住所形式</Label>
              <p className="mt-1 font-medium">一般住宅</p>
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
          <CardTitle className="text-lg font-semibold">物件情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">住所番号</Label>
                <p className="mt-1 font-medium">
                  {propertyInfo?.property_number || 'mansion'}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">物件名</Label>
                <p className="mt-1 font-medium text-orange-600">
                  {propertyInfo?.property_name || '田中様様'}
                </p>
              </div>
              <div className="col-span-2">
                <Label className="text-sm text-gray-600 dark:text-gray-600">住所</Label>
                <p className="mt-1 font-medium">
                  {propertyInfo?.address || '東京都中央区東京3-1-1-1'}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">建効</Label>
                <p className="mt-1 font-medium">
                  {propertyInfo?.building_type || 'mansion'}
                </p>
              </div>
            </div>

            <div>
              <Label className="text-sm text-gray-600 mb-3 block">建物所有者</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <input type="radio" id="owner1" name="owner" className="text-orange-500" />
                    <label htmlFor="owner1" className="text-sm">本人</label>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-600">その他</span>
                    <input
                      type="text"
                      className="border-b border-gray-300 px-2 py-1 text-sm w-48 focus:border-orange-500 focus:outline-none"
                      placeholder="続柄"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-600">所有者</span>
                    <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:border-orange-500 focus:outline-none">
                      <option>両親</option>
                      <option>配偶者</option>
                      <option>親族</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-600">建業</span>
                    <span className="text-sm">本部</span>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <input type="radio" id="owner2" name="owner" className="text-orange-500" />
                    <label htmlFor="owner2" className="text-sm">本人</label>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-600">その他</span>
                    <input
                      type="text"
                      className="border-b border-gray-300 px-2 py-1 text-sm w-48 focus:border-orange-500 focus:outline-none"
                      placeholder="続柄"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-600">所有者</span>
                    <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:border-orange-500 focus:outline-none">
                      <option>両親</option>
                      <option>配偶者</option>
                      <option>親族</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-600">建業</span>
                    <span className="text-sm">本部</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-12">
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">経過:その他の詳細</Label>
                <p className="mt-1 text-sm">-</p>
              </div>
            </div>

            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">建築年（医院）</Label>
              <p className="mt-1 font-medium">
                {propertyInfo?.building_age || '2000'}
              </p>
            </div>

            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">構造生性質</Label>
              <div className="mt-2 flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="structure" className="text-orange-500" />
                  <span className="text-sm">こ在外</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="structure" className="text-orange-500" />
                  <span className="text-sm">呼場応力</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="structure" className="text-orange-500" />
                  <span className="text-sm">リフォーム町式定全宅フレーム&主賃整老企</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
