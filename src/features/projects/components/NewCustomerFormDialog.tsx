import { useEffect, useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Clipboard, ClipboardCheck, FileText, Mic2 } from 'lucide-react';

type FormOptionId = 'hearing' | 'simple';

type CustomerFormOption = {
  id: FormOptionId;
  title: string;
  description: string;
  path: string;
  processingTime: string;
  highlights: string[];
  icon: LucideIcon;
};

const FORM_OPTIONS: CustomerFormOption[] = [
  {
    id: 'hearing',
    title: 'ヒアリングフォーム',
    description: 'オンライン面談前にヒアリング内容を詳細に記入してもらうフォームです。',
    path: '/forms/hearing',
    processingTime: '所要時間 5〜7分',
    highlights: ['詳細な要望・課題を把握', '営業担当によるフォロー前提', '添付ファイル送信に対応'],
    icon: Mic2,
  },
  {
    id: 'simple',
    title: '簡易フォーム',
    description: '最低限の顧客情報だけを素早く登録したい場合に活用します。',
    path: '/forms/simple',
    processingTime: '所要時間 1〜2分',
    highlights: ['基本情報のみ取得', 'QR配布イベントでの利用', '入力負荷が低い'],
    icon: FileText,
  },
];

type NewCustomerFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue?: () => void;
};

const QR_IMAGE_SIZE = 192;

export function NewCustomerFormDialog({ open, onOpenChange, onContinue }: NewCustomerFormDialogProps) {
  const [selectedFormId, setSelectedFormId] = useState<FormOptionId>('hearing');
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');

  useEffect(() => {
    if (open) {
      setSelectedFormId('hearing');
      setCopyState('idle');
    }
  }, [open]);

  const selectedForm = useMemo(() => {
    return FORM_OPTIONS.find((option) => option.id === selectedFormId) ?? FORM_OPTIONS[0];
  }, [selectedFormId]);

  const formUrl = useMemo(() => {
    const path = selectedForm.path;
    if (typeof window === 'undefined') {
      return path;
    }
    try {
      return new URL(path, window.location.origin).toString();
    } catch {
      return path;
    }
  }, [selectedForm]);

  const qrCodeSrc = useMemo(() => {
    const encoded = encodeURIComponent(formUrl);
    return `https://api.qrserver.com/v1/create-qr-code/?size=${QR_IMAGE_SIZE}x${QR_IMAGE_SIZE}&data=${encoded}`;
  }, [formUrl]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(formUrl);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch (error) {
      console.error('リンクのコピーに失敗しました', error);
    }
  };

  const handleContinue = () => {
    window.open(selectedForm.path, '_blank', 'noopener,noreferrer');
    onOpenChange(false);
    onContinue?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>フォームを選択して共有</DialogTitle>
          <DialogDescription>
            新規顧客には目的に応じてフォームを共有できます。URLまたはQRコードでご案内ください。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="mb-3 text-sm font-medium text-gray-900">フォームの種類</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {FORM_OPTIONS.map((option) => {
                const Icon = option.icon;
                const isSelected = option.id === selectedFormId;
                return (
                  <button
                    type="button"
                    key={option.id}
                    onClick={() => setSelectedFormId(option.id)}
                    className={`flex h-full flex-col justify-between rounded-2xl border bg-white p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                      isSelected
                        ? 'border-orange-500 shadow-lg shadow-orange-100'
                        : 'border-gray-200 hover:border-orange-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-full ${
                          isSelected ? 'bg-orange-50 text-orange-600' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-base font-semibold text-gray-900">{option.title}</p>
                          {isSelected && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-600">
                              <Check className="h-3 w-3" />
                              選択中
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{option.description}</p>
                        <p className="text-xs font-medium text-gray-600">{option.processingTime}</p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-1">
                      {option.highlights.map((highlight) => (
                        <li key={highlight} className="text-sm text-gray-600 before:mr-2 before:text-orange-500 before:content-['•']">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center">
              <p className="mb-3 text-sm font-semibold text-gray-900">QRコード</p>
              <div className="flex items-center justify-center rounded-xl bg-white p-3">
                <img
                  src={qrCodeSrc}
                  alt={`${selectedForm.title}のQRコード`}
                  className="aspect-square w-48 max-w-full rounded-md border border-gray-100 object-contain"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">イベント会場や店舗での共有にご利用ください</p>
            </div>

            <div className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50/60 p-4">
              <p className="text-sm font-semibold text-gray-900">{selectedForm.title}の共有リンク</p>
              <div className="rounded-lg border bg-white p-3">
                <p className="text-xs font-medium text-gray-500">URL</p>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <code className="flex-1 truncate rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-900">
                    {formUrl}
                  </code>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCopyLink} className="flex-1 sm:flex-none">
                      {copyState === 'copied' ? (
                        <>
                          <ClipboardCheck className="mr-2 h-4 w-4" />
                          コピー済み
                        </>
                      ) : (
                        <>
                          <Clipboard className="mr-2 h-4 w-4" />
                          URLをコピー
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            閉じる
          </Button>
          <Button onClick={handleContinue} className="bg-orange-500 text-white hover:bg-orange-600">
            フォームを開く
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

