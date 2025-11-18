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
import { Checkbox } from '@/components/ui/checkbox';
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

type ItemCategory =
  | 'common'
  | 'asbestos'
  | 'carpentry'
  | 'interior'
  | 'equipment'
  | 'exterior'
  | 'seismic';

type ImportantItem = {
  id: string;
  category: ItemCategory;
  name: string;
  description: string;
  order: number;
  linkedEquipment: string[]; // 紐づく設備のIDリスト
  linkedConstruction: string[]; // 紐づく工事のIDリスト
};

// 設備機器のリスト
const equipmentList = [
  { id: 'system-kitchen', name: 'システムキッチン一式' },
  { id: 'built-in-stove', name: 'ビルトインコンロ (ガス・IH) 単品' },
  { id: 'dishwasher', name: '食器洗い乾燥機単品' },
  { id: 'range-hood', name: 'レンジフード単品' },
  { id: 'unit-bath', name: 'ユニットバス一式' },
  { id: 'bathroom-heater', name: '浴室暖房乾燥機単品' },
  { id: 'gas-water-heater', name: 'ガス給湯器単品' },
  { id: 'ecocute', name: 'エコキュート単品' },
  { id: 'vanity', name: '洗面化粧台一式' },
  { id: 'toilet', name: 'トイレ一式' },
  { id: 'washlet', name: '温水洗浄便座' },
  { id: 'faucet', name: '水栓金具単品' },
];

// 工事のリスト
const constructionList = [
  { id: 'exterior-wall', name: '外壁工事' },
  { id: 'entrance-door-window', name: '玄関ドア・窓工事' },
  { id: 'exterior-exterior', name: '外構・エクステリア工事' },
  { id: 'waterproofing', name: '防水工事' },
  { id: 'woodwork', name: '木工事' },
  { id: 'insulation', name: '断熱工事' },
  { id: 'termite-control', name: '防蟻工事' },
  { id: 'roof-painting', name: '屋根塗装工事' },
  { id: 'ventilation', name: '換気設備工事' },
  { id: 'interior', name: '内装工事' },
  { id: 'plastering-tile', name: '左官・タイル工事' },
  { id: 'roof', name: '屋根工事' },
  { id: 'air-conditioning', name: '空調設備工事' },
  { id: 'seismic', name: '耐震工事' },
  { id: 'exterior-wall-painting', name: '外壁塗装工事' },
  { id: 'interior-joinery', name: '室内建具工事' },
  { id: 'other', name: 'その他工事(クリーニング、網戸張り替え、取っ手、鍵交換など)' },
  { id: 'foundation', name: '基礎工事' },
];

const categoryLabels: Record<ItemCategory, string> = {
  common: '共通項目',
  asbestos: 'アスベスト対策',
  carpentry: '大工造作工事',
  interior: '内装仕上げ工事',
  equipment: '設備工事・コンセント・TV・エアコン',
  exterior: '外壁屋根工事・塗装・防水工事・外構工事',
  seismic: '耐震工事',
};

// 各カテゴリの紐づけ条件を定義
const categoryLinkConditions: Record<ItemCategory, { equipment?: string[]; construction: string[] }> = {
  common: { construction: [] }, // 共通項目は条件なし
  asbestos: { construction: [] }, // アスベスト対策は条件なし
  carpentry: {
    construction: ['interior', 'entrance-door-window', 'insulation', 'seismic'], // 内装工事、玄関ドア・窓工事、断熱工事、耐震工事
  },
  interior: {
    construction: ['interior'], // 内装工事
  },
  equipment: {
    equipment: equipmentList.map((e) => e.id), // 設備の全て
    construction: ['interior'], // 内装工事
  },
  exterior: {
    construction: ['exterior-wall', 'exterior-wall-painting', 'roof', 'roof-painting', 'waterproofing', 'exterior-exterior'], // 外壁工事、外壁塗装工事、屋根工事、屋根塗装工事、防水工事、外構・エクステリア工事
  },
  seismic: {
    construction: ['seismic'], // 耐震工事
  },
};

// 紐づけ条件の説明文を生成
const getCategoryDescription = (category: ItemCategory): string => {
  const conditions = categoryLinkConditions[category];
  const parts: string[] = [];

  if (conditions.equipment && conditions.equipment.length > 0) {
    const equipmentNames = conditions.equipment
      .map((id) => equipmentList.find((e) => e.id === id)?.name)
      .filter(Boolean)
      .join('、');
    parts.push(`設備: ${equipmentNames}`);
  }

  if (conditions.construction && conditions.construction.length > 0) {
    const constructionNames = conditions.construction
      .map((id) => constructionList.find((c) => c.id === id)?.name)
      .filter(Boolean)
      .join('、');
    parts.push(`工事: ${constructionNames}`);
  }

  if (parts.length === 0) {
    return '重要項目の説明を設定してください';
  }

  return `以下の条件に該当する場合に表示されます: ${parts.join(' / ')}`;
};

const categories: ItemCategory[] = [
  'common',
  'asbestos',
  'carpentry',
  'interior',
  'equipment',
  'exterior',
  'seismic',
];

