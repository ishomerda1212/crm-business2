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

export interface ReformInquiryData {
  customerType: CustomerType | null;
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
}

export type FormStep = 1 | 2 | 3 | 4 | 5 | 6;
