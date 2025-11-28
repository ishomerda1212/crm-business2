import { useEffect, useState } from 'react';
import { NewCustomerHearingForm } from './NewCustomerHearingFormPage';
import { ExistingCustomerHearingForm } from './ExistingCustomerHearingFormPage';

const HearingFormPageContent = () => {
  const [isExistingCustomer, setIsExistingCustomer] = useState<boolean | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const customerId = params.get('customerId');
    setIsExistingCustomer(customerId !== null);
  }, []);

  if (isExistingCustomer === null) {
    return <div>読み込み中...</div>;
  }

  return isExistingCustomer ? <ExistingCustomerHearingForm /> : <NewCustomerHearingForm />;
};

export function HearingFormPage() {
  return <HearingFormPageContent />;
}


