import { UsersRound } from 'lucide-react';
import { CustomerFormProvider, useCustomerFormContext } from '../context/FormContext';
import { FormHeader, FormNavigation } from '../../components';
import {
  CustomerTypeStep,
  IndividualInfoStep,
  CorporateInfoStep,
  AddressStep,
  OccupationStep,
  FamilyStep,
} from '../../steps';

const NewCustomerSimpleFormContent = () => {
  const { currentStep, data, prevStep, nextStep, canProceed, getTotalSteps } = useCustomerFormContext();

  const steps = [
    { id: 1, label: '種別選択' },
    {
      id: 2,
      label: data.customerType === 'corporate' ? '法人情報' : 'お客様情報',
    },
    { id: 3, label: 'ご住所情報' },
    ...(data.customerType === 'individual'
      ? [
          { id: 4, label: 'ご職業' },
          { id: 5, label: 'ご家族' },
        ]
      : []),
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CustomerTypeStep />;
      case 2:
        if (data.customerType === 'individual') {
          return <IndividualInfoStep />;
        }
        if (data.customerType === 'corporate') {
          return <CorporateInfoStep />;
        }
        return <CustomerTypeStep />;
      case 3:
        return <AddressStep />;
      case 4:
        // 個人のみ表示
        if (data.customerType === 'individual') {
          return <OccupationStep />;
        }
        return <AddressStep />;
      case 5:
        // 個人のみ表示
        if (data.customerType === 'individual') {
          return <FamilyStep />;
        }
        return <AddressStep />;
      default:
        return <CustomerTypeStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <FormHeader
        title="顧客フォーム"
        subtitle="イズホームのお問い合わせ"
        icon={<UsersRound className="w-8 h-8" />}
        steps={steps}
        currentStep={currentStep}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderStep()}
        <FormNavigation
          currentStep={currentStep}
          totalSteps={getTotalSteps()}
          canProceed={canProceed()}
          onPrev={prevStep}
          onNext={nextStep}
          showPrev={currentStep > 1}
        />
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">
        <p>&copy; 2024 イズホーム. All rights reserved.</p>
      </footer>
    </div>
  );
};

export const NewCustomerSimpleForm = () => {
  return (
    <CustomerFormProvider>
      <NewCustomerSimpleFormContent />
    </CustomerFormProvider>
  );
};

