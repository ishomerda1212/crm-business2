import { ChangeEvent } from 'react';
import { useFormContext } from '../../hearing-form/context/FormContext';

const corporationTypes: string[] = [
  '株式会社',
  '合同会社',
  '有限会社',
  '合資会社',
  '合名会社',
  '社会福祉法人',
  '医療法人',
  '管理組合',
  '事務所',
  '歯科医院',
  '工務店',
  'その他',
];

export const CorporateInfoStepForHearing = () => {
  const { data, updateCorporateInfo } = useFormContext();

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    updateCorporateInfo({ corporationType: event.target.value });
  };

  const handleRadio = (value: 'prefix' | 'suffix') => {
    updateCorporateInfo({ nameOrder: value });
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateCorporateInfo({ corporationName: event.target.value });
  };

  const handleRepresentativeTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateCorporateInfo({ representativeTitle: event.target.value });
  };

  const handleRepresentativeNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateCorporateInfo({ representativeName: event.target.value });
  };

  const handleContactPersonNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateCorporateInfo({ contactPersonName: event.target.value });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-orange-500">法人情報</span>をご入力ください
        </h2>
        <p className="text-gray-600">
          会社・団体名と法人区分を入力してください。登記情報と異なる場合は備考欄で調整いただけます。
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">法人種別</label>
          <select
            value={data.corporationType}
            onChange={handleSelect}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
          >
            <option value="">選択してください</option>
            {corporationTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium text-gray-700">法人種別の表示</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleRadio('prefix')}
              className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                data.nameOrder === 'prefix'
                  ? 'border-orange-500 bg-orange-50 text-orange-600'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              前株（例：株式会社イズホーム）
            </button>
            <button
              type="button"
              onClick={() => handleRadio('suffix')}
              className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                data.nameOrder === 'suffix'
                  ? 'border-orange-500 bg-orange-50 text-orange-600'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              後株（例：イズホーム株式会社）
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">法人名</label>
          <input
            type="text"
            value={data.corporationName}
            onChange={handleNameChange}
            placeholder="例）イズホーム"
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">代表者肩書</label>
          <input
            type="text"
            value={data.representativeTitle}
            onChange={handleRepresentativeTitleChange}
            placeholder="自由入力"
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">代表者氏名</label>
          <input
            type="text"
            value={data.representativeName}
            onChange={handleRepresentativeNameChange}
            placeholder="例）山田太郎"
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">窓口担当者氏名</label>
          <input
            type="text"
            value={data.contactPersonName}
            onChange={handleContactPersonNameChange}
            placeholder="例）佐藤花子"
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

