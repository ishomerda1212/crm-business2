import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectStatusSteps } from '../components/ProjectStatusSteps';
import { ProjectHeader } from '../components/ProjectHeader';
import { BasicInfoTab } from '../components/BasicInfoTab';
import { CustomerInfoTab } from '../components/CustomerInfoTab';
import { ConstructionTab } from '../components/ConstructionTab';
import { QuotationTab } from '../components/QuotationTab';
import { Project, Customer, CorporateInfo, PropertyInfo, Quotation, PaymentMethod, PaymentRequest } from '@/lib/supabase';
import { mockProjects, mockCustomer, mockCorporateInfo, mockPropertyInfo, mockQuotation, mockPaymentMethod, mockPaymentRequests } from '@/data/mockData';

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

  const handleEdit = () => {
    console.log('Edit project');
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-600">案件が見つかりません</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50">
      <ProjectHeader project={project} onBack={onBack} onEdit={handleEdit} />
      <ProjectStatusSteps currentStatus={project.status} />

      <div className="max-w-[1800px] mx-auto px-8 py-8">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="bg-white dark:bg-white border dark:border-gray-200 rounded-lg p-1 inline-flex gap-1">
            <TabsTrigger
              value="basic"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              案件情報
            </TabsTrigger>
            <TabsTrigger
              value="customer"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              顧客物件情報
            </TabsTrigger>
            <TabsTrigger
              value="construction"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              工事・保証内容
            </TabsTrigger>
            <TabsTrigger
              value="quotation"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
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
