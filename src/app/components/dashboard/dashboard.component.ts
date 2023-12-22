import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FirestoreService } from '../../shared/services/firestore.service';
import { User } from '../../shared/interfaces/user';
import { DashboardService } from '../../shared/services/dashboard.service';
import { Loan } from '../../shared/interfaces/loan';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  user: User | null | undefined;
  loans: Loan[] = [];

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {
    this.user = this.authService.user;

    console.log('hello from dashboard');
    console.log('end of dashboard');
  }

  tag = 'dashboardcomponenttag';

  ngOnInit(): void {
    this.dashboardService.loansObservable.subscribe((loans) => {
      console.log(this.tag, 'loans', loans);
      this.loans = loans;
    });
  }

  logOut() {
    console.log('log out clicked');
    this.authService.logOut();
  }
}
