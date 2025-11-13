import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Project } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';

type BasicInfoTabProps = {
  project: Project;
};

export function BasicInfoTab({ project }: BasicInfoTabProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">基本情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-6">
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">案件ID</Label>
              <p className="mt-1 font-medium">{project.project_number}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">案件名</Label>
              <p className="mt-1 font-medium">{project.project_name}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">顧客名</Label>
              <p className="mt-1 font-medium text-orange-600">
                {project.customer_name || '-'}
              </p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">物件名</Label>
              <p className="mt-1 font-medium text-orange-600">
                {project.property_name || '-'}
              </p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">ステータス</Label>
              <p className="mt-1">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                  {project.status}
                </Badge>
              </p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">現場責任者</Label>
              <p className="mt-1 font-medium">{project.construction_manager || '-'}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">担当ID自体</Label>
              <p className="mt-1 font-medium">{project.client_id || 'ANDPAD ID'}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">案件番号</Label>
              <p className="mt-1 font-medium">{project.case_number || '-'}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">作成日</Label>
              <p className="mt-1 font-medium">
                {project.created_date
                  ? new Date(project.created_date).toLocaleDateString('ja-JP')
                  : '-'}
              </p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">更新日</Label>
              <p className="mt-1 font-medium">
                {project.updated_date
                  ? new Date(project.updated_date).toLocaleDateString('ja-JP')
                  : '-'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">工期表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-700">区分</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-700">契約日</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-700">契約締高工日</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-700">着工日</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-700">契約締高工日</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-700">完工日</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm">予定</td>
                  <td className="py-3 px-4 text-sm">2024/04/25</td>
                  <td className="py-3 px-4 text-sm">2024/05/01</td>
                  <td className="py-3 px-4 text-sm">2024/05/01</td>
                  <td className="py-3 px-4 text-sm">2024/07/31</td>
                  <td className="py-3 px-4 text-sm">2024/07/31</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm">実績</td>
                  <td className="py-3 px-4 text-sm">2024/04/25</td>
                  <td className="py-3 px-4 text-sm">-</td>
                  <td className="py-3 px-4 text-sm">2024/05/02</td>
                  <td className="py-3 px-4 text-sm">-</td>
                  <td className="py-3 px-4 text-sm">-</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">工事時間</Label>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">自動物件値</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">休み時間</Label>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">-</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">契約</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-4">
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">保証入</Label>
                <p className="mt-1 font-medium">妻</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">保証入合</Label>
                <p className="mt-1 font-medium">田主 一郎</p>
              </div>
            </div>

            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">保証入住所</Label>
              <p className="mt-1 text-sm">東京都中央区東京3-1-1-1</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-4">
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">税金保険</Label>
                <p className="mt-1 font-medium">妻</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">税金保険金額</Label>
                <p className="mt-1 font-medium">¥ 50,000</p>
              </div>
            </div>

            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">特約事項</Label>
              <div className="mt-2 space-y-1">
                <p className="text-sm">● ドーンに窓を外取り: チェック可</p>
                <p className="text-sm">● 既存壁設における外部窓 : チェック可</p>
                <p className="text-sm">● 新人屋（7/8以上）に寄る対象税：チェックなし</p>
                <p className="text-sm">● 東京都・在宅設による対象税：チェックなし</p>
              </div>
            </div>

            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">自由入力</Label>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-600">
                空欄条約引き算工工場前判に基礎、管理作業及び申わられ。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
