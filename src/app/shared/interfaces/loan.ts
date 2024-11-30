import { Transaction } from './transaction';

export interface Loan {
  id: string;
  description: string;
  amount: number;
  rate: number;
  installments: number;
  transactions: Transaction[];
  interests: Transaction[];
  isArchived: boolean;
}
