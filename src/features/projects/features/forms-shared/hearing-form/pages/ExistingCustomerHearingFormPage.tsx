import { useEffect } from 'react';
import { Home } from 'lucide-react';
import { FormProvider, useFormContext } from '../context/FormContext';
import { FormHeader, FormNavigation } from '../../components';
import {
  PropertySelectStep,
  ReformAreaStep,
  PriorityPointsStep,
  DesiredCompletionStep,
  BudgetLoanStep,
  EstimateStatusStep,
  CustomerTypeStep,
  AddressStep,
  OccupationStep,
  FamilyStep,
  IndividualInfoStep,
  CorporateInfoStep,
} from '../../steps';

const ExistingCustomerHearingFormContent = () => {
  const { currentStep, data, prevStep, nextStep, canProceed, getTotalSteps, setSelectedCustomerId, setCustomerType } = useFormContext();

  useEffect(() => {
    setCustomerType('existing');
    const params = new URLSearchParams(window.location.search);
    const customerId = params.get('customerId');
    if (customerId) {
      setSelectedCustomerId(customerId);
    }
  }, [setCustomerType, setSelectedCustomerId]);

  const steps = [
    { id: 1, label: '物件選択' },
    { id: 2, label: '検討箇所' },
    { id: 3, label: '重視ポイント' },
    { id: 4, label: '完成時期' },
    { id: 5, label: '予算・ローン' },
    { id: 6, label: '見積状況' },
    { id: 7, label: '種別選択' },
    {
      id: 8,
      label: data.customerCategory === 'corporate' ? '法人情報' : 'お客様情報',
    },
    { id: 9, label: 'ご住所情報' },
    ...(data.customerCategory === 'individual'
      ? [
          { id: 10, label: 'ご職業' },
          { id: 11, label: 'ご家族' },
        ]
      : []),
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PropertySelectStep />;
      case 2:
        return <ReformAreaStep />;
      case 3:
        return <PriorityPointsStep />;
      case 4:
        return <DesiredCompletionStep />;
      case 5:
        return <BudgetLoanStep />;
      case 6:
        return <EstimateStatusStep />;
      case 7:
        return <CustomerTypeStep />;
      case 8:
        if (data.customerCategory === 'individual') {
          return <IndividualInfoStep />;
        }
        if (data.customerCategory === 'corporate') {
          return <CorporateInfoStep />;
        }
        return <CustomerTypeStep />;
      case 9:
        return <AddressStep />;
      case 10:
        // 個人のみ表示
        if (data.customerCategory === 'individual') {
          return <OccupationStep />;
        }
        return <AddressStep />;
      case 11:
        // 個人のみ表示
        if (data.customerCategory === 'individual') {
          return <FamilyStep />;
        }
        return <AddressStep />;
      default:
        return <PropertySelectStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <FormHeader
        title="イズホーム"
        icon={<Home className="w-8 h-8" />}
        steps={steps}
        currentStep={currentStep}
        hideNavigationBeforeStep={1}
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

export const ExistingCustomerHearingForm = () => {
  return (
    <FormProvider>
      <ExistingCustomerHearingFormContent />
    </FormProvider>
  );
};

