export type CustomerSearchCandidate = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  isOb: boolean;
  lastProjectName?: string | null;
  lastInteraction?: string | null;
  notes?: string | null;
};


