import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Home, Building, Building2, LucideIcon } from 'lucide-react';

interface ZipcloudResponse {
  message: string | null;
  results: Array<{
    zipcode: string;
    address1: string; // prefecture
    address2: string; // city
    address3: string; // town
  }> | null;
  status: number;
}

type PropertyType = 'singleFamily' | 'multiUnit' | 'office';
type OwnerType = '本人' | '親族' | '賃貸';

interface ConstructionAddressFormData {
  propertyType: PropertyType | null;
  postalCode: string;
  prefecture: string;
  city: string;
  town: string;
  addressLine: string;
  building: string;
  room: string;
  buildingOwner: OwnerType | null;
  landOwner: OwnerType | null;
}

const propertyOptions: Array<{
  value: PropertyType;
  label: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    value: 'singleFamily',
    label: '戸建住宅',
    description: '持ち家・注文住宅・中古戸建てなど',
    icon: Home,
  },
  {
    value: 'multiUnit',
    label: '集合住宅',
    description: 'マンション・アパート・共有住宅など',
    icon: Building,
  },
  {
    value: 'office',
    label: 'オフィス・店舗など',
    description: '事務所・店舗・施設・事業用物件など',
    icon: Building2,
  },
];

const ownerOptions: Array<{ value: OwnerType; label: string }> = [
  { value: '本人', label: 'ご本人' },
  { value: '親族', label: '親族' },
  { value: '賃貸', label: '賃貸' },
];

type ConstructionAddressFormPageProps = {
  onBack?: () => void;
  onSubmit?: (data: ConstructionAddressFormData) => void;
};

