import { Component, Input, OnInit } from '@angular/core';
import { initDropdowns, initFlowbite } from 'flowbite';
import { Flowbite } from '../../utils/Flowbite';
import { Loan } from '../../shared/interfaces/loan';

@Component({
  selector: 'loan-item',
  templateUrl: './loan.component.html',
})
@Flowbite()
export class LoanComponent implements OnInit {
  @Input() loan!: Loan;
  progress: number = 75;
  totalToPay: number = 0;
  totalPaid: number = 0;
  balance: number = 0;

  ngOnInit(): void {
    this.totalToPay =
      this.loan.amount * (this.loan.rate / 100) + this.loan.amount;

    const amounts = this.loan.transactions.map((transaction) => {
        return transaction.amount
    })

    this.totalPaid = amounts.reduce((a, b) => a + b, 0);
    this.progress = Math.floor((this.totalPaid / this.totalToPay) * 100);
    this.balance = this.totalToPay - this.totalPaid;

    initDropdowns();
    initFlowbite();
  }
}
