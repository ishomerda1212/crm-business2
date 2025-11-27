import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { ChevronDown, Filter, RotateCcw } from 'lucide-react';

export type RecordFilterState = {
  customerId: string;
  projectId: string;
  externalCustomerId: string;
  externalProjectId: string;
  store: string;
  owner: string;
  status: string;
  sortKey: 'status' | 'registrationDate' | 'contractDate' | 'startDate' | 'completionDate';
  sortOrder: 'asc' | 'desc';
};

export const defaultRecordFilterState: RecordFilterState = {
  customerId: '',
  projectId: '',
  externalCustomerId: '',
  externalProjectId: '',
  store: '',
  owner: '',
  status: '',
  sortKey: 'status',
  sortOrder: 'asc',
};

type RecordFilterToolbarProps = {
  filters: RecordFilterState;
  onFilterChange: <T extends keyof RecordFilterState>(key: T, value: RecordFilterState[T]) => void;
  onApply: () => void;
  onReset: () => void;
  statusOptions: string[];
  storeOptions: string[];
  ownerOptions: string[];
};

const ALL_OPTION_VALUE = '__all__';

export function RecordFilterToolbar({
  filters,
  onFilterChange,
  onApply,
  onReset,
  statusOptions,
  storeOptions,
  ownerOptions,
}: RecordFilterToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const statusValue = filters.status || ALL_OPTION_VALUE;
  const storeValue = filters.store || ALL_OPTION_VALUE;
  const ownerValue = filters.owner || ALL_OPTION_VALUE;

  const renderSelectItems = (options: string[]) =>
    options.map((option) => (
      <SelectItem key={option} value={option}>
        {option}
      </SelectItem>
    ));

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border border-orange-100 bg-orange-50/30 rounded-lg px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">絞込み・並び替え</p>
          <p className="text-xs text-gray-500">必要な条件だけを表示してリストを整理</p>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="bg-white text-gray-900">
            {isOpen ? '閉じる' : '条件を表示'}
            <ChevronDown
              className={cn(
                'w-4 h-4 ml-2 transition-transform',
                isOpen ? 'rotate-180' : 'rotate-0',
              )}
            />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="mt-4">
        <div className="bg-gray-50 dark:bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 space-y-6">
          <section>
            <div className="flex flex-wrap items-end justify-between gap-2 mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">絞込み条件</p>
                <p className="text-xs text-gray-500">IDや担当情報で素早く検索</p>
              </div>
              <span className="text-xs text-gray-400">Filter</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="customerId">顧客ID</Label>
                <Input
                  id="customerId"
                  placeholder="例: C001"
                  value={filters.customerId}
                  onChange={(event) => onFilterChange('customerId', event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectId">案件ID</Label>
                <Input
                  id="projectId"
                  placeholder="例: PJ001"
                  value={filters.projectId}
                  onChange={(event) => onFilterChange('projectId', event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="externalCustomerId">外部連携顧客ID</Label>
                <Input
                  id="externalCustomerId"
                  placeholder="CRM-XXXXX"
                  value={filters.externalCustomerId}
                  onChange={(event) => onFilterChange('externalCustomerId', event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="externalProjectId">外部連携案件ID</Label>
                <Input
                  id="externalProjectId"
                  placeholder="CASE-XXXXX"
                  value={filters.externalProjectId}
                  onChange={(event) => onFilterChange('externalProjectId', event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store">店舗</Label>
                <Select
                  value={storeValue}
                  onValueChange={(value) => onFilterChange('store', value === ALL_OPTION_VALUE ? '' : value)}
                >
                  <SelectTrigger id="store">
                    <SelectValue placeholder="すべて" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL_OPTION_VALUE}>すべて</SelectItem>
                    {renderSelectItems(storeOptions)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner">担当</Label>
                <Select
                  value={ownerValue}
                  onValueChange={(value) => onFilterChange('owner', value === ALL_OPTION_VALUE ? '' : value)}
                >
                  <SelectTrigger id="owner">
                    <SelectValue placeholder="すべて" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL_OPTION_VALUE}>すべて</SelectItem>
                    {renderSelectItems(ownerOptions)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">ステータス</Label>
                <Select
                  value={statusValue}
                  onValueChange={(value) => onFilterChange('status', value === ALL_OPTION_VALUE ? '' : value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="すべて" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL_OPTION_VALUE}>すべて</SelectItem>
                    {renderSelectItems(statusOptions)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section>
            <div className="flex flex-wrap items-end justify-between gap-2 mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">並び替え</p>
                <p className="text-xs text-gray-500">表示順序をコントロール</p>
              </div>
              <span className="text-xs text-gray-400">Sort</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="sortKey">基準</Label>
                <Select
                  value={filters.sortKey}
                  onValueChange={(value) =>
                    onFilterChange('sortKey', value as RecordFilterState['sortKey'])
                  }
                >
                  <SelectTrigger id="sortKey">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="status">ステータス</SelectItem>
                    <SelectItem value="registrationDate">登録日</SelectItem>
                    <SelectItem value="contractDate">契約日</SelectItem>
                    <SelectItem value="startDate">着工日</SelectItem>
                    <SelectItem value="completionDate">完工日</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sortOrder">順序</Label>
                <Select
                  value={filters.sortOrder}
                  onValueChange={(value) =>
                    onFilterChange('sortOrder', value as RecordFilterState['sortOrder'])
                  }
                >
                  <SelectTrigger id="sortOrder">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">昇順</SelectItem>
                    <SelectItem value="desc">降順</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end border-t border-gray-200 pt-4">
            <Button variant="outline" className="flex-1 sm:flex-none" onClick={onReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              リセット
            </Button>
            <Button
              className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 text-white"
              onClick={onApply}
            >
              <Filter className="w-4 h-4 mr-2" />
              絞り込む
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

