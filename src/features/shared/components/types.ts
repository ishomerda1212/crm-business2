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

