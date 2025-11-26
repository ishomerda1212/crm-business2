import { useFormContext } from '../../hearing-form/context/FormContext';
import { EstimateStatus } from '../../hearing-form/types';

const estimateStatusOptions: {
  value: EstimateStatus;
  label: string;
  description?: string;
}[] = [
  {
    value: 'decideIfMatch',
    label: '条件が合えば即決しても良い',
  },
  {
    value: 'none',
    label: '見積は取っていない',
  },
  {
    value: 'one',
    label: '1社',
  },
  {
    value: 'two',
    label: '2社',
  },
  {
    value: 'threeOrMore',
    label: '3社以上',
  },
];

const needsCompetitorInput = (status: EstimateStatus | null) =>
  status === 'one' || status === 'two' || status === 'threeOrMore';

export const EstimateStatusStep = () => {
  const {
    data,
    setEstimateStatus,
    setEstimateCompanyName,
  } = useFormContext();

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEstimateCompanyName(e.target.value);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          現在の<span className="text-orange-500">見積状況</span>をお知らせください
        </h2>
        <p className="text-gray-600">
          他社でお見積りを取得済みの場合、会社名をご入力いただくとスムーズです。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {estimateStatusOptions.map(({ value, label, description }) => {
          const isSelected = data.estimateStatus === value;
          return (
            <button
              key={value}
              onClick={() => setEstimateStatus(value)}
              className={`p-5 rounded-xl border-3 transition-all duration-200 hover:scale-[1.02] text-left ${
                isSelected
                  ? 'border-orange-500 bg-orange-50 shadow-lg text-orange-600'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md text-gray-700'
              }`}
            >
              <p className="text-base font-semibold">{label}</p>
              {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
            </button>
          );
        })}
      </div>

      {needsCompetitorInput(data.estimateStatus) && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <label htmlFor="estimate-company-name" className="block text-sm font-medium text-gray-700 mb-2">
            相見積中の会社名（複数ある場合は「、」で区切ってください）
          </label>
          <input
            id="estimate-company-name"
            type="text"
            value={data.estimateCompanyName}
            onChange={handleCompanyNameChange}
            placeholder="例）イズホームリフォーム株式会社、住まいサポート工務店"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-sm text-gray-700"
          />
        </div>
      )}
    </div>
  );
};

