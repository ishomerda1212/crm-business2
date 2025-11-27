import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Search,
  UserCog,
  TrendingUp,
  CheckCircle2,
  Settings,
  ChevronDown,
  ClipboardList,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mockProjectList } from '@/data/mockData';

type SidebarProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
};

const menuItems = [
  { id: 'dashboard', label: 'ダッシュボード', icon: LayoutDashboard },
  { id: 'customers', label: '顧客一覧', icon: Users },
  { id: 'projects', label: '案件一覧', icon: FolderOpen },
  { id: 'search', label: '担当未決案件', icon: Search },
  { id: 'management', label: '未入金管理', icon: UserCog },
  { id: 'approvals', label: '承認待ち', icon: CheckCircle2 },
  { id: 'izclub-members', label: 'イズクラブ会員', icon: Award },
  { id: 'completion-survey-list', label: '完工アンケート', icon: ClipboardList },
  { id: 'ranking', label: '契約ランキング', icon: TrendingUp },
];

// 表示用のユーザー情報（今後、必要に応じてpropsやstateから取得可能）
const mockUsers = [
  { id: '1', name: '山田 太郎', email: 'yamada@example.com', initials: 'ヤタ' },
  { id: '2', name: '佐藤 次郎', email: 'sato@example.com', initials: 'サト' },
  { id: '3', name: '鈴木 三郎', email: 'suzuki@example.com', initials: 'スズ' },
  { id: '4', name: '佐々木次郎', email: 'sasaki@example.com', initials: 'ササ' },
];

// 進行中の案件数をカウントする関数
const countActiveProjects = (userName: string): number => {
  return mockProjectList.filter(
    (project) =>
      project.sales_person === userName && project.status !== '完了済'
  ).length;
};

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const [currentUser, setCurrentUser] = useState(mockUsers[0]);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  // 各ユーザーの進行中案件数を計算
  const usersWithProjectCount = useMemo(() => {
    return mockUsers.map((user) => ({
      ...user,
      activeProjectCount: countActiveProjects(user.name),
    }));
  }, []);

  const handleUserSelect = (user: typeof mockUsers[0]) => {
    setCurrentUser(user);
    setIsUserDialogOpen(false);
  };

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

        <div className="mt-auto border-t dark:border-gray-200">
          <div className="p-6 pt-4 space-y-2">
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

            <button
              onClick={() => setIsUserDialogOpen(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-50 group"
            >
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="bg-orange-500 text-white text-xs font-semibold">
                  {currentUser.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left min-w-0">
                <div className="truncate font-medium text-sm text-gray-900 dark:text-gray-900">
                  {currentUser.name}
                </div>
                <div className="truncate text-xs text-gray-500 dark:text-gray-500">
                  {currentUser.email}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
            </button>

            {/* ユーザー切り替えダイアログ */}
            <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>ユーザーを切り替え</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {usersWithProjectCount.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleUserSelect(user)}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left',
                        currentUser.id === user.id
                          ? 'bg-orange-50 dark:bg-orange-50 border border-orange-200'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-50 border border-transparent'
                      )}
                    >
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarFallback className="bg-orange-500 text-white text-sm font-semibold">
                          {user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="truncate font-medium text-sm text-gray-900 dark:text-gray-900">
                            {user.name}
                          </div>
                          {user.activeProjectCount > 0 && (
                            <span className="flex-shrink-0 px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                              {user.activeProjectCount}件
                            </span>
                          )}
                        </div>
                        <div className="truncate text-xs text-gray-500 dark:text-gray-500">
                          {user.email}
                        </div>
                      </div>
                      {currentUser.id === user.id && (
                        <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </aside>
  );
}
