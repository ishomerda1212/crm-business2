import type { Step } from '@/hooks/useProcedure';

export const cancellationSteps: Step[] = [
  { id: 'info', title: '解約情報のご確認' },
  { id: 'signature', title: '署名' },
];

