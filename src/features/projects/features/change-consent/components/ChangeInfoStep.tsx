import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

type ChangeInfoStepProps = {
  changeData: {
    newContractAmount: string;
    amountChangeReason: string;
    newStartDate: string;
    newEndDate: string;
    scheduleChangeReason: string;
  };
  onChangeDataChange: (data: {
    newContractAmount: string;
    amountChangeReason: string;
    newStartDate: string;
    newEndDate: string;
    scheduleChangeReason: string;
  }) => void;
};

export const ChangeInfoStep = ({ changeData, onChangeDataChange }: ChangeInfoStepProps) => {
  // localStorageから変更データを読み込む
  useEffect(() => {
    const savedData = localStorage.getItem('changeConsentData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        onChangeDataChange({
          newContractAmount: parsed.newContractAmount || '',
          amountChangeReason: parsed.amountChangeReason || '',
          newStartDate: parsed.newStartDate || '',
          newEndDate: parsed.newEndDate || '',
          scheduleChangeReason: parsed.scheduleChangeReason || '',
        });
      } catch (e) {
        console.error('Failed to parse change consent data', e);
      }
    }
  }, [onChangeDataChange]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">変更内容のご確認</h1>
        <p className="mt-2 text-gray-600">
          以下の変更内容をご確認ください。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>変更後請負金額</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-500 text-sm">変更後請負金額</Label>
            <p className="mt-1 text-gray-900 font-medium">
              {changeData.newContractAmount || '-'}
            </p>
          </div>
          <div>
            <Label className="text-gray-500 text-sm">変更理由</Label>
            <p className="mt-1 text-gray-900 font-medium whitespace-pre-wrap">
              {changeData.amountChangeReason || '-'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>変更後工期</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 text-sm">着工日</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {changeData.newStartDate ? new Date(changeData.newStartDate).toLocaleDateString('ja-JP') : '-'}
              </p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">完工日</Label>
              <p className="mt-1 text-gray-900 font-medium">
                {changeData.newEndDate ? new Date(changeData.newEndDate).toLocaleDateString('ja-JP') : '-'}
              </p>
            </div>
          </div>
          <div>
            <Label className="text-gray-500 text-sm">変更理由</Label>
            <p className="mt-1 text-gray-900 font-medium whitespace-pre-wrap">
              {changeData.scheduleChangeReason || '-'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

