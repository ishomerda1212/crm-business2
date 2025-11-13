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
  created_date: string | null;
  updated_date: string | null;
  created_at: string;
  updated_at: string;
};

export type Customer = {
  id: string;
  project_id: string;
  customer_name: string | null;
  furigana: string | null;
  phone1: string | null;
  phone2: string | null;
  email1: string | null;
  email2: string | null;
  property_number: string | null;
  address: string | null;
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
  created_at: string;
  updated_at: string;
};

export type ConstructionDetails = {
  id: string;
  project_id: string;
  equipment_data: Record<string, any>;
  construction_types: any[];
  other_warranty: any[];
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