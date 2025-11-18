import type { Step } from '@/hooks/useProcedure';

export const completionSteps: Step[] = [
  { id: 'construction-confirm', title: '工事完了確認' },
  { id: 'warranty-confirm', title: '保証内容確認' },
  { id: 'settlement', title: '精算' },
  { id: 'handover', title: '引き渡し' },
  { id: 'promotional-material', title: '販促物のお願い' },
  { id: 'company-notice', title: '会社からのご案内' },
];
