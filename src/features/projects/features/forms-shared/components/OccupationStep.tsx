import { useCustomerFormContext } from '../simple-form/context/FormContext';
import type { Occupation, DayOfWeek } from '../simple-form/types';

const occupationOptions: Occupation[] = ['会社員', '公務員', '自営業', 'その他'];

const dayOfWeekOptions: DayOfWeek[] = ['月', '火', '水', '木', '金', '土', '日', '不定休'];

export const OccupationStep = () => {
  const { data, updateOccupation } = useCustomerFormContext();

  const handleOccupationChange = (occupation: Occupation) => {
    updateOccupation({ occupation });
  };

  const handleDayOffToggle = (day: DayOfWeek) => {
    const currentDaysOff = data.workDaysOff;
    const isSelected = currentDaysOff.includes(day);
    const newDaysOff = isSelected
      ? currentDaysOff.filter(d => d !== day)
      : [...currentDaysOff, day];
    updateOccupation({ workDaysOff: newDaysOff });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-orange-500">ご職業</span>をご入力ください
        </h2>
        <p className="text-gray-600">
          いただいた情報は顧客対応以外の目的には使用いたしません。
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <label className="text-sm font-medium text-gray-700">職業</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {occupationOptions.map(option => {
              const isSelected = data.occupation === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleOccupationChange(option)}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-200 text-center hover:shadow-md ${
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
                  <span className="text-base font-semibold">{option}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <label className="text-sm font-medium text-gray-700">仕事の休み（複数選択可）</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {dayOfWeekOptions.map(day => {
              const isSelected = data.workDaysOff.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayOffToggle(day)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-center hover:shadow-md ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50 text-orange-600'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-orange-200 hover:text-orange-500'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                      ✓
                    </span>
                  )}
                  <span className="text-base font-semibold">{day}</span>
                </button>
              );
            })}
          </div>
          {data.workDaysOff.length > 0 && (
            <p className="text-sm text-gray-500">
              選択中: {data.workDaysOff.join('、')}
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

