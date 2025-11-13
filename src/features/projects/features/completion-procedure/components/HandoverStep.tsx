import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { Calendar, Key, FileText, Home } from 'lucide-react';

export const HandoverStep = () => {
  const [handoverDate, setHandoverDate] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [checklist, setChecklist] = useState({
    inspection: false,
    documents: false,
    keys: false,
    warranty: false,
    manual: false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">引き渡し</h1>
        <p className="mt-2 text-gray-600">
          完成した物件をお引き渡しいたします。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>引き渡し情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="handoverDate">引き渡し日</Label>
            <div className="relative">
              <Input
                id="handoverDate"
                type="date"
                value={handoverDate}
                onChange={(e) => setHandoverDate(e.target.value)}
                className="pl-10"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="receiverName">受領者氏名</Label>
            <Input
              id="receiverName"
              type="text"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder="山田 太郎"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>引き渡しチェックリスト</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="inspection"
              checked={checklist.inspection}
              onCheckedChange={(checked) =>
                setChecklist({ ...checklist, inspection: checked as boolean })
              }
            />
            <div className="space-y-1 flex-1">
              <Label htmlFor="inspection" className="text-sm font-medium cursor-pointer">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-gray-500" />
                  <span>最終検査の実施</span>
                </div>
              </Label>
              <p className="text-sm text-gray-500">
                お客様立ち会いのもと、施工箇所の最終確認を実施しました
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="documents"
              checked={checklist.documents}
              onCheckedChange={(checked) =>
                setChecklist({ ...checklist, documents: checked as boolean })
              }
            />
            <div className="space-y-1 flex-1">
              <Label htmlFor="documents" className="text-sm font-medium cursor-pointer">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>書類一式のお渡し</span>
                </div>
              </Label>
              <p className="text-sm text-gray-500">
                工事完了報告書、検査済証、保証書等の書類をお渡ししました
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="keys"
              checked={checklist.keys}
              onCheckedChange={(checked) =>
                setChecklist({ ...checklist, keys: checked as boolean })
              }
            />
            <div className="space-y-1 flex-1">
              <Label htmlFor="keys" className="text-sm font-medium cursor-pointer">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-gray-500" />
                  <span>鍵のお渡し</span>
                </div>
              </Label>
              <p className="text-sm text-gray-500">
                玄関鍵、設備鍵など、全ての鍵をお渡ししました
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="warranty"
              checked={checklist.warranty}
              onCheckedChange={(checked) =>
                setChecklist({ ...checklist, warranty: checked as boolean })
              }
            />
            <div className="space-y-1 flex-1">
              <Label htmlFor="warranty" className="text-sm font-medium cursor-pointer">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>保証書のお渡し</span>
                </div>
              </Label>
              <p className="text-sm text-gray-500">
                工事保証書および設備機器の保証書をお渡ししました
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="manual"
              checked={checklist.manual}
              onCheckedChange={(checked) =>
                setChecklist({ ...checklist, manual: checked as boolean })
              }
            />
            <div className="space-y-1 flex-1">
              <Label htmlFor="manual" className="text-sm font-medium cursor-pointer">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>取扱説明書のお渡し</span>
                </div>
              </Label>
              <p className="text-sm text-gray-500">
                設備機器の取扱説明書とメンテナンス方法をご説明しました
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>お渡し書類一覧</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">工事完了報告書</p>
                <p className="text-sm text-gray-500">施工内容の詳細報告</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              確認
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">工事保証書</p>
                <p className="text-sm text-gray-500">施工保証・防水保証・構造保証</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              確認
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">設備機器保証書</p>
                <p className="text-sm text-gray-500">メーカー保証書一式</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              確認
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">取扱説明書</p>
                <p className="text-sm text-gray-500">設備機器の使用方法とメンテナンス</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              確認
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">竣工写真集</p>
                <p className="text-sm text-gray-500">施工前後の比較写真</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              確認
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>電子署名</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            引き渡しを確認し、上記の書類・鍵等を受領したことを確認します。
          </p>
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
    </div>
  );
};
