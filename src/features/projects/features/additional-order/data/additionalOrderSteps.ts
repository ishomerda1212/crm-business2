import type { Step } from '@/hooks/useProcedure';

export const additionalOrderSteps: Step[] = [
  { id: 'order-info', title: '追加注文情報のご確認' },
  { id: 'signature', title: '署名' },
];

