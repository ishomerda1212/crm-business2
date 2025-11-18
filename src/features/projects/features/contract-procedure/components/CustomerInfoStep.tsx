import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { mockCustomer } from '@/data/mockData';
import { mockPropertyInfo } from '@/data/mockData';

export const CustomerInfoStep = () => {
  const customer = mockCustomer;
  const propertyInfo = mockPropertyInfo;

  // 現住所のフォーマット
  const currentAddress = customer.current_postal_code && customer.current_prefecture && customer.current_address
    ? `〒${customer.current_postal_code}\n${customer.current_prefecture}${customer.current_address}`
    : '-';

  // 工事住所のフォーマット
  const constructionAddress = propertyInfo.construction_postal_code && propertyInfo.construction_prefecture && propertyInfo.construction_address
    ? `〒${propertyInfo.construction_postal_code}\n${propertyInfo.construction_prefecture}${propertyInfo.construction_address}`
    : '-';

  // 建物所有者のフォーマット
  const buildingOwner = propertyInfo.building_owner_type === '本人'
    ? '本人'
    : propertyInfo.building_owner_type && propertyInfo.building_owner_name
    ? `${propertyInfo.building_owner_type}（${propertyInfo.building_owner_name}${propertyInfo.building_owner_relationship ? `・${propertyInfo.building_owner_relationship}` : ''}）`
    : '-';

  // 土地所有者のフォーマット
  const landOwner = propertyInfo.land_owner_type === '本人'
    ? '本人'
    : propertyInfo.land_owner_type && propertyInfo.land_owner_name
    ? `${propertyInfo.land_owner_type}（${propertyInfo.land_owner_name}${propertyInfo.land_owner_relationship ? `・${propertyInfo.land_owner_relationship}` : ''}）`
    : '-';

  // 郵送先住所（現住所と同じと仮定）
  const mailingAddress = currentAddress;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">お客様情報のご確認</h1>
        <p className="mt-2 text-gray-600">
          ご登録いただいたお客様情報に誤りがないかご確認ください。
        </p>
      </div>

      {/* お客様情報 */}
      <Card>
        <CardHeader>
          <CardTitle>〈お客様情報〉</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-500 text-sm">お名前</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {customer.customer_name || '-'}
            </p>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">フリガナ</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {customer.furigana || '-'}
            </p>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">現住所</Label>
            <p className="mt-1 text-gray-900 font-medium whitespace-pre-line">
              {currentAddress}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 工事住所 */}
      <Card>
        <CardHeader>
          <CardTitle>〈工事住所〉</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-500 text-sm">工事住所</Label>
            <p className="mt-1 text-gray-900 font-medium whitespace-pre-line">
              {constructionAddress}
            </p>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">建物所有者</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {buildingOwner}
            </p>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">土地所有者</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {landOwner}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 連絡先 */}
      <Card>
        <CardHeader>
          <CardTitle>〈連絡先〉</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-500 text-sm">郵送先住所</Label>
            <p className="mt-1 text-gray-900 font-medium whitespace-pre-line">
              {mailingAddress}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 text-sm">メールアドレス１</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {customer.email1 || '-'}
              </p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">メールアドレス２</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {customer.email2 || '-'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 text-sm">携帯番号１</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {customer.phone1 || '-'}
              </p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">携帯番号２</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {customer.phone2 || '-'}
              </p>
            </div>
          </div>

          <div>
            <Label className="text-gray-500 text-sm">自宅番号</Label>
            <p className="mt-1 text-gray-900 font-medium">
              -
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
