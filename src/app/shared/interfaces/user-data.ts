import { Loan } from './loan';
import { DocumentReference } from 'firebase/firestore';

export interface UserData {
  loans: DocumentReference<Loan>[];
}
