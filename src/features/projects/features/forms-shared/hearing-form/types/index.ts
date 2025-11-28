export type ReformArea =
  | 'whole'
  | 'kitchen'
  | 'bathroom'
  | 'toilet'
  | 'washroom'
  | 'water-heater'
  | 'exterior'
  | 'roof'
  | 'exterior-structure'
  | 'balcony-veranda'
  | 'garden'
  | 'interior-wall'
  | 'interior-floor'
  | 'interior-ceiling'
  | 'entrance'
  | 'window'
  | 'hallway'
  | 'stairs'
  | 'storage'
  | 'layout-change'
  | 'seismic'
  | 'insulation'
  | 'plumbing'
  | 'other';

export type PriorityPoint =
  | 'price'
  | 'schedule'
  | 'proposal'
  | 'staff'
  | 'afterService';

export type DesiredCompletionTiming =
  | 'asap'
  | 'oneMonth'
  | 'twoMonths'
  | 'thisYear'
  | 'nextYear'
  | 'yearAfterNext';

export type BudgetRange =
  | 'under-1m'
  | '100-150'
  | '150-200'
  | 'under-5m'
  | 'under-10m'
  | 'under-15m'
  | 'under-20m'
  | 'over-20m'
  | 'undecided';

export type LoanPreference = 'considerIfBenefit' | 'notConsidering';

export type EstimateStatus =
  | 'decideIfMatch'
  | 'none'
  | 'one'
  | 'two'
  | 'threeOrMore';

export type RegistrationType = 'new' | 'existing';

export type CustomerType = 'new' | 'existing';
export type CustomerCategory = 'individual' | 'corporate';

export interface ReformInquiryData {
  customerType: CustomerType | null; // 'new' | 'existing'
  customerCategory: CustomerCategory | null; // 個人/法人
  selectedCustomerId: string | null; // 既存客の場合の顧客ID
  selectedPropertyId: string | null; // 既存客の場合の選択された物件ID
  reformAreas: ReformArea[];
  priorityPoints: PriorityPoint[];
  desiredCompletion: DesiredCompletionTiming | null;
  desiredCompletionNote: string;
  budget: BudgetRange | null;
  loanPreference: LoanPreference | null;
  estimateStatus: EstimateStatus | null;
  estimateCompanyName: string;
  registrationType: RegistrationType;
  registrationEmail: string;
  registrationPhone: string;
  loginEmail: string;
  loginPassword: string;
  // 顧客情報
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  corporationType: string;
  nameOrder: 'prefix' | 'suffix' | null;
  corporationName: string;
  representativeTitle: string;
  representativeName: string;
  contactPersonName: string;
  // 住所情報
  constructionPropertyType: 'singleFamily' | 'multiUnit' | 'office' | null;
  residencePropertyType: 'singleFamily' | 'multiUnit' | 'office' | null;
  residenceAddressOption: 'same' | 'different' | null;
  postalCode: string;
  prefecture: string;
  city: string;
  town: string;
  addressLine: string;
  building: string;
  room: string;
  constructionPostalCode: string;
  constructionPrefecture: string;
  constructionCity: string;
  constructionTown: string;
  constructionAddressLine: string;
  constructionBuilding: string;
  constructionRoom: string;
  buildingOwner: '本人' | '親族' | '賃貸' | null;
  landOwner: '本人' | '親族' | '賃貸' | null;
  // 職業情報（個人のみ）
  occupation: '会社員' | '公務員' | '自営業' | 'その他' | null;
  workDaysOff: ('月' | '火' | '水' | '木' | '金' | '土' | '日' | '不定休')[];
  // 家族情報（個人のみ）
  numberOfAdults: number | null;
  numberOfChildren: number | null;
  householdMembers: ('夫' | '妻' | '子' | '父' | '母' | '祖父' | '祖母' | '兄弟姉妹')[];
  pets: string;
  guestFrequency: 'ほぼ無し' | '毎週' | '毎月' | '半年' | '毎年' | null;
  photoConsent: boolean;
}

export type HearingFormStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
