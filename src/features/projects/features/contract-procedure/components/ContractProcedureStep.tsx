import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Calendar } from 'lucide-react';

export const ContractProcedureStep = () => {
  const [contractDate, setContractDate] = useState('');
  const [signerName, setSignerName] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">契約手続き</h1>
        <p className="mt-2 text-gray-600">
          契約書への署名・捺印を行います。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>契約情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contractDate">契約日</Label>
            <div className="relative">
              <Input
                id="contractDate"
                type="date"
                value={contractDate}
                onChange={(e) => setContractDate(e.target.value)}
                className="pl-10"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signerName">署名者氏名</Label>
            <Input
              id="signerName"
              type="text"
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              placeholder="山田 太郎"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>電子署名</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">
              こちらに署名をご記入ください
            </p>
            <div className="h-40 bg-gray-50 rounded border border-gray-200 flex items-center justify-center">
              <p className="text-gray-400">署名エリア</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              クリア
            </Button>
            <Button className="flex-1">
              署名を確定
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>契約書類</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">工事請負契約書</p>
              <p className="text-sm text-gray-500">PDF形式</p>
            </div>
            <Button variant="outline" size="sm">
              ダウンロード
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">重要事項説明書</p>
              <p className="text-sm text-gray-500">PDF形式</p>
            </div>
            <Button variant="outline" size="sm">
              ダウンロード
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">工事請負契約約款</p>
              <p className="text-sm text-gray-500">PDF形式</p>
            </div>
            <Button variant="outline" size="sm">
              ダウンロード
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
