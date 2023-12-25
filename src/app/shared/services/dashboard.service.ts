import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { doc, onSnapshot } from 'firebase/firestore';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  Unsubscribe,
  collection,
  collectionData,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Loan } from '../interfaces/loan';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  docRef!: DocumentReference<DocumentData, DocumentData>;

  private subjectLoans = new Subject<Loan[]>();
  private unsubscribe!: Unsubscribe;

  get loansObservable() {
    return this.subjectLoans.asObservable();
  }

  tag: string = 'dashboardservicetag';

  constructor(private firestore: Firestore, authService: AuthService) {
    console.log(this.tag, 'hello from firestore');
    console.log(this.tag, 'authService.userAuth', authService.userAuth);

    const userId = authService.userAuth?.uid;

    if (userId === undefined) {
      return;
    }

    this.docRef = doc(this.firestore, 'users', userId);
    this.initSubscriptionLoansByAuthor(userId);
  }

  async initSubscriptionLoansByAuthor(userId: string) {
    console.log(this.tag, 'initSubscriptionLoansByAuthor', userId);
    const q = query(
      collection(this.firestore, 'loans'),
      where('author', 'array-contains', userId)
    );
    this.unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log(this.tag, 'querySnapshot', querySnapshot);
      const loans = querySnapshot.docs.map((doc) => {
        if (doc.exists()) {
          const loan = doc.data() as Loan;
          return loan;
        } else {
          console.log('No such document!');
          return null;
        }
      });

      const filteredLoans = loans
        .filter((loan) => loan !== null)
        .map((loan) => {
          return loan as Loan;
        });

      console.log(this.tag, 'filteredLoans', filteredLoans);
      this.subjectLoans.next(filteredLoans);
    });
  }
}
