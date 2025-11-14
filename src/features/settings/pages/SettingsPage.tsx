import { ChangeEvent, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

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

type Branch = {
  id: string;
  name: string;
  location: string;
  manager: string;
  phone: string;
};

type Contact = {
  id: string;
  name: string;
  company: string;
  mainBranch: string;
  role: 'admin' | 'manager' | 'staff';
  email: string;
};

const roleLabels: Record<Contact['role'], string> = {
  admin: '管理者',
  manager: 'マネージャー',
  staff: 'スタッフ',
};

export function SettingsPage() {
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

  const [branches, setBranches] = useState<Branch[]>([
    {
      id: 'branch-1',
      name: '東京本店',
      location: '東京都渋谷区恵比寿1-1-1',
      manager: '田中 健',
      phone: '03-1234-5678',
    },
    {
      id: 'branch-2',
      name: '大阪支店',
      location: '大阪府大阪市北区梅田2-2-2',
      manager: '佐藤 優',
      phone: '06-9876-5432',
    },
  ]);

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 'contact-1',
      name: '高橋 真由',
      company: 'リノベーション株式会社',
      mainBranch: '東京本店',
      role: 'admin',
      email: 'mayu.takahashi@renovation.co.jp',
    },
    {
      id: 'contact-2',
      name: '鈴木 真一',
      company: 'リノベーション株式会社',
      mainBranch: '大阪支店',
      role: 'manager',
      email: 'shinichi.suzuki@renovation.co.jp',
    },
  ]);

  const [logoPreview, setLogoPreview] = useState<string>();
  const [branchDraft, setBranchDraft] = useState<Omit<Branch, 'id'>>({
    name: '',
    location: '',
    manager: '',
    phone: '',
  });
  const [contactDraft, setContactDraft] = useState<Omit<Contact, 'id'>>({
    name: '',
    company: '',
    mainBranch: '',
    role: 'staff',
    email: '',
  });

  const canSaveBranch = useMemo(
    () =>
      branchDraft.name.trim() &&
      branchDraft.location.trim() &&
      branchDraft.manager.trim() &&
      branchDraft.phone.trim(),
    [branchDraft]
  );

  const canSaveContact = useMemo(
    () =>
      contactDraft.name.trim() &&
      contactDraft.company.trim() &&
      contactDraft.mainBranch.trim() &&
      contactDraft.role.trim() &&
      contactDraft.email.trim(),
    [contactDraft]
  );

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

  const handleAddBranch = () => {
    if (!canSaveBranch) return;
    setBranches((prev) => [...prev, { id: `branch-${Date.now()}`, ...branchDraft }]);
    setBranchDraft({ name: '', location: '', manager: '', phone: '' });
  };

  const handleAddContact = () => {
    if (!canSaveContact) return;
    setContacts((prev) => [
      ...prev,
      { id: `contact-${Date.now()}`, ...contactDraft },
    ]);
    setContactDraft({
      name: '',
      company: '',
      mainBranch: '',
      role: 'staff',
      email: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 w-full overflow-x-hidden">
      <div className="bg-white dark:bg-white border-b dark:border-gray-200 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-orange-500">設定</p>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-900">
                組織・ユーザー設定
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                自社情報や拠点、担当者を一元管理します。
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">下書き保存</Button>
              <Button>公開設定を更新</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
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
                  <Input type="file" accept="image/*" onChange={handleLogoChange} />
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

        <Card>
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>店舗・拠点リスト</CardTitle>
              <CardDescription>各拠点の情報と責任者を管理します。</CardDescription>
            </div>
            <Button onClick={handleAddBranch} disabled={!canSaveBranch}>
              拠点を追加
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label>店舗・拠点名</Label>
                <Input
                  value={branchDraft.name}
                  onChange={(e) =>
                    setBranchDraft((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="例：名古屋営業所"
                />
              </div>
              <div className="space-y-2">
                <Label>所在地</Label>
                <Input
                  value={branchDraft.location}
                  onChange={(e) =>
                    setBranchDraft((prev) => ({ ...prev, location: e.target.value }))
                  }
                  placeholder="都道府県・市区町村"
                />
              </div>
              <div className="space-y-2">
                <Label>責任者</Label>
                <Input
                  value={branchDraft.manager}
                  onChange={(e) =>
                    setBranchDraft((prev) => ({ ...prev, manager: e.target.value }))
                  }
                  placeholder="氏名"
                />
              </div>
              <div className="space-y-2">
                <Label>電話</Label>
                <Input
                  value={branchDraft.phone}
                  onChange={(e) =>
                    setBranchDraft((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="03-0000-0000"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>店舗・拠点名</TableHead>
                    <TableHead>所在地</TableHead>
                    <TableHead>責任者</TableHead>
                    <TableHead>電話</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {branches.map((branch) => (
                    <TableRow key={branch.id}>
                      <TableCell className="font-medium">{branch.name}</TableCell>
                      <TableCell>{branch.location}</TableCell>
                      <TableCell>{branch.manager}</TableCell>
                      <TableCell>{branch.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {branches.length === 0 && (
                <p className="text-center text-sm text-gray-500 py-6">
                  登録済みの拠点がありません。
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>担当者リスト</CardTitle>
              <CardDescription>所属や権限を設定し、アクセスを最適化します。</CardDescription>
            </div>
            <Button onClick={handleAddContact} disabled={!canSaveContact}>
              担当者を追加
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="space-y-2">
                <Label>担当者名</Label>
                <Input
                  value={contactDraft.name}
                  onChange={(e) =>
                    setContactDraft((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="氏名"
                />
              </div>
              <div className="space-y-2">
                <Label>所属会社</Label>
                <Input
                  value={contactDraft.company}
                  onChange={(e) =>
                    setContactDraft((prev) => ({ ...prev, company: e.target.value }))
                  }
                  placeholder="会社名"
                />
              </div>
              <div className="space-y-2">
                <Label>主店舗・拠点</Label>
                <Input
                  value={contactDraft.mainBranch}
                  onChange={(e) =>
                    setContactDraft((prev) => ({
                      ...prev,
                      mainBranch: e.target.value,
                    }))
                  }
                  placeholder="例：東京本店"
                />
              </div>
              <div className="space-y-2">
                <Label>権限</Label>
                <select
                  value={contactDraft.role}
                  onChange={(e) =>
                    setContactDraft((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className="rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="admin">管理者</option>
                  <option value="manager">マネージャー</option>
                  <option value="staff">スタッフ</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>メール</Label>
                <Input
                  type="email"
                  value={contactDraft.email}
                  onChange={(e) =>
                    setContactDraft((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="example@example.com"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>担当者名</TableHead>
                    <TableHead>所属会社</TableHead>
                    <TableHead>主店舗・拠点</TableHead>
                    <TableHead>権限</TableHead>
                    <TableHead>メール</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.company}</TableCell>
                      <TableCell>{contact.mainBranch}</TableCell>
                      <TableCell>
                        <Badge variant={contact.role === 'admin' ? 'default' : 'secondary'}>
                          {roleLabels[contact.role]}
                        </Badge>
                      </TableCell>
                      <TableCell>{contact.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {contacts.length === 0 && (
                <p className="text-center text-sm text-gray-500 py-6">
                  登録済みの担当者がありません。
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

