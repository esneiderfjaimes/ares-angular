import { Transaction } from '../../shared/interfaces/transaction';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Flowbite } from '../../utils/Flowbite';

@Component({
  selector: 'transaction-item',
  templateUrl: './transaction.component.html',
})
@Flowbite()
export class TransactionComponent implements OnInit {
  @Input() transaction!: Transaction;
  day!: string;
  dayOfWeek!: string;
  monthAndYear!: string;

  ngOnInit(): void {
    const date = this.transaction.date.toDate();
    var dayFormat = new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
    });
    this.day = dayFormat.format(date);

    var dayOfWeekFormat = new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
    });
    this.dayOfWeek = dayOfWeekFormat.format(date);

    const monthAndYearFormat = new Intl.DateTimeFormat('es-ES', {
      month: 'short',
      year: 'numeric',
    });
    this.monthAndYear = monthAndYearFormat.format(date);
  }
}
