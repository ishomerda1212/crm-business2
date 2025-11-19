import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CompanySettingsPage } from './CompanySettingsPage';
import { BranchListPage } from './BranchListPage';
import { StaffListPage } from './StaffListPage';
import { ApprovalRoutePage } from './ApprovalRoutePage';
import { ConstructionContentPage } from './ConstructionContentPage';
import { ImportantItemDescriptionPage } from './ImportantItemDescriptionPage';
import { WarrantyContentPage } from './WarrantyContentPage';
import { ChangeConsentSettingsPage } from './ChangeConsentSettingsPage';
import { RatificationConsentSettingsPage } from './RatificationConsentSettingsPage';

type SettingsSubPage = 'company' | 'branches' | 'staff' | 'approval-routes' | 'construction-content' | 'important-items' | 'warranty-content' | 'change-consent' | 'ratification-consent';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsSubPage>('company');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 w-full overflow-x-hidden">
      <div className="bg-white dark:bg-white border-b dark:border-gray-200 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-orange-500">設定</p>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-900">
                組織・ユーザー設定
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                自社情報や拠点、担当者を一元管理します。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as SettingsSubPage)}>
          <TabsList className="grid w-full max-w-5xl grid-cols-9 mb-6">
            <TabsTrigger value="company">自社設定</TabsTrigger>
            <TabsTrigger value="branches">店舗・拠点リスト</TabsTrigger>
            <TabsTrigger value="staff">担当者リスト</TabsTrigger>
            <TabsTrigger value="approval-routes">承認ルート</TabsTrigger>
            <TabsTrigger value="construction-content">工事内容</TabsTrigger>
            <TabsTrigger value="important-items">重要項目説明</TabsTrigger>
            <TabsTrigger value="warranty-content">保証内容</TabsTrigger>
            <TabsTrigger value="change-consent">変更合意</TabsTrigger>
            <TabsTrigger value="ratification-consent">追認同意</TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="mt-0">
            <CompanySettingsPage />
          </TabsContent>

          <TabsContent value="branches" className="mt-0">
            <BranchListPage />
          </TabsContent>

          <TabsContent value="staff" className="mt-0">
            <StaffListPage />
          </TabsContent>

          <TabsContent value="approval-routes" className="mt-0">
            <ApprovalRoutePage />
          </TabsContent>

          <TabsContent value="construction-content" className="mt-0">
            <ConstructionContentPage />
          </TabsContent>

          <TabsContent value="important-items" className="mt-0">
            <ImportantItemDescriptionPage />
          </TabsContent>

          <TabsContent value="warranty-content" className="mt-0">
            <WarrantyContentPage />
          </TabsContent>

          <TabsContent value="change-consent" className="mt-0">
            <ChangeConsentSettingsPage />
          </TabsContent>

          <TabsContent value="ratification-consent" className="mt-0">
            <RatificationConsentSettingsPage />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