export function ImportantItemDescriptionPage() {
  const [items, setItems] = useState<ImportantItem[]>([]);

  const [editingItem, setEditingItem] = useState<ImportantItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    description: '', 
    linkedEquipment: [] as string[], 
    linkedConstruction: [] as string[] 
  });

  const getItemsByCategory = (category: ItemCategory) => {
    return items
      .filter((item) => item.category === category)
      .sort((a, b) => a.order - b.order);
  };

  const openAddDialog = (category?: ItemCategory) => {
    const defaultCategory = category || categories[0];
    const categoryItems = getItemsByCategory(defaultCategory);
    const newOrder = categoryItems.length > 0 ? categoryItems[categoryItems.length - 1].order + 1 : 1;
    
    setEditingItem({
      id: `item-${Date.now()}-${Math.random()}`,
      category: defaultCategory,
      name: '',
      description: '',
      order: newOrder,
      linkedEquipment: [],
      linkedConstruction: [],
    });
    setFormData({ name: '', description: '', linkedEquipment: [], linkedConstruction: [] });
    setIsDialogOpen(true);
  };


  const openEditDialog = (item: ImportantItem) => {
    setEditingItem(item);
    // 編集時は、カテゴリから対応する項目名を設定
    const itemName = categoryLabels[item.category] || item.name;
    setFormData({ 
      name: itemName, 
      description: item.description,
      linkedEquipment: item.linkedEquipment || [],
      linkedConstruction: item.linkedConstruction || [],
    });
    setIsDialogOpen(true);
  };


  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ name: '', description: '', linkedEquipment: [], linkedConstruction: [] });
  };

  const handleSave = () => {
    if (!editingItem || !editingItem.category) return;

    if (editingItem.id.startsWith('item-') && !items.find((i) => i.id === editingItem!.id)) {
      // 新規追加
      setItems((prev) => [
        ...prev,
        {
          ...editingItem,
          name: formData.name,
          description: formData.description,
          linkedEquipment: formData.linkedEquipment,
          linkedConstruction: formData.linkedConstruction,
        },
      ]);
    } else {
      // 編集
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name: formData.name,
                description: formData.description,
                linkedEquipment: formData.linkedEquipment,
                linkedConstruction: formData.linkedConstruction,
              }
            : item
        )
      );
    }

    closeDialog();
  };

  const toggleEquipment = (equipmentId: string) => {
    setFormData((prev) => ({
      ...prev,
      linkedEquipment: prev.linkedEquipment.includes(equipmentId)
        ? prev.linkedEquipment.filter((id) => id !== equipmentId)
        : [...prev.linkedEquipment, equipmentId],
    }));
  };

  const toggleConstruction = (constructionId: string) => {
    setFormData((prev) => ({
      ...prev,
      linkedConstruction: prev.linkedConstruction.includes(constructionId)
        ? prev.linkedConstruction.filter((id) => id !== constructionId)
        : [...prev.linkedConstruction, constructionId],
    }));
  };

  const handleDelete = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // TODO: 重要項目説明保存の実装
  // const handleSaveAll = () => {
  //   console.log('重要項目説明を保存:', items);
  //   // 実際の実装では、ここでAPIを呼び出す
  // };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">重要項目説明設定</h2>
          <p className="text-sm text-gray-500 mt-1">
            各工事カテゴリごとの重要項目説明を設定します。
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => openAddDialog()} className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            項目を追加
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((category) => {
          const categoryItems = getItemsByCategory(category);
          return (
            <Card key={category}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{categoryLabels[category]}</CardTitle>
                    <CardDescription>
                      {getCategoryDescription(category)}
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openAddDialog(category)}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    編集
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {categoryItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">重要項目が設定されていません</p>
                    <p className="text-xs mt-1">
                      項目を追加して、説明を設定してください
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">順序</TableHead>
                          <TableHead>項目名</TableHead>
                          <TableHead>説明</TableHead>
                          <TableHead className="w-32">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categoryItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <span className="text-sm font-medium text-gray-900">
                                {item.order}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium text-gray-900">{item.name}</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-gray-600 line-clamp-2">
                                {item.description}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem && items.find((i) => i.id === editingItem.id)
                ? '重要項目を編集'
                : '重要項目を追加'}
            </DialogTitle>
            <DialogDescription>
              {editingItem && items.find((i) => i.id === editingItem.id)
                ? `${categoryLabels[editingItem.category]}の項目を編集します`
                : '重要項目を追加します'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">項目名</label>
              <Select
                value={formData.name}
                onValueChange={(value) => {
                  // 項目名から対応するカテゴリを決定
                  const categoryKey = Object.entries(categoryLabels).find(
                    ([_, label]) => label === value
                  )?.[0] as ItemCategory | undefined;
                  
                  if (categoryKey && editingItem) {
                    const categoryItems = getItemsByCategory(categoryKey);
                    const newOrder = categoryItems.length > 0 ? categoryItems[categoryItems.length - 1].order + 1 : 1;
                    setEditingItem({
                      ...editingItem,
                      category: categoryKey,
                      order: newOrder,
                    });
                  }
                  
                  setFormData({ ...formData, name: value });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="項目名を選択" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={categoryLabels[category]}>
                      {categoryLabels[category]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">説明</label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="説明を自由に入力してください（長文対応）"
                rows={20}
                className="min-h-[400px] resize-y"
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">紐づく設備</label>
                <div className="grid grid-cols-3 gap-3 p-4 border rounded-lg max-h-[200px] overflow-y-auto">
                  {equipmentList.map((equipment) => (
                    <div key={equipment.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`equipment-${equipment.id}`}
                        checked={formData.linkedEquipment.includes(equipment.id)}
                        onCheckedChange={() => toggleEquipment(equipment.id)}
                      />
                      <label
                        htmlFor={`equipment-${equipment.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {equipment.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">紐づく工事</label>
                <div className="grid grid-cols-3 gap-3 p-4 border rounded-lg max-h-[200px] overflow-y-auto">
                  {constructionList.map((construction) => (
                    <div key={construction.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`construction-${construction.id}`}
                        checked={formData.linkedConstruction.includes(construction.id)}
                        onCheckedChange={() => toggleConstruction(construction.id)}
                      />
                      <label
                        htmlFor={`construction-${construction.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {construction.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
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

