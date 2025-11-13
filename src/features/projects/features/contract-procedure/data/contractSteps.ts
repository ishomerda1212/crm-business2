import type { Step } from '@/hooks/useProcedure';

export const contractSteps: Step[] = [
  { id: 'consent', title: '契約手続きの同意' },
  { id: 'customer-info', title: 'お客様情報のご確認' },
  { id: 'construction-details', title: '工事内容のご確認' },
  { id: 'important-items', title: '重要項目説明' },
  { id: 'warranty', title: '保証内容のご確認' },
  { id: 'contract-procedure', title: '契約手続き' },
  { id: 'company-notice', title: '会社からのご案内' },
];
