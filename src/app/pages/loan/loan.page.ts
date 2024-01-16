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
  multi: any[] = [];
  view: any[] = [700, 300];

  colorScheme = {
    domain: ['#5AA454', '#E44D25'],
  };

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

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

    this.loan?.transactions.length

    firestoreService.getLoanDocument(id).then((loan) => {
      if (loan) {
        this.loan = loan;

        console.log(this.loan.transactions);
        this.loan.transactions.forEach((transaction) => {
          console.log('Transaction: ', transaction.date);
        });

        this.totalToPay = this.loan.amount * (loan.rate / 100) + loan.amount;

        const amounts = this.loan.transactions.map((transaction) => {
          return transaction.amount;
        });

        this.totalPaid = amounts.reduce((a, b) => a + b, 0);
        this.progress = Math.floor((this.totalPaid / this.totalToPay) * 100);
        this.balance = this.totalToPay - this.totalPaid;

        var count = 0;
        var format = new Intl.DateTimeFormat('es-ES', {
          month: 'short',
          year: '2-digit',
        });

        const series: any[] = [];
        this.loan.transactions.forEach((transaction) => {
          count = count + transaction.amount;
          series.push({
            name: format.format(transaction.date.toDate()),
            value: count,
          });
        });

        this.multi = [
          {
            name: loan.description,
            series: series,
          },
          {
            name: 'End',
            series: [
              {
                name: 'End',
                value: this.totalToPay,
              },
            ],
          },
        ];
      } else {
        this.loan = null;
      }
    });
  }

  static tag = 'loanpage';
}
