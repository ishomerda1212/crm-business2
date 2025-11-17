import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Project, ContractInfo } from '@/lib/supabase';
import { mockProjects, mockContractInfo, mockQuotation } from '@/data/mockData';
import { ArrowLeft } from 'lucide-react';

type PaymentMethodType = 'bank_transfer' | 'loan' | 'convenience' | 'credit_card' | 'cash';

export function ContractApprovalPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [contractInfo, setContractInfo] = useState<ContractInfo | null>(null);
  const [contractAmount, setContractAmount] = useState('');
  const [paymentMethods, setPaymentMethods] = useState<{
    [key in PaymentMethodType]: { selected: boolean; amount: string };
  }>({
    bank_transfer: { selected: false, amount: '' },
    loan: { selected: false, amount: '' },
    convenience: { selected: false, amount: '' },
    credit_card: { selected: false, amount: '' },
    cash: { selected: false, amount: '' },
  });
  const [loanCompany, setLoanCompany] = useState('');
  const [loanBranch, setLoanBranch] = useState('');
  const [age75, setAge75] = useState('');
  const [specialNotes, setSpecialNotes] = useState<{
    none: boolean;
    loan: boolean;
    delayed_delivery: boolean;
    prepayment_75: boolean;
    display_stock: boolean;
  }>({
    none: false,
    loan: false,
    delayed_delivery: false,
    prepayment_75: false,
    display_stock: false,
  });
  const [startDate, setStartDate] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [guarantorRequirement, setGuarantorRequirement] = useState<'要' | '不要'>('要');
  const [guarantorName, setGuarantorName] = useState('');
  const [guarantorAddress, setGuarantorAddress] = useState('');
  const [defectInsurance, setDefectInsurance] = useState<'要' | '不要'>('要');
  const [defectInsuranceAmount, setDefectInsuranceAmount] = useState('');
  const [constructionConfirmation, setConstructionConfirmation] = useState<'有' | '無'>('有');
  const [registeredPropertyNumber, setRegisteredPropertyNumber] = useState('');
  const [freeInput, setFreeInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('projectId');
    if (projectId) {
      const foundProject = mockProjects.find((p) => p.id === projectId) || null;
      setProject(foundProject);
      if (foundProject && mockContractInfo.project_id === foundProject.id) {
        setContractInfo(mockContractInfo);
      } else {
        setContractInfo(null);
      }
    }
  }, []);

  useEffect(() => {
    if (!contractInfo) return;
    setGuarantorRequirement(contractInfo.guarantor);
    setGuarantorName(contractInfo.guarantor_name || '');
    setGuarantorAddress(contractInfo.guarantor_address || '');
    setDefectInsurance(contractInfo.defect_insurance);
    setDefectInsuranceAmount(
      contractInfo.defect_insurance_amount ? String(contractInfo.defect_insurance_amount) : ''
    );
    setConstructionConfirmation(contractInfo.construction_confirmation || '有');
    setRegisteredPropertyNumber(contractInfo.registered_property_number || '');
    setFreeInput(contractInfo.free_input || '');
    setSpecialNotes((prev) => ({
      ...prev,
      loan: contractInfo.special_provisions.loan,
      delayed_delivery: contractInfo.special_provisions.delivery_delay,
      prepayment_75: contractInfo.special_provisions.advance_payment_75plus,
      display_stock: contractInfo.special_provisions.display_stock_items,
    }));
  }, [contractInfo]);

  useEffect(() => {
    if (!project) return;
    if (mockQuotation.project_id === project.id) {
      setContractAmount(String(mockQuotation.contract_amount));
      setPaymentMethods((prev) => ({
        ...prev,
        bank_transfer: { selected: true, amount: String(mockQuotation.contract_amount) },
      }));
    }
  }, [project]);

  const formatCurrency = (value: string) => {
    const num = value.replace(/,/g, '');
    if (!num) return '';
    return Number(num).toLocaleString();
  };

  const handlePaymentMethodChange = (method: PaymentMethodType, checked: boolean) => {
    setPaymentMethods({
      ...paymentMethods,
      [method]: { ...paymentMethods[method], selected: checked },
    });
  };

  const handlePaymentAmountChange = (method: PaymentMethodType, value: string) => {
    const num = value.replace(/,/g, '');
    if (num && isNaN(Number(num))) return;
    setPaymentMethods({
      ...paymentMethods,
      [method]: { ...paymentMethods[method], amount: num },
    });
  };

  const handleAmountInputChange = (value: string) => {
    const num = value.replace(/,/g, '');
    if (num && isNaN(Number(num))) return;
    setContractAmount(num);
  };

  const handleInsuranceAmountChange = (value: string) => {
    const num = value.replace(/,/g, '');
    if (num && isNaN(Number(num))) return;
    setDefectInsuranceAmount(num);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('契約承認依頼:', {
        projectId: project?.id,
        contractAmount,
        paymentMethods,
        loanCompany,
        loanBranch,
        age75,
        specialNotes,
        startDate,
        completionDate,
        guarantorRequirement,
        guarantorName,
        guarantorAddress,
        defectInsurance,
        defectInsuranceAmount,
        constructionConfirmation,
        registeredPropertyNumber,
        freeInput,
      });
      await new Promise((resolve) => setTimeout(resolve, 500));
      alert('契約承認依頼を送信しました');
      window.history.back();
    } catch (error) {
      console.error('契約承認依頼エラー:', error);
      alert('契約承認依頼でエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const isConvenienceSelected = paymentMethods.convenience.selected;

  const contractAmountSummary = useMemo(() => {
    if (!contractAmount) return '0';
    return formatCurrency(contractAmount);
  }, [contractAmount]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">案件が見つかりません</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <div className="bg-white dark:bg-white border-b dark:border-gray-200 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              戻る
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">契約承認依頼</h1>
              <p className="text-sm text-gray-600 mt-1">
                案件「{project.project_name}」の契約承認を依頼します
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* 契約時請負金額 */}
              <section className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h2 className="text-xl font-semibold text-gray-900">契約時請負金額（税込）</h2>
                  <p className="text-sm text-gray-500">現在の請負金額: ¥{contractAmountSummary}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractAmount">
                    契約時請負金額（税込） <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <Input
                      id="contractAmount"
                      type="text"
                      value={formatCurrency(contractAmount)}
                      onChange={(e) => handleAmountInputChange(e.target.value)}
                      placeholder="5,200,000"
                      className="sm:flex-1"
                    />
                    <span className="text-sm text-gray-600">円</span>
                  </div>
                </div>
              </section>

              <Separator />

              {/* 支払方法 */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">支払方法</h2>
                <Label>
                  支払方法（複数選択可） <span className="text-red-500">*</span>
                </Label>
                {[
                    { key: 'bank_transfer', label: '銀行振込' },
                    { key: 'loan', label: 'ローン' },
                    { key: 'convenience', label: 'コンビニ支払（30万円まで）' },
                    { key: 'credit_card', label: 'クレジットカード（10万円まで）' },
                    { key: 'cash', label: '現金集金（和歌山のみ）' },
                  ].map((method) => (
                    <div className="flex items-start gap-3" key={method.key}>
                      <Checkbox
                        id={method.key}
                        checked={paymentMethods[method.key as PaymentMethodType].selected}
                        onCheckedChange={(checked) =>
                          handlePaymentMethodChange(method.key as PaymentMethodType, checked as boolean)
                        }
                        className="mt-1"
                      />
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={method.key} className="cursor-pointer font-normal">
                          {method.label}
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="text"
                            value={formatCurrency(paymentMethods[method.key as PaymentMethodType].amount)}
                            onChange={(e) =>
                              handlePaymentAmountChange(method.key as PaymentMethodType, e.target.value)
                            }
                            placeholder="金額を入力"
                            className="flex-1"
                            disabled={!paymentMethods[method.key as PaymentMethodType].selected}
                          />
                          <span className="text-sm text-gray-600">円</span>
                        </div>
                        {method.key === 'loan' && paymentMethods.loan.selected && (
                          <div className="space-y-2 pl-6">
                            <div>
                              <Label htmlFor="loanCompany" className="text-sm">
                                ローン会社
                              </Label>
                              <Input
                                id="loanCompany"
                                type="text"
                                value={loanCompany}
                                onChange={(e) => setLoanCompany(e.target.value)}
                                placeholder="ローン会社名を入力"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="loanBranch" className="text-sm">
                                ローン支店名
                              </Label>
                              <Input
                                id="loanBranch"
                                type="text"
                                value={loanBranch}
                                onChange={(e) => setLoanBranch(e.target.value)}
                                placeholder="支店名を入力"
                                className="mt-1"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                <div className="text-xs text-gray-500 bg-yellow-50 p-3 rounded border border-yellow-200">
                  <p>※コンビニ払いは30万円まで、クレジットカードは10万円まで、現金は和歌山のみ</p>
                  {isConvenienceSelected && (
                    <p className="mt-1 text-orange-600">※コンビニ払いの場合、コンビニ支払依頼をしてください。</p>
                  )}
                </div>
              </section>

              <Separator />

              {/* 工期 */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">工期</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">契約時着工予定日</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="completionDate">契約時完工予定日</Label>
                    <Input
                      id="completionDate"
                      type="date"
                      value={completionDate}
                      onChange={(e) => setCompletionDate(e.target.value)}
                    />
                  </div>
                </div>
              </section>

              <Separator />

              {/* 年齢（75歳） */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">年齢（75歳）</h2>
                <div className="space-y-2">
                  <Label htmlFor="age75">
                    75歳 <span className="text-red-500">*</span>
                  </Label>
                  <Select value={age75} onValueChange={setAge75}>
                    <SelectTrigger id="age75">
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">75歳以上でない</SelectItem>
                      <SelectItem value="with_guarantor">75歳以上保証人同席</SelectItem>
                      <SelectItem value="without_guarantor_present">
                        75歳以上保証人同席せず（契約同意書回収）
                      </SelectItem>
                      <SelectItem value="without_guarantor_full_payment">
                        75歳以上保証人なし全額前入金
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </section>

              <Separator />

              {/* 保証人 */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">保証人</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>保証人</Label>
                    <Select
                      value={guarantorRequirement}
                      onValueChange={(value) => setGuarantorRequirement(value as '要' | '不要')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="要">要</SelectItem>
                        <SelectItem value="不要">不要</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guarantorName">保証人名</Label>
                    <Input
                      id="guarantorName"
                      type="text"
                      value={guarantorName}
                      onChange={(e) => setGuarantorName(e.target.value)}
                      placeholder="保証人名を入力"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="guarantorAddress">保証人住所</Label>
                    <Input
                      id="guarantorAddress"
                      type="text"
                      value={guarantorAddress}
                      onChange={(e) => setGuarantorAddress(e.target.value)}
                      placeholder="保証人住所を入力"
                    />
                  </div>
                </div>
              </section>

              <Separator />

              {/* 瑕疵保険・工事確認書 */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">瑕疵保険・工事確認書</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>瑕疵保険</Label>
                    <Select
                      value={defectInsurance}
                      onValueChange={(value) => setDefectInsurance(value as '要' | '不要')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="要">要</SelectItem>
                        <SelectItem value="不要">不要</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defectInsuranceAmount">瑕疵保険金額</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="defectInsuranceAmount"
                        type="text"
                        value={formatCurrency(defectInsuranceAmount)}
                        onChange={(e) => handleInsuranceAmountChange(e.target.value)}
                        placeholder="50,000"
                      />
                      <span className="text-sm text-gray-600">円</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>工事確認書有無</Label>
                    <Select
                      value={constructionConfirmation}
                      onValueChange={(value) =>
                        setConstructionConfirmation(value as '有' | '無')
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="有">有</SelectItem>
                        <SelectItem value="無">無</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registeredPropertyNumber">登録物件番号</Label>
                    <Input
                      id="registeredPropertyNumber"
                      type="text"
                      value={registeredPropertyNumber}
                      onChange={(e) => setRegisteredPropertyNumber(e.target.value)}
                      placeholder="REG-2024-001"
                    />
                  </div>
                </div>
              </section>

              <Separator />

              {/* 特記事項（選択） */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">特記事項（選択）</h2>
                <div className="space-y-3">
                  {[
                    { key: 'none', label: '無' },
                    { key: 'loan', label: 'ローン' },
                    { key: 'delayed_delivery', label: '納期遅延' },
                    { key: 'prepayment_75', label: '前入金（75歳以上）' },
                    { key: 'display_stock', label: '展示品・在庫品' },
                  ].map((note) => (
                    <div className="flex items-center gap-3" key={note.key}>
                      <Checkbox
                        id={`special_${note.key}`}
                        checked={specialNotes[note.key as keyof typeof specialNotes]}
                        onCheckedChange={(checked) =>
                          setSpecialNotes({
                            ...specialNotes,
                            [note.key]: checked as boolean,
                          })
                        }
                      />
                      <Label htmlFor={`special_${note.key}`} className="cursor-pointer font-normal">
                        {note.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </section>

              <Separator />

              {/* 特記事項（自由入力） */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">特記事項（自由入力）</h2>
                <div className="space-y-2">
                  <Label htmlFor="freeInput">特記事項（自由入力）</Label>
                  <Textarea
                    id="freeInput"
                    value={freeInput}
                    onChange={(e) => setFreeInput(e.target.value)}
                    rows={3}
                    placeholder="自由に入力してください"
                  />
                </div>
                <div className="space-y-3">
                  <div className="bg-red-50 border border-red-300 rounded-md p-3">
                    <p className="text-sm text-red-800">
                      <span className="font-semibold">注意事項:</span>
                      ご契約者様が75歳以上の場合、保証人に同席していただくか、同席はしないが契約同意書を記入していただくか、保証人を立てない場合は全額前入金していただく必要があります。
                    </p>
                  </div>
                  <div className="bg-red-50 border border-red-300 rounded-md p-3">
                    <p className="text-sm text-red-800">
                      <span className="font-semibold">注意事項:</span>
                      リフォーム瑕疵保険は一定以上の金額の場合（500万円）、説明を受けた上で保険加入されない意思表示として署名をいただくことが推奨されています。
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 pt-6 mt-8 border-t">
              <Button type="button" variant="outline" onClick={handleBack} disabled={loading}>
                キャンセル
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? '依頼中...' : '承認依頼を送信'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

