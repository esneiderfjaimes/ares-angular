import { Transaction } from './transaction';

export interface Loan {
  id: string;
  description: string;
  amount: number;
  rate: number;
  transactions: Transaction[];
}
