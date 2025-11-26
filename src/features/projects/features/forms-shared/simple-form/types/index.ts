export type CustomerType = 'individual' | 'corporate';

export type CorporationType =
  | '株式会社'
  | '合同会社'
  | '有限会社'
  | '合資会社'
  | '合名会社'
  | '社会福祉法人'
  | '医療法人'
  | '管理組合'
  | '事務所'
  | '歯科医院'
  | '工務店'
  | 'その他';

export type NameOrder = 'prefix' | 'suffix';

export type PropertyType = 'singleFamily' | 'multiUnit' | 'office';

export type ResidenceAddressOption = 'same' | 'different';

export type OwnerType = '本人' | '親族' | '賃貸';

export interface CustomerFormData {
  customerType: CustomerType | null;
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  corporationType: CorporationType | '';
  nameOrder: NameOrder | null;
  corporationName: string;
  representativeTitle: string;
  representativeName: string;
  contactPersonName: string;
  constructionPropertyType: PropertyType | null;
  residencePropertyType: PropertyType | null;
  residenceAddressOption: ResidenceAddressOption | null;
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
  buildingOwner: OwnerType | null;
  landOwner: OwnerType | null;
  // 職業情報（個人のみ）
  occupation: Occupation | null;
  workDaysOff: DayOfWeek[];
  // 家族情報（個人のみ）
  numberOfAdults: number | null;
  numberOfChildren: number | null;
  householdMembers: HouseholdMember[];
  pets: string;
  guestFrequency: GuestFrequency | null;
  photoConsent: boolean;
}

export type FormStep = 1 | 2 | 3 | 4 | 5;

export type Occupation = '会社員' | '公務員' | '自営業' | 'その他';

export type DayOfWeek = '月' | '火' | '水' | '木' | '金' | '土' | '日' | '不定休';

export type HouseholdMember = '夫' | '妻' | '子' | '父' | '母' | '祖父' | '祖母' | '兄弟姉妹';

export type GuestFrequency = 'ほぼ無し' | '毎週' | '毎月' | '半年' | '毎年';

