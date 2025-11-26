import { UserPlus, LogIn } from 'lucide-react';
import { useFormContext } from '../../hearing-form/context/FormContext';

export const CustomerTypeStep = () => {
  const { setCustomerType, setRegistrationType, nextStep } = useFormContext();

  const handleNewCustomer = () => {
    setCustomerType('new');
    setRegistrationType('new');
    nextStep();
  };

  const handleExistingCustomer = () => {
    setCustomerType('existing');
    setRegistrationType('existing');
    nextStep();
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-orange-500">お客様の種類</span>をお選びください
        </h2>
        <p className="text-gray-600">
          新規のお客様か、既にイズホームで契約したことがあるお客様かを選択してください。
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <button
          onClick={handleNewCustomer}
          className="group relative p-8 rounded-2xl border-2 border-gray-200 bg-white hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 hover:shadow-lg"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <UserPlus className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600">
              新規のお客様
            </h3>
            <p className="text-sm text-gray-600 text-center">
              初めてイズホームをご利用されるお客様
            </p>
          </div>
        </button>

        <button
          onClick={handleExistingCustomer}
          className="group relative p-8 rounded-2xl border-2 border-gray-200 bg-white hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 hover:shadow-lg"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <LogIn className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600">
              既存のお客様
            </h3>
            <p className="text-sm text-gray-600 text-center">
              既にイズホームで契約したことがあるお客様
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

