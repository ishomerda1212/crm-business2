import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, Coins, Award, ChevronRight, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { Customer, CorporateInfo, CustomerMembership, PropertyInfo, ProjectListItem } from '@/lib/supabase';
import { mockCustomer, mockCorporateInfo, mockCustomerMembership, mockPropertyInfo, mockProjectList } from '@/data/mockData';
import { CreateProjectDialog } from '@/features/projects/components/CreateProjectDialog';
import type { CustomerSearchCandidate } from '@/features/projects/types/CustomerSearchCandidate';
import { ConstructionAddressFormDialog } from '@/features/property/components/ConstructionAddressFormDialog';

type CustomerDetailPageProps = {
  customerId: string;
  onBack: () => void;
  onNavigate?: (page: string, customerId?: string) => void;
  onSelectProperty?: (propertyId: string) => void;
  onCreateProject?: (candidate?: CustomerSearchCandidate | null, propertyInfo?: PropertyInfo) => void;
};

export function CustomerDetailPage({ customerId, onBack, onNavigate, onSelectProperty, onCreateProject }: CustomerDetailPageProps) {
  const [customer] = useState<Customer | null>(mockCustomer);
  const [corporateInfo] = useState<CorporateInfo | null>(mockCorporateInfo);
  const [membership] = useState<CustomerMembership | null>(mockCustomerMembership);
  const [properties] = useState<PropertyInfo[]>([mockPropertyInfo]);
  const [allProjects] = useState<ProjectListItem[]>(mockProjectList);
  const [isCustomerDetailOpen, setIsCustomerDetailOpen] = useState(false);
  const [showConstructionAddressFormDialog, setShowConstructionAddressFormDialog] = useState(false);

  // TODO: customerIdに基づいて実際のデータを取得
  useEffect(() => {
    // 将来的にAPIからデータを取得する処理を追加
  }, [customerId]);

  // この顧客に関連する案件をフィルタリング
  const relatedProjects = useMemo(() => {
    if (!customer?.customer_name) return [];
    return allProjects.filter((project) => project.customer_name === customer.customer_name);
  }, [customer, allProjects]);

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '-';
    return `¥${amount.toLocaleString()}`;
  };

  const getStatusBadgeColor = (status: string) => {
    if (status.includes('完了') || status.includes('済')) {
      return 'bg-green-100 text-green-700 hover:bg-green-200';
    }
    if (status.includes('契約') || status.includes('準備')) {
      return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
    }
    if (status.includes('未決') || status.includes('待')) {
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
    }
    return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  };

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-600">顧客が見つかりません</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 w-full overflow-x-hidden">
      {/* ヘッダー */}
      <div className="bg-white dark:bg-white border-b dark:border-gray-200 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-gray-600 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              戻る
            </Button>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-900 mb-2">
              顧客詳細
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-600">顧客情報の詳細を表示</p>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左側: メインコンテンツ (3/4) */}
          <div className="lg:col-span-3 space-y-6">
            {/* 顧客情報セクション */}
            <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">顧客情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* 顧客ID・外部連携顧客ID */}
                  <div className="space-y-4 pb-6 border-b border-gray-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">顧客ID</Label>
                        <p className="mt-1 text-base font-medium">
                          {customer.customer_id || '-'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">外部連携顧客ID</Label>
                        <p className="mt-1 text-base font-medium">
                          {customer.external_customer_id || '-'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 個人情報 */}
                  {customer.customer_type === '個人' && (
                    <div className="space-y-4 pb-6 border-b border-gray-200">
                      <div className="text-sm font-medium text-gray-700 mb-3">〈顧客種別: 個人〉</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                        <div>
                          <Label className="text-sm text-gray-600 dark:text-gray-600">顧客名</Label>
                          <p className="mt-1 text-base text-red-600 font-medium">
                            {customer.customer_name || '-'}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600 dark:text-gray-600">フリガナ</Label>
                          <p className="mt-1 text-base">
                            {customer.furigana || '-'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 法人情報 */}
                  {(customer.customer_type === '法人' || corporateInfo) && (
                    <div className="space-y-4 pb-6 border-b border-gray-200">
                      <div className="text-sm font-medium text-gray-700 mb-3">〈顧客種別: 法人〉</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                        <div>
                          <Label className="text-sm text-gray-600 dark:text-gray-600">法人名</Label>
                          <p className="mt-1 text-base">
                            {corporateInfo?.corporate_name || '-'}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600 dark:text-gray-600">代表者名</Label>
                          <p className="mt-1 text-base">
                            {corporateInfo?.representative_title && corporateInfo?.representative_name
                              ? `${corporateInfo.representative_title} ${corporateInfo.representative_name}`
                              : corporateInfo?.representative_name || '-'}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600 dark:text-gray-600">窓口担当者名</Label>
                          <p className="mt-1 text-base">
                            {corporateInfo?.contact_person_name || '-'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 連絡先 */}
                  <div className="space-y-4 pb-6 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-700 mb-3">〈連絡先〉</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">電話番号1</Label>
                        <p className="mt-1 text-base">
                          {customer.phone1 || '-'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">電話番号2</Label>
                        <p className="mt-1 text-base">
                          {customer.phone2 || '-'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">メールアドレス1</Label>
                        <p className="mt-1 text-base">
                          {customer.email1 ? (
                            <a href={`mailto:${customer.email1}`} className="text-blue-600 hover:underline">
                              {customer.email1}
                            </a>
                          ) : (
                            '-'
                          )}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">メールアドレス2</Label>
                        <p className="mt-1 text-base">
                          {customer.email2 ? (
                            <a href={`mailto:${customer.email2}`} className="text-blue-600 hover:underline">
                              {customer.email2}
                            </a>
                          ) : (
                            '-'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 現住所 */}
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-gray-700 mb-3">〈現住所〉</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">物件種別</Label>
                        <p className="mt-1 text-base">
                          {customer.current_property_type || '-'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">住所</Label>
                        <p className="mt-1 text-base">
                          {customer.current_postal_code && customer.current_prefecture && customer.current_address
                            ? `${customer.current_postal_code} ${customer.current_prefecture} ${customer.current_address}`
                            : customer.current_address || '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 顧客詳細セクション（折りたたみ可能） */}
            <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
              <Collapsible open={isCustomerDetailOpen} onOpenChange={setIsCustomerDetailOpen}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">顧客詳細</CardTitle>
                      {isCustomerDetailOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">職業</Label>
                        <p className="mt-1 text-base">
                          {customer.occupation || '-'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">世帯年収</Label>
                        <p className="mt-1 text-base">
                          {customer.household_income || '-'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">仕事の休み</Label>
                        <p className="mt-1 text-base">
                          {customer.work_holiday || '-'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">大人人数</Label>
                        <p className="mt-1 text-base">
                          {customer.adult_count !== null ? customer.adult_count : '-'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">子供人数</Label>
                        <p className="mt-1 text-base">
                          {customer.child_count !== null ? customer.child_count : '-'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">同居者構成</Label>
                        <p className="mt-1 text-base">
                          {customer.cohabitant_structure || '-'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">ペット</Label>
                        <p className="mt-1 text-base">
                          {customer.pets || '-'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600 dark:text-gray-600">来客頻度</Label>
                        <p className="mt-1 text-base">
                          {customer.visitor_frequency || '-'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

          {/* 物件一覧 */}
          <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">関連物件一覧</CardTitle>
                <Button
                  type="button"
                  onClick={() => setShowConstructionAddressFormDialog(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  新規で工事住所を登録する
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        物件名
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        住所
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        物件種別
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        建築年
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-600 dark:text-gray-600 py-8">
                          物件がありません
                        </TableCell>
                      </TableRow>
                    ) : (
                      properties.map((property) => (
                        <TableRow 
                          key={property.id}
                          className="cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => onSelectProperty && onSelectProperty(property.id)}
                        >
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {property.property_name || '-'}
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {property.address || '-'}
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {property.building_type || '-'}
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {property.building_age ? `${property.building_age}年` : '-'}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* 案件一覧 */}
          <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">関連案件一覧</CardTitle>
                <CreateProjectDialog
                  onProceed={(candidate, propertyInfo) => onCreateProject?.(candidate, propertyInfo)}
                  trigger={
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      新規案件追加
                    </Button>
                  }
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        案件番号
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        案件名
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        ステータス
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        契約金額
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                        担当者
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {relatedProjects.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-600 dark:text-gray-600 py-8">
                          案件がありません
                        </TableCell>
                      </TableRow>
                    ) : (
                      relatedProjects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {project.project_number}
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {project.project_name}
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusBadgeColor(project.status)} border-0`}>
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {formatCurrency(project.contract_amount)}
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-900">
                            {project.sales_person || '-'}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          </div>

          {/* 右側: 会員区分・ポイントカード (1/4) */}
          <div className="lg:col-span-1 space-y-6">
            <Card 
              className="bg-gradient-to-br from-orange-50 to-blue-50 dark:from-orange-50 dark:to-blue-50 border-orange-300 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => onNavigate && onNavigate('customer-history', customerId)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500 rounded-full p-3">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <Label className="text-xs text-gray-600 dark:text-gray-600">会員区分</Label>
                      <p className="text-lg font-bold text-orange-600 mt-1">
                        {membership?.membership_type || '一般'}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500 rounded-full p-3">
                        <Coins className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <Label className="text-xs text-gray-600 dark:text-gray-600">保有ポイント</Label>
                        <p className="text-lg font-bold text-blue-600 mt-1">
                          {membership?.current_points.toLocaleString() || '0'} pt
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-end">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ConstructionAddressFormDialog
        open={showConstructionAddressFormDialog}
        onOpenChange={setShowConstructionAddressFormDialog}
        customerId={customerId}
      />
    </div>
  );
}

