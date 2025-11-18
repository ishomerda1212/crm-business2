import { useState, useMemo } from 'react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Contact = {
  id: string;
  name: string;
  company: string;
  mainBranch: string;
  role: 'admin' | 'accounting' | 'sales_admin' | 'sales_manager' | 'sales';
  email: string;
};

const roleLabels: Record<Contact['role'], string> = {
  admin: '管理者',
  accounting: '経理',
  sales_admin: '営業事務',
  sales_manager: '営業責任者',
  sales: '営業',
};

export function StaffListPage() {
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
      role: 'sales_manager',
      email: 'shinichi.suzuki@renovation.co.jp',
    },
  ]);

  const [contactDraft, setContactDraft] = useState<Omit<Contact, 'id'>>({
    name: '',
    company: '',
    mainBranch: '',
    role: 'sales',
    email: '',
  });

  const canSaveContact = useMemo(
    () =>
      contactDraft.name.trim() &&
      contactDraft.company.trim() &&
      contactDraft.mainBranch.trim() &&
      contactDraft.role.trim() &&
      contactDraft.email.trim(),
    [contactDraft]
  );

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
      role: 'sales',
      email: '',
    });
  };

  return (
    <div className="w-full">
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
                <Select
                  value={contactDraft.role}
                  onValueChange={(value) =>
                    setContactDraft((prev) => ({
                      ...prev,
                      role: value as Contact['role'],
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="権限を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">管理者</SelectItem>
                    <SelectItem value="accounting">経理</SelectItem>
                    <SelectItem value="sales_admin">営業事務</SelectItem>
                    <SelectItem value="sales_manager">営業責任者</SelectItem>
                    <SelectItem value="sales">営業</SelectItem>
                  </SelectContent>
                </Select>
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
                        <Badge
                          variant={
                            contact.role === 'admin' || contact.role === 'sales_manager'
                              ? 'default'
                              : 'secondary'
                          }
                        >
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
  );
}

