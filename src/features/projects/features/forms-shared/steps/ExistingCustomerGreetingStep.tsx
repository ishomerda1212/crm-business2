import { useContext, useMemo } from 'react';
import { Info } from 'lucide-react';
import { mockCustomerSearchCandidates } from '@/data/mockData';
import { FormContext as HearingFormContext } from '../hearing-form/context/FormContext';
import { FormContext as SimpleFormContext } from '../simple-form/context/FormContext';

const getCustomerNameById = (customerId: string | null | undefined) => {
  if (!customerId) return null;
  const match = mockCustomerSearchCandidates.find(candidate => candidate.id === customerId);
  return match?.customerName ?? null;
};

export const ExistingCustomerGreetingStep = () => {
  const hearingContext = useContext(HearingFormContext);
  const simpleContext = useContext(SimpleFormContext);

  if (!hearingContext && !simpleContext) {
    throw new Error('ExistingCustomerGreetingStep must be used within a form context');
  }

  const data = hearingContext?.data || simpleContext?.data;

  const customerName = useMemo(
    () => getCustomerNameById(data?.selectedCustomerId),
    [data?.selectedCustomerId],
  );

  const displayName = customerName ? `${customerName} 様` : 'お客様';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 space-y-4">
        <p className="text-2xl font-bold text-gray-800">
          {displayName}
          <span className="text-base font-medium text-gray-600 ml-2">再度お問い合わせいただきありがとうございます。</span>
        </p>
        <p className="text-gray-600 leading-relaxed">
          内容を確認のうえ、担当よりご連絡いたします。引き続きよろしくお願いいたします。
        </p>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 flex items-start space-x-4">
        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
          <Info className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-800">
            他の名義・法人での工事をご希望の場合
          </p>
          <p className="text-sm text-gray-700">
            別フォームでのお手続きが必要です。担当営業までお申し付けください。
          </p>
        </div>
      </div>
    </div>
  );
};


