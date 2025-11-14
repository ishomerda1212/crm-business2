import type { Step } from '@/hooks/useProcedure';

export const ratificationSteps: Step[] = [
  { id: 'project-info', title: '案件情報のご確認' },
  { id: 'consent', title: '同意事項' },
  { id: 'signature', title: '署名' },
];

