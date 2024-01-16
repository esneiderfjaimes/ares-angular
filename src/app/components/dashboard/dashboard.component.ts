import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces/user';
import { DashboardService } from '../../shared/services/dashboard.service';
import { Loan } from '../../shared/interfaces/loan';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  user: User | undefined;
  loans: Loan[] | undefined;

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
      this.loans = loans;
    });
  }

  logOut() {
    console.log('log out clicked');
    this.dashboardService.logOut();
  }

  onLoanClick(loan: Loan) {
    console.log(loan);
    this.router.navigate(['/loan'], { queryParams: { id: loan.id } });
  }

  static tag = 'dashboardcomponenttag';
}
