import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { Separator } from '@/components/ui/separator';
import { Project } from '@/lib/supabase';

type ContractApprovalDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  onSuccess?: () => void;
};

type PaymentMethodType = 'bank_transfer' | 'loan' | 'convenience' | 'credit_card' | 'cash';

export function ContractApprovalDialog({
  open,
  onOpenChange,
  project,
  onSuccess,
}: ContractApprovalDialogProps) {
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
  const [loading, setLoading] = useState(false);

  const formatCurrency = (value: string) => {
    const num = value.replace(/,/g, '');
    if (!num) return '';
    return Number(num).toLocaleString();
  };

  const handlePaymentMethodChange = (
    method: PaymentMethodType,
    checked: boolean
  ) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: 契約承認依頼の実装
      console.log('契約承認依頼:', {
        projectId: project.id,
        contractAmount,
        paymentMethods,
        loanCompany,
        loanBranch,
        age75,
        specialNotes,
        startDate,
        completionDate,
      });
      await new Promise((resolve) => setTimeout(resolve, 500)); // モック
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error('契約承認依頼エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const isConvenienceSelected = paymentMethods.convenience.selected;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>契約承認依頼</DialogTitle>
          <DialogDescription>
            案件「{project.project_name}」の契約承認を依頼します
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* 契約時請負金額（税込） */}
            <div className="space-y-2">
              <Label htmlFor="contractAmount">
                契約時請負金額（税込） <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="contractAmount"
                  type="text"
                  value={formatCurrency(contractAmount)}
                  onChange={(e) => handleAmountInputChange(e.target.value)}
                  placeholder="5,200,000"
                  className="flex-1"
                />
                <span className="text-sm text-gray-600">円</span>
              </div>
            </div>

            <Separator />

            {/* 支払方法 */}
            <div className="space-y-4">
              <Label>
                支払方法（複数選択可） <span className="text-red-500">*</span>
              </Label>
              
              {/* 銀行振込 */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="bank_transfer"
                  checked={paymentMethods.bank_transfer.selected}
                  onCheckedChange={(checked) =>
                    handlePaymentMethodChange('bank_transfer', checked as boolean)
                  }
                  className="mt-1"
                />
                <div className="flex-1 space-y-2">
                  <Label htmlFor="bank_transfer" className="cursor-pointer font-normal">
                    銀行振込
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={formatCurrency(paymentMethods.bank_transfer.amount)}
                      onChange={(e) =>
                        handlePaymentAmountChange('bank_transfer', e.target.value)
                      }
                      placeholder="金額を入力"
                      className="flex-1"
                      disabled={!paymentMethods.bank_transfer.selected}
                    />
                    <span className="text-sm text-gray-600">円</span>
                  </div>
                </div>
              </div>

              {/* ローン */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="loan"
                  checked={paymentMethods.loan.selected}
                  onCheckedChange={(checked) =>
                    handlePaymentMethodChange('loan', checked as boolean)
                  }
                  className="mt-1"
                />
                <div className="flex-1 space-y-2">
                  <Label htmlFor="loan" className="cursor-pointer font-normal">
                    ローン
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        value={formatCurrency(paymentMethods.loan.amount)}
                        onChange={(e) =>
                          handlePaymentAmountChange('loan', e.target.value)
                        }
                        placeholder="金額を入力"
                        className="flex-1"
                        disabled={!paymentMethods.loan.selected}
                      />
                      <span className="text-sm text-gray-600">円</span>
                    </div>
                    {paymentMethods.loan.selected && (
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
              </div>

              {/* コンビニ支払（30万円まで） */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="convenience"
                  checked={paymentMethods.convenience.selected}
                  onCheckedChange={(checked) =>
                    handlePaymentMethodChange('convenience', checked as boolean)
                  }
                  className="mt-1"
                />
                <div className="flex-1 space-y-2">
                  <Label htmlFor="convenience" className="cursor-pointer font-normal">
                    コンビニ支払（30万円まで）
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={formatCurrency(paymentMethods.convenience.amount)}
                      onChange={(e) =>
                        handlePaymentAmountChange('convenience', e.target.value)
                      }
                      placeholder="金額を入力"
                      className="flex-1"
                      disabled={!paymentMethods.convenience.selected}
                    />
                    <span className="text-sm text-gray-600">円</span>
                  </div>
                </div>
              </div>

              {/* クレジットカード（10万円まで） */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="credit_card"
                  checked={paymentMethods.credit_card.selected}
                  onCheckedChange={(checked) =>
                    handlePaymentMethodChange('credit_card', checked as boolean)
                  }
                  className="mt-1"
                />
                <div className="flex-1 space-y-2">
                  <Label htmlFor="credit_card" className="cursor-pointer font-normal">
                    クレジットカード（10万円まで）
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={formatCurrency(paymentMethods.credit_card.amount)}
                      onChange={(e) =>
                        handlePaymentAmountChange('credit_card', e.target.value)
                      }
                      placeholder="金額を入力"
                      className="flex-1"
                      disabled={!paymentMethods.credit_card.selected}
                    />
                    <span className="text-sm text-gray-600">円</span>
                  </div>
                </div>
              </div>

              {/* 現金集金（和歌山のみ） */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="cash"
                  checked={paymentMethods.cash.selected}
                  onCheckedChange={(checked) =>
                    handlePaymentMethodChange('cash', checked as boolean)
                  }
                  className="mt-1"
                />
                <div className="flex-1 space-y-2">
                  <Label htmlFor="cash" className="cursor-pointer font-normal">
                    現金集金（和歌山のみ）
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={formatCurrency(paymentMethods.cash.amount)}
                      onChange={(e) =>
                        handlePaymentAmountChange('cash', e.target.value)
                      }
                      placeholder="金額を入力"
                      className="flex-1"
                      disabled={!paymentMethods.cash.selected}
                    />
                    <span className="text-sm text-gray-600">円</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 bg-yellow-50 p-3 rounded border border-yellow-200">
                <p>※コンビニ払いは30万円まで、クレジットカードは10万円まで、現金は和歌山のみ</p>
                {isConvenienceSelected && (
                  <p className="mt-1 text-orange-600">
                    ※コンビニ払いの場合、コンビニ支払依頼をしてください。
                  </p>
                )}
              </div>
            </div>

            <Separator />

            {/* 75歳 */}
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

            <Separator />

            {/* 特記事項 */}
            <div className="space-y-3">
              <Label>特記事項（複数選択可）</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="special_none"
                    checked={specialNotes.none}
                    onCheckedChange={(checked) =>
                      setSpecialNotes({ ...specialNotes, none: checked as boolean })
                    }
                  />
                  <Label htmlFor="special_none" className="cursor-pointer font-normal">
                    無
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="special_loan"
                    checked={specialNotes.loan}
                    onCheckedChange={(checked) =>
                      setSpecialNotes({ ...specialNotes, loan: checked as boolean })
                    }
                  />
                  <Label htmlFor="special_loan" className="cursor-pointer font-normal">
                    ローン
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="special_delayed_delivery"
                    checked={specialNotes.delayed_delivery}
                    onCheckedChange={(checked) =>
                      setSpecialNotes({
                        ...specialNotes,
                        delayed_delivery: checked as boolean,
                      })
                    }
                  />
                  <Label
                    htmlFor="special_delayed_delivery"
                    className="cursor-pointer font-normal"
                  >
                    納期遅延
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="special_prepayment_75"
                    checked={specialNotes.prepayment_75}
                    onCheckedChange={(checked) =>
                      setSpecialNotes({
                        ...specialNotes,
                        prepayment_75: checked as boolean,
                      })
                    }
                  />
                  <Label
                    htmlFor="special_prepayment_75"
                    className="cursor-pointer font-normal"
                  >
                    前入金（75歳以上）
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="special_display_stock"
                    checked={specialNotes.display_stock}
                    onCheckedChange={(checked) =>
                      setSpecialNotes({
                        ...specialNotes,
                        display_stock: checked as boolean,
                      })
                    }
                  />
                  <Label
                    htmlFor="special_display_stock"
                    className="cursor-pointer font-normal"
                  >
                    展示品・在庫品
                  </Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* 工期 */}
            <div className="space-y-4">
              <Label>工期</Label>
              <div className="space-y-2">
                <div>
                  <Label htmlFor="startDate" className="text-sm">
                    契約時着工予定日
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="completionDate" className="text-sm">
                    契約時完工予定日
                  </Label>
                  <Input
                    id="completionDate"
                    type="date"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '依頼中...' : '承認依頼を送信'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

