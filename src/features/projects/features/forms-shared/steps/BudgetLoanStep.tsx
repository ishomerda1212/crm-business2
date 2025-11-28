import { useFormContext } from '../hearing-form/context/FormContext';
import { BudgetRange, LoanPreference } from '../hearing-form/types';

const budgetOptions: { value: BudgetRange; label: string }[] = [
  { value: 'under-1m', label: '～100万円' },
  { value: '100-150', label: '100～150万円' },
  { value: '150-200', label: '150～200万円' },
  { value: 'under-5m', label: '～500万円' },
  { value: 'under-10m', label: '～1000万円' },
  { value: 'under-15m', label: '～1500万円' },
  { value: 'under-20m', label: '～2000万円' },
  { value: 'over-20m', label: '2000万円～' },
  { value: 'undecided', label: '未定' },
];

const loanOptions: { value: LoanPreference; label: string; description?: string }[] = [
  { value: 'considerIfBenefit', label: 'お得な内容であれば' },
  { value: 'notConsidering', label: '特に考えていない' },
];

export const BudgetLoanStep = () => {
  const { data, setBudget, setLoanPreference } = useFormContext();

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-orange-500">予算・ローン</span>について教えてください
        </h2>
        <p className="text-gray-600">
          おおよそのご予算と、リフォームローンについてのご意向をお選びください。
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">予算</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {budgetOptions.map(({ value, label }) => {
            const isSelected = data.budget === value;
            return (
              <button
                key={value}
                onClick={() => setBudget(value)}
                className={`p-5 rounded-xl border-3 transition-all duration-200 hover:scale-[1.02] ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50 shadow-lg text-orange-600'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md text-gray-700'
                }`}
              >
                <span className="text-base font-semibold">{label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">ローン</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loanOptions.map(({ value, label, description }) => {
            const isSelected = data.loanPreference === value;
            return (
              <button
                key={value}
                onClick={() => setLoanPreference(value)}
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
      </section>
    </div>
  );
};

