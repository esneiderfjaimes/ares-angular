import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Loan } from '../../shared/interfaces/loan';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Flowbite } from '../../utils/Flowbite';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.page.html',
})
@Flowbite()
export class LoanPage {
  loan: Loan | undefined | null;
  progress: number = 75;
  totalToPay: number = 0;
  totalPaid: number = 0;
  balance: number = 0;

  constructor(
    activatedRoute: ActivatedRoute,
    firestoreService: FirestoreService
  ) {
    const id = activatedRoute.snapshot.queryParams['id'];
    console.log(LoanPage.tag, 'id:', id);

    firestoreService.getLoanDocument(id).then((loan) => {
      if (loan) {
        this.loan = loan;

        console.log(this.loan.transactions);
        this.loan.transactions.forEach((transaction) => {
          console.log("Transaction: ",transaction.date);
        })

        this.totalToPay = this.loan.amount * (loan.rate / 100) + loan.amount;

        const amounts = this.loan.transactions.map((transaction) => {
          return transaction.amount;
        });

        this.totalPaid = amounts.reduce((a, b) => a + b, 0);
        this.progress = Math.floor((this.totalPaid / this.totalToPay) * 100);
        this.balance = this.totalToPay - this.totalPaid;
      } else {
        this.loan = null;
      }
    });
  }

  static tag = 'loanpage';
}
