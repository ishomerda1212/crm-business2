import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockCustomerSearchCandidates, getConstructionAddressesByCustomerName } from '@/data/mockData';
import type { CustomerSearchCandidate } from '../types/CustomerSearchCandidate';
import type { PropertyInfo } from '@/lib/supabase';
import { Search, UserCheck, UserPlus } from 'lucide-react';
import { NewCustomerFormDialog } from './NewCustomerFormDialog';
import { ConstructionAddressSelectDialog } from './ConstructionAddressSelectDialog';

type CreateProjectDialogProps = {
  trigger: ReactNode;
  onProceed?: (candidate: CustomerSearchCandidate | null, propertyInfo?: PropertyInfo) => void;
};

export function CreateProjectDialog({ trigger, onProceed }: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [addressSelectDialogOpen, setAddressSelectDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<CustomerSearchCandidate | null>(null);
  const [nameQuery, setNameQuery] = useState('');
  const [phoneQuery, setPhoneQuery] = useState('');
  const [addressQuery, setAddressQuery] = useState('');

  const normalize = (value: string) =>
    value.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');

  const filteredCandidates = useMemo(() => {
    return mockCustomerSearchCandidates.filter((candidate) => {
      const nameMatch = nameQuery
        ? normalize(candidate.customerName).includes(normalize(nameQuery))
        : true;
      const phoneMatch = phoneQuery
        ? normalize(candidate.phone).includes(normalize(phoneQuery))
        : true;
      const addressMatch = addressQuery
        ? normalize(candidate.address).includes(normalize(addressQuery))
        : true;
      return nameMatch && phoneMatch && addressMatch;
    });
  }, [nameQuery, phoneQuery, addressQuery]);

  const resetForm = () => {
    setNameQuery('');
    setPhoneQuery('');
    setAddressQuery('');
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleSelect = (candidate: CustomerSearchCandidate | null) => {
    // 顧客に紐づく工事住所を取得
    const addresses = getConstructionAddressesByCustomerName(candidate?.customerName || '');
    
    if (addresses.length > 0) {
      // 工事住所がある場合は選択ダイアログを表示
      setSelectedCandidate(candidate);
      setAddressSelectDialogOpen(true);
    } else {
      // 工事住所がない場合はそのまま進む
      onProceed?.(candidate);
      handleClose();
    }
  };

  const handleAddressSelect = (propertyInfo: PropertyInfo) => {
    onProceed?.(selectedCandidate, propertyInfo);
    setSelectedCandidate(null);
    handleClose();
  };

  const handleAddressDialogChange = (value: boolean) => {
    setAddressSelectDialogOpen(value);
    if (!value) {
      setSelectedCandidate(null);
    }
  };

  const handleMainDialogChange = (value: boolean) => {
    setOpen(value);
    if (!value) {
      resetForm();
    }
  };

  const handleContinueAsNew = () => {
    handleClose();
    setFormDialogOpen(true);
  };

  const handleFormDialogChange = (value: boolean) => {
    setFormDialogOpen(value);
  };

  const handleFormContinue = () => {
    onProceed?.(null);
    setFormDialogOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleMainDialogChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>新規案件の事前確認</DialogTitle>
          <DialogDescription>
            まずはOB様かどうかを検索して、既存顧客の重複登録を防止します。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="search-name">顧客名</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="search-name"
                  placeholder="例: 田中 太郎"
                  value={nameQuery}
                  onChange={(event) => setNameQuery(event.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="search-phone">電話番号</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="search-phone"
                  placeholder="例: 09012345678"
                  value={phoneQuery}
                  onChange={(event) => setPhoneQuery(event.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="search-address">住所</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="search-address"
                  placeholder="例: 東京都中央区"
                  value={addressQuery}
                  onChange={(event) => setAddressQuery(event.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-900">検索候補</p>
              <span className="text-xs text-gray-500">{filteredCandidates.length}件</span>
            </div>
            <ScrollArea className="max-h-80 pr-3">
              <div className="space-y-3">
                {filteredCandidates.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500">
                    条件に一致する顧客が見つかりません。入力内容をご確認ください。
                  </div>
                ) : (
                  filteredCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1 space-y-1">
                          <p className="text-base font-semibold text-gray-900">
                            {candidate.customerName}
                          </p>
                          <p className="text-sm text-gray-500">{candidate.phone}</p>
                          <p className="text-sm text-gray-500">{candidate.address}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSelect(candidate)}
                          className="w-full sm:w-auto sm:ml-6"
                        >
                          <UserCheck className="mr-2 h-4 w-4" />
                          この顧客で案件作成
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={resetForm}>
              条件をリセット
            </Button>
            <Button onClick={handleContinueAsNew} className="bg-orange-500 text-white hover:bg-orange-600">
              <UserPlus className="mr-2 h-4 w-4" />
              新規顧客として続行
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <NewCustomerFormDialog
        open={formDialogOpen}
        onOpenChange={handleFormDialogChange}
        onContinue={handleFormContinue}
      />
      {selectedCandidate && (
        <ConstructionAddressSelectDialog
          open={addressSelectDialogOpen}
          onOpenChange={handleAddressDialogChange}
          customerName={selectedCandidate.customerName}
          addresses={getConstructionAddressesByCustomerName(selectedCandidate.customerName)}
          onSelect={handleAddressSelect}
          customerId={selectedCandidate.id}
        />
      )}
    </>
  );
}


