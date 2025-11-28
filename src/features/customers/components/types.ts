export type CustomerFilterState = {
  customerId: string;
  externalCustomerId: string;
  currentAddress: string;
  phone: string;
  sortKey: 'customerId' | 'customerName' | 'registrationDate';
  sortOrder: 'asc' | 'desc';
};

export const defaultCustomerFilterState: CustomerFilterState = {
  customerId: '',
  externalCustomerId: '',
  currentAddress: '',
  phone: '',
  sortKey: 'registrationDate',
  sortOrder: 'desc',
};

