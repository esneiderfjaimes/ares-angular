import { Injectable } from '@angular/core';
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
          return loan;
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

  static tag = 'firestoreservice';
}
