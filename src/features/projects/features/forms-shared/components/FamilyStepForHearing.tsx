import { ChangeEvent } from 'react';
import { useFormContext } from '../../hearing-form/context/FormContext';

const householdMemberOptions: ('夫' | '妻' | '子' | '父' | '母' | '祖父' | '祖母' | '兄弟姉妹')[] = [
  '夫',
  '妻',
  '子',
  '父',
  '母',
  '祖父',
  '祖母',
  '兄弟姉妹',
];

const guestFrequencyOptions: ('ほぼ無し' | '毎週' | '毎月' | '半年' | '毎年')[] = ['ほぼ無し', '毎週', '毎月', '半年', '毎年'];

export const FamilyStepForHearing = () => {
  const { data, updateFamily } = useFormContext();

  const handleAdultsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numValue = value === '' ? null : parseInt(value, 10);
    updateFamily({ numberOfAdults: numValue });
  };

  const handleChildrenChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numValue = value === '' ? null : parseInt(value, 10);
    updateFamily({ numberOfChildren: numValue });
  };

  const handleMemberToggle = (member: '夫' | '妻' | '子' | '父' | '母' | '祖父' | '祖母' | '兄弟姉妹') => {
    const currentMembers = data.householdMembers;
    const isSelected = currentMembers.includes(member);
    const newMembers = isSelected
      ? currentMembers.filter(m => m !== member)
      : [...currentMembers, member];
    updateFamily({ householdMembers: newMembers });
  };

  const handlePetsChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateFamily({ pets: event.target.value });
  };

  const handleGuestFrequencyChange = (frequency: 'ほぼ無し' | '毎週' | '毎月' | '半年' | '毎年') => {
    updateFamily({ guestFrequency: frequency });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-orange-500">ご家族</span>をご入力ください
        </h2>
        <p className="text-gray-600">
          いただいた情報は顧客対応以外の目的には使用いたしません。
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">大人人数</label>
              <input
                type="number"
                value={data.numberOfAdults ?? ''}
                onChange={handleAdultsChange}
                min="0"
                placeholder="例）2"
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                子供人数（18歳以下）
              </label>
              <input
                type="number"
                value={data.numberOfChildren ?? ''}
                onChange={handleChildrenChange}
                min="0"
                placeholder="例）1"
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <label className="text-sm font-medium text-gray-700">同居者構成（複数選択可）</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {householdMemberOptions.map(member => {
              const isSelected = data.householdMembers.includes(member);
              return (
                <button
                  key={member}
                  type="button"
                  onClick={() => handleMemberToggle(member)}
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
                  <span className="text-base font-semibold">{member}</span>
                </button>
              );
            })}
          </div>
          {data.householdMembers.length > 0 && (
            <p className="text-sm text-gray-500">
              選択中: {data.householdMembers.join('、')}
            </p>
          )}
        </section>

        <section className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">ペット</label>
          <input
            type="text"
            value={data.pets}
            onChange={handlePetsChange}
            placeholder="例）犬1匹、猫2匹"
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">ペットを飼っていない場合は空欄のままで結構です。</p>
        </section>

        <section className="space-y-4">
          <label className="text-sm font-medium text-gray-700">来客頻度</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guestFrequencyOptions.map(option => {
              const isSelected = data.guestFrequency === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleGuestFrequencyChange(option)}
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
      </div>
    </div>
  );
};

