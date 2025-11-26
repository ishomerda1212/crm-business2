import { createContext, useContext, useState, ReactNode } from 'react';
import {
  ReformInquiryData,
  FormStep,
  ReformArea,
  PriorityPoint,
  DesiredCompletionTiming,
  BudgetRange,
  LoanPreference,
  EstimateStatus,
  RegistrationType,
  CustomerType,
} from '../types';

interface FormContextType {
  data: ReformInquiryData;
  currentStep: FormStep;
  setCustomerType: (type: CustomerType) => void;
  toggleReformArea: (area: ReformArea) => void;
  togglePriorityPoint: (point: PriorityPoint) => void;
  setDesiredCompletion: (timing: DesiredCompletionTiming) => void;
  setDesiredCompletionNote: (note: string) => void;
  setBudget: (range: BudgetRange) => void;
  setLoanPreference: (preference: LoanPreference) => void;
  setEstimateStatus: (status: EstimateStatus) => void;
  setEstimateCompanyName: (name: string) => void;
  setRegistrationType: (type: RegistrationType) => void;
  setRegistrationEmail: (email: string) => void;
  setRegistrationPhone: (phone: string) => void;
  setLoginEmail: (email: string) => void;
  setLoginPassword: (password: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  canProceed: () => boolean;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [data, setData] = useState<ReformInquiryData>({
    customerType: null,
    reformAreas: [],
    priorityPoints: [],
    desiredCompletion: null,
    desiredCompletionNote: '',
    budget: null,
    loanPreference: null,
    estimateStatus: null,
    estimateCompanyName: '',
    registrationType: 'new',
    registrationEmail: '',
    registrationPhone: '',
    loginEmail: '',
    loginPassword: '',
  });

  const setCustomerType = (type: CustomerType) => {
    setData(prev => ({ ...prev, customerType: type }));
  };

  const toggleReformArea = (area: ReformArea) => {
    setData(prev => ({
      ...prev,
      reformAreas: prev.reformAreas.includes(area)
        ? prev.reformAreas.filter(a => a !== area)
        : [...prev.reformAreas, area],
    }));
  };

  const togglePriorityPoint = (point: PriorityPoint) => {
    setData(prev => ({
      ...prev,
      priorityPoints: prev.priorityPoints.includes(point)
        ? prev.priorityPoints.filter(p => p !== point)
        : [...prev.priorityPoints, point],
    }));
  };

  const setDesiredCompletion = (timing: DesiredCompletionTiming) => {
    setData(prev => ({ ...prev, desiredCompletion: timing }));
  };

  const setDesiredCompletionNote = (note: string) => {
    setData(prev => ({ ...prev, desiredCompletionNote: note }));
  };

  const setBudget = (range: BudgetRange) => {
    setData(prev => ({ ...prev, budget: range }));
  };

  const setLoanPreference = (preference: LoanPreference) => {
    setData(prev => ({ ...prev, loanPreference: preference }));
  };

  const setEstimateStatus = (status: EstimateStatus) => {
    setData(prev => ({
      ...prev,
      estimateStatus: status,
      estimateCompanyName:
        status === 'one' || status === 'two' || status === 'threeOrMore'
          ? prev.estimateCompanyName
          : '',
    }));
  };

  const setEstimateCompanyName = (name: string) => {
    setData(prev => ({ ...prev, estimateCompanyName: name }));
  };

  const setRegistrationType = (type: RegistrationType) => {
    setData(prev => ({
      ...prev,
      registrationType: type,
    }));
  };

  const setRegistrationEmail = (email: string) => {
    setData(prev => ({ ...prev, registrationEmail: email }));
  };

  const setRegistrationPhone = (phone: string) => {
    setData(prev => ({ ...prev, registrationPhone: phone }));
  };

  const setLoginEmail = (email: string) => {
    setData(prev => ({ ...prev, loginEmail: email }));
  };

  const setLoginPassword = (password: string) => {
    setData(prev => ({ ...prev, loginPassword: password }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.reformAreas.length > 0;
      case 2:
        return data.priorityPoints.length > 0;
      case 3:
        return data.desiredCompletion !== null;
      case 4:
        return data.budget !== null && data.loanPreference !== null;
      case 5:
        return data.estimateStatus !== null;
      case 6:
        if (data.registrationType === 'new') {
          return data.registrationEmail.trim() !== '' && data.registrationPhone.trim() !== '';
        }
        return data.loginEmail.trim() !== '' && data.loginPassword.trim() !== '';
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < 6 && canProceed()) {
      setCurrentStep(prev => (prev + 1) as FormStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => (prev - 1) as FormStep);
    }
  };

  return (
    <FormContext.Provider
      value={{
        data,
        currentStep,
        setCustomerType,
        toggleReformArea,
        togglePriorityPoint,
        setDesiredCompletion,
        setDesiredCompletionNote,
        setBudget,
        setLoanPreference,
        setEstimateStatus,
        setEstimateCompanyName,
        setRegistrationType,
        setRegistrationEmail,
        setRegistrationPhone,
        setLoginEmail,
        setLoginPassword,
        nextStep,
        prevStep,
        canProceed,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
