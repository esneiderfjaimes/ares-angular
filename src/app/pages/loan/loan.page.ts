import { Transaction } from './../../shared/interfaces/transaction';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Loan } from '../../shared/interfaces/loan';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Flowbite } from '../../utils/Flowbite';
import { Timestamp } from 'firebase/firestore/lite';
import { LoanHelper } from '../../shared/helpers/loan-helper';

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

  loan: LoanHelper | undefined | null;
  transactionSuggestion: Transaction | undefined;

  constructor(
    activatedRoute: ActivatedRoute,
    firestoreService: FirestoreService
  ) {
    const id = activatedRoute.snapshot.queryParams['id'];
    console.log(LoanPage.tag, 'id:', id);

    firestoreService.getLoanDocument(id).then((loan) => {
      if (loan) {
        this.loan = new LoanHelper(loan);
        console.log(this.loan);

        this.transactionSuggestion = {
          id: '',
          date: Timestamp.now(),
          amount: this.loan.balance / this.loan.remainingInstallments,
        };

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
                value: this.loan.totalToPay,
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
