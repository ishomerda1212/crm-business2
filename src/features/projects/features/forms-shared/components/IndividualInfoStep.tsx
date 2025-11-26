// このファイルは既存の顧客情報フォーム用です。統合フォーム用のコンポーネントは別途作成します。
import { ChangeEvent } from 'react';
import { useCustomerFormContext } from '../simple-form/context/FormContext';

export const IndividualInfoStep = () => {
  const { data, updatePersonalInfo } = useCustomerFormContext();

  const handleChange = (field: 'lastName' | 'firstName' | 'lastNameKana' | 'firstNameKana') => (event: ChangeEvent<HTMLInputElement>) => {
    updatePersonalInfo({ [field]: event.target.value });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-orange-500">お客様情報</span>をご入力ください
        </h2>
        <p className="text-gray-600">
          いただいた情報は顧客対応以外の目的には使用いたしません。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">姓</label>
          <input
            type="text"
            value={data.lastName}
            onChange={handleChange('lastName')}
            placeholder="例）山田"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">名</label>
          <input
            type="text"
            value={data.firstName}
            onChange={handleChange('firstName')}
            placeholder="例）太郎"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">セイ（カナ）</label>
          <input
            type="text"
            value={data.lastNameKana}
            onChange={handleChange('lastNameKana')}
            placeholder="例）ヤマダ"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow uppercase"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">メイ（カナ）</label>
          <input
            type="text"
            value={data.firstNameKana}
            onChange={handleChange('firstNameKana')}
            placeholder="例）タロウ"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow uppercase"
          />
        </div>
      </div>
    </div>
  );
};

