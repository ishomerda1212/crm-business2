import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  project_number: string;
  project_name: string;
  status: string;
  customer_name: string | null;
  property_name: string | null;
  sales_person: string | null;
  construction_manager: string | null;
  client_id: string | null;
  case_number: string | null;
  quotation_url: string | null;
  created_date: string | null;
  updated_date: string | null;
  created_at: string;
  updated_at: string;
};

export type Customer = {
  id: string;
  project_id: string;
  customer_type: '個人' | '法人' | null;
  customer_name: string | null;
  furigana: string | null;
  phone1: string | null;
  phone2: string | null;
  email1: string | null;
  email2: string | null;
  property_number: string | null;
  address: string | null;
  occupation: string | null;
  household_income: string | null;
  work_holiday: string | null;
  adult_count: number | null;
  child_count: number | null;
  cohabitant_structure: string | null;
  pets: string | null;
  visitor_frequency: string | null;
  // 現住所物件情報
  current_property_type: '戸建' | '集合' | 'その他' | null;
  current_postal_code: string | null;
  current_prefecture: string | null;
  current_address: string | null;
  created_at: string;
  updated_at: string;
};

export type CorporateInfo = {
  id: string;
  project_id: string;
  corporate_name: string | null;
  representative_name: string | null;
  representative_title: string | null;
  contact_person_name: string | null;
  contact_person_title: string | null;
  created_at: string;
  updated_at: string;
};

export type PropertyInfo = {
  id: string;
  project_id: string;
  property_number: string | null;
  property_name: string | null;
  address: string | null;
  building_type: string | null;
  building_age: number | null;
  structure_method: string | null;
  building_owner_type: '本人' | '親族' | '賃貸' | null;
  building_owner_name: string | null;
  building_owner_relationship: string | null;
  land_owner_type: '本人' | '親族' | '賃貸' | null;
  land_owner_name: string | null;
  land_owner_relationship: string | null;
  // 工事住所情報
  construction_property_type: '戸建' | '集合' | 'その他' | null;
  construction_postal_code: string | null;
  construction_prefecture: string | null;
  construction_address: string | null;
  created_at: string;
  updated_at: string;
};

export type ConstructionDetails = {
  id: string;
  project_id: string;
  equipment_data: Record<string, unknown>;
  construction_types: unknown[];
  other_warranty: unknown[];
  warranty_details: string | null;
  created_at: string;
  updated_at: string;
};

export type Quotation = {
  id: string;
  project_id: string;
  contract_amount: number;
  point_discount: number;
  additional_work: number;
  subtraction: number;
  total_contract_amount: number;
  consumption_tax_rate: number;
  consumption_tax: number;
  total_amount: number;
  created_at: string;
  updated_at: string;
};

export type PaymentMethod = {
  id: string;
  project_id: string;
  deposit: number;
  loan: number;
  convenience_store: number;
  own_funds: number;
  credit_card: number;
  subsidy: number;
  total_payment: number;
  created_at: string;
  updated_at: string;
};

export type PaymentRequest = {
  id: string;
  project_id: string;
  request_name: string;
  request_send_date: string | null;
  contract_payment_date: string | null;
  contract_amount: number;
  payment_deadline: string | null;
  payment_amount: number;
  payment_confirmed: boolean;
  payment_date: string | null;
  note: string | null;
  created_at: string;
  updated_at: string;
};

export type CustomerListItem = {
  id: string;
  customer_id: string;
  customer_name: string;
  furigana: string;
  phone: string;
  email: string;
  acquisition_channel: string;
  status: string;
  registration_date: string;
};

export type ProjectListItem = {
  id: string;
  project_number: string;
  project_name: string;
  customer_name: string | null;
  status: string;
  contract_amount: number | null;
  sales_person: string | null;
  start_date: string | null;
  completion_date: string | null;
};

export type ApprovalType = 'contract-approval' | 'convenience-payment';

export type ApprovalRequest = {
  id: string;
  approval_type: ApprovalType;
  project_id: string;
  project_number: string;
  project_name: string;
  customer_name: string;
  applicant_name: string;
  requested_at: string;
  amount: number | null;
  status: 'pending' | 'approved' | 'rejected';
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type ContractInfo = {
  id: string;
  project_id: string;
  age_75plus?: 'not_75plus' | '75plus_with_guarantor' | '75plus_without_guarantor' | '75plus_no_guarantor_full_advance';
  guarantor: '要' | '不要';
  guarantor_address: string | null;
  defect_insurance: '要' | '不要';
  guarantor_name: string | null;
  defect_insurance_amount: number | null;
  construction_confirmation: '有' | '無' | null;
  registered_property_number: string | null;
  special_provisions: {
    loan: boolean;
    delivery_delay: boolean;
    advance_payment_75plus: boolean;
    display_stock_items: boolean;
  };
  free_input: string | null;
  created_at: string;
  updated_at: string;
};

export type CompletionInfo = {
  id: string;
  project_id: string;
  promotional_materials: {
    mail_supervisor_present: boolean;
    mail_supervisor_absent: boolean;
    postal_supervisor_present: boolean;
    postal_supervisor_absent: boolean;
  };
  remaining_work: string | null;
  consumer_product_safety_act?: 'applicable' | 'not_applicable';
  photo_publication: {
    all_allowed: boolean;
    partially_allowed: boolean;
    all_not_allowed: boolean;
    partial_options: {
      comments: boolean;
      outdoor_photos: boolean;
      indoor_photos_only: boolean;
      self_portraits_videos: boolean;
    };
  };
  created_at: string;
  updated_at: string;
};

export type LoanInfo = {
  id: string;
  project_id: string;
  company: string | null;
  branch: string | null;
  contact_person: string | null;
  contact_phone: string | null;
  created_at: string;
  updated_at: string;
};

export type InquiryInfo = {
  id: string;
  project_id: string;
  consideration_area: string | null;
  important_points: string | null;
  desired_completion_timing: string | null;
  budget: string | null;
  loan: string | null;
  quotation_status: string | null;
  created_at: string;
  updated_at: string;
};

export type CustomerMembership = {
  id: string;
  customer_id: string;
  membership_type: 'ゴールド会員' | 'シルバー会員' | 'ブロンズ会員' | null;
  current_points: number;
  total_earned_points: number;
  total_used_points: number;
  izclub_remarks: string | null;
  created_at: string;
  updated_at: string;
};

export type PointHistory = {
  id: string;
  customer_id: string;
  transaction_type: '付与' | '使用';
  points: number;
  reason: 
    | 'ゴールド会員' 
    | 'シルバー会員' 
    | 'ブロンズ会員' 
    | '工事完了' 
    | 'アンケート回答' 
    | '紹介キャンペーン'
    | 'お助けサービス利用' 
    | 'お助けポイント利用' 
    | 'ポイント利用';
  related_project_id: string | null;
  transaction_date: string;
  created_at: string;
  updated_at: string;
};

export type MembershipFeeHistory = {
  id: string;
  customer_id: string;
  fee_amount: number;
  payment_date: string | null;
  payment_method: string;
  payment_status: '支払済' | '未払' | 'キャンセル';
  billing_period: string;
  created_at: string;
  updated_at: string;
};