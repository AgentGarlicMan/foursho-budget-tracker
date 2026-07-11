export interface Contribution {
  id: string;
  memberName: string;
  amount: number;
  date: string;
}

export interface Expense {
  id: string;
  itemName: string;
  cost: number;
  date: string;
  purchasedBy?: string;
}

export interface AppState {
  contributions: Contribution[];
  expenses: Expense[];
}

export type Role = 'leader' | 'viewer';
