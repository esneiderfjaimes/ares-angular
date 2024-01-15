import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Unsubscribe } from '@angular/fire/firestore';
import { Loan } from '../interfaces/loan';
import { Subject } from 'rxjs';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private subjectLoans = new Subject<Loan[]>();
  private unsubscribe: Unsubscribe | null = null;

  get loansObservable() {
    return this.subjectLoans.asObservable();
  }

  get userObservable() {
    return this.authService.userObservable;
  }

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {
    console.log(DashboardService.tag, 'hello from dashboard service');
    authService.userObservable.subscribe((user) => {
      console.log(DashboardService.tag, 'constructor() user:', user);
      if (user) {
        this.initSubscriptionLoans(user.isAdmin, user.id);
      } else {
        if (this.unsubscribe) {
          this.unsubscribe();
        }
        this.subjectLoans.next([]);
      }
    });
  }

  async initSubscriptionLoans(isAdmin: boolean, userId: string) {
    console.log(DashboardService.tag, 'initSubscriptionLoansByAuthor', userId);
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    const onNext = (loans: Loan[]) => {
      console.log(DashboardService.tag, 'loans', loans);
      this.subjectLoans.next(loans);
    };

    if (isAdmin) {
      this.unsubscribe = this.firestoreService.getAllLoansSnapshot(onNext);
    } else {
      this.unsubscribe = this.firestoreService.getLoansByUidSnapshot(
        userId,
        onNext
      );
    }
  }

  logOut() {
    this.authService.logOut();
  }

  static tag: string = 'dashboardservicetag';
}
