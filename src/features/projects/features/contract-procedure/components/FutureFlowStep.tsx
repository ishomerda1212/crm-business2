import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';

export const FutureFlowStep = () => {
  // 次回の予定
  const [nextScheduleType, setNextScheduleType] = useState<string>('');
  const [nextScheduleDateTime, setNextScheduleDateTime] = useState<string>('');
  const [nextScheduleLocation, setNextScheduleLocation] = useState<string>('');

  // 工程表のご提出予定日
  const [scheduleSubmissionTarget, setScheduleSubmissionTarget] = useState<string>('');
  const [scheduleSubmissionDate, setScheduleSubmissionDate] = useState<string>('');
  const [scheduleSubmissionMethod, setScheduleSubmissionMethod] = useState<string>('');

  // 変更及び追加見積、設備プレゼン資料のご提出予定日
  const [estimateSubmissionApplicable, setEstimateSubmissionApplicable] = useState<string>('');
  const [estimateSubmissionDate, setEstimateSubmissionDate] = useState<string>('');
  const [estimateSubmissionMethod, setEstimateSubmissionMethod] = useState<string>('');

  // 施主報告のご案内及び設定
  const [ownerReportStatus, setOwnerReportStatus] = useState<string>('');

  // 近隣挨拶廻りの予定日
  const [neighborGreetingDate, setNeighborGreetingDate] = useState<string>('');

  // 補助金等のご説明
  const [subsidyExplanationStatus, setSubsidyExplanationStatus] = useState<string>('');
  const [subsidyAmount, setSubsidyAmount] = useState<string>('');
  const [subsidyReason, setSubsidyReason] = useState<string>('');

  // 後日回答が必要又はご契約時に未確定の内容
  const [pendingResponseApplicable, setPendingResponseApplicable] = useState<string>('');
  const [pendingResponseDate, setPendingResponseDate] = useState<string>('');
  const [pendingResponseMethod, setPendingResponseMethod] = useState<string>('');

  // 発注に関わる決定事項
  const [orderDecisionApplicable, setOrderDecisionApplicable] = useState<string>('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">今後の流れ</h1>
        <p className="mt-2 text-gray-600">
          契約後の今後の流れについてご確認・ご入力ください。
        </p>
      </div>

      {/* 次回の予定 */}
      <Card>
        <CardHeader>
          <CardTitle>次回の予定</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-700 mb-2 block">予定の種類</Label>
            <Select value={nextScheduleType} onValueChange={setNextScheduleType}>
              <SelectTrigger>
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="site-confirmation">現地確認</SelectItem>
                <SelectItem value="ratification-consent">追認同意</SelectItem>
                <SelectItem value="meeting">お打合せ</SelectItem>
                <SelectItem value="other">その他</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-700 mb-2 block">日時</Label>
            <Input
              type="datetime-local"
              value={nextScheduleDateTime}
              onChange={(e) => setNextScheduleDateTime(e.target.value)}
            />
          </div>

          <div>
            <Label className="text-gray-700 mb-2 block">場所</Label>
            <Input
              value={nextScheduleLocation}
              onChange={(e) => setNextScheduleLocation(e.target.value)}
              placeholder="場所を入力してください"
            />
          </div>
        </CardContent>
      </Card>

      {/* 工程表のご提出予定日 */}
      <Card>
        <CardHeader>
          <CardTitle>工程表のご提出予定日</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-700 mb-3 block">対象</Label>
            <RadioGroup value={scheduleSubmissionTarget} onValueChange={setScheduleSubmissionTarget}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="applicable" id="schedule-applicable" />
                <Label htmlFor="schedule-applicable" className="font-normal cursor-pointer">対象</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not-applicable" id="schedule-not-applicable" />
                <Label htmlFor="schedule-not-applicable" className="font-normal cursor-pointer">対象外</Label>
              </div>
            </RadioGroup>
          </div>

          {scheduleSubmissionTarget === 'applicable' && (
            <>
              <div>
                <Label className="text-gray-700 mb-2 block">日付</Label>
                <Input
                  type="date"
                  value={scheduleSubmissionDate}
                  onChange={(e) => setScheduleSubmissionDate(e.target.value)}
                />
              </div>

              <div>
                <Label className="text-gray-700 mb-2 block">提出方法</Label>
                <Select value={scheduleSubmissionMethod} onValueChange={setScheduleSubmissionMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">メール</SelectItem>
                    <SelectItem value="hand-delivery">手渡し</SelectItem>
                    <SelectItem value="line">LINE</SelectItem>
                    <SelectItem value="andpad">ANDPAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* 変更及び追加見積、設備プレゼン資料のご提出予定日 */}
      <Card>
        <CardHeader>
          <CardTitle>変更及び追加見積、設備プレゼン資料のご提出予定日</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-700 mb-3 block">該当</Label>
            <RadioGroup value={estimateSubmissionApplicable} onValueChange={setEstimateSubmissionApplicable}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="applicable" id="estimate-applicable" />
                <Label htmlFor="estimate-applicable" className="font-normal cursor-pointer">該当</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not-applicable" id="estimate-not-applicable" />
                <Label htmlFor="estimate-not-applicable" className="font-normal cursor-pointer">該当なし</Label>
              </div>
            </RadioGroup>
          </div>

          {estimateSubmissionApplicable === 'applicable' && (
            <>
              <div>
                <Label className="text-gray-700 mb-2 block">日付</Label>
                <Input
                  type="date"
                  value={estimateSubmissionDate}
                  onChange={(e) => setEstimateSubmissionDate(e.target.value)}
                />
              </div>

              <div>
                <Label className="text-gray-700 mb-2 block">提出方法</Label>
                <Select value={estimateSubmissionMethod} onValueChange={setEstimateSubmissionMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">メール</SelectItem>
                    <SelectItem value="hand-delivery">手渡し</SelectItem>
                    <SelectItem value="line">LINE</SelectItem>
                    <SelectItem value="andpad">ANDPAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* 施主報告のご案内及び設定 */}
      <Card>
        <CardHeader>
          <CardTitle>施主報告のご案内及び設定</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label className="text-gray-700 mb-3 block">ステータス</Label>
            <RadioGroup value={ownerReportStatus} onValueChange={setOwnerReportStatus}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not-required" id="report-not-required" />
                <Label htmlFor="report-not-required" className="font-normal cursor-pointer">不要</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="completed" id="report-completed" />
                <Label htmlFor="report-completed" className="font-normal cursor-pointer">済</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="later" id="report-later" />
                <Label htmlFor="report-later" className="font-normal cursor-pointer">後日</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* 近隣挨拶廻りの予定日 */}
      <Card>
        <CardHeader>
          <CardTitle>近隣挨拶廻りの予定日</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label className="text-gray-700 mb-2 block">予定日</Label>
            <Input
              type="date"
              value={neighborGreetingDate}
              onChange={(e) => setNeighborGreetingDate(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* 補助金等のご説明 */}
      <Card>
        <CardHeader>
          <CardTitle>補助金等のご説明</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-700 mb-3 block">ステータス</Label>
            <RadioGroup value={subsidyExplanationStatus} onValueChange={setSubsidyExplanationStatus}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="explained" id="subsidy-explained" />
                <Label htmlFor="subsidy-explained" className="font-normal cursor-pointer">説明済</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not-applicable" id="subsidy-not-applicable" />
                <Label htmlFor="subsidy-not-applicable" className="font-normal cursor-pointer">対象外</Label>
              </div>
            </RadioGroup>
          </div>

          {subsidyExplanationStatus === 'explained' && (
            <div>
              <Label className="text-gray-700 mb-2 block">補助金額</Label>
              <Input
                type="text"
                value={subsidyAmount}
                onChange={(e) => setSubsidyAmount(e.target.value)}
                placeholder="補助金額を入力してください"
              />
            </div>
          )}

          {subsidyExplanationStatus === 'not-applicable' && (
            <div>
              <Label className="text-gray-700 mb-2 block">理由</Label>
              <Textarea
                value={subsidyReason}
                onChange={(e) => setSubsidyReason(e.target.value)}
                placeholder="理由を入力してください"
                rows={3}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* 後日回答が必要又はご契約時に未確定の内容 */}
      <Card>
        <CardHeader>
          <CardTitle>後日回答が必要又はご契約時に未確定の内容</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-700 mb-3 block">該当</Label>
            <RadioGroup value={pendingResponseApplicable} onValueChange={setPendingResponseApplicable}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="applicable" id="pending-applicable" />
                <Label htmlFor="pending-applicable" className="font-normal cursor-pointer">該当</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not-applicable" id="pending-not-applicable" />
                <Label htmlFor="pending-not-applicable" className="font-normal cursor-pointer">該当なし</Label>
              </div>
            </RadioGroup>
          </div>

          {pendingResponseApplicable === 'applicable' && (
            <>
              <div>
                <Label className="text-gray-700 mb-2 block">回答日</Label>
                <Input
                  type="date"
                  value={pendingResponseDate}
                  onChange={(e) => setPendingResponseDate(e.target.value)}
                />
              </div>

              <div>
                <Label className="text-gray-700 mb-2 block">回答方法</Label>
                <Select value={pendingResponseMethod} onValueChange={setPendingResponseMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">メール</SelectItem>
                    <SelectItem value="hand-delivery">手渡し</SelectItem>
                    <SelectItem value="line">LINE</SelectItem>
                    <SelectItem value="andpad">ANDPAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* 発注に関わる決定事項 */}
      <Card>
        <CardHeader>
          <CardTitle>発注に関わる決定事項</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label className="text-gray-700 mb-3 block">対象</Label>
            <RadioGroup value={orderDecisionApplicable} onValueChange={setOrderDecisionApplicable}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="applicable" id="order-applicable" />
                <Label htmlFor="order-applicable" className="font-normal cursor-pointer">対象</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not-applicable" id="order-not-applicable" />
                <Label htmlFor="order-not-applicable" className="font-normal cursor-pointer">対象外</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

