import { User, Building2 } from 'lucide-react';
import { useContext } from 'react';
import { FormContext as HearingFormContext } from '../hearing-form/context/FormContext';
import { FormContext as SimpleFormContext } from '../simple-form/context/FormContext';

export const CustomerTypeStep = () => {
  // 両方のコンテキストを試す（どちらかが存在するはず）
  const hearingContext = useContext(HearingFormContext);
  const simpleContext = useContext(SimpleFormContext);

  if (!hearingContext && !simpleContext) {
    throw new Error('CustomerTypeStep must be used within a form context');
  }

  const handleIndividual = () => {
    if (hearingContext) {
      hearingContext.setCustomerCategory('individual');
    } else if (simpleContext) {
      simpleContext.setCustomerType('individual');
    }
  };

  const handleCorporate = () => {
    if (hearingContext) {
      hearingContext.setCustomerCategory('corporate');
    } else if (simpleContext) {
      simpleContext.setCustomerType('corporate');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-orange-500">お客様の種類</span>をお選びください
        </h2>
        <p className="text-gray-600">
          個人のお客様か、法人のお客様かを選択してください。
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <button
          onClick={handleIndividual}
          className="group relative p-8 rounded-2xl border-2 border-gray-200 bg-white hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 hover:shadow-lg"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <User className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600">
              個人
            </h3>
            <p className="text-sm text-gray-600 text-center">
              個人のお客様
            </p>
          </div>
        </button>

        <button
          onClick={handleCorporate}
          className="group relative p-8 rounded-2xl border-2 border-gray-200 bg-white hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 hover:shadow-lg"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <Building2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600">
              法人
            </h3>
            <p className="text-sm text-gray-600 text-center">
              法人のお客様
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

