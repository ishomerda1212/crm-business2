import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import type { PropertyInfo } from '@/lib/supabase';
import { MapPin, Check, Plus } from 'lucide-react';
import { ConstructionAddressFormDialog } from '@/features/property/components/ConstructionAddressFormDialog';

type ConstructionAddressSelectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName: string;
  addresses: PropertyInfo[];
  onSelect: (propertyInfo: PropertyInfo) => void;
  customerId?: string;
};

export function ConstructionAddressSelectDialog({
  open,
  onOpenChange,
  customerName,
  addresses,
  onSelect,
  customerId,
}: ConstructionAddressSelectDialogProps) {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showConstructionAddressFormDialog, setShowConstructionAddressFormDialog] = useState(false);

  const formatAddress = (property: PropertyInfo) => {
    const parts = [];
    if (property.construction_postal_code) parts.push(`〒${property.construction_postal_code}`);
    if (property.construction_prefecture) parts.push(property.construction_prefecture);
    if (property.construction_address) parts.push(property.construction_address);
    return parts.length > 0 ? parts.join(' ') : '-';
  };

  const handleSelect = () => {
    if (selectedAddressId) {
      const selected = addresses.find((addr) => addr.id === selectedAddressId);
      if (selected) {
        onSelect(selected);
        setSelectedAddressId(null);
        onOpenChange(false);
      }
    }
  };

  const handleCancel = () => {
    setSelectedAddressId(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>工事住所の選択</DialogTitle>
          <DialogDescription>
            {customerName}様に紐づく工事住所一覧から、新規案件の工事住所を選択してください。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-900">工事住所一覧</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">{addresses.length}件</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowConstructionAddressFormDialog(true)}
                className="text-orange-600 border-orange-300 hover:bg-orange-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                新規で工事住所を登録する
              </Button>
            </div>
          </div>
          <ScrollArea className="max-h-96 pr-3">
            {addresses.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500">
                工事住所が登録されていません。
              </div>
            ) : (
              <div className="space-y-3">
                {addresses.map((address) => {
                  const isSelected = selectedAddressId === address.id;
                  return (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddressId(address.id)}
                      className={`rounded-lg border p-4 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-50'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          isSelected
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-gray-300 bg-white'
                        }`}>
                          {isSelected && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              {address.property_name && (
                                <p className="text-base font-semibold text-gray-900 mb-1">
                                  {address.property_name}
                                </p>
                              )}
                              <div className="flex items-start gap-2 text-sm text-gray-600">
                                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span className="flex-1">{formatAddress(address)}</span>
                              </div>
                            </div>
                            {address.construction_property_type && (
                              <Badge variant="outline" className="ml-2">
                                {address.construction_property_type}
                              </Badge>
                            )}
                          </div>
                          {address.construction_structure && (
                            <p className="text-xs text-gray-500">
                              構造: {address.construction_structure}
                              {address.construction_layout && ` / 間取り: ${address.construction_layout}`}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            キャンセル
          </Button>
          <Button
            onClick={handleSelect}
            disabled={!selectedAddressId}
            className="bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            選択した住所で案件作成
          </Button>
        </DialogFooter>
      </DialogContent>

      <ConstructionAddressFormDialog
        open={showConstructionAddressFormDialog}
        onOpenChange={setShowConstructionAddressFormDialog}
        customerId={customerId}
      />
    </Dialog>
  );
}

