import { useEffect, useState } from 'react';
import { NewCustomerSimpleForm } from './NewCustomerSimpleFormPage';
import { ExistingCustomerSimpleForm } from './ExistingCustomerSimpleFormPage';

const SimpleFormPageContent = () => {
  const [isExistingCustomer, setIsExistingCustomer] = useState<boolean | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const customerId = params.get('customerId');
    setIsExistingCustomer(customerId !== null);
  }, []);

  if (isExistingCustomer === null) {
    return <div>読み込み中...</div>;
  }

  return isExistingCustomer ? <ExistingCustomerSimpleForm /> : <NewCustomerSimpleForm />;
};

export function SimpleFormPage() {
  return <SimpleFormPageContent />;
}

