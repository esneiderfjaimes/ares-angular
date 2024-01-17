import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { initDropdowns, initFlowbite } from 'flowbite';
import { Flowbite } from '../../utils/Flowbite';
import { Loan } from '../../shared/interfaces/loan';
import { LoanHelper } from '../../shared/helpers/loan-helper';

@Component({
  selector: 'loan-item',
  templateUrl: './loan.component.html',
})
@Flowbite()
export class LoanComponent implements OnInit {
  @Input() loan!: LoanHelper;
  @Output() onClick = new EventEmitter();

  ngOnInit(): void {
    initDropdowns();
    initFlowbite();
  }

  onClickHandler() {
    this.onClick.emit();
  }
}
