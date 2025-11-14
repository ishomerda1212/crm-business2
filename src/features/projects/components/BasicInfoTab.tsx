import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Project, ContractInfo, CompletionInfo } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

type BasicInfoTabProps = {
  project: Project;
  contractInfo?: ContractInfo;
  completionInfo?: CompletionInfo;
};

export function BasicInfoTab({ project, contractInfo, completionInfo }: BasicInfoTabProps) {
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-700">契約時着工予定日</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-700">着工日</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-700">契約時完工予定日</th>
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
                <Label className="text-sm text-gray-600 dark:text-gray-600">保証人</Label>
                <p className="mt-1 font-medium">{contractInfo?.guarantor || '要'}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">保証人名</Label>
                <p className="mt-1 font-medium">{contractInfo?.guarantor_name || '田中一郎'}</p>
              </div>
            </div>

            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">保証人住所</Label>
              <p className="mt-1 text-sm">{contractInfo?.guarantor_address || '東京都渋谷区道玄坂1-2-3'}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-4">
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">瑕疵保険</Label>
                <p className="mt-1 font-medium">{contractInfo?.defect_insurance || '要'}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">瑕疵保険金額</Label>
                <p className="mt-1 font-medium">
                  {contractInfo?.defect_insurance_amount
                    ? `¥${contractInfo.defect_insurance_amount.toLocaleString()}`
                    : '¥50,000'}
                </p>
              </div>
            </div>

            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">特約事項</Label>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm">●</span>
                  <span className="text-sm">ローンに関する特記</span>
                  <span className="text-sm text-gray-500">
                    {contractInfo?.special_provisions?.loan ? 'チェックあり' : 'チェックなし'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">●</span>
                  <span className="text-sm">納期遅延に関する特記</span>
                  <span className="text-sm text-gray-500">
                    {contractInfo?.special_provisions?.delivery_delay ? 'チェックあり' : 'チェックなし'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">●</span>
                  <span className="text-sm">前入金 (75歳以上) に関する特記</span>
                  <span className="text-sm text-gray-500">
                    {contractInfo?.special_provisions?.advance_payment_75plus ? 'チェックあり' : 'チェックなし'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">●</span>
                  <span className="text-sm">展示品・在庫品に関する特記</span>
                  <span className="text-sm text-gray-500">
                    {contractInfo?.special_provisions?.display_stock_items ? 'チェックあり' : 'チェックなし'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">自由入力</Label>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-600">
                {contractInfo?.free_input || '近隣挨拶は着工1週間前に実施。夜間作業は行わない。'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">完了</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600 mb-3 block">販促物</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={completionInfo?.promotional_materials?.mail_supervisor_present ? 'default' : 'outline'}
                  size="sm"
                  className={
                    completionInfo?.promotional_materials?.mail_supervisor_present
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }
                >
                  メ・監督有
                </Button>
                <Button
                  variant={completionInfo?.promotional_materials?.mail_supervisor_absent ? 'default' : 'outline'}
                  size="sm"
                  className={
                    completionInfo?.promotional_materials?.mail_supervisor_absent
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }
                >
                  メ・監督無
                </Button>
                <Button
                  variant={completionInfo?.promotional_materials?.postal_supervisor_present ? 'default' : 'outline'}
                  size="sm"
                  className={
                    completionInfo?.promotional_materials?.postal_supervisor_present
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }
                >
                  郵・監督有
                </Button>
                <Button
                  variant={completionInfo?.promotional_materials?.postal_supervisor_absent ? 'default' : 'outline'}
                  size="sm"
                  className={
                    completionInfo?.promotional_materials?.postal_supervisor_absent
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }
                >
                  郵・監督無
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">残工事</Label>
              <p className="mt-1 font-medium">{completionInfo?.remaining_work || '-'}</p>
            </div>

            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600 mb-3 block">販促物への写真掲載</Label>
              <RadioGroup
                value={
                  completionInfo?.photo_publication?.all_allowed
                    ? 'all_allowed'
                    : completionInfo?.photo_publication?.partially_allowed
                    ? 'partially_allowed'
                    : completionInfo?.photo_publication?.all_not_allowed
                    ? 'all_not_allowed'
                    : 'all_allowed'
                }
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all_allowed" id="all_allowed" />
                  <Label htmlFor="all_allowed" className="text-sm font-normal cursor-pointer">
                    全て可
                  </Label>
                </div>
                <div className="space-y-2 ml-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partially_allowed" id="partially_allowed" />
                    <Label htmlFor="partially_allowed" className="text-sm font-normal cursor-pointer">
                      一部可(コメント・室内写真のみ・屋外含む写真・自画像及び動画)
                    </Label>
                  </div>
                  {completionInfo?.photo_publication?.partially_allowed && (
                    <div className="ml-6 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="comments"
                          checked={completionInfo.photo_publication.partial_options.comments}
                          disabled
                        />
                        <Label htmlFor="comments" className="text-sm font-normal cursor-pointer">
                          コメント
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="outdoor_photos"
                          checked={completionInfo.photo_publication.partial_options.outdoor_photos}
                          disabled
                        />
                        <Label htmlFor="outdoor_photos" className="text-sm font-normal cursor-pointer">
                          屋外含む写真
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="indoor_photos_only"
                          checked={completionInfo.photo_publication.partial_options.indoor_photos_only}
                          disabled
                        />
                        <Label htmlFor="indoor_photos_only" className="text-sm font-normal cursor-pointer">
                          室内写真のみ
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="self_portraits_videos"
                          checked={completionInfo.photo_publication.partial_options.self_portraits_videos}
                          disabled
                        />
                        <Label htmlFor="self_portraits_videos" className="text-sm font-normal cursor-pointer">
                          自画像及び動画
                        </Label>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all_not_allowed" id="all_not_allowed" />
                  <Label htmlFor="all_not_allowed" className="text-sm font-normal cursor-pointer">
                    全て不可
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
