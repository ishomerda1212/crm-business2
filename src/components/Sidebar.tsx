import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Search,
  UserCog,
  TrendingUp,
  CheckCircle2,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
};

const menuItems = [
  { id: 'dashboard', label: 'ダッシュボード', icon: LayoutDashboard },
  { id: 'customers', label: '顧客一覧', icon: Users },
  { id: 'projects', label: '案件一覧', icon: FolderOpen },
  { id: 'search', label: '担当未決条件', icon: Search },
  { id: 'management', label: '未入金管理', icon: UserCog },
  { id: 'approvals', label: '承認待ち', icon: CheckCircle2 },
  { id: 'ranking', label: '契約ランキング', icon: TrendingUp },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 bg-white dark:bg-white border-r dark:border-gray-200 h-full flex-shrink-0">
      <div className="flex h-full flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
              R
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-900">リノベーションCRM</h1>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-orange-50 dark:bg-orange-50 text-orange-600 dark:text-orange-600'
                      : 'text-gray-700 dark:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-50'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 pt-0">
          <button
            onClick={() => onNavigate('settings')}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
              currentPage === 'settings'
                ? 'bg-orange-50 dark:bg-orange-50 text-orange-600 dark:text-orange-600'
                : 'text-gray-700 dark:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-50'
            )}
          >
            <Settings className="w-5 h-5" />
            <span>設定</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
