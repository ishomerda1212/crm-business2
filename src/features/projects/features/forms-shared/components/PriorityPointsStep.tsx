import { BadgeCheck, CalendarClock, Handshake, PiggyBank, ShieldCheck } from 'lucide-react';
import { useFormContext } from '../../hearing-form/context/FormContext';
import { PriorityPoint } from '../../hearing-form/types';

const priorityOptions: {
  value: PriorityPoint;
  label: string;
  description: string;
  icon: typeof PiggyBank;
}[] = [
  {
    value: 'price',
    label: '価格',
    description: '費用を抑えたい・コスト重視',
    icon: PiggyBank,
  },
  {
    value: 'schedule',
    label: '工事時期',
    description: 'スケジュールを重視している',
    icon: CalendarClock,
  },
  {
    value: 'proposal',
    label: '提案',
    description: '提案内容やプランを比較したい',
    icon: BadgeCheck,
  },
  {
    value: 'staff',
    label: '担当者',
    description: '担当者との相性・対応を重視',
    icon: Handshake,
  },
  {
    value: 'afterService',
    label: 'アフターサービス',
    description: '工事後のサポートが安心できる会社',
    icon: ShieldCheck,
  },
];

export const PriorityPointsStep = () => {
  const { data, togglePriorityPoint } = useFormContext();

  const isSelected = (value: PriorityPoint) => data.priorityPoints.includes(value);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-orange-500">重視するポイント</span>をお選びください
        </h2>
        <p className="text-gray-600">
          リフォーム会社を選ぶ際に大切にしたいポイントを選択してください。（複数選択可）
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {priorityOptions.map(({ value, label, description, icon: Icon }) => (
          <button
            key={value}
            onClick={() => togglePriorityPoint(value)}
            className={`relative p-6 rounded-xl border-3 transition-all duration-200 hover:scale-[1.02] text-left ${
              isSelected(value)
                ? 'border-orange-500 bg-orange-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isSelected(value) ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p
                  className={`text-lg font-semibold ${
                    isSelected(value) ? 'text-orange-600' : 'text-gray-800'
                  }`}
                >
                  {label}
                </p>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

