import { ChangeEvent, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type CompanySettings = {
  companyName: string;
  headOffice: string;
  postalCode: string;
  prefecture: string;
  address: string;
  representative: string;
  email: string;
  logoUrl?: string;
};

export function CompanySettingsPage() {
  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    companyName: 'リノベーション株式会社',
    headOffice: '東京都渋谷区恵比寿1-1-1',
    postalCode: '150-0013',
    prefecture: '東京都',
    address: '渋谷区恵比寿1-1-1 リノベーションビル5F',
    representative: '山田 太郎',
    email: 'info@renovation.co.jp',
    logoUrl: '',
  });

  const [logoPreview, setLogoPreview] = useState<string>();

  const handleCompanyChange = (field: keyof CompanySettings, value: string) => {
    setCompanySettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setLogoPreview(result);
      setCompanySettings((prev) => ({ ...prev, logoUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>自社設定</CardTitle>
            <CardDescription>
              顧客や社内に共有される基本情報を管理します。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-2">
                <Label>ロゴ</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Company logo preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No Logo</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="text-sm"
                    />
                    <p className="text-xs text-gray-500">選択されていません</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">会社名</Label>
                <Input
                  id="companyName"
                  value={companySettings.companyName}
                  onChange={(e) => handleCompanyChange('companyName', e.target.value)}
                  placeholder="例：リノベーション株式会社"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="representative">代表者名</Label>
                <Input
                  id="representative"
                  value={companySettings.representative}
                  onChange={(e) => handleCompanyChange('representative', e.target.value)}
                  placeholder="例：山田 太郎"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">郵便番号</Label>
                <Input
                  id="postalCode"
                  value={companySettings.postalCode}
                  onChange={(e) => handleCompanyChange('postalCode', e.target.value)}
                  placeholder="例：150-0013"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prefecture">都道府県</Label>
                <Input
                  id="prefecture"
                  value={companySettings.prefecture}
                  onChange={(e) => handleCompanyChange('prefecture', e.target.value)}
                  placeholder="例：東京都"
                />
              </div>
              <div className="space-y-2 sm:col-span-2 lg:col-span-2">
                <Label htmlFor="headOffice">本社所在地</Label>
                <Input
                  id="headOffice"
                  value={companySettings.headOffice}
                  onChange={(e) => handleCompanyChange('headOffice', e.target.value)}
                  placeholder="例：東京都渋谷区恵比寿1-1-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">住所</Label>
              <Textarea
                id="address"
                value={companySettings.address}
                onChange={(e) => handleCompanyChange('address', e.target.value)}
                className="min-h-[100px]"
                placeholder="詳細住所を入力"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">企業メール</Label>
                <Input
                  id="email"
                  type="email"
                  value={companySettings.email}
                  onChange={(e) => handleCompanyChange('email', e.target.value)}
                  placeholder="info@example.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}

