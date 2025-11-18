import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type WarrantyItem = {
  id: string;
  category: string;
  hasWork: boolean; // 工事の有無
  hasWarranty: boolean; // 保証の有無
  warrantyItem: string; // 保証項目
  warrantyDetails: string; // 保証事項
  warrantyPeriod: string; // 保証期間
  exemptionClauses: string; // 特定免責事項
  remarks: string; // 備考
};

type WarrantyCategory = {
  id: string;
  title: string;
  subCategories?: string[]; // サブカテゴリ（例: 外部仕上、内部仕上など）
};

const warrantyCategories: WarrantyCategory[] = [
  {
    id: 'structural-frame',
    title: '構造躯体に関する保証',
  },
  {
    id: 'rain-leakage',
    title: '雨漏りに関する保証',
  },
  {
    id: 'finish-accessories-equipment',
    title: '仕上げ・付属品・設備に関する保証',
    subCategories: ['外部仕上', '内部仕上', '外部付属部品', '内部付属部品', '設備'],
  },
];

export function WarrantyContentPage() {
  const [items, setItems] = useState<WarrantyItem[]>([]);
  const [editingItem, setEditingItem] = useState<WarrantyItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState<Partial<WarrantyItem>>({
    category: '',
    hasWork: false,
    hasWarranty: false,
    warrantyItem: '',
    warrantyDetails: '',
    warrantyPeriod: '',
    exemptionClauses: '',
    remarks: '',
  });

  const getItemsByCategory = (categoryId: string, subCategory?: string) => {
    return items.filter((item) => {
      if (subCategory) {
        return item.category === `${categoryId}-${subCategory}`;
      }
      return item.category === categoryId;
    });
  };

  const openAddDialog = (categoryId?: string, subCategory?: string) => {
    const category = categoryId || 'structural-frame';
    const subCat = subCategory || '';
    const categoryKey = subCat ? `${category}-${subCat}` : category;
    
    setEditingItem({
      id: `warranty-${Date.now()}-${Math.random()}`,
      category: categoryKey,
      hasWork: false,
      hasWarranty: false,
      warrantyItem: '',
      warrantyDetails: '',
      warrantyPeriod: '',
      exemptionClauses: '',
      remarks: '',
    });
    setFormData({
      category: categoryKey,
      hasWork: false,
      hasWarranty: false,
      warrantyItem: '',
      warrantyDetails: '',
      warrantyPeriod: '',
      exemptionClauses: '',
      remarks: '',
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: WarrantyItem) => {
    setEditingItem(item);
    setFormData({
      category: item.category,
      hasWork: item.hasWork,
      hasWarranty: item.hasWarranty,
      warrantyItem: item.warrantyItem,
      warrantyDetails: item.warrantyDetails,
      warrantyPeriod: item.warrantyPeriod,
      exemptionClauses: item.exemptionClauses,
      remarks: item.remarks,
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({
      category: '',
      hasWork: false,
      hasWarranty: false,
      warrantyItem: '',
      warrantyDetails: '',
      warrantyPeriod: '',
      exemptionClauses: '',
      remarks: '',
    });
  };

  const handleSave = () => {
    if (!editingItem) return;

    if (editingItem.id.startsWith('warranty-') && !items.find((i) => i.id === editingItem!.id)) {
      // 新規追加
      setItems((prev) => [
        ...prev,
        {
          ...editingItem,
          category: formData.category || '',
          hasWork: formData.hasWork || false,
          hasWarranty: formData.hasWarranty || false,
          warrantyItem: formData.warrantyItem || '',
          warrantyDetails: formData.warrantyDetails || '',
          warrantyPeriod: formData.warrantyPeriod || '',
          exemptionClauses: formData.exemptionClauses || '',
          remarks: formData.remarks || '',
        },
      ]);
    } else {
      // 編集
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                category: formData.category || '',
                hasWork: formData.hasWork || false,
                hasWarranty: formData.hasWarranty || false,
                warrantyItem: formData.warrantyItem || '',
                warrantyDetails: formData.warrantyDetails || '',
                warrantyPeriod: formData.warrantyPeriod || '',
                exemptionClauses: formData.exemptionClauses || '',
                remarks: formData.remarks || '',
              }
            : item
        )
      );
    }

    closeDialog();
  };

  const handleDelete = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">保証内容設定</h2>
          <p className="text-sm text-gray-500 mt-1">
            保証項目ごとに、保証期間、保証事項、特定免責事項、備考を設定します。
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => openAddDialog()} className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            保証項目を追加
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {warrantyCategories.map((category) => {
          if (category.subCategories && category.subCategories.length > 0) {
            // サブカテゴリがある場合
            return (
              <div key={category.id} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{category.title}</CardTitle>
                  </CardHeader>
                </Card>
                {category.subCategories.map((subCategory) => {
                  const categoryKey = `${category.id}-${subCategory}`;
                  const categoryItems = getItemsByCategory(category.id, subCategory);
                  return (
                    <Card key={categoryKey}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{subCategory}</CardTitle>
                            <CardDescription>
                              {categoryItems.length}件の保証項目が設定されています
                            </CardDescription>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openAddDialog(category.id, subCategory)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            追加
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {categoryItems.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <p className="text-sm">保証項目が設定されていません</p>
                            <p className="text-xs mt-1">
                              保証項目を追加して、保証内容を設定してください
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4 overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-24">区分</TableHead>
                                  <TableHead className="w-12 text-center">工事有無</TableHead>
                                  <TableHead className="w-12 text-center">保証有無</TableHead>
                                  <TableHead className="min-w-[200px]">保証項目</TableHead>
                                  <TableHead className="min-w-[250px]">保証事項</TableHead>
                                  <TableHead className="w-20">保証期間</TableHead>
                                  <TableHead className="min-w-[200px]">特定免責事項</TableHead>
                                  <TableHead className="min-w-[150px]">備考</TableHead>
                                  <TableHead className="w-32">操作</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {categoryItems.map((item) => (
                                  <TableRow key={item.id}>
                                    <TableCell>
                                      <div className="text-sm text-gray-700">
                                        {subCategory}
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {item.hasWork ? (
                                        <span className="text-orange-500 font-bold text-lg">○</span>
                                      ) : (
                                        <span className="text-gray-300">-</span>
                                      )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {item.hasWarranty ? (
                                        <span className="text-orange-500 font-bold text-lg">○</span>
                                      ) : (
                                        <span className="text-gray-300">-</span>
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      <div className="text-sm text-gray-900 whitespace-normal">
                                        {item.warrantyItem}
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="text-xs text-gray-700 whitespace-pre-wrap max-w-[250px]">
                                        {item.warrantyDetails || '-'}
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="text-sm text-gray-600">
                                        {item.warrantyPeriod}
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="text-xs text-gray-700 whitespace-pre-wrap max-w-[200px]">
                                        {item.exemptionClauses || '-'}
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="text-xs text-gray-700 whitespace-pre-wrap max-w-[150px]">
                                        {item.remarks || '-'}
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => openEditDialog(item)}
                                        >
                                          <Edit2 className="h-4 w-4 text-blue-500" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => handleDelete(item.id)}
                                        >
                                          <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            );
          } else {
            // サブカテゴリがない場合
            const categoryItems = getItemsByCategory(category.id);
            return (
              <Card key={category.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>
                        {categoryItems.length}件の保証項目が設定されています
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openAddDialog(category.id)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      追加
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {categoryItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-sm">保証項目が設定されていません</p>
                      <p className="text-xs mt-1">
                        保証項目を追加して、保証内容を設定してください
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-24">区分</TableHead>
                            <TableHead className="w-12 text-center">工事有無</TableHead>
                            <TableHead className="w-12 text-center">保証有無</TableHead>
                            <TableHead className="min-w-[200px]">保証項目</TableHead>
                            <TableHead className="min-w-[250px]">保証事項</TableHead>
                            <TableHead className="w-20">保証期間</TableHead>
                            <TableHead className="min-w-[200px]">特定免責事項</TableHead>
                            <TableHead className="min-w-[150px]">備考</TableHead>
                            <TableHead className="w-32">操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {categoryItems.map((item) => {
                            const category = warrantyCategories.find((c) => 
                              item.category === c.id || item.category.startsWith(c.id + '-')
                            );
                            const displayCategory = category?.title || item.category;
                            return (
                              <TableRow key={item.id}>
                                <TableCell>
                                  <div className="text-sm text-gray-700">
                                    {displayCategory}
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  {item.hasWork ? (
                                    <span className="text-orange-500 font-bold text-lg">○</span>
                                  ) : (
                                    <span className="text-gray-300">-</span>
                                  )}
                                </TableCell>
                                <TableCell className="text-center">
                                  {item.hasWarranty ? (
                                    <span className="text-orange-500 font-bold text-lg">○</span>
                                  ) : (
                                    <span className="text-gray-300">-</span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <div className="text-sm text-gray-900 whitespace-normal">
                                    {item.warrantyItem}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="text-xs text-gray-700 whitespace-pre-wrap max-w-[250px]">
                                    {item.warrantyDetails || '-'}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="text-sm text-gray-600">
                                    {item.warrantyPeriod}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="text-xs text-gray-700 whitespace-pre-wrap max-w-[200px]">
                                    {item.exemptionClauses || '-'}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="text-xs text-gray-700 whitespace-pre-wrap max-w-[150px]">
                                    {item.remarks || '-'}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => openEditDialog(item)}
                                    >
                                      <Edit2 className="h-4 w-4 text-blue-500" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleDelete(item.id)}
                                    >
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          }
        })}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem && items.find((i) => i.id === editingItem.id)
                ? '保証項目を編集'
                : '保証項目を追加'}
            </DialogTitle>
            <DialogDescription>
              保証項目の詳細を設定します。保証期間、保証事項、特定免責事項、備考を入力してください。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">区分</Label>
              <Select
                value={formData.category || ''}
                onValueChange={(value) => {
                  setFormData({ ...formData, category: value });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="区分を選択" />
                </SelectTrigger>
                <SelectContent>
                  {warrantyCategories.map((category) => {
                    if (category.subCategories && category.subCategories.length > 0) {
                      return category.subCategories.map((subCategory) => {
                        const categoryKey = `${category.id}-${subCategory}`;
                        return (
                          <SelectItem key={categoryKey} value={categoryKey}>
                            {category.title} - {subCategory}
                          </SelectItem>
                        );
                      });
                    } else {
                      return (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      );
                    }
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">保証項目</Label>
              <Input
                value={formData.warrantyItem || ''}
                onChange={(e) =>
                  setFormData({ ...formData, warrantyItem: e.target.value })
                }
                placeholder="保証項目を入力してください"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">保証事項</Label>
              <Textarea
                value={formData.warrantyDetails || ''}
                onChange={(e) =>
                  setFormData({ ...formData, warrantyDetails: e.target.value })
                }
                placeholder="保証事項を入力してください（長文対応）"
                rows={6}
                className="min-h-[150px] resize-y"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">保証期間</Label>
              <Input
                value={formData.warrantyPeriod || ''}
                onChange={(e) =>
                  setFormData({ ...formData, warrantyPeriod: e.target.value })
                }
                placeholder="例: 5年、2年、10年"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">特定免責事項</Label>
              <Textarea
                value={formData.exemptionClauses || ''}
                onChange={(e) =>
                  setFormData({ ...formData, exemptionClauses: e.target.value })
                }
                placeholder="特定免責事項を入力してください（長文対応）"
                rows={6}
                className="min-h-[150px] resize-y"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">備考</Label>
              <Textarea
                value={formData.remarks || ''}
                onChange={(e) =>
                  setFormData({ ...formData, remarks: e.target.value })
                }
                placeholder="備考を入力してください（長文対応）"
                rows={4}
                className="min-h-[100px] resize-y"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              <X className="h-4 w-4 mr-2" />
              キャンセル
            </Button>
            <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
              <Save className="h-4 w-4 mr-2" />
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

