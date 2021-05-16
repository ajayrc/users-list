export interface FilterOption {
  value: string;
  text: string;
}

export type Filter = {
  filterColumn?: string;
  filterValue?: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};
