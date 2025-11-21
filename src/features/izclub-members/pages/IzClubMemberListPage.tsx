import { useState } from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { IzClubMemberListItem } from '@/lib/supabase';
import { mockIzClubMemberList } from '@/data/mockData';

type IzClubMemberListPageProps = {
  onViewDetail?: (customerId: string) => void;
};

const getStatusBadgeColor = (status: IzClubMemberListItem['status']) => {
  switch (status) {
    case '口座振替登録完了':
      return 'bg-green-100 text-green-700 hover:bg-green-200 border-0';
    case '銀行送付済':
      return 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-0';
    case '銀行送付未':
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-0';
    case 'WEB登録中':
      return 'bg-purple-100 text-purple-700 hover:bg-purple-200 border-0';
    case '不備書類再送済':
      return 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-0';
    case '不備書類再送未':
      return 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-0';
    case '不備書類待ち':
      return 'bg-red-100 text-red-700 hover:bg-red-200 border-0';
    case '除外':
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-0';
    case 'コンビニ決済':
      return 'bg-pink-100 text-pink-700 hover:bg-pink-200 border-0';
    case '都度振込':
      return 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-0';
    case 'WEB登録':
      return 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 border-0';
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-0';
  }
};

const getMembershipTypeBadgeColor = (type: IzClubMemberListItem['membership_type']) => {
  switch (type) {
    case 'ゴールド会員':
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-0';
    case 'シルバー会員':
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-0';
    case 'ブロンズ会員':
      return 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-0';
    default:
      return 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-0';
  }
};

export function IzClubMemberListPage({ onViewDetail }: IzClubMemberListPageProps) {
  const [members] = useState<IzClubMemberListItem[]>(mockIzClubMemberList);

  const handleViewDetail = (customerId: string) => {
    if (onViewDetail) {
      onViewDetail(customerId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 w-full overflow-x-hidden">
      <div className="bg-white dark:bg-white border-b dark:border-gray-200 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-900 mb-2">
              イズクラブ会員一覧
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-600">
              イズクラブ会員の情報を管理
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        <div className="bg-white dark:bg-white rounded-lg border dark:border-gray-200 shadow-sm">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-900 mb-4">
              会員リスト
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                      顧客ID
                    </TableHead>
                    <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                      顧客名
                    </TableHead>
                    <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                      申請状態
                    </TableHead>
                    <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                      収納代行先
                    </TableHead>
                    <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                      会員区分
                    </TableHead>
                    <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                      ポイント
                    </TableHead>
                    <TableHead className="text-gray-900 dark:text-gray-900 font-medium">
                      操作
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-gray-600 dark:text-gray-600 py-8">
                        会員がありません
                      </TableCell>
                    </TableRow>
                  ) : (
                    members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="text-gray-900 dark:text-gray-900">
                          {member.customer_id}
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-900">
                          {member.customer_name}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(member.status)}>
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-900">
                          {member.collection_agency || '-'}
                        </TableCell>
                        <TableCell>
                          <Badge className={getMembershipTypeBadgeColor(member.membership_type)}>
                            {member.membership_type || '未設定'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-900 font-semibold">
                          {member.current_points.toLocaleString()} pt
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetail(member.customer_id)}
                            className="gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            詳細
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

