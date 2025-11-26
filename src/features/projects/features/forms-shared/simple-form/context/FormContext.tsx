import { createContext, useContext, useState, ReactNode } from 'react';
import {
  CustomerFormData,
  CustomerType,
  FormStep,
  PropertyType,
  ResidenceAddressOption,
} from '../types';

interface FormContextType {
  data: CustomerFormData;
  currentStep: FormStep;
  setCustomerType: (type: CustomerType) => void;
  updatePersonalInfo: (payload: Partial<Pick<CustomerFormData, 'lastName' | 'firstName' | 'lastNameKana' | 'firstNameKana'>>) => void;
  updateCorporateInfo: (payload: Partial<Pick<CustomerFormData, 'corporationType' | 'nameOrder' | 'corporationName' | 'representativeTitle' | 'representativeName' | 'contactPersonName'>>) => void;
  setPropertyType: (target: 'construction' | 'residence', type: PropertyType) => void;
  updateAddress: (payload: Partial<CustomerFormData>) => void;
  setResidenceAddressOption: (option: ResidenceAddressOption) => void;
  updateOccupation: (payload: Partial<Pick<CustomerFormData, 'occupation' | 'workDaysOff'>>) => void;
  updateFamily: (payload: Partial<Pick<CustomerFormData, 'numberOfAdults' | 'numberOfChildren' | 'householdMembers' | 'pets' | 'guestFrequency'>>) => void;
  setPhotoConsent: (consent: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  canProceed: () => boolean;
  getTotalSteps: () => number;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCustomerFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useCustomerFormContext must be used within CustomerFormProvider');
  }
  return context;
};

const initialState: CustomerFormData = {
  customerType: null,
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
  occupation: null,
  workDaysOff: [],
  numberOfAdults: null,
  numberOfChildren: null,
  householdMembers: [],
  pets: '',
  guestFrequency: null,
  photoConsent: false,
};

export const CustomerFormProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [data, setData] = useState<CustomerFormData>(initialState);

  const setCustomerType = (type: CustomerType) => {
    setData(prev => ({
      ...prev,
      customerType: type,
      // reset step-specific data when switching type
      lastName: type === 'individual' ? prev.lastName : '',
      firstName: type === 'individual' ? prev.firstName : '',
      lastNameKana: type === 'individual' ? prev.lastNameKana : '',
      firstNameKana: type === 'individual' ? prev.firstNameKana : '',
      corporationType: type === 'corporate' ? prev.corporationType : '',
      nameOrder: type === 'corporate' ? prev.nameOrder : null,
      corporationName: type === 'corporate' ? prev.corporationName : '',
      representativeTitle: type === 'corporate' ? prev.representativeTitle : '',
      representativeName: type === 'corporate' ? prev.representativeName : '',
      contactPersonName: type === 'corporate' ? prev.contactPersonName : '',
    }));
  };

  const updatePersonalInfo: FormContextType['updatePersonalInfo'] = payload => {
    setData(prev => ({
      ...prev,
      ...payload,
    }));
  };

  const updateCorporateInfo: FormContextType['updateCorporateInfo'] = payload => {
    setData(prev => ({
      ...prev,
      ...payload,
    }));
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
      const next: CustomerFormData = {
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
      const next: CustomerFormData = {
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
    setData(prev => ({
      ...prev,
      ...payload,
    }));
  };

  const updateFamily: FormContextType['updateFamily'] = payload => {
    setData(prev => ({
      ...prev,
      ...payload,
    }));
  };

  const setPhotoConsent = (consent: boolean) => {
    setData(prev => ({ ...prev, photoConsent: consent }));
  };

  const getTotalSteps = (): number => {
    return data.customerType === 'individual' ? 5 : 3;
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.customerType !== null;
      case 2:
        if (data.customerType === 'individual') {
          return (
            data.lastName.trim() !== '' &&
            data.firstName.trim() !== '' &&
            data.lastNameKana.trim() !== '' &&
            data.firstNameKana.trim() !== ''
          );
        }
        if (data.customerType === 'corporate') {
          return (
            data.corporationType !== '' &&
            data.nameOrder !== null &&
            data.corporationName.trim() !== ''
          );
        }
        return false;
      case 3: {
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
      case 4:
        // 個人のみ表示されるステップ
        if (data.customerType !== 'individual') return false;
        return (
          data.occupation !== null &&
          data.workDaysOff.length > 0
        );
      case 5:
        // 個人のみ表示されるステップ
        if (data.customerType !== 'individual') return false;
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

