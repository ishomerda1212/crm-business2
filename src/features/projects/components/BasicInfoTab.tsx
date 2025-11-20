import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Project, ContractInfo, CompletionInfo } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type BasicInfoTabProps = {
  project: Project;
  contractInfo?: ContractInfo | null;
  completionInfo?: CompletionInfo | null;
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
              <Label className="text-sm text-gray-600 dark:text-gray-600">主担当</Label>
              <p className="mt-1 font-medium">{project.construction_manager || '-'}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">担当店舗</Label>
              <p className="mt-1 font-medium">{project.client_id || 'ANDPAD ID'}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">外部連携ID</Label>
              <p className="mt-1 font-medium">{project.case_number || '-'}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">見積URL</Label>
              {project.quotation_url ? (
                <a
                  href={project.quotation_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 font-medium text-orange-600 hover:text-orange-700 hover:underline block"
                >
                  {project.quotation_url}
                </a>
              ) : (
                <p className="mt-1 font-medium">-</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">工期・マイルストーン</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-6">
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">工事時間（開始時間）</Label>
              <p className="mt-1 font-medium">09:00</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">工事時間（終了時間）</Label>
              <p className="mt-1 font-medium">18:00</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">見積作成日</Label>
              <p className="mt-1 font-medium">2024/05/01</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">契約承認日</Label>
              <p className="mt-1 font-medium">2024/05/01</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">契約時着工予定日</Label>
              <p className="mt-1 font-medium">2024/05/01</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">契約時完工予定日</Label>
              <p className="mt-1 font-medium">2024/07/31</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">契約日実績</Label>
              <p className="mt-1 font-medium">2024/04/25</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">着工日実績</Label>
              <p className="mt-1 font-medium">2024/05/02</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">完工日実績</Label>
              <p className="mt-1 font-medium">-</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-red-50 border border-red-300 rounded-md p-3">
              <p className="text-sm text-red-800 dark:text-red-800">
                <span className="font-semibold">注意事項:</span>契約時の予定日から14日以上の差異が発生する場合は、変更合意手続きが必要となります。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">契約</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-700 text-xs font-semibold transition-colors"
                    aria-label="リフォーム瑕疵保険について"
                  >
                    ?
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    リフォーム瑕疵保険は一定以上の金額の場合（500万円）、説明を受けた上で保険加入されない意思表示として署名をいただくことが推奨されています。
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">
                75歳<span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={contractInfo?.age_75plus || 'not_75plus'}
                className="mt-2 space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not_75plus" id="not_75plus" />
                  <Label htmlFor="not_75plus" className="text-sm font-normal cursor-pointer">
                    75歳以上でない
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="75plus_with_guarantor" id="75plus_with_guarantor" />
                  <Label htmlFor="75plus_with_guarantor" className="text-sm font-normal cursor-pointer">
                    75歳以上保証人同席
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="75plus_without_guarantor" id="75plus_without_guarantor" />
                  <Label htmlFor="75plus_without_guarantor" className="text-sm font-normal cursor-pointer">
                    75歳以上保証人同席せず (契約同意書回収)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="75plus_no_guarantor_full_advance" id="75plus_no_guarantor_full_advance" />
                  <Label htmlFor="75plus_no_guarantor_full_advance" className="text-sm font-normal cursor-pointer">
                    75歳以上保証人なし全額前入金
                  </Label>
                </div>
              </RadioGroup>
            </div>

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
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">工事確認書有無</Label>
                <p className="mt-1 font-medium">{contractInfo?.construction_confirmation || '-'}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 dark:text-gray-600">登録物件番号</Label>
                <p className="mt-1 font-medium">{contractInfo?.registered_property_number || '-'}</p>
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

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-700 mb-3 block">
                注意事項
              </Label>
              <div className="space-y-3">
                <div className="bg-red-50 border border-red-300 rounded-md p-3">
                  <p className="text-sm text-red-800 dark:text-red-800">
                    <span className="font-semibold">注意事項:</span>ご契約者様が75歳以上の場合、保証人に同席していただくか、同席はしないが契約同意書を記入していただくか、保証人を立てない場合は全額前入金していただく必要があります。
                  </p>
                </div>
                <div className="bg-red-50 border border-red-300 rounded-md p-3">
                  <p className="text-sm text-red-800 dark:text-red-800">
                    <span className="font-semibold">注意事項:</span>リフォーム瑕疵保険は一定以上の金額の場合（500万円）、説明を受けた上で保険加入されない意思表示として署名をいただくことが推奨されています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-white border-gray-200 dark:border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">完了</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-700 text-xs font-semibold transition-colors"
                    aria-label="消費生活用製品安全法について"
                  >
                    ?
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-md">
                  <div className="space-y-2">
                    <p className="font-semibold text-sm mb-2">消費生活用製品安全法について</p>
                    <p className="text-sm mb-2">
                      消費生活用製品安全法は、消費者の生命や身体の安全を保護するため、特定の製品について安全性を確保する法律です。
                    </p>
                    <p className="font-semibold text-sm mb-1">対象製品：</p>
                    <ul className="text-sm list-disc list-inside space-y-1">
                      <li>ガス器具（ガスコンロ、給湯器、ガスファンヒーターなど）</li>
                      <li>特定の電気製品（特定電気用品）</li>
                      <li>その他、経済産業省が指定する特定製品</li>
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">

            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600">残工事</Label>
              <p className="mt-1 font-medium">{completionInfo?.remaining_work || '-'}</p>
            </div>

            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-600 mb-3 block">消費生活用製品安全法</Label>
              <RadioGroup
                value={completionInfo?.consumer_product_safety_act || 'applicable'}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="applicable" id="applicable" />
                  <Label htmlFor="applicable" className="text-sm font-normal cursor-pointer">
                    対象
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not_applicable" id="not_applicable" />
                  <Label htmlFor="not_applicable" className="text-sm font-normal cursor-pointer">
                    対象外
                  </Label>
                </div>
              </RadioGroup>
              <div className="mt-4">
                <div className="bg-red-50 border border-red-300 rounded-md p-3">
                  <p className="text-sm text-red-800 dark:text-red-800">
                    <span className="font-semibold">注意事項:</span>消費生活用製品安全法は、消費者の生命や身体の安全を保護するため、特定の製品について安全性を確保する法律です。対象製品には、ガス器具（ガスコンロ、給湯器、ガスファンヒーターなど）、特定の電気製品（特定電気用品）、その他経済産業省が指定する特定製品が含まれます。
                  </p>
                </div>
              </div>
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
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all_allowed" id="all_allowed" />
                  <Label htmlFor="all_allowed" className="text-sm font-normal cursor-pointer">
                    全て可
                  </Label>
                </div>
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
