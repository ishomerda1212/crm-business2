import { useState } from 'react';
import { mockProjectList } from '@/data/mockData';
import { ProjectList } from '../components/ProjectList';

type UnassignedProjectsPageProps = {
  onSelectProject: (projectId: string) => void;
};

export function UnassignedProjectsPage({ onSelectProject }: UnassignedProjectsPageProps) {
  const [projects] = useState(mockProjectList);

  return (
    <ProjectList
      projects={projects}
      filterMode="unassigned"
      title="担当未決案件"
      description="担当者が未決定の案件一覧"
      listTitle="担当未決案件リスト"
      emptyMessage="担当未決案件はありません"
      onSelectProject={onSelectProject}
    />
  );
}

