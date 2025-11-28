export const STATUS_ORDER = [
  '担当未決',
  '契約準備',
  '契約承認待',
  '契約可',
  '契約確認',
  '着工準備',
  '完了済',
] as const;

export const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case '担当未決':
      return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
    case '契約準備':
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
    case '契約承認待':
      return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
    case '契約可':
      return 'bg-green-100 text-green-700 hover:bg-green-200';
    case '契約確認':
      return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200';
    case '着工準備':
      return 'bg-orange-100 text-orange-700 hover:bg-orange-200';
    case '完了済':
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  }
};

export const normalizeDate = (value: string | null | undefined) => {
  if (!value) return null;
  const normalized = value.replace(/\//g, '-');
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed.getTime();
};

