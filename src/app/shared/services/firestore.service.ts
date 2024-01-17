import { Injectable } from '@angular/core';
import { Transaction } from './../interfaces/transaction';
import {
  DocumentData,
  Query,
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { Firestore, getDoc } from '@angular/fire/firestore';
import { UserData } from '../interfaces/user-data';
import { Loan } from '../interfaces/loan';
import { Unsubscribe } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {
    console.log(FirestoreService.tag, 'hello from firestore');
  }

  async getUserDocument(uid: string): Promise<UserData | null> {
    const docSnap = await getDoc(doc(this.firestore, 'users', uid));
    if (docSnap.exists()) {
      console.log(
        FirestoreService.tag,
        'getUserDocument() Document data:',
        docSnap.data()
      );
      const userData = docSnap.data() as UserData;
      console.log(userData);
      return userData;
    } else {
      // docSnap.data() will be undefined in this case
      console.log(FirestoreService.tag, 'No such document!');
      return null;
    }
  }

  async getLoanDocument(id: string): Promise<Loan | null> {
    const docSnap = await getDoc(doc(this.firestore, 'loans', id));
    if (docSnap.exists()) {
      console.log(
        FirestoreService.tag,
        'getLoanDocument() Document data:',
        docSnap.data()
      );
      const loan = docSnap.data() as Loan;
      console.log(loan);
      return this.prosessLoan(docSnap.id, loan);
    } else {
      // docSnap.data() will be undefined in this case
      console.log(FirestoreService.tag, 'No such document!');
      return null;
    }
  }

  getLoansByUidSnapshot(
    userId: string,
    onNext: (loans: Loan[]) => void
  ): Unsubscribe {
    const q = query(
      collection(this.firestore, 'loans'),
      where('author', 'array-contains', userId)
    );
    return this.baseLoansSnapshot(q, onNext);
  }

  getAllLoansSnapshot(onNext: (loans: Loan[]) => void): Unsubscribe {
    const q = query(collection(this.firestore, 'loans'));
    return this.baseLoansSnapshot(q, onNext);
  }

  private baseLoansSnapshot(
    q: Query<DocumentData, DocumentData>,
    onNext: (loans: Loan[]) => void
  ) {
    return onSnapshot(q, (querySnapshot) => {
      console.log(FirestoreService.tag, 'querySnapshot', querySnapshot);
      const loans = querySnapshot.docs.map((doc) => {
        if (doc.exists()) {
          const loan = doc.data() as Loan;
          return this.prosessLoan(doc.id, loan);
        } else {
          console.log(FirestoreService.tag, 'No such document!');
          return null;
        }
      });

      const filteredLoans = loans
        .filter((loan) => loan !== null)
        .map((loan) => {
          return loan as Loan;
        });

      console.log(FirestoreService.tag, 'filteredLoans', filteredLoans);
      onNext(filteredLoans);
    });
  }

  private prosessLoan(id: string, loan: Loan): Loan {
    loan.id = id;
    loan.transactions = this.validatedTransactions(loan.transactions);
    loan.interests = this.validatedTransactions(loan.interests);
    return loan;
  }

  private validatedTransactions(transactions: Transaction[]) {
    if (transactions && transactions.length > 0) {
      transactions.sort((a, b) => {
        // Convierte las fechas a objetos Date para la comparación
        const dateA = new Date(a.date.seconds * 1000);
        const dateB = new Date(b.date.seconds * 1000);

        // Compara las fechas y devuelve el resultado de la comparación
        return dateA.getTime() - dateB.getTime();
      });

      for (let i = 0; i < transactions.length; i++) {
        transactions[i].id = i.toString();
      }
      return transactions;
    } else {
      return [];
    }
  }

  static tag = 'firestoreservice';
}
