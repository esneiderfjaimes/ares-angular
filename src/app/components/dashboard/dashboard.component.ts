import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { DashboardService } from '../../shared/services/dashboard.service';
import { Loan } from '../../shared/interfaces/loan';
import { LoanHelper } from '../../shared/helpers/loan-helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  user: User | undefined;
  loans: LoanHelper[] | undefined;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {
    console.log('hello from dashboard');
    this.dashboardService.userObservable.subscribe((user) => {
      console.log(DashboardComponent.tag, 'user', user);
      if (user) {
        this.user = user;
      } else {
        this.router.navigate(['/login']);
      }
    });
    this.dashboardService.loansObservable.subscribe((loans) => {
      console.log(DashboardComponent.tag, 'loans', loans);
      this.loans = loans.map((loan) => new LoanHelper(loan));
    });
  }

  logOut() {
    console.log('log out clicked');
    this.dashboardService.logOut();
  }

  navigateToNewLoan() {
    console.log('navigate to new loan clicked');
    this.router.navigate(['/new-loan']);
  }

  onLoanClick(loan: Loan) {
    console.log(loan);
    this.router.navigate(['/loan'], { queryParams: { id: loan.id } });
  }

  static tag = 'dashboardcomponenttag';
}
