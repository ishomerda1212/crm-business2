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

type Branch = {
  id: string;
  name: string;
  location: string;
  manager: string;
  phone: string;
};

export function BranchListPage() {
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

  const [branchDraft, setBranchDraft] = useState<Omit<Branch, 'id'>>({
    name: '',
    location: '',
    manager: '',
    phone: '',
  });

  const canSaveBranch = useMemo(
    () =>
      branchDraft.name.trim() &&
      branchDraft.location.trim() &&
      branchDraft.manager.trim() &&
      branchDraft.phone.trim(),
    [branchDraft]
  );

  const handleAddBranch = () => {
    if (!canSaveBranch) return;
    setBranches((prev) => [...prev, { id: `branch-${Date.now()}`, ...branchDraft }]);
    setBranchDraft({ name: '', location: '', manager: '', phone: '' });
  };

  return (
    <div className="w-full">
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
    </div>
  );
}

