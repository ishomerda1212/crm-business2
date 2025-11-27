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
  CustomerCategory,
} from '../types';

interface FormContextType {
  data: ReformInquiryData;
  currentStep: FormStep;
  setCustomerType: (type: CustomerType) => void;
  setCustomerCategory: (category: CustomerCategory) => void;
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
  // 顧客情報
  updatePersonalInfo: (payload: Partial<Pick<ReformInquiryData, 'lastName' | 'firstName' | 'lastNameKana' | 'firstNameKana'>>) => void;
  updateCorporateInfo: (payload: Partial<Pick<ReformInquiryData, 'corporationType' | 'nameOrder' | 'corporationName' | 'representativeTitle' | 'representativeName' | 'contactPersonName'>>) => void;
  setPropertyType: (target: 'construction' | 'residence', type: 'singleFamily' | 'multiUnit' | 'office') => void;
  updateAddress: (payload: Partial<ReformInquiryData>) => void;
  setResidenceAddressOption: (option: 'same' | 'different') => void;
  updateOccupation: (payload: Partial<Pick<ReformInquiryData, 'occupation' | 'workDaysOff'>>) => void;
  updateFamily: (payload: Partial<Pick<ReformInquiryData, 'numberOfAdults' | 'numberOfChildren' | 'householdMembers' | 'pets' | 'guestFrequency'>>) => void;
  setPhotoConsent: (consent: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  canProceed: () => boolean;
  getTotalSteps: () => number;
}

export const FormContext = createContext<FormContextType | undefined>(undefined);

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
    customerCategory: null,
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
    // 顧客情報
    lastName: '',
    firstName: '',
    lastNameKana: '',
    firstNameKana: '',
    corporationType: '',
    nameOrder: null,
    corporationName: '',
    representativeTitle: '',
    representativeName: '',
    contactPersonName: '',
    // 住所情報
    constructionPropertyType: null,
    residencePropertyType: null,
    residenceAddressOption: null,
    postalCode: '',
    prefecture: '',
    city: '',
    town: '',
    addressLine: '',
    building: '',
    room: '',
    constructionPostalCode: '',
    constructionPrefecture: '',
    constructionCity: '',
    constructionTown: '',
    constructionAddressLine: '',
    constructionBuilding: '',
    constructionRoom: '',
    buildingOwner: null,
    landOwner: null,
    // 職業情報（個人のみ）
    occupation: null,
    workDaysOff: [],
    // 家族情報（個人のみ）
    numberOfAdults: null,
    numberOfChildren: null,
    householdMembers: [],
    pets: '',
    guestFrequency: null,
    photoConsent: false,
  });

  const setCustomerType = (type: CustomerType) => {
    setData(prev => ({ ...prev, customerType: type }));
  };

  const setCustomerCategory = (category: CustomerCategory) => {
    setData(prev => ({
      ...prev,
      customerCategory: category,
      // 種別変更時にリセット
      lastName: category === 'individual' ? prev.lastName : '',
      firstName: category === 'individual' ? prev.firstName : '',
      lastNameKana: category === 'individual' ? prev.lastNameKana : '',
      firstNameKana: category === 'individual' ? prev.firstNameKana : '',
      corporationType: category === 'corporate' ? prev.corporationType : '',
      nameOrder: category === 'corporate' ? prev.nameOrder : null,
      corporationName: category === 'corporate' ? prev.corporationName : '',
      representativeTitle: category === 'corporate' ? prev.representativeTitle : '',
      representativeName: category === 'corporate' ? prev.representativeName : '',
      contactPersonName: category === 'corporate' ? prev.contactPersonName : '',
    }));
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

  // 顧客情報の更新関数
  const updatePersonalInfo: FormContextType['updatePersonalInfo'] = payload => {
    setData(prev => ({ ...prev, ...payload }));
  };

  const updateCorporateInfo: FormContextType['updateCorporateInfo'] = payload => {
    setData(prev => ({ ...prev, ...payload }));
  };

  const setPropertyType: FormContextType['setPropertyType'] = (target, type) => {
    setData(prev => {
      const next = {
        ...prev,
        ...(target === 'construction'
          ? { constructionPropertyType: type }
          : { residencePropertyType: type }),
      };

      if (next.residenceAddressOption === 'same') {
        next.residencePropertyType = next.constructionPropertyType;
      }

      return next;
    });
  };

  const setResidenceAddressOption: FormContextType['setResidenceAddressOption'] = option => {
    setData(prev => {
      const next: ReformInquiryData = {
        ...prev,
        residenceAddressOption: option,
      };

      if (option === 'same') {
        next.residencePropertyType = next.constructionPropertyType;
        next.postalCode = next.constructionPostalCode;
        next.prefecture = next.constructionPrefecture;
        next.city = next.constructionCity;
        next.town = next.constructionTown;
        next.addressLine = next.constructionAddressLine;
        next.building = next.constructionBuilding;
        next.room = next.constructionRoom;
      }

      return next;
    });
  };

  const updateAddress: FormContextType['updateAddress'] = payload => {
    setData(prev => {
      const next: ReformInquiryData = {
        ...prev,
        ...payload,
      };

      if (next.residenceAddressOption === 'same') {
        next.residencePropertyType = next.constructionPropertyType;
        next.postalCode = next.constructionPostalCode;
        next.prefecture = next.constructionPrefecture;
        next.city = next.constructionCity;
        next.town = next.constructionTown;
        next.addressLine = next.constructionAddressLine;
        next.building = next.constructionBuilding;
        next.room = next.constructionRoom;
      }

      return next;
    });
  };

  const updateOccupation: FormContextType['updateOccupation'] = payload => {
    setData(prev => ({ ...prev, ...payload }));
  };

  const updateFamily: FormContextType['updateFamily'] = payload => {
    setData(prev => ({ ...prev, ...payload }));
  };

  const setPhotoConsent = (consent: boolean) => {
    setData(prev => ({ ...prev, photoConsent: consent }));
  };

  const getTotalSteps = (): number => {
    // ヒアリングフォーム: 5ステップ
    // 顧客種別: 1ステップ
    // 顧客情報: 1ステップ（個人/法人で異なる）
    // 住所情報: 1ステップ
    // 職業情報: 1ステップ（個人のみ）
    // 家族情報: 1ステップ（個人のみ）
    const baseSteps = 6; // ヒアリング5 + 顧客種別1
    if (data.customerCategory === 'individual') {
      return baseSteps + 4; // 顧客情報 + 住所 + 職業 + 家族
    } else if (data.customerCategory === 'corporate') {
      return baseSteps + 2; // 顧客情報 + 住所
    }
    return baseSteps; // 顧客種別未選択時
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
        return data.customerCategory !== null;
      case 7:
        if (data.customerCategory === 'individual') {
          return (
            data.lastName.trim() !== '' &&
            data.firstName.trim() !== '' &&
            data.lastNameKana.trim() !== '' &&
            data.firstNameKana.trim() !== ''
          );
        }
        if (data.customerCategory === 'corporate') {
          return (
            data.corporationType !== '' &&
            data.nameOrder !== null &&
            data.corporationName.trim() !== ''
          );
        }
        return false;
      case 8: {
        const hasResidenceOption = data.residenceAddressOption !== null;
        const hasConstructionAddress =
          data.constructionPostalCode.trim() !== '' &&
          data.constructionPrefecture.trim() !== '' &&
          data.constructionCity.trim() !== '' &&
          data.constructionTown.trim() !== '' &&
          data.constructionAddressLine.trim() !== '';

        const hasConstructionType = data.constructionPropertyType !== null;

        const hasResidenceAddress =
          data.residenceAddressOption === 'same'
            ? true
            : data.postalCode.trim() !== '' &&
              data.prefecture.trim() !== '' &&
              data.city.trim() !== '' &&
              data.town.trim() !== '' &&
              data.addressLine.trim() !== '';

        const hasResidenceType =
          data.residenceAddressOption === 'same'
            ? hasConstructionType
            : data.residencePropertyType !== null;

        return (
          hasResidenceOption &&
          hasConstructionType &&
          hasResidenceType &&
          hasConstructionAddress &&
          hasResidenceAddress
        );
      }
      case 9:
        // 個人のみ表示されるステップ
        if (data.customerCategory !== 'individual') return false;
        return (
          data.occupation !== null &&
          data.workDaysOff.length > 0
        );
      case 10:
        // 個人のみ表示されるステップ
        if (data.customerCategory !== 'individual') return false;
        return (
          data.numberOfAdults !== null &&
          data.numberOfChildren !== null &&
          data.householdMembers.length > 0 &&
          data.guestFrequency !== null
        );
      default:
        return false;
    }
  };

  const nextStep = () => {
    const totalSteps = getTotalSteps();
    if (currentStep < totalSteps && canProceed()) {
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
        setCustomerCategory,
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
        updatePersonalInfo,
        updateCorporateInfo,
        setPropertyType,
        updateAddress,
        setResidenceAddressOption,
        updateOccupation,
        updateFamily,
        setPhotoConsent,
        nextStep,
        prevStep,
        canProceed,
        getTotalSteps,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
