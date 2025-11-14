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
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Project } from '@/lib/supabase';

type PaymentRow = {
  id: string;
  deliveryDate: string;
  recipientName: string;
  breakdown: string;
  amount: string;
  taxRate: '10' | '8' | '0';
};

type ConveniencePaymentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  onSuccess?: () => void;
};

export function ConveniencePaymentDialog({
  open,
  onOpenChange,
  project,
  onSuccess,
}: ConveniencePaymentDialogProps) {
  const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal');
  const [desiredDate, setDesiredDate] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'post' | 'hand' | 'other'>('post');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [handDeliveryMethod, setHandDeliveryMethod] = useState<'headquarters' | 'branch'>('headquarters');
  const [notes, setNotes] = useState('');
  const [paymentRows, setPaymentRows] = useState<PaymentRow[]>([
    { id: '1', deliveryDate: '', recipientName: '', breakdown: '', amount: '', taxRate: '10' },
    { id: '2', deliveryDate: '', recipientName: '', breakdown: '', amount: '', taxRate: '10' },
    { id: '3', deliveryDate: '', recipientName: '', breakdown: '', amount: '', taxRate: '10' },
  ]);
  const [loading, setLoading] = useState(false);

  const calculateTax = (amount: string, taxRate: string): number => {
    const numAmount = Number(amount.replace(/,/g, '')) || 0;
    if (numAmount === 0 || taxRate === '0') return 0;
    const rate = Number(taxRate) / 100;
    // 税込金額から内税を計算: 内税 = 税込金額 × (税率 / (100 + 税率))
    return Math.floor((numAmount * rate) / (1 + rate));
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString();
  };

  const totalAmount = paymentRows.reduce((sum, row) => {
    const amount = Number(row.amount.replace(/,/g, '')) || 0;
    return sum + amount;
  }, 0);

  const totalTax = paymentRows.reduce((sum, row) => {
    return sum + calculateTax(row.amount, row.taxRate);
  }, 0);

  const updatePaymentRow = (id: string, field: keyof PaymentRow, value: string) => {
    setPaymentRows((rows) =>
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const addPaymentRow = () => {
    const newId = String(Date.now());
    setPaymentRows([
      ...paymentRows,
      { id: newId, deliveryDate: '', recipientName: '', breakdown: '', amount: '', taxRate: '10' },
    ]);
  };

  const removePaymentRow = (id: string) => {
    if (paymentRows.length > 1) {
      setPaymentRows(paymentRows.filter((row) => row.id !== id));
    }
  };

  const handleAmountChange = (id: string, value: string) => {
    const num = value.replace(/,/g, '').replace(/[^\d]/g, '');
    if (num && isNaN(Number(num))) return;
    updatePaymentRow(id, 'amount', num);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: コンビニ支払依頼の実装
      console.log('コンビニ支払依頼:', {
        projectId: project.id,
        urgency,
        desiredDate,
        deliveryMethod,
        postalCode,
        address,
        handDeliveryMethod,
        notes,
        paymentRows,
        totalAmount,
        totalTax,
      });
      await new Promise((resolve) => setTimeout(resolve, 500)); // モック
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error('コンビニ支払依頼エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>コンビニ支払依頼</DialogTitle>
          <DialogDescription>
            案件「{project.project_name}」のコンビニ支払を依頼します
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* 通常/至急 */}
            <div className="space-y-2">
              <Label>通常/至急</Label>
              <RadioGroup value={urgency} onValueChange={(value) => setUrgency(value as 'normal' | 'urgent')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal" className="cursor-pointer font-normal">
                    通常
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent" className="cursor-pointer font-normal">
                    至急
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* 至急の場合：〇日までに作成希望 */}
            {urgency === 'urgent' && (
              <div className="space-y-2">
                <Label htmlFor="desiredDate">〇日までに作成希望</Label>
                <Input
                  id="desiredDate"
                  type="date"
                  value={desiredDate}
                  onChange={(e) => setDesiredDate(e.target.value)}
                />
              </div>
            )}

            {/* 届け先 */}
            <div className="space-y-2">
              <Label>届け先</Label>
              <RadioGroup
                value={deliveryMethod}
                onValueChange={(value) => setDeliveryMethod(value as 'post' | 'hand' | 'other')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="post" id="post" />
                  <Label htmlFor="post" className="cursor-pointer font-normal">
                    郵送
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hand" id="hand" />
                  <Label htmlFor="hand" className="cursor-pointer font-normal">
                    手渡し
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="cursor-pointer font-normal">
                    その他
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* 届け先が郵送の場合 */}
            {deliveryMethod === 'post' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">郵便番号</Label>
                  <Input
                    id="postalCode"
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="郵便番号を入力"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">住所</Label>
                  <Input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="住所を入力"
                  />
                </div>
              </>
            )}

            {/* 届け先が手渡しの場合 */}
            {deliveryMethod === 'hand' && (
              <div className="space-y-2">
                <Label>受取方法</Label>
                <RadioGroup
                  value={handDeliveryMethod}
                  onValueChange={(value) => setHandDeliveryMethod(value as 'headquarters' | 'branch')}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="headquarters" id="headquarters" />
                    <Label htmlFor="headquarters" className="cursor-pointer font-normal">
                      本社にて直接手渡し
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="branch" id="branch" />
                    <Label htmlFor="branch" className="cursor-pointer font-normal">
                      支店便にて受取
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* 備考 */}
            <div className="space-y-2">
              <Label htmlFor="notes">備考</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="備考を入力"
                rows={3}
              />
            </div>

            {/* 支払明細テーブル */}
            <div className="space-y-2">
              <Label>支払明細</Label>
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[140px]">引渡予定日</TableHead>
                      <TableHead className="min-w-[150px]">宛名</TableHead>
                      <TableHead className="min-w-[180px]">
                        内訳
                        <div className="text-xs font-normal text-muted-foreground mt-1">
                          (例:●●工事)
                        </div>
                      </TableHead>
                      <TableHead className="min-w-[150px]">
                        金額
                        <div className="text-xs font-normal text-muted-foreground mt-1">
                          (内税含む)
                        </div>
                      </TableHead>
                      <TableHead className="min-w-[200px]">
                        内税
                        <div className="text-xs font-normal text-muted-foreground mt-1">
                          (税率↓)
                        </div>
                      </TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentRows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Input
                            type="date"
                            value={row.deliveryDate}
                            onChange={(e) =>
                              updatePaymentRow(row.id, 'deliveryDate', e.target.value)
                            }
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Input
                              type="text"
                              value={row.recipientName}
                              onChange={(e) =>
                                updatePaymentRow(row.id, 'recipientName', e.target.value)
                              }
                              placeholder="宛名を入力"
                              className="flex-1"
                            />
                            <span className="text-sm text-muted-foreground">様</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            value={row.breakdown}
                            onChange={(e) =>
                              updatePaymentRow(row.id, 'breakdown', e.target.value)
                            }
                            placeholder="内訳を入力"
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Input
                              type="text"
                              value={
                                row.amount
                                  ? formatCurrency(Number(row.amount.replace(/,/g, '')) || 0)
                                  : ''
                              }
                              onChange={(e) => handleAmountChange(row.id, e.target.value)}
                              placeholder="0"
                              className="flex-1 text-right"
                            />
                            <span className="text-sm text-muted-foreground whitespace-nowrap">円</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <RadioGroup
                                value={row.taxRate}
                                onValueChange={(value) =>
                                  updatePaymentRow(row.id, 'taxRate', value as '10' | '8' | '0')
                                }
                                className="flex flex-row gap-3"
                              >
                                <div className="flex items-center space-x-1">
                                  <RadioGroupItem value="10" id={`tax-10-${row.id}`} />
                                  <Label
                                    htmlFor={`tax-10-${row.id}`}
                                    className="cursor-pointer font-normal text-xs"
                                  >
                                    10%
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <RadioGroupItem value="8" id={`tax-8-${row.id}`} />
                                  <Label
                                    htmlFor={`tax-8-${row.id}`}
                                    className="cursor-pointer font-normal text-xs"
                                  >
                                    8%
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <RadioGroupItem value="0" id={`tax-0-${row.id}`} />
                                  <Label
                                    htmlFor={`tax-0-${row.id}`}
                                    className="cursor-pointer font-normal text-xs"
                                  >
                                    0%
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                            <div className="flex items-center gap-1">
                              <Input
                                type="text"
                                value={formatCurrency(calculateTax(row.amount, row.taxRate))}
                                readOnly
                                className="flex-1 text-right bg-muted"
                              />
                              <span className="text-sm text-muted-foreground whitespace-nowrap">円</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {paymentRows.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removePaymentRow(row.id)}
                              className="h-8 w-8 p-0"
                            >
                              ×
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3} className="font-medium">
                        合計
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-right font-medium">
                            {formatCurrency(totalAmount)}
                          </span>
                          <span className="text-sm text-muted-foreground">円</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-right font-medium">
                            {formatCurrency(totalTax)}
                          </span>
                          <span className="text-sm text-muted-foreground">円</span>
                        </div>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPaymentRow}
                className="mt-2"
              >
                行を追加
              </Button>
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
              {loading ? '依頼中...' : '支払依頼を送信'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

