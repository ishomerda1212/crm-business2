import { useState } from 'react';
import { mockProjectList } from '@/data/mockData';
import { ProjectList } from '../components/ProjectList';
import type { CustomerSearchCandidate } from '../types/CustomerSearchCandidate';
import type { PropertyInfo } from '@/lib/supabase';

type ProjectListPageProps = {
  onSelectProject: (projectId: string) => void;
  onCreateProject?: (candidate?: CustomerSearchCandidate | null, propertyInfo?: PropertyInfo) => void;
};

export function ProjectListPage({ onSelectProject, onCreateProject }: ProjectListPageProps) {
  const [projects] = useState(mockProjectList);

  return (
    <ProjectList
      projects={projects}
      filterMode="all"
      title="案件一覧"
      description="全ての案件情報を管理"
      listTitle="案件リスト"
      showCreateButton={true}
      onSelectProject={onSelectProject}
      onCreateProject={onCreateProject}
    />
  );
}
