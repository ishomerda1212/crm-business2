import { useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type ConstructionAddressFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId?: string;
};

const QR_IMAGE_SIZE = 192;

export function ConstructionAddressFormDialog({
  open,
  onOpenChange,
  customerId,
}: ConstructionAddressFormDialogProps) {
  const formUrl = useMemo(() => {
    const path = '/construction-address-form';
    const url = new URL(path, window.location.origin);
    if (customerId) {
      url.searchParams.set('customerId', customerId);
    }
    return url.toString();
  }, [customerId]);

  const qrCodeSrc = useMemo(() => {
    const encoded = encodeURIComponent(formUrl);
    return `https://api.qrserver.com/v1/create-qr-code/?size=${QR_IMAGE_SIZE}x${QR_IMAGE_SIZE}&data=${encoded}`;
  }, [formUrl]);

  const handleOpenForm = () => {
    window.open(formUrl, '_blank', 'noopener,noreferrer');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>新規工事住所追加フォーム</DialogTitle>
          <DialogDescription>
            新規工事住所を追加するためのフォームのQRコードとURLを表示します。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
            <p className="mb-4 text-sm font-semibold text-gray-900">QRコード</p>
            <div className="flex items-center justify-center rounded-xl bg-white p-3">
              <img
                src={qrCodeSrc}
                alt="新規工事住所追加フォームのQRコード"
                className="aspect-square w-48 max-w-full rounded-md border border-gray-100 object-contain"
              />
            </div>
            <p className="mt-3 text-xs text-gray-500">
              スマートフォンでQRコードをスキャンしてフォームを開くことができます
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50/60 p-4">
            <p className="text-sm font-semibold text-gray-900">共有リンク</p>
            <div className="rounded-lg border bg-white p-3">
              <p className="text-xs font-medium text-gray-500">URL</p>
              <div className="mt-2">
                <code className="block w-full break-all rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-900">
                  {formUrl}
                </code>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            キャンセル
          </Button>
          <Button onClick={handleOpenForm} className="bg-orange-500 text-white hover:bg-orange-600">
            フォームを開く
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

