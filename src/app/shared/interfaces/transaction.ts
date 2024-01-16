import { Timestamp } from "firebase/firestore/lite";

export interface Transaction {
  id: string;
  amount: number;
  date: Timestamp;
}
