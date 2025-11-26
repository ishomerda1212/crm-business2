import { FormEvent, useState } from 'react';
import { Search, MapPin, Building2, Building, Home, LucideIcon } from 'lucide-react';
import { useCustomerFormContext } from '../simple-form/context/FormContext';
import type { CustomerFormData, ResidenceAddressOption, OwnerType } from '../simple-form/types';
import { PropertyType } from '../simple-form/types';

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

type AddressField = keyof Pick<
  CustomerFormData,
  | 'postalCode'
  | 'prefecture'
  | 'city'
  | 'town'
  | 'addressLine'
  | 'building'
  | 'room'
  | 'constructionPostalCode'
  | 'constructionPrefecture'
  | 'constructionCity'
  | 'constructionTown'
  | 'constructionAddressLine'
  | 'constructionBuilding'
  | 'constructionRoom'
>;

type AddressTarget = 'construction' | 'residence';

export const AddressStep = () => {
  const { data, updateAddress, setPropertyType, setResidenceAddressOption } = useCustomerFormContext();
  
  const ownerOptions: Array<{ value: OwnerType; label: string }> = [
    { value: '本人', label: 'ご本人' },
    { value: '親族', label: '親族' },
    { value: '賃貸', label: '賃貸' },
  ];
  
  const handleOwnerChange = (field: 'buildingOwner' | 'landOwner') => (value: OwnerType) => {
    updateAddress({ [field]: value });
  };
  const [loading, setLoading] = useState<Record<AddressTarget, boolean>>({
    construction: false,
    residence: false,
  });
  const [errors, setErrors] = useState<Record<AddressTarget, string | null>>({
    construction: null,
    residence: null,
  });
  const isResidenceSame = data.residenceAddressOption === 'same';
  const isResidenceDifferent = data.residenceAddressOption === 'different';

  const residenceOptions: Array<{ value: ResidenceAddressOption; label: string }> = [
    { value: 'same', label: '工事住所と同じ' },
    { value: 'different', label: '現住所を登録する' },
  ];

  const handleResidenceOptionChange = (option: ResidenceAddressOption) => {
    setResidenceAddressOption(option);
    setErrors(prev => ({
      ...prev,
      residence: null,
    }));
  };

  const handleChange = (field: AddressField) => (event: FormEvent<HTMLInputElement>) => {
    updateAddress({ [field]: event.currentTarget.value });
  };

  const fetchAddress = async (target: AddressTarget) => {
    if (target === 'residence' && !isResidenceDifferent) {
      return;
    }

    const postalCode = target === 'construction' ? data.constructionPostalCode : data.postalCode;

    if (postalCode.trim().length < 7) {
      setErrors(prev => ({
        ...prev,
        [target]: '郵便番号は7桁で入力してください（ハイフン不要）',
      }));
      return;
    }

    setLoading(prev => ({ ...prev, [target]: true }));
    setErrors(prev => ({ ...prev, [target]: null }));

    try {
      const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`);
      const result = (await response.json()) as ZipcloudResponse;

      if (result.status !== 200 || !result.results || result.results.length === 0) {
        setErrors(prev => ({
          ...prev,
          [target]: result.message ?? '住所情報が見つかりませんでした',
        }));
        return;
      }

      const [firstMatch] = result.results;
      if (target === 'construction') {
        updateAddress({
          constructionPrefecture: firstMatch.address1 ?? '',
          constructionCity: firstMatch.address2 ?? '',
          constructionTown: firstMatch.address3 ?? '',
        });
      } else {
        updateAddress({
          prefecture: firstMatch.address1 ?? '',
          city: firstMatch.address2 ?? '',
          town: firstMatch.address3 ?? '',
        });
      }
    } catch (err) {
      console.error(err);
      setErrors(prev => ({
        ...prev,
        [target]: '住所情報の取得に失敗しました。時間を置いて再度お試しください。',
      }));
    } finally {
      setLoading(prev => ({ ...prev, [target]: false }));
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-orange-500">ご住所</span>をご入力ください
        </h2>
        <p className="text-gray-600">
          郵便番号を入力して住所検索を行うと、都道府県・市区町村・町域が自動入力されます。
        </p>
      </div>

      <div className="space-y-10">
        <section className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                1
              </span>
              <span>工事住所をご入力ください</span>
            </h3>
            <p className="text-sm text-gray-500">（工事住所は工事を行うご住所です）</p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">工事住所物件種別</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {propertyOptions.map(({ value, label, description, icon: Icon }) => {
                const isSelected = data.constructionPropertyType === value;
                return (
                  <button
                    type="button"
                    key={value}
                    onClick={() => setPropertyType('construction', value)}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">郵便番号（ハイフン不要）</label>
              <div className="relative">
                <input
                  type="text"
                  value={data.constructionPostalCode}
                  onChange={handleChange('constructionPostalCode')}
                  placeholder="例）5300001"
                  maxLength={7}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow tracking-wider"
                />
                <MapPin className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => fetchAddress('construction')}
              disabled={loading.construction}
              className={`w-full md:w-auto px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200 ${
                loading.construction
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg'
              }`}
            >
              <Search className="w-5 h-5" />
              <span>{loading.construction ? '検索中...' : '住所検索'}</span>
            </button>
          </div>

          {errors.construction && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {errors.construction}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">都道府県</label>
              <input
                type="text"
                value={data.constructionPrefecture}
                onChange={handleChange('constructionPrefecture')}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">市区町村</label>
              <input
                type="text"
                value={data.constructionCity}
                onChange={handleChange('constructionCity')}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">町域名</label>
              <input
                type="text"
                value={data.constructionTown}
                onChange={handleChange('constructionTown')}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">丁目・番地・住居番号</label>
              <input
                type="text"
                value={data.constructionAddressLine}
                onChange={handleChange('constructionAddressLine')}
                placeholder="例）1丁目2-3"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">建物名・棟名</label>
              <input
                type="text"
                value={data.constructionBuilding}
                onChange={handleChange('constructionBuilding')}
                placeholder="例）イズホームマンション"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">号室</label>
              <input
                type="text"
                value={data.constructionRoom}
                onChange={handleChange('constructionRoom')}
                placeholder="例）101号室"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-800">工事住所の所有者確認</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">建物の所有者（ご本人/親族/賃貸）</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ownerOptions.map(option => {
                  const isSelected = data.buildingOwner === option.value;
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
              <label className="text-sm font-medium text-gray-700">土地の所有者（ご本人/親族/賃貸）</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ownerOptions.map(option => {
                  const isSelected = data.landOwner === option.value;
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
        </section>

        <section className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold text-sm">
                2
              </span>
              <span>現住所をご入力ください</span>
            </h3>
            <p className="text-sm text-gray-500">（現住所は現在お住まいのご住所です）</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">現在のお住まいは工事住所と同じでしょうか？</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {residenceOptions.map(option => {
                const isSelected = data.residenceAddressOption === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleResidenceOptionChange(option.value)}
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

          {isResidenceDifferent && (
            <>
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">現住所物件種別</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {propertyOptions.map(({ value, label, description, icon: Icon }) => {
                    const isSelected = data.residencePropertyType === value;
                    return (
                      <button
                        type="button"
                        key={value}
                        onClick={() => setPropertyType('residence', value)}
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
                          <p
                            className={`text-base font-semibold ${
                              isSelected ? 'text-orange-600' : 'text-gray-800'
                            }`}
                          >
                            {label}
                          </p>
                          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">郵便番号（ハイフン不要）</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={data.postalCode}
                      onChange={handleChange('postalCode')}
                      placeholder="例）5300001"
                      maxLength={7}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow tracking-wider"
                    />
                    <MapPin className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => fetchAddress('residence')}
                  disabled={loading.residence}
                  className={`w-full md:w-auto px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200 ${
                    loading.residence
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg'
                  }`}
                >
                  <Search className="w-5 h-5" />
                  <span>{loading.residence ? '検索中...' : '住所検索'}</span>
                </button>
              </div>

              {errors.residence && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {errors.residence}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">都道府県</label>
                  <input
                    type="text"
                    value={data.prefecture}
                    onChange={handleChange('prefecture')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">市区町村</label>
                  <input
                    type="text"
                    value={data.city}
                    onChange={handleChange('city')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">町域名</label>
                  <input
                    type="text"
                    value={data.town}
                    onChange={handleChange('town')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">丁目・番地・住居番号</label>
                  <input
                    type="text"
                    value={data.addressLine}
                    onChange={handleChange('addressLine')}
                    placeholder="例）1丁目2-3"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">建物名・棟名</label>
                  <input
                    type="text"
                    value={data.building}
                    onChange={handleChange('building')}
                    placeholder="例）イズホームマンション"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">号室</label>
                  <input
                    type="text"
                    value={data.room}
                    onChange={handleChange('room')}
                    placeholder="例）101号室"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
                  />
                </div>
              </div>
            </>
          )}
          {isResidenceSame && (
            <div className="bg-orange-50 border border-orange-100 text-orange-700 px-4 py-3 rounded-lg text-sm">
              工事住所の内容が現住所として使用されます。工事住所を変更すると現住所も自動で更新されます。
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

