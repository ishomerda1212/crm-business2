import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ProjectStatusSteps } from '../components/ProjectStatusSteps';
import { ProjectHeader } from '../components/ProjectHeader';
import { BasicInfoTab } from '../components/BasicInfoTab';
import { CustomerInfoTab } from '../components/CustomerInfoTab';
import { ConstructionTab } from '../components/ConstructionTab';
import { QuotationTab } from '../components/QuotationTab';
import { Project, Customer, CorporateInfo, PropertyInfo, Quotation, PaymentMethod, PaymentRequest } from '@/lib/supabase';
import { mockProjects, mockCustomer, mockCorporateInfo, mockPropertyInfo, mockQuotation, mockPaymentMethod, mockPaymentRequests } from '@/data/mockData';
import { 
  UserPlus, 
  FileCheck, 
  Handshake, 
  FileSignature, 
  CheckCircle2, 
  Edit3, 
  ShoppingCart, 
  XCircle, 
  CreditCard, 
  FileText 
} from 'lucide-react';

type ProjectDetailPageProps = {
  projectId: string;
  onBack: () => void;
};

export function ProjectDetailPage({ projectId, onBack }: ProjectDetailPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [customer] = useState<Customer | null>(mockCustomer);
  const [corporateInfo] = useState<CorporateInfo | null>(mockCorporateInfo);
  const [propertyInfo] = useState<PropertyInfo | null>(mockPropertyInfo);
  const [quotation] = useState<Quotation | null>(mockQuotation);
  const [paymentMethod] = useState<PaymentMethod | null>(mockPaymentMethod);
  const [paymentRequests] = useState<PaymentRequest[]>(mockPaymentRequests);

  useEffect(() => {
    const foundProject = mockProjects.find(p => p.id === projectId);
    setProject(foundProject || null);
  }, [projectId]);

  const handleAction = (actionName: string) => {
    console.log(`Action: ${actionName}`);
    // TODO: 各機能の実装
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-600">案件が見つかりません</div>
      </div>
    );
  }

  const actionButtons = [
    { name: '担当者登録', icon: UserPlus, action: 'assign-staff' },
    { name: '現地調査同意手続', icon: FileCheck, action: 'survey-consent' },
    { name: '契約承認依頼', icon: Handshake, action: 'contract-approval' },
    { name: '契約手続', icon: FileSignature, action: 'contract-procedure' },
    { name: '追認同意手続', icon: CheckCircle2, action: 'ratification-consent' },
    { name: '変更合意手続', icon: Edit3, action: 'change-consent' },
    { name: '追加注文手続', icon: ShoppingCart, action: 'additional-order' },
    { name: '解約合意手続', icon: XCircle, action: 'cancellation-consent' },
    { name: 'コンビニ支払依頼', icon: CreditCard, action: 'convenience-payment' },
    { name: '帳票出力', icon: FileText, action: 'report-output' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 w-full overflow-x-hidden">
      <ProjectHeader project={project} onBack={onBack} />
      <ProjectStatusSteps currentStatus={project.status} />

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        {/* 機能ボタンエリア */}
        <div className="mb-6 bg-white dark:bg-white border dark:border-gray-200 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-700 mb-3">機能</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {actionButtons.map((button) => {
              const Icon = button.icon;
              return (
                <Button
                  key={button.action}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction(button.action)}
                  className="justify-start text-left h-auto py-2 px-3 hover:bg-orange-50 hover:border-orange-300"
                >
                  <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{button.name}</span>
                </Button>
              );
            })}
          </div>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="bg-white dark:bg-white border dark:border-gray-200 rounded-lg p-2 inline-flex gap-2 w-full sm:w-auto overflow-x-auto h-auto">
            <TabsTrigger
              value="basic"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white px-6 py-3 text-base font-medium"
            >
              案件情報
            </TabsTrigger>
            <TabsTrigger
              value="customer"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white px-6 py-3 text-base font-medium"
            >
              顧客物件情報
            </TabsTrigger>
            <TabsTrigger
              value="construction"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white px-6 py-3 text-base font-medium"
            >
              工事・保証内容
            </TabsTrigger>
            <TabsTrigger
              value="quotation"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white px-6 py-3 text-base font-medium"
            >
              請負・入金情報
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-6">
            <BasicInfoTab project={project} />
          </TabsContent>

          <TabsContent value="customer" className="mt-6">
            <CustomerInfoTab
              customer={customer}
              corporateInfo={corporateInfo}
              propertyInfo={propertyInfo}
            />
          </TabsContent>

          <TabsContent value="construction" className="mt-6">
            <ConstructionTab />
          </TabsContent>

          <TabsContent value="quotation" className="mt-6">
            <QuotationTab
              quotation={quotation}
              paymentMethod={paymentMethod}
              paymentRequests={paymentRequests}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