export function ConstructionAddressFormPage({ onBack, onSubmit }: ConstructionAddressFormPageProps) {
  const [formData, setFormData] = useState<ConstructionAddressFormData>({
    propertyType: null,
    postalCode: '',
    prefecture: '',
    city: '',
    town: '',
    addressLine: '',
    building: '',
    room: '',
    buildingOwner: null,
    landOwner: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof ConstructionAddressFormData) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handlePropertyTypeChange = (value: PropertyType) => {
    setFormData((prev) => ({
      ...prev,
      propertyType: value,
    }));
  };

  const handleOwnerChange = (field: 'buildingOwner' | 'landOwner') => (value: OwnerType) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const fetchAddress = async () => {
    if (formData.postalCode.trim().length < 7) {
      setError('郵便番号は7桁で入力してください（ハイフン不要）');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${formData.postalCode}`);
      const result = (await response.json()) as ZipcloudResponse;

      if (result.status !== 200 || !result.results || result.results.length === 0) {
        setError(result.message ?? '住所情報が見つかりませんでした');
        return;
      }

      const [firstMatch] = result.results;
      setFormData((prev) => ({
        ...prev,
        prefecture: firstMatch.address1 ?? '',
        city: firstMatch.address2 ?? '',
        town: firstMatch.address3 ?? '',
      }));
    } catch (err) {
      console.error(err);
      setError('住所情報の取得に失敗しました。時間を置いて再度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    onSubmit?.(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 w-full overflow-x-hidden">
      {/* ヘッダー */}
      <div className="bg-white dark:bg-white border-b dark:border-gray-200 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {onBack && (
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-gray-600 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-900"
              >
                戻る
              </Button>
            </div>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-900 mb-2">
              工事住所登録
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-600">
              工事住所をご入力ください（工事住所は工事を行うご住所です）
            </p>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
          <CardContent className="pt-6">
            <div className="space-y-8">
              {/* 工事住所物件種別 */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">工事住所物件種別</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {propertyOptions.map(({ value, label, description, icon: Icon }) => {
                    const isSelected = formData.propertyType === value;
                    return (
                      <button
                        type="button"
                        key={value}
                        onClick={() => handlePropertyTypeChange(value)}
                        className={`relative flex items-start space-x-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left hover:shadow-md ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 bg-white hover:border-orange-200'
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                            選択中
                          </span>
                        )}
                        <div
                          className={`p-3 rounded-xl ${
                            isSelected ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          <Icon className="w-7 h-7" strokeWidth={1.5} />
                        </div>
                        <div className="space-y-1">
                          <p className={`text-base font-semibold ${isSelected ? 'text-orange-600' : 'text-gray-800'}`}>
                            {label}
                          </p>
                          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 住所入力 */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="postalCode">郵便番号（ハイフン不要）</Label>
                    <div className="relative">
                      <Input
                        id="postalCode"
                        type="text"
                        value={formData.postalCode}
                        onChange={handleChange('postalCode')}
                        placeholder="例) 5300001"
                        maxLength={7}
                        className="w-full pr-10"
                      />
                      <MapPin className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={fetchAddress}
                    disabled={loading}
                    className={`w-full md:w-auto ${loading ? 'opacity-50 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {loading ? '検索中...' : '住所検索'}
                  </Button>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="prefecture">都道府県</Label>
                    <Input
                      id="prefecture"
                      type="text"
                      value={formData.prefecture}
                      onChange={handleChange('prefecture')}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">市区町村</Label>
                    <Input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange('city')}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="town">町域名</Label>
                    <Input
                      id="town"
                      type="text"
                      value={formData.town}
                      onChange={handleChange('town')}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addressLine">丁目・番地・住居番号</Label>
                    <Input
                      id="addressLine"
                      type="text"
                      value={formData.addressLine}
                      onChange={handleChange('addressLine')}
                      placeholder="例) 1丁目2-3"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="building">建物名・棟名</Label>
                    <Input
                      id="building"
                      type="text"
                      value={formData.building}
                      onChange={handleChange('building')}
                      placeholder="例) イズホームマンション"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room">号室</Label>
                    <Input
                      id="room"
                      type="text"
                      value={formData.room}
                      onChange={handleChange('room')}
                      placeholder="例) 101号室"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* 工事住所の所有者確認 */}
              <div className="space-y-6 border-t border-gray-200 pt-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-800">工事住所の所有者確認</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>建物の所有者（ご本人/親族/賃貸）</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {ownerOptions.map((option) => {
                        const isSelected = formData.buildingOwner === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleOwnerChange('buildingOwner')(option.value)}
                            className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-200 text-center hover:shadow-md ${
                              isSelected
                                ? 'border-orange-500 bg-orange-50 text-orange-600'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-orange-200 hover:text-orange-500'
                            }`}
                          >
                            {isSelected && (
                              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                                選択中
                              </span>
                            )}
                            <span className="text-base font-semibold">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>土地の所有者（ご本人/親族/賃貸）</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {ownerOptions.map((option) => {
                        const isSelected = formData.landOwner === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleOwnerChange('landOwner')(option.value)}
                            className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-200 text-center hover:shadow-md ${
                              isSelected
                                ? 'border-orange-500 bg-orange-50 text-orange-600'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-orange-200 hover:text-orange-500'
                            }`}
                          >
                            {isSelected && (
                              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                                選択中
                              </span>
                            )}
                            <span className="text-base font-semibold">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 注意書き */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-600 font-bold text-lg">※</span>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p className="font-semibold">住宅ローン控除をご利用される予定のお客様へ</p>
                      <p className="leading-relaxed">
                        住宅ローン控除をご利用される場合、「リフォームの請負契約者様」「ローン名義人」「建物の所有者」が同一である必要があります。
                        建物の所有者がお身内の方であるなど、これらが一致しない場合は控除が受けられないことにご注意ください。なお建物が共有名義の場合は、
                        ローン名義人の方の持ち分比率に応じて控除額が決まります。恐れ入りますが詳細はお住まいの地域の税務署へお問い合わせください。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 送信ボタン */}
              {onSubmit && (
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                  >
                    キャンセル
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-orange-500 text-white hover:bg-orange-600"
                  >
                    登録
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

