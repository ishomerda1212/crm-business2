/*
  # Renovation CRM Database Schema

  ## Overview
  This migration creates the complete database schema for a renovation project CRM system.

  ## New Tables

  ### 1. projects
  Core project/案件 information table
  - `id` (uuid, primary key)
  - `project_number` (text, unique) - 案件ID
  - `project_name` (text) - 案件名
  - `status` (text) - Status: 相談受付, 現地調査日程, 契約済成約済, 契約手続き, 完了手続, 完成調査, 実施台帳, 追加注文, 解約台帳, コンビニ支払, 帳票出力
  - `customer_name` (text) - 顧客名
  - `property_name` (text) - 物件名
  - `sales_person` (text) - 担当者
  - `construction_manager` (text) - 現場責任者
  - `client_id` (text) - Android/iOS ID
  - `case_number` (text) - 案件番号
  - `created_date` (date) - 作成日
  - `updated_date` (date) - 更新日
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. customers
  Customer information table - 顧客情報
  - `id` (uuid, primary key)
  - `project_id` (uuid, foreign key)
  - `customer_name` (text) - 顧客名
  - `furigana` (text) - フリガナ
  - `phone1` (text) - 電話番号1
  - `phone2` (text) - 電話番号2
  - `email1` (text) - メール1
  - `email2` (text) - メール2
  - `property_number` (text) - 住所番号
  - `address` (text) - 住所
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. corporate_info
  Corporate/legal entity information - 法人情報
  - `id` (uuid, primary key)
  - `project_id` (uuid, foreign key)
  - `corporate_name` (text) - 法人名
  - `representative_name` (text) - 代表者氏名
  - `representative_title` (text) - 代表者役職
  - `contact_person_name` (text) - 窓口担当者氏名
  - `contact_person_title` (text) - 担当者役職
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. property_info
  Property information - 物件情報
  - `id` (uuid, primary key)
  - `project_id` (uuid, foreign key)
  - `property_number` (text) - 住所番号
  - `property_name` (text) - 物件名
  - `address` (text) - 住所
  - `building_type` (text) - 建物
  - `building_age` (integer) - 築年数
  - `structure_method` (text) - 構造方法
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. construction_details
  Construction work details - 工事・保証内容
  - `id` (uuid, primary key)
  - `project_id` (uuid, foreign key)
  - `equipment_data` (jsonb) - 設備機器データ
  - `construction_types` (jsonb) - 工事種類
  - `other_warranty` (jsonb) - その他の保証
  - `warranty_details` (text) - 保証内容
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. quotations
  Quotation/estimate information - 請負金額
  - `id` (uuid, primary key)
  - `project_id` (uuid, foreign key)
  - `contract_amount` (decimal) - 契約時請負金額
  - `point_discount` (decimal) - ポイント割引
  - `additional_work` (decimal) - 追加工事
  - `subtraction` (decimal) - 減額
  - `total_contract_amount` (decimal) - 資材請負金額(合計)
  - `consumption_tax_rate` (decimal) - 消費税率
  - `consumption_tax` (decimal) - 消費税
  - `total_amount` (decimal) - 合計金額
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 7. payment_methods
  Payment method information - 支払方法
  - `id` (uuid, primary key)
  - `project_id` (uuid, foreign key)
  - `deposit` (decimal) - 着付金込
  - `loan` (decimal) - ローン
  - `convenience_store` (decimal) - コンビニ払い
  - `own_funds` (decimal) - 各種納入金
  - `credit_card` (decimal) - クレジットカード
  - `subsidy` (decimal) - 補助金等
  - `total_payment` (decimal) - 支払方法合計
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 8. payment_requests
  Payment request schedule - 請求
  - `id` (uuid, primary key)
  - `project_id` (uuid, foreign key)
  - `request_name` (text) - 請求名
  - `request_send_date` (date) - 請求書送付日
  - `contract_payment_date` (date) - 契約時請負金額請求日
  - `contract_amount` (decimal) - 契約時請負金額
  - `payment_deadline` (date) - 入金期限日
  - `payment_amount` (decimal) - 請求額
  - `payment_confirmed` (boolean) - 入金確認
  - `payment_date` (date) - 入金日
  - `note` (text) - 摘要
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 9. users
  Staff/user management
  - `id` (uuid, primary key)
  - `name` (text)
  - `email` (text, unique)
  - `role` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to manage their data
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_number text UNIQUE NOT NULL,
  project_name text NOT NULL,
  status text NOT NULL DEFAULT '相談受付',
  customer_name text,
  property_name text,
  sales_person text,
  construction_manager text,
  client_id text,
  case_number text,
  created_date date DEFAULT CURRENT_DATE,
  updated_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  customer_name text,
  furigana text,
  phone1 text,
  phone2 text,
  email1 text,
  email2 text,
  property_number text,
  address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create corporate_info table
CREATE TABLE IF NOT EXISTS corporate_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  corporate_name text,
  representative_name text,
  representative_title text,
  contact_person_name text,
  contact_person_title text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create property_info table
CREATE TABLE IF NOT EXISTS property_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  property_number text,
  property_name text,
  address text,
  building_type text,
  building_age integer,
  structure_method text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create construction_details table
CREATE TABLE IF NOT EXISTS construction_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  equipment_data jsonb DEFAULT '{}',
  construction_types jsonb DEFAULT '[]',
  other_warranty jsonb DEFAULT '[]',
  warranty_details text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create quotations table
CREATE TABLE IF NOT EXISTS quotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  contract_amount decimal(12,2) DEFAULT 0,
  point_discount decimal(12,2) DEFAULT 0,
  additional_work decimal(12,2) DEFAULT 0,
  subtraction decimal(12,2) DEFAULT 0,
  total_contract_amount decimal(12,2) DEFAULT 0,
  consumption_tax_rate decimal(5,2) DEFAULT 10.00,
  consumption_tax decimal(12,2) DEFAULT 0,
  total_amount decimal(12,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payment_methods table
CREATE TABLE IF NOT EXISTS payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  deposit decimal(12,2) DEFAULT 0,
  loan decimal(12,2) DEFAULT 0,
  convenience_store decimal(12,2) DEFAULT 0,
  own_funds decimal(12,2) DEFAULT 0,
  credit_card decimal(12,2) DEFAULT 0,
  subsidy decimal(12,2) DEFAULT 0,
  total_payment decimal(12,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payment_requests table
CREATE TABLE IF NOT EXISTS payment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  request_name text NOT NULL,
  request_send_date date,
  contract_payment_date date,
  contract_amount decimal(12,2) DEFAULT 0,
  payment_deadline date,
  payment_amount decimal(12,2) DEFAULT 0,
  payment_confirmed boolean DEFAULT false,
  payment_date date,
  note text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text DEFAULT 'staff',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE corporate_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE construction_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for projects
CREATE POLICY "Allow all authenticated users to read projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all authenticated users to insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for customers
CREATE POLICY "Allow all authenticated users to read customers"
  ON customers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all authenticated users to insert customers"
  ON customers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update customers"
  ON customers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to delete customers"
  ON customers FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for corporate_info
CREATE POLICY "Allow all authenticated users to read corporate_info"
  ON corporate_info FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all authenticated users to insert corporate_info"
  ON corporate_info FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update corporate_info"
  ON corporate_info FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to delete corporate_info"
  ON corporate_info FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for property_info
CREATE POLICY "Allow all authenticated users to read property_info"
  ON property_info FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all authenticated users to insert property_info"
  ON property_info FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update property_info"
  ON property_info FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to delete property_info"
  ON property_info FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for construction_details
CREATE POLICY "Allow all authenticated users to read construction_details"
  ON construction_details FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all authenticated users to insert construction_details"
  ON construction_details FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update construction_details"
  ON construction_details FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to delete construction_details"
  ON construction_details FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for quotations
CREATE POLICY "Allow all authenticated users to read quotations"
  ON quotations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all authenticated users to insert quotations"
  ON quotations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update quotations"
  ON quotations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to delete quotations"
  ON quotations FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for payment_methods
CREATE POLICY "Allow all authenticated users to read payment_methods"
  ON payment_methods FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all authenticated users to insert payment_methods"
  ON payment_methods FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update payment_methods"
  ON payment_methods FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to delete payment_methods"
  ON payment_methods FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for payment_requests
CREATE POLICY "Allow all authenticated users to read payment_requests"
  ON payment_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all authenticated users to insert payment_requests"
  ON payment_requests FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update payment_requests"
  ON payment_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to delete payment_requests"
  ON payment_requests FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for users
CREATE POLICY "Allow all authenticated users to read users"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all authenticated users to insert users"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update users"
  ON users FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to delete users"
  ON users FOR DELETE
  TO authenticated
  USING (true);