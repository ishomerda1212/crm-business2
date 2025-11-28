import { useFormContext } from '../hearing-form/context/FormContext';
import { DesiredCompletionTiming } from '../hearing-form/types';

const completionOptions: { value: DesiredCompletionTiming; label: string; description?: string }[] = [
  { value: 'asap', label: '決まればすぐにでも' },
  { value: 'oneMonth', label: '1カ月以内' },
  { value: 'twoMonths', label: '2カ月以内' },
  { value: 'thisYear', label: '今年中' },
  { value: 'nextYear', label: '来年中' },
  { value: 'yearAfterNext', label: '再来年以降' },
];

export const DesiredCompletionStep = () => {
  const {
    data,
    setDesiredCompletion,
    setDesiredCompletionNote,
  } = useFormContext();

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesiredCompletionNote(e.target.value);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-orange-500">希望の完成時期</span>を教えてください
        </h2>
        <p className="text-gray-600">
          具体的な時期がお決まりの場合は選択してください。その他のご希望がある場合は、下の自由記入欄にご記入ください。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {completionOptions.map(({ value, label, description }) => {
          const isSelected = data.desiredCompletion === value;
          return (
            <button
              key={value}
              onClick={() => setDesiredCompletion(value)}
              className={`p-5 rounded-xl border-3 transition-all duration-200 hover:scale-[1.02] ${
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

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <label htmlFor="desired-completion-note" className="block text-sm font-medium text-gray-700 mb-2">
          自由記入欄（ご希望の詳細や事情などをご記入ください）
        </label>
        <textarea
          id="desired-completion-note"
          value={data.desiredCompletionNote}
          onChange={handleNoteChange}
          placeholder="例）8月までに完成させたい、長期休暇中に工事をしたい など"
          className="w-full min-h-[120px] px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-sm text-gray-700 bg-white dark:bg-white dark:text-gray-700"
        />
      </div>
    </div>
  );
};

