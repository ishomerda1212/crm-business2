import type { Step } from '@/hooks/useProcedure';

export const changeSteps: Step[] = [
  { id: 'project-info', title: '案件情報のご確認' },
  { id: 'change-info', title: '変更内容のご確認' },
  { id: 'consent', title: '同意事項' },
  { id: 'signature', title: '署名' },
];

